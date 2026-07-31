import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import google.generativeai as genai
from config import GEMINI_API_KEY


# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Load Gemini Model
model = genai.GenerativeModel("gemini-flash-latest")

# ==========================
# Student Profile
# ==========================

student_profile = """
Name: Priyanka

Skills:
Python
SQL
PostgreSQL
Git
GitHub
NumPy
Pandas

Career Goal:
Software Development Engineer (SDE)

Projects:
PathPilot-AI
Personal Safety System
"""

# ==========================
# Prompt
# ==========================

prompt = f"""
You are an AI Career Advisor.

Here is the student's profile:

{student_profile}

Answer these questions:

1. Is the student ready for an SDE role?
2. Which important skills are missing?
3. Suggest 5 projects.
4. Create a 3-month learning roadmap.
5. Give final career advice.

Keep the response well structured using headings and bullet points.
"""

print("Generating AI Career Advice...\n")

response = model.generate_content(prompt)

print(response.text)

print("\n✅ AI Career Advisor Completed!")