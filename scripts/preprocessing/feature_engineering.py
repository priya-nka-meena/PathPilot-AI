import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

# PostgreSQL Password
password = quote_plus("priya@011206")

# Database Connection
engine = create_engine(
    f"postgresql+psycopg2://postgres:{password}@localhost:5432/pathpilot_ai"
)

# SQL Query
query = """
SELECT
    j.job_link,
    j.job_title,
    j.company,
    j.job_location,
    j.job_level,
    j.job_type,
    s.job_skills,
    sm.job_summary
FROM jobs j
LEFT JOIN job_skills s
ON j.job_link = s.job_link
LEFT JOIN job_summary sm
ON j.job_link = sm.job_link
LIMIT 1000;
"""

# Load Data
df = pd.read_sql(query, engine)

# ==========================
# Data Cleaning
# ==========================

# Fill missing values
df["job_skills"] = df["job_skills"].fillna("")
df["job_summary"] = df["job_summary"].fillna("")

# ==========================
# Feature Engineering
# ==========================

# Feature 1: Number of Skills
df["num_skills"] = df["job_skills"].apply(
    lambda x: len(x.split(", ")) if x else 0
)

# Feature 2: Remote Job
df["is_remote"] = df["job_type"].str.lower().eq("remote").astype(int)

# Feature 3: Experience Level
df["experience_level"] = df["job_level"].str.lower()

# Feature 4: Country
df["country"] = df["job_location"].str.split(",").str[-1].str.strip()

# Feature 5: City
df["city"] = df["job_location"].str.split(",").str[0].str.strip()


# ==========================
# Verification
# ==========================

print("\n========== Feature 1: Number of Skills ==========")
print(df[["job_title", "job_skills", "num_skills"]].head())

print("\n========== Feature 2: Remote ==========")
print(df[["job_type", "is_remote"]].head())

print("\n========== Feature 3: Experience Level ==========")
print(df[["job_level", "experience_level"]].head())

print("\n========== Feature 4: Country ==========")
print(df[["job_location", "country"]].head())

print("\n========== Feature 5: City ==========")
print(df[["job_location", "city"]].head())


# ==========================
# Feature 6: Clean Skills List
# ==========================

df["skills_list"] = df["job_skills"].apply(
    lambda x: [skill.strip().lower() for skill in x.split(",")] if x else []
)

print("\n========== Feature 6: Skills List ==========")
print(df[["job_title", "skills_list"]].head())

# ==========================
# Feature 7: Top Skill
# ==========================

df["top_skill"] = df["skills_list"].apply(
    lambda x: x[0] if len(x) > 0 else "none"
)

print("\n========== Feature 7: Top Skill ==========")
print(df[["job_title", "top_skill"]].head())

print("\n========== Final Data ==========")
print(df.head())

print("\nShape:")
print(df.shape)

print("\nColumns:")
print(df.columns)


print("\n Feature Engineering Completed Successfully!")