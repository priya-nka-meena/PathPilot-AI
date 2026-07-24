import pandas as pd

# Read only the job_link column (faster)
jobs = pd.read_csv(
    "data/datasets/linkedin_job_postings.csv",
    usecols=["job_link"]
)

skills = pd.read_csv(
    "data/datasets/job_skills.csv",
    usecols=["job_link"]
)

summary = pd.read_csv(
    "data/datasets/job_summary.csv",
    usecols=["job_link"]
)

print("Jobs:", len(jobs))
print("Skills:", len(skills))
print("Summary:", len(summary))

print("\nUnique job links")

print("Jobs:", jobs["job_link"].nunique())
print("Skills:", skills["job_link"].nunique())
print("Summary:", summary["job_link"].nunique())