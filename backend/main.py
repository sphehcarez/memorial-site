from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
import uvicorn
from datetime import datetime, timedelta
import jwt
import bcrypt
from typing import Optional, List
import os
from dotenv import load_dotenv
import io
from fastapi import Path

# Use relative import for local dev, fallback for prod
try:
    from database import Database, get_db  # Local dev (run from backend/)
except ImportError:
    from backend.database import Database, get_db  # Prod (run from project root)

from models import *
from schemas import (
    StatusUpdate, TributeResponse, AuthResponse, AdminLoginRequest, AdminUserResponse, DashboardResponse,
    CondolenceResponse, SubmissionResponse, CondolenceSubmission, AccreditationResponse, DashboardStats, RecentActivity
)
from pdf_generator import pdf_generator
from obituary_generator import obituary_generator

load_dotenv()

app = FastAPI(
    title="Memorial Website API",
    description="Backend API for Dr. Edgar Chagwa Lungu Memorial Website",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # ✅ for local dev
        "https://memorial.vercel.app"  # ✅ production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
JWT_SECRET = os.getenv("JWT_SECRET", "memorial-website-secret-key-2025")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Auth dependency
async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security), db: Database = Depends(get_db)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        admin_id = payload.get("id")
        if admin_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        admin = await db.get_admin_by_id(admin_id)
        if not admin:
            raise HTTPException(status_code=401, detail="Admin not found")
        
        return admin
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Memorial Website API", "status": "active", "version": "1.0.0"}

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# ==================== AUTH ENDPOINTS ====================

@app.post("/api/admin/auth", response_model=AuthResponse)
async def admin_login(credentials: AdminLoginRequest, db: Database = Depends(get_db)):
    """Admin authentication endpoint"""
    try:
        # Demo credentials for testing
        if credentials.username == "admin" and credentials.password == "memorial2025":
            # Create demo admin user
            demo_admin = {
                "id": 1,
                "username": "admin",
                "full_name": "System Administrator",
                "role": "super_admin",
                "email": "admin@memorial.gov.zm"
            }
            
            # Create JWT token
            token_data = {
                "id": demo_admin["id"],
                "username": demo_admin["username"],
                "role": demo_admin["role"],
                "fullName": demo_admin["full_name"],
                "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
            }
            token = jwt.encode(token_data, JWT_SECRET, algorithm=JWT_ALGORITHM)
            
            return AuthResponse(
                success=True,
                token=token,
                user=AdminUserResponse(
                    id=demo_admin["id"],
                    username=demo_admin["username"],
                    fullName=demo_admin["full_name"],
                    role=demo_admin["role"],
                    email=demo_admin["email"]
                )
            )
        
        # Get admin user from database
        admin = await db.get_admin_by_username(credentials.username)
        if not admin:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Support both bcrypt and legacy plain password
        if admin.get("password_hash"):
            if not bcrypt.checkpw(credentials.password.encode('utf-8'), admin["password_hash"].encode('utf-8')):
                raise HTTPException(status_code=401, detail="Invalid credentials")
        elif admin.get("password"):
            if credentials.password != admin["password"]:
                raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        # Update last login
        await db.update_admin_last_login(admin["id"])
        # Create JWT token
        token_data = {
            "id": admin["id"],
            "username": admin["username"],
            "role": admin["role"],
            "fullName": admin["full_name"],
            "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
        }
        token = jwt.encode(token_data, JWT_SECRET, algorithm=JWT_ALGORITHM)
        # Log admin action
        await db.log_admin_action(
            admin_id=admin["id"],
            action="login",
            entity_type="user",
            entity_id=admin["id"]
        )
        return AuthResponse(
            success=True,
            token=token,
            user=AdminUserResponse(
                id=admin["id"],
                username=admin["username"],
                fullName=admin["full_name"],
                role=admin["role"],
                email=admin["email"]
            )
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ==================== DASHBOARD ENDPOINTS ====================

@app.get("/api/admin/dashboard", response_model=DashboardResponse)
async def get_dashboard_data(admin: AdminUser = Depends(get_current_admin), db: Database = Depends(get_db)):
    """Get dashboard statistics and recent activity"""
    try:
        stats = await db.get_dashboard_stats()
        recent_activity = {
            "condolences": await db.get_condolences(limit=5),
            "tributes": await db.get_tributes(limit=5),
            "accreditations": await db.get_accreditations(limit=5)
        }
        gallery_image_count = await db.count_gallery_images()
        return DashboardResponse(
            stats=DashboardStats(
                condolences={
                    "total": stats["condolences"]["total"],
                    "pending": stats["condolences"]["pending"]
                },
                tributes={
                    "total": stats["tributes"]["total"],
                    "pending": stats["tributes"]["pending"]
                },
                accreditations={
                    "total": stats["accreditations"]["total"],
                    "pending": stats["accreditations"]["pending"]
                },
                gallery={
                    "total": gallery_image_count
                }
            ),
            recentActivity=RecentActivity(
                condolences=[CondolenceResponse(**c) for c in recent_activity["condolences"]],
                tributes=[TributeResponse(**t) for t in recent_activity["tributes"]],
                accreditations=[AccreditationResponse(**a) for a in recent_activity["accreditations"]],
            )
        )
    except Exception as e:
        print(f"Dashboard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ==================== PDF GENERATION ENDPOINTS ====================

@app.post("/api/gallery/download-pdf")
async def download_gallery_pdf(request: dict):
    """Generate and download PDF of gallery items"""
    try:
        category = request.get("category", "all")
        items = request.get("items", [])
        
        if not items:
            raise HTTPException(status_code=400, detail="No items provided")
        
        # Generate PDF
        pdf_buffer = pdf_generator.generate_pdf(items, category)
        
        # Return as streaming response
        return StreamingResponse(
            io.BytesIO(pdf_buffer.read()),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=memories-gallery-{category}-{datetime.now().strftime('%Y%m%d')}.pdf"
            }
        )
    except Exception as e:
        print(f"PDF generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")

@app.post("/api/obituary/download-pdf")
async def download_obituary_pdf():
    """Generate and download obituary PDF"""
    try:
        # Generate obituary PDF
        pdf_buffer = obituary_generator.generate_obituary_pdf()
        
        # Return as streaming response
        return StreamingResponse(
            io.BytesIO(pdf_buffer.read()),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=dr-edgar-lungu-obituary-{datetime.now().strftime('%Y%m%d')}.pdf"
            }
        )
    except Exception as e:
        print(f"Obituary PDF generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate obituary PDF: {str(e)}")

# ==================== CONDOLENCES ENDPOINTS ====================

@app.get("/api/condolences", response_model=List[CondolenceResponse])
async def get_public_condolences(limit: int = 50, offset: int = 0, db: Database = Depends(get_db)):
    """Get approved condolences for public display"""
    try:
        condolences = await db.get_condolences(status="approved", limit=limit, offset=offset)
        return condolences
    except Exception as e:
        print(f"Condolences error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/condolences", response_model=SubmissionResponse)
async def submit_condolence(condolence: CondolenceSubmission, db: Database = Depends(get_db)):
    """Submit a new condolence message"""
    try:
        new_id = await db.create_condolence(condolence.dict())
        return SubmissionResponse(
            success=True,
            id=new_id,
            message="Condolence submitted successfully. It will be reviewed before publication."
        )
    except Exception as e:
        print(f"Submit condolence error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ==================== ACCREDITATIONS ADMIN ENDPOINTS ====================

@app.get("/api/admin/accreditations", response_model=List[AccreditationResponse])
async def list_accreditations(
    status: Optional[str] = None,
    category: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """List accreditations with optional filters (admin only)"""
    try:
        accs = await db.get_accreditations(status=status, category=category, limit=limit, offset=offset)
        return accs
    except Exception as e:
        print(f"List accreditations error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put("/api/admin/accreditations/{accreditation_id}/status")
async def update_accreditation_status(
    accreditation_id: int = Path(..., description="Accreditation ID"),
    update: Optional[StatusUpdate] = None,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """Update accreditation status (approve/reject) (admin only)"""
    try:
        # Defensive: check if update is None before accessing its attributes
        if update is None:
            raise HTTPException(status_code=400, detail="Missing update payload")
        
        admin_id = admin["id"] if isinstance(admin, dict) else getattr(admin, "id", None)
        if not isinstance(admin_id, int):
            raise HTTPException(status_code=500, detail="Invalid admin id type")
        await db.update_accreditation_status(
            accreditation_id=accreditation_id,
            status=update.status,
            admin_id=admin_id,
            notes=update.notes,
        )
        return {"success": True, "message": f"Accreditation {accreditation_id} status updated to {update.status}"}
    except Exception as e:
        print(f"Update accreditation status error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ==================== CONDOLENCES ADMIN ENDPOINTS ====================

@app.get("/api/admin/condolences", response_model=List[CondolenceResponse])
async def list_condolences(
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """List condolences with optional filters (admin only)"""
    try:
        conds = await db.get_condolences(status=status, limit=limit, offset=offset)
        return conds
    except Exception as e:
        print(f"List condolences error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put("/api/admin/condolences/{condolence_id}/status")
async def update_condolence_status(
    condolence_id: int = Path(..., description="Condolence ID"),
    update: Optional[StatusUpdate] = None,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """Update condolence status (approve/reject) (admin only)"""
    try:
        # Defensive: check if update is None before accessing its attributes
        if update is None:
            raise HTTPException(status_code=400, detail="Missing update payload")
        
        admin_id = admin["id"] if isinstance(admin, dict) else getattr(admin, "id", None)
        if not isinstance(admin_id, int):
            raise HTTPException(status_code=500, detail="Invalid admin id type")
        await db.update_condolence_status(
            condolence_id=condolence_id,
            status=update.status,
            admin_id=admin_id,
            notes=update.notes,
        )
        return {"success": True, "message": f"Condolence {condolence_id} status updated to {update.status}"}
    except Exception as e:
        print(f"Update condolence status error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ==================== TRIBUTES ADMIN ENDPOINTS ====================

@app.get("/api/admin/tributes", response_model=List[TributeResponse])
async def list_tributes(
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """List tributes with optional filters (admin only)"""
    try:
        tribs = await db.get_tributes(status=status, limit=limit, offset=offset)
        return tribs
    except Exception as e:
        print(f"List tributes error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put("/api/admin/tributes/{tribute_id}/status")
async def update_tribute_status(
    tribute_id: int = Path(..., description="Tribute ID"),
    update: Optional[StatusUpdate] = None,
    admin: AdminUser = Depends(get_current_admin),
    db: Database = Depends(get_db),
):
    """Update tribute status (approve/reject) (admin only)"""
    try:
        # Defensive: check if update is None before accessing its attributes
        if update is None:
            raise HTTPException(status_code=400, detail="Missing update payload")
        
        admin_id = admin["id"] if isinstance(admin, dict) else getattr(admin, "id", None)
        if not isinstance(admin_id, int):
            raise HTTPException(status_code=500, detail="Invalid admin id type")
        await db.update_tribute_status(
            tribute_id=tribute_id,
            status=update.status,
            admin_id=admin_id,
            notes=update.notes,
        )
        return {"success": True, "message": f"Tribute {tribute_id} status updated to {update.status}"}
    except Exception as e:
        print(f"Update tribute status error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
