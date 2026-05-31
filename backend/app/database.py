import psycopg2


conn = psycopg2.connect(
    host="database",
    database="restaurant",
    user="postgres",
    password="1234",
    port=5434
)

cursor = conn.cursor()

print("Connected to PostgreSQL!")