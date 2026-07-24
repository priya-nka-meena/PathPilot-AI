import pandas as pd

duplicates = 0

for chunk in pd.read_csv(
    "data/datasets/linkedin_job_postings.csv",
    chunksize=100000
):
    duplicates += chunk.duplicated().sum()

print("Duplicate Rows:", duplicates)