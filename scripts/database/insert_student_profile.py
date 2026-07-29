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
INSERT INTO student_profile (
    name,
    degree,
    branch,
    graduation_year,
    cgpa,
    skills,
    projects,
    experience,
    interests,
    preferred_roles,
    preferred_locations
)
VALUES (
    %s, %s, %s, %s, %s,
    %s, %s, %s, %s, %s, %s
);
""", (
    "Priyanka Meena",
    "B.Tech",
    "Computer Science and Engineering",
    2028,
    6.88,
    "Python, SQL, PostgreSQL, Pandas, NumPy, Git, GitHub",
    "PathPilot-AI, Safe Travel & Personal Safety System",
    "Open Source Contributor (GSSoC)",
    "Backend Development, Machine Learning, Artificial Intelligence",
    "Backend Developer, Machine Learning Engineer, Software Engineer",
    "Delhi, Bangalore, Remote"
))

conn.commit()

print("✅ Student profile inserted successfully!")

cursor.close()
conn.close()