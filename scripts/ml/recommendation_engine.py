import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

# -----------------------------
# Database Connection
# -----------------------------
password = quote_plus("priya@011206")

engine = create_engine(
    f"postgresql+psycopg2://postgres:{password}@localhost:5432/pathpilot_ai"
)

# -----------------------------
# Load Student Profile
# -----------------------------
student_query = """
SELECT *
FROM student_profile
LIMIT 1;
"""

student = pd.read_sql(student_query, engine)

# -----------------------------
# Load Jobs
# -----------------------------
jobs_query = """
SELECT
    j.job_title,
    s.job_skills
FROM jobs j
LEFT JOIN job_skills s
ON j.job_link = s.job_link
LIMIT 1000;
"""

jobs = pd.read_sql(jobs_query, engine)

# -----------------------------
# Student Skills
# -----------------------------
student_skills = set(
    skill.strip().lower()
    for skill in student.loc[0, "skills"].split(",")
)

print("\nStudent Skills:")
print(student_skills)

# -----------------------------
# Match Score
# -----------------------------
scores = []

for _, row in jobs.iterrows():

    if pd.isna(row["job_skills"]):
        continue

    job_skills = set(
        skill.strip().lower()
        for skill in row["job_skills"].split(",")
    )

    matched = student_skills.intersection(job_skills)

    score = len(matched)

    scores.append({
        "job_title": row["job_title"],
        "match_score": score,
        "matched_skills": ", ".join(sorted(matched))
    })

# -----------------------------
# Top Recommendations
# -----------------------------
recommendations = pd.DataFrame(scores)

recommendations = recommendations.sort_values(
    by="match_score",
    ascending=False
)

print("\n========== Top Recommended Jobs ==========\n")

print(recommendations.head(10))