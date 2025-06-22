import bcrypt
import os
import sys
import pymysql
from datetime import datetime

# --- CONFIGURE THESE ---
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "Mz@2025!RootSQL")
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_DB = os.getenv("MYSQL_DB", "memorialDB")

# --- SET YOUR ADMIN CREDENTIALS HERE ---
ADMIN_USERNAME = "adminuser"
ADMIN_PASSWORD = "changeme123"  # Change this!
ADMIN_EMAIL = "admin@example.com"
ADMIN_FULL_NAME = "Admin User"
ADMIN_ROLE = "super_admin"  # or 'admin', 'moderator'

# --- HASH THE PASSWORD ---
hashed = bcrypt.hashpw(ADMIN_PASSWORD.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# --- CONNECT TO MYSQL ---
conn = pymysql.connect(
    host=MYSQL_HOST,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DB,
    port=MYSQL_PORT,
    charset="utf8mb4"
)

try:
    with conn.cursor() as cursor:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sql = """
        INSERT INTO admin_users (username, full_name, password_hash, email, role, is_active, last_login, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, 1, NULL, %s, %s)
        ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash), email=VALUES(email), full_name=VALUES(full_name), role=VALUES(role), updated_at=VALUES(updated_at)
        """
        cursor.execute(sql, (
            ADMIN_USERNAME,
            ADMIN_FULL_NAME,
            hashed,
            ADMIN_EMAIL,
            ADMIN_ROLE,
            now,
            now
        ))
        conn.commit()
        print(f"✅ Admin user '{ADMIN_USERNAME}' created/updated successfully.")
finally:
    conn.close()

# NOTE: Only password_hash is used for authentication. The legacy 'password' field is ignored.
# Ensure the 'password' column in the admin_users table is nullable:
#   ALTER TABLE admin_users MODIFY COLUMN password VARCHAR(255) NULL;
