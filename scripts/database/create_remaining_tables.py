import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="pathpilot_ai",
    user="postgres",
    password="priya@011206"
)

cursor = conn.cursor()

# Skills table
cursor.execute("""
CREATE TABLE IF NOT EXISTS job_skills (
    job_link TEXT PRIMARY KEY,
    job_skills TEXT
);
""")

# Summary table
cursor.execute("""
CREATE TABLE IF NOT EXISTS job_summary (
    job_link TEXT PRIMARY KEY,
    job_summary TEXT
);
""")

conn.commit()

print("✅ job_skills table created!")
print("✅ job_summary table created!")

cursor.close()
conn.close()