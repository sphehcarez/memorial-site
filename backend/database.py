import asyncio
import aiomysql
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
import os
from typing import Optional, List, Dict, Any
from datetime import datetime
import json
import bcrypt
from dotenv import load_dotenv

from models import *

load_dotenv()

# Database configuration
from models import *

load_dotenv()

# Path to your SQLite DB (adjusted for your directory structure)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "memorialDB", "memorialDB.db")

# Construct SQLite connection string
DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"

# Async engine and sessionmaker
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

class Database:
    def __init__(self, session: AsyncSession):
        self.session = session

    # ==================== ADMIN USERS ====================
    
    async def get_admin_by_username(self, username: str) -> Optional[AdminUser]:
        """Get admin user by username"""
        result = await self.session.execute(
            text("SELECT * FROM admin_users WHERE username = :username AND is_active = TRUE"),
            {"username": username}
        )
        row = result.fetchone()
        if row:
            return AdminUser(
                id=row.id,
                username=row.username,
                email=row.email,
                password_hash=row.password_hash,
                full_name=row.full_name,
                role=row.role,
                is_active=row.is_active,
                last_login=row.last_login,
                created_at=row.created_at,
                updated_at=row.updated_at
            )
        return None

    async def get_admin_by_id(self, admin_id: int) -> Optional[AdminUser]:
        """Get admin user by ID"""
        result = await self.session.execute(
            text("SELECT * FROM admin_users WHERE id = :id AND is_active = TRUE"),
            {"id": admin_id}
        )
        row = result.fetchone()
        if row:
            return AdminUser(
                id=row.id,
                username=row.username,
                email=row.email,
                password_hash=row.password_hash,
                full_name=row.full_name,
                role=row.role,
                is_active=row.is_active,
                last_login=row.last_login,
                created_at=row.created_at,
                updated_at=row.updated_at
            )
        return None

    async def update_admin_last_login(self, admin_id: int):
        """Update admin last login timestamp"""
        await self.session.execute(
            text("UPDATE admin_users SET last_login = NOW() WHERE id = :id"),
            {"id": admin_id}
        )
        await self.session.commit()

    # ==================== CONDOLENCES ====================
    
    async def get_condolences(self, status: Optional[str] = None, limit: int = 50, offset: int = 0) -> List[Dict]:
        """Get condolences with optional status filter"""
        query = """
            SELECT c.*, a.full_name as reviewed_by_name 
            FROM condolences c 
            LEFT JOIN admin_users a ON c.reviewed_by = a.id
        """
        params = {}
        
        if status:
            query += " WHERE c.status = :status"
            params["status"] = status
        
        query += " ORDER BY c.submitted_at DESC LIMIT :limit OFFSET :offset"
        params.update({"limit": limit, "offset": offset})
        
        result = await self.session.execute(text(query), params)
        return [dict(row._mapping) for row in result.fetchall()]

    async def create_condolence(self, data: Dict[str, Any]) -> int:
        """Create a new condolence"""
        query = """
            INSERT INTO condolences (name, email, location, message, ip_address, user_agent)
            VALUES (:name, :email, :location, :message, :ip_address, :user_agent)
        """
        result = await self.session.execute(text(query), {
            "name": data["name"],
            "email": data["email"],
            "location": data.get("location"),
            "message": data["message"],
            "ip_address": data.get("ipAddress"),
            "user_agent": data.get("userAgent")
        })
        await self.session.commit()
        return result.lastrowid

    async def update_condolence_status(self, condolence_id: int, status: str, admin_id: int, notes: Optional[str] = None):
        """Update condolence status"""
        query = """
            UPDATE condolences 
            SET status = :status, reviewed_by = :admin_id, reviewed_at = NOW(), admin_notes = :notes
            WHERE id = :id
        """
        await self.session.execute(text(query), {
            "status": status,
            "admin_id": admin_id,
            "notes": notes,
            "id": condolence_id
        })
        await self.session.commit()

    # ==================== TRIBUTES ====================
    
    async def get_tributes(self, status: Optional[str] = None, limit: int = 50, offset: int = 0) -> List[Dict]:
        """Get tributes with optional status filter"""
        query = """
            SELECT t.*, a.full_name as reviewed_by_name,
                   GROUP_CONCAT(ti.image_url) as images
            FROM tributes t 
            LEFT JOIN admin_users a ON t.reviewed_by = a.id
            LEFT JOIN tribute_images ti ON t.id = ti.tribute_id
        """
        params = {}
        
        if status:
            query += " WHERE t.status = :status"
            params["status"] = status
        
        query += " GROUP BY t.id ORDER BY t.submitted_at DESC LIMIT :limit OFFSET :offset"
        params.update({"limit": limit, "offset": offset})
        
        result = await self.session.execute(text(query), params)
        return [dict(row._mapping) for row in result.fetchall()]

    async def create_tribute(self, data: Dict[str, Any]) -> int:
        """Create a new tribute"""
        # Insert tribute
        query = """
            INSERT INTO tributes (name, email, phone, location, message, ip_address, user_agent)
            VALUES (:name, :email, :phone, :location, :message, :ip_address, :user_agent)
        """
        result = await self.session.execute(text(query), {
            "name": data["name"],
            "email": data["email"],
            "phone": data.get("phone"),
            "location": data.get("location"),
            "message": data["message"],
            "ip_address": data.get("ipAddress"),
            "user_agent": data.get("userAgent")
        })
        
        tribute_id = result.lastrowid
        
        # Insert images if provided
        if data.get("images"):
            for image in data["images"]:
                await self.session.execute(
                    text("INSERT INTO tribute_images (tribute_id, image_url, image_alt) VALUES (:tribute_id, :url, :alt)"),
                    {"tribute_id": tribute_id, "url": image["url"], "alt": image.get("alt", "")}
                )
        
        await self.session.commit()
        return tribute_id

    async def update_tribute_status(self, tribute_id: int, status: str, admin_id: int, notes: Optional[str] = None):
        """Update tribute status"""
        query = """
            UPDATE tributes 
            SET status = :status, reviewed_by = :admin_id, reviewed_at = NOW(), admin_notes = :notes
            WHERE id = :id
        """
        await self.session.execute(text(query), {
            "status": status,
            "admin_id": admin_id,
            "notes": notes,
            "id": tribute_id
        })
        await self.session.commit()

    # ==================== ACCREDITATIONS ====================
    
    async def get_accreditations(self, status: Optional[str] = None, category: Optional[str] = None, limit: int = 50, offset: int = 0) -> List[Dict]:
        """Get accreditations with optional filters"""
        query = """
            SELECT a.*, ad.full_name as reviewed_by_name,
                   COUNT(doc.id) as document_count
            FROM accreditations a 
            LEFT JOIN admin_users ad ON a.reviewed_by = ad.id
            LEFT JOIN accreditation_documents doc ON a.id = doc.accreditation_id
        """
        params = {}
        conditions = []
        
        if status:
            conditions.append("a.status = :status")
            params["status"] = status
        
        if category:
            conditions.append("a.category = :category")
            params["category"] = category
        
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        
        query += " GROUP BY a.id ORDER BY a.submitted_at DESC LIMIT :limit OFFSET :offset"
        params.update({"limit": limit, "offset": offset})
        
        result = await self.session.execute(text(query), params)
        return [dict(row._mapping) for row in result.fetchall()]

    async def create_accreditation(self, data: Dict[str, Any]) -> int:
        """Create a new accreditation"""
        query = """
            INSERT INTO accreditations (
                first_name, last_name, email, phone, nationality, id_number, date_of_birth,
                organization, position, category, accreditation_type,
                address, city, country, emergency_contact, emergency_phone,
                special_requirements, vehicle_registration, accompanied_by,
                ip_address, user_agent
            ) VALUES (
                :first_name, :last_name, :email, :phone, :nationality, :id_number, :date_of_birth,
                :organization, :position, :category, :accreditation_type,
                :address, :city, :country, :emergency_contact, :emergency_phone,
                :special_requirements, :vehicle_registration, :accompanied_by,
                :ip_address, :user_agent
            )
        """
        result = await self.session.execute(text(query), {
            "first_name": data["firstName"],
            "last_name": data["lastName"],
            "email": data["email"],
            "phone": data["phone"],
            "nationality": data["nationality"],
            "id_number": data["idNumber"],
            "date_of_birth": data["dateOfBirth"],
            "organization": data["organization"],
            "position": data["position"],
            "category": data["category"],
            "accreditation_type": data["accreditationType"],
            "address": data["address"],
            "city": data["city"],
            "country": data["country"],
            "emergency_contact": data["emergencyContact"],
            "emergency_phone": data["emergencyPhone"],
            "special_requirements": data.get("specialRequirements"),
            "vehicle_registration": data.get("vehicleRegistration"),
            "accompanied_by": data.get("accompaniedBy"),
            "ip_address": data.get("ipAddress"),
            "user_agent": data.get("userAgent")
        })
        
        accreditation_id = result.lastrowid
        
        # Insert documents if provided
        if data.get("documents"):
            for doc in data["documents"]:
                await self.session.execute(
                    text("""
                        INSERT INTO accreditation_documents 
                        (accreditation_id, document_name, document_url, document_type, file_size, mime_type)
                        VALUES (:accreditation_id, :name, :url, :type, :size, :mime_type)
                    """),
                    {
                        "accreditation_id": accreditation_id,
                        "name": doc["name"],
                        "url": doc["url"],
                        "type": doc.get("type"),
                        "size": doc.get("size"),
                        "mime_type": doc.get("mimeType")
                    }
                )
        
        await self.session.commit()
        return accreditation_id

    async def update_accreditation_status(self, accreditation_id: int, status: str, admin_id: int, notes: Optional[str] = None):
        """Update accreditation status"""
        query = """
            UPDATE accreditations 
            SET status = :status, reviewed_by = :admin_id, reviewed_at = NOW(), admin_notes = :notes
            WHERE id = :id
        """
        await self.session.execute(text(query), {
            "status": status,
            "admin_id": admin_id,
            "notes": notes,
            "id": accreditation_id
        })
        await self.session.commit()

    # ==================== GALLERY ====================
    
    async def get_gallery_items(self, category: Optional[str] = None, limit: int = 50, offset: int = 0) -> List[Dict]:
        """Get gallery items"""
        query = """
            SELECT g.*, a.full_name as uploaded_by_name 
            FROM gallery_items g 
            LEFT JOIN admin_users a ON g.uploaded_by = a.id
            WHERE g.status = 'active'
        """
        params = {}
        
        if category:
            query += " AND g.category = :category"
            params["category"] = category
        
        query += " ORDER BY g.uploaded_at DESC LIMIT :limit OFFSET :offset"
        params.update({"limit": limit, "offset": offset})
        
        result = await self.session.execute(text(query), params)
        return [dict(row._mapping) for row in result.fetchall()]

    async def create_gallery_item(self, data: Dict[str, Any], admin_id: int) -> int:
        """Create a new gallery item"""
        query = """
            INSERT INTO gallery_items (title, description, category, type, url, thumbnail_url, year, tags, uploaded_by)
            VALUES (:title, :description, :category, :type, :url, :thumbnail_url, :year, :tags, :uploaded_by)
        """
        result = await self.session.execute(text(query), {
            "title": data["title"],
            "description": data.get("description"),
            "category": data["category"],
            "type": data["type"],
            "url": data["url"],
            "thumbnail_url": data.get("thumbnailUrl"),
            "year": data.get("year"),
            "tags": json.dumps(data.get("tags", [])),
            "uploaded_by": admin_id
        })
        await self.session.commit()
        return result.lastrowid

    # ==================== ADMIN LOGS ====================
    
    async def log_admin_action(
        self, 
        admin_id: int, 
        action: str, 
        entity_type: str, 
        entity_id: Optional[int] = None,
        old_values: Optional[Dict] = None,
        new_values: Optional[Dict] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ):
        """Log admin action"""
        query = """
            INSERT INTO admin_logs (admin_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
            VALUES (:admin_id, :action, :entity_type, :entity_id, :old_values, :new_values, :ip_address, :user_agent)
        """
        await self.session.execute(text(query), {
            "admin_id": admin_id,
            "action": action,
            "entity_type": entity_type,
            "entity_id": entity_id,
            "old_values": json.dumps(old_values) if old_values else None,
            "new_values": json.dumps(new_values) if new_values else None,
            "ip_address": ip_address,
            "user_agent": user_agent
        })
        await self.session.commit()

    # ==================== STATISTICS ====================
    
    async def get_dashboard_stats(self) -> Dict[str, Dict[str, int]]:
        """Get dashboard statistics"""
        queries = [
            ("SELECT COUNT(*) as total FROM condolences", "condolences_total"),
            ("SELECT COUNT(*) as pending FROM condolences WHERE status = 'pending'", "condolences_pending"),
            ("SELECT COUNT(*) as total FROM tributes", "tributes_total"),
            ("SELECT COUNT(*) as pending FROM tributes WHERE status = 'pending'", "tributes_pending"),
            ("SELECT COUNT(*) as total FROM accreditations", "accreditations_total"),
            ("SELECT COUNT(*) as pending FROM accreditations WHERE status = 'pending'", "accreditations_pending"),
            ("SELECT COUNT(*) as total FROM gallery_items WHERE status = 'active'", "gallery_total"),
        ]
        
        results = {}
        for query, key in queries:
            result = await self.session.execute(text(query))
            row = result.fetchone()
            results[key] = row[0] if row else 0
        
        return {
            "condolences": {
                "total": results["condolences_total"],
                "pending": results["condolences_pending"]
            },
            "tributes": {
                "total": results["tributes_total"],
                "pending": results["tributes_pending"]
            },
            "accreditations": {
                "total": results["accreditations_total"],
                "pending": results["accreditations_pending"]
            },
            "gallery": {
                "total": results["gallery_total"]
            }
        }

# Dependency to get database session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield Database(session)
