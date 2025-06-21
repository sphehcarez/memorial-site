from sqlalchemy import create_engine
from models import Base
import os

# Ensure directory exists
db_folder = os.path.join(os.getcwd(), "memorialDB")
os.makedirs(db_folder, exist_ok=True)

# Full path to memorialDB.db
db_path = os.path.join(db_folder, "memorialDB.db")

print(f"⏳ Initializing SQLite database: {db_path} ...")

# Create engine
engine = create_engine(f"sqlite:///{db_path}", echo=True)

# Create tables
Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully.")
