import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

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
student = pd.read_sql(
    "SELECT * FROM student_profile LIMIT 1;",
    engine
)

# -----------------------------
# Load Jobs
# -----------------------------
jobs = pd.read_sql("""
SELECT
    j.job_title,
    s.job_skills,
    sm.job_summary
FROM jobs j
LEFT JOIN job_skills s
ON j.job_link = s.job_link
LEFT JOIN job_summary sm
ON j.job_link = sm.job_link
LIMIT 100;
""", engine)

# -----------------------------
# Create Student Text
# -----------------------------
student_text = (
    student.loc[0, "skills"] + " " +
    student.loc[0, "interests"] + " " +
    student.loc[0, "preferred_roles"]
)

# -----------------------------
# Load AI Model
# -----------------------------
print("Loading Sentence Transformer...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("Model Loaded Successfully!")

# -----------------------------
# Student Embedding
# -----------------------------
student_embedding = model.encode(student_text)

# -----------------------------
# Job Embeddings
# -----------------------------
job_texts = (
    jobs["job_skills"].fillna("") + " " +
    jobs["job_summary"].fillna("")
).tolist()

job_embeddings = model.encode(job_texts)

# -----------------------------
# Similarity
# -----------------------------
scores = cosine_similarity(
    [student_embedding],
    job_embeddings
)[0]

jobs["similarity_score"] = scores

jobs = jobs.sort_values(
    by="similarity_score",
    ascending=False
)

print("\n========== Top Semantic Recommendations ==========\n")

print(
    jobs[
        ["job_title", "similarity_score"]
    ].head(10)
)

print("\n✅ Semantic Recommendation Completed!")