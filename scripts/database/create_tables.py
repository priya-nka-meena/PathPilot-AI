import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="pathpilot_ai",
    user="postgres",
    password="priya@011206"
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS jobs (
    job_link TEXT PRIMARY KEY,
    last_processed_time TEXT,
    got_summary TEXT,
    got_ner TEXT,
    is_being_worked TEXT,
    job_title TEXT,
    company TEXT,
    job_location TEXT,
    first_seen TEXT,
    search_city TEXT,
    search_country TEXT,
    search_position TEXT,
    job_level TEXT,
    job_type TEXT
);
""")

conn.commit()

print("✅ jobs table created successfully!")

cursor.close()
conn.close()