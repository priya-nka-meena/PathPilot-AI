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


file_path = "data/datasets/linkedin_job_postings.csv"


for chunk in pd.read_csv(file_path, chunksize=10000):

    data = [
        tuple(row)
        for row in chunk.values
    ]

    execute_batch(
        cursor,
        """
        INSERT INTO jobs (
            job_link,
            last_processed_time,
            got_summary,
            got_ner,
            is_being_worked,
            job_title,
            company,
            job_location,
            first_seen,
            search_city,
            search_country,
            search_position,
            job_level,
            job_type
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT (job_link) DO NOTHING;
        """,
        data
    )

    conn.commit()

    print("Inserted {len(chunk)} rows")


cursor.close()
conn.close()

print("✅ Jobs import completed!")