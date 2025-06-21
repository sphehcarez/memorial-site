import asyncio
# Make sure your database.py defines AsyncSessionLocal as shown below, or adjust the import to match the actual name.
from database import async_session  # or the correct session factory name

async def test_connection():
    try:
        async with async_session() as session:
            result = await session.execute("SELECT 1")
            print("✅ Database connected:", result.scalar())
    except Exception as e:
        print("❌ Connection failed:", e)

if __name__ == "__main__":
    asyncio.run(test_connection())
