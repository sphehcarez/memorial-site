from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# Enums
class ContentStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    MODERATOR = "moderator"

class AccreditationCategory(str, Enum):
    MEDIA = "media"
    DIPLOMATIC = "diplomatic"
    GOVERNMENT = "government"
    RELIGIOUS = "religious"
    TRADITIONAL = "traditional"
    INTERNATIONAL = "international"
    FAMILY = "family"

# Auth Schemas
class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminUserResponse(BaseModel):
    id: int
    username: str
    fullName: str
    role: str
    email: str

class AuthResponse(BaseModel):
    success: bool
    token: str
    user: AdminUserResponse

# Base Response
class SubmissionResponse(BaseModel):
    success: bool
    id: int
    message: str

class StatusUpdate(BaseModel):
    status: ContentStatus
    notes: Optional[str] = None

# Condolence Schemas
class CondolenceSubmission(BaseModel):
    name: str
    email: EmailStr
    location: Optional[str] = None
    message: str
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None

class CondolenceResponse(BaseModel):
    id: int
    name: str
    email: str
    location: Optional[str]
    message: str
    status: ContentStatus
    submitted_at: datetime
    reviewed_at: Optional[datetime]
    reviewed_by_name: Optional[str]
    admin_notes: Optional[str]
    is_featured: bool

    class Config:
        from_attributes = True

# Tribute Schemas
class TributeSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    message: str
    images: Optional[List[Dict[str, str]]] = None
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None

class TributeResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    location: Optional[str]
    message: str
    status: ContentStatus
    submitted_at: datetime
    reviewed_at: Optional[datetime]
    reviewed_by_name: Optional[str]
    admin_notes: Optional[str]
    is_featured: bool
    images: Optional[List[str]] = None

    class Config:
        from_attributes = True

# Accreditation Schemas
class AccreditationSubmission(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    nationality: str
    idNumber: str
    dateOfBirth: str
    organization: str
    position: str
    category: AccreditationCategory
    accreditationType: str
    address: str
    city: str
    country: str
    emergencyContact: str
    emergencyPhone: str
    specialRequirements: Optional[str] = None
    vehicleRegistration: Optional[str] = None
    accompaniedBy: Optional[str] = None
    documents: Optional[List[Dict[str, Any]]] = None
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None

class AccreditationResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    nationality: str
    organization: str
    position: str
    category: str
    accreditation_type: str
    city: str
    country: str
    status: ContentStatus
    submitted_at: datetime
    reviewed_at: Optional[datetime]
    reviewed_by_name: Optional[str]
    admin_notes: Optional[str]
    badge_generated: bool
    badge_number: Optional[str]

    class Config:
        from_attributes = True

# Gallery Schemas
class GalleryItemCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    type: str
    url: str
    thumbnailUrl: Optional[str] = None
    year: Optional[str] = None
    tags: Optional[List[str]] = None

class GalleryItemResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: str
    type: str
    url: str
    thumbnail_url: Optional[str]
    year: Optional[str]
    tags: Optional[List[str]]
    is_featured: bool
    uploaded_at: datetime
    uploaded_by_name: Optional[str]

    class Config:
        from_attributes = True

# Dashboard Schemas
class DashboardStats(BaseModel):
    condolences: Dict[str, int]
    tributes: Dict[str, int]
    accreditations: Dict[str, int]
    gallery: Dict[str, int]

class RecentActivity(BaseModel):
    condolences: List[CondolenceResponse]
    tributes: List[TributeResponse]
    accreditations: List[AccreditationResponse]

class DashboardResponse(BaseModel):
    stats: DashboardStats
    recentActivity: RecentActivity
