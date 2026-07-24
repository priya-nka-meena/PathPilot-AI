import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="pathpilot_ai",
        user="postgres",
        password="priya@011206"
    )

    print("✅ Connected to PostgreSQL successfully!")

    conn.close()
    print("🔒 Connection closed.")

except Exception as e:
    print("❌ Connection failed!")
    print(e)