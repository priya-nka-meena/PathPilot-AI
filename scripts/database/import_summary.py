import pandas as pd
import psycopg2
from psycopg2.extras import execute_batch

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="pathpilot_ai",
    user="postgres",
    password="priya@011206" 
)

cursor = conn.cursor()

for chunk in pd.read_csv(
    "data/datasets/job_summary.csv",
    chunksize=10000
):

    data = [
        tuple(row)
        for row in chunk.values
    ]

    execute_batch(
        cursor,
        """
        INSERT INTO job_summary (
            job_link,
            job_summary
        )
        VALUES (%s,%s)
        ON CONFLICT (job_link) DO NOTHING;
        """,
        data
    )

    conn.commit()

    print(f"Inserted {len(chunk)} summary rows")

cursor.close()
conn.close()

print("✅ Summary import completed!")