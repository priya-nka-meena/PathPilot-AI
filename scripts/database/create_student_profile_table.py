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
CREATE TABLE IF NOT EXISTS student_profile (
    id SERIAL PRIMARY KEY,
    name TEXT,
    degree TEXT,
    branch TEXT,
    graduation_year INTEGER,
    cgpa FLOAT,
    skills TEXT,
    projects TEXT,
    experience TEXT,
    interests TEXT,
    preferred_roles TEXT,
    preferred_locations TEXT
);
""")

conn.commit()

print("✅ student_profile table created successfully!")

cursor.close()
conn.close()