import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from config import ADZUNA_APP_ID, ADZUNA_APP_KEY
import requests



import requests
from config import ADZUNA_APP_ID, ADZUNA_APP_KEY

url = (
    f"https://api.adzuna.com/v1/api/jobs/in/search/1"
    f"?app_id={ADZUNA_APP_ID}"
    f"&app_key={ADZUNA_APP_KEY}"
    f"&results_per_page=10"
    f"&what=python"
)

print("Fetching live jobs...")

response = requests.get(url)

if response.status_code == 200:
    data = response.json()

    print("\n========== Live Jobs ==========\n")

    for job in data["results"]:
        print("Title    :", job.get("title"))
        print("Company  :", job.get("company", {}).get("display_name"))
        print("Location :", job.get("location", {}).get("display_name"))
        print("Salary   :", job.get("salary_is_predicted"))
        print("URL      :", job.get("redirect_url"))
        print("-" * 60)

    print("\n✅ Live API Working Successfully!")

else:
    print("Error:", response.status_code)
    print(response.text)