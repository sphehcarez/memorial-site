import os

# Only import uvicorn when running locally
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
        reload_dirs=["backend"],  # 👈 limit autoreload to backend folder only
    )
