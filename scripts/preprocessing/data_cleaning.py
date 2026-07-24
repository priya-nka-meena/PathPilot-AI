import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

password = quote_plus("priya@011206")

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

# Missing Values Before Cleaning
print("\nMissing Values Before Cleaning:")
print(df.isnull().sum())

# Fill missing values
df["job_skills"] = df["job_skills"].fillna("Not Available")
df["job_summary"] = df["job_summary"].fillna("Not Available")

# Missing Values After Cleaning
print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

# Check Data
print("\nFirst 5 Rows:")
print(df.head())