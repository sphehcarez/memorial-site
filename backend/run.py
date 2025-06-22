import os

# ✅ Ensure the FastAPI app is accessible at the top level for gunicorn
from main import app  # gunicorn looks for `app` in `run:app`

# 🟢 Local development only
if __name__ == "__main__":
    import uvicorn

    print("🇿🇲 Starting Memorial Website Backend Server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔧 Admin Panel: http://localhost:3000/admin")
    print("=" * 50)

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        reload_dirs=["backend"],  # 🔁 Watch only backend for changes
    )
