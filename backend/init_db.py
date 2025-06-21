from sqlalchemy import create_engine
from models import Base
import os
from dotenv import load_dotenv

load_dotenv()

MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "12345")
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
MYSQL_DB = os.getenv("MYSQL_DB", "memorialDB")

DATABASE_URL = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"

print(f"⏳ Initializing MySQL database: {DATABASE_URL} ...")

# Create engine
engine = create_engine(DATABASE_URL, echo=True)

# Create tables
Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully.")
