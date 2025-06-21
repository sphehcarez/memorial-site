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

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)  # <-- fix field name
    password = Column(String(255), nullable=True)  # For legacy/compatibility, not used for authentication
    email = Column(String(255), unique=True, nullable=False)
    role = Column(Enum(UserRole, native_enum=False), default=UserRole.MODERATOR, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    last_login = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

# Condolence messages from users
class Condolence(Base):
    __tablename__ = "condolences"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    location = Column(String(255))
    message = Column(Text, nullable=False)
    ip_address = Column(String(255))
    user_agent = Column(String(255))
    status = Column(Enum(ContentStatus, native_enum=False), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime, server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String(255))
    admin_notes = Column(Text)
    is_featured = Column(Boolean, default=False)

# Tributes submitted by users
class Tribute(Base):
    __tablename__ = "tributes"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(32))
    location = Column(String(255))
    message = Column(Text, nullable=False)
    images = Column(JSON)  # List of image URLs or metadata
    ip_address = Column(String(255))
    user_agent = Column(String(255))
    status = Column(Enum(ContentStatus, native_enum=False), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime, server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String(255))
    admin_notes = Column(Text)
    is_featured = Column(Boolean, default=False)

# Accreditation form submissions
class Accreditation(Base):
    __tablename__ = "accreditations"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(32), nullable=False)
    nationality = Column(String(255), nullable=False)
    id_number = Column(String(64), nullable=False)
    date_of_birth = Column(String(32), nullable=False)
    organization = Column(String(255), nullable=False)
    position = Column(String(255), nullable=False)
    category = Column(Enum(AccreditationCategory, native_enum=False), nullable=False)
    accreditation_type = Column(String(255), nullable=False)
    address = Column(Text)
    city = Column(String(255))
    country = Column(String(255))
    emergency_contact = Column(String(255))
    emergency_phone = Column(String(32))
    special_requirements = Column(Text)
    vehicle_registration = Column(String(64))
    accompanied_by = Column(String(255))
    documents = Column(JSON)  # List of uploaded file metadata
    ip_address = Column(String(255))
    user_agent = Column(String(255))
    status = Column(Enum(ContentStatus, native_enum=False), default=ContentStatus.PENDING, nullable=False)
    submitted_at = Column(DateTime, server_default=func.now())
    reviewed_at = Column(DateTime)
    reviewed_by_name = Column(String(255))
    admin_notes = Column(Text)
    badge_generated = Column(Boolean, default=False)
    badge_number = Column(String(64))

# Media gallery uploads
class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(255))
    type = Column(String(64))  # e.g., image, video
    url = Column(String(255), nullable=False)
    thumbnail_url = Column(String(255))
    year = Column(String(8))
    tags = Column(JSON)  # List of tags
    is_featured = Column(Boolean, default=False)
    uploaded_at = Column(DateTime, server_default=func.now())
    uploaded_by_name = Column(String(255))
