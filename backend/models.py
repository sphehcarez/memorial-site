from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Boolean, Enum, JSON
)
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base
import enum

# Base declarative class
Base = declarative_base()

# Enums for consistent statuses and roles
class ContentStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    MODERATOR = "moderator"

class AccreditationCategory(str, enum.Enum):
    MEDIA = "media"
    DIPLOMATIC = "diplomatic"
    GOVERNMENT = "government"
    RELIGIOUS = "religious"
    TRADITIONAL = "traditional"
    INTERNATIONAL = "international"
    FAMILY = "family"

# Admin user table for authentication
class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.MODERATOR, nullable=False)

# Condolence messages from users
class Condolence(Base):
    __tablename__ = "condolences"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    location = Column(String)
    message = Column(Text, nullable=False)
    ip_address = Column(String)
    user_agent = Column(String)
    status = Column(Enum(ContentStatus), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String)
    admin_notes = Column(Text)
    is_featured = Column(Boolean, default=False)

# Tributes submitted by users
class Tribute(Base):
    __tablename__ = "tributes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    location = Column(String)
    message = Column(Text, nullable=False)
    images = Column(JSON)  # List of image URLs or metadata
    ip_address = Column(String)
    user_agent = Column(String)
    status = Column(Enum(ContentStatus), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String)
    admin_notes = Column(Text)
    is_featured = Column(Boolean, default=False)

# Accreditation form submissions
class Accreditation(Base):
    __tablename__ = "accreditations"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    nationality = Column(String, nullable=False)
    id_number = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    position = Column(String, nullable=False)
    category = Column(Enum(AccreditationCategory), nullable=False)
    accreditation_type = Column(String, nullable=False)
    address = Column(Text)
    city = Column(String)
    country = Column(String)
    emergency_contact = Column(String)
    emergency_phone = Column(String)
    special_requirements = Column(Text)
    vehicle_registration = Column(String)
    accompanied_by = Column(String)
    documents = Column(JSON)  # List of uploaded file metadata
    ip_address = Column(String)
    user_agent = Column(String)
    status = Column(Enum(ContentStatus), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String)
    admin_notes = Column(Text)
    badge_generated = Column(Boolean, default=False)
    badge_number = Column(String)

# Media gallery uploads
class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    type = Column(String)  # e.g., image, video
    url = Column(String, nullable=False)
    thumbnail_url = Column(String)
    year = Column(String)
    tags = Column(JSON)  # List of tags
    is_featured = Column(Boolean, default=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    uploaded_by_name = Column(String)
