import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import requests
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from config import ADZUNA_APP_ID, ADZUNA_APP_KEY

# ==========================
# Student Profile
# ==========================

student_skills = [
    "Python",
    "SQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "NumPy",
    "Pandas"
]

student_profile = " ".join(student_skills)

# ==========================
# Fetch Live Jobs
# ==========================

url = (
    f"https://api.adzuna.com/v1/api/jobs/in/search/1"
    f"?app_id={ADZUNA_APP_ID}"
    f"&app_key={ADZUNA_APP_KEY}"
    f"&results_per_page=20"
    f"&what=python"
)

print("Fetching Live Jobs...")

response = requests.get(url)

if response.status_code != 200:
    print("API Error")
    exit()

jobs = response.json()["results"]

# ==========================
# Create DataFrame
# ==========================

df = pd.DataFrame({
    "title": [job["title"] for job in jobs],
    "description": [job.get("description", "") for job in jobs],
    "company": [job.get("company", {}).get("display_name", "") for job in jobs],
    "location": [job.get("location", {}).get("display_name", "") for job in jobs],
    "url": [job.get("redirect_url", "") for job in jobs]
})

# ==========================
# Load Sentence Transformer
# ==========================

print("Loading AI Model...")

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# ==========================
# Generate Embeddings
# ==========================

student_embedding = model.encode(student_profile)

job_embeddings = model.encode(df["description"].tolist())

# ==========================
# Cosine Similarity
# ==========================

scores = cosine_similarity(
    [student_embedding],
    job_embeddings
)[0]

df["similarity"] = scores

# ==========================
# Top Recommendations
# ==========================

df = df.sort_values(
    by="similarity",
    ascending=False
)

print("\n========== Top Live Job Recommendations ==========\n")

print(
    df[
        [
            "title",
            "company",
            "location",
            "similarity"
        ]
    ].head(10)
)

print("\n✅ Live Job Ranking Completed!")