from sqlalchemy import create_engine
from models import Base
from urllib.parse import quote_plus

# 🔐 Set credentials directly (safely encoded)
MYSQL_USER = "root"
RAW_PASSWORD = "Mz@2025!RootSQL"
MYSQL_PASSWORD = quote_plus(RAW_PASSWORD)
MYSQL_HOST = "localhost"
MYSQL_PORT = "3306"
MYSQL_DB = "memorialDB"

# 📦 Compose the DB URL
DATABASE_URL = (
    f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
)

print("\n📦 Initializing MySQL database...")
print(f"🔗 Connecting to: {MYSQL_USER}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}\n")

# ⚙️ Create SQLAlchemy engine
try:
    engine = create_engine(DATABASE_URL, echo=True)
    Base.metadata.create_all(bind=engine)
    print("\n✅ Tables created successfully.")
except Exception as e:
    print(f"\n❌ Error initializing database:\n{e}")
