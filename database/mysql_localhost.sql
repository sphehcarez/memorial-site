-- Memorial Website Database Schema for MySQL Localhost
-- Created: 2025-06-21
-- Usage: For local development environment

-- Create database
CREATE DATABASE IF NOT EXISTS memorial_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE memorial_website;

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS admin_logs;
DROP TABLE IF EXISTS accreditation_documents;
DROP TABLE IF EXISTS accreditations;
DROP TABLE IF EXISTS tribute_images;
DROP TABLE IF EXISTS tributes;
DROP TABLE IF EXISTS condolences;
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS site_settings;

-- Admin Users Table
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Site Settings Table
CREATE TABLE site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- Condolences Table
CREATE TABLE condolences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    ip_address VARCHAR(45),
    user_agent TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,
    admin_notes TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_is_featured (is_featured),
    INDEX idx_email (email),
    FOREIGN KEY (reviewed_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Tributes Table
CREATE TABLE tributes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    ip_address VARCHAR(45),
    user_agent TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,
    admin_notes TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_is_featured (is_featured),
    INDEX idx_email (email),
    FOREIGN KEY (reviewed_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Tribute Images Table
CREATE TABLE tribute_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tribute_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_alt VARCHAR(200),
    file_size INT,
    mime_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_tribute_id (tribute_id),
    FOREIGN KEY (tribute_id) REFERENCES tributes(id) ON DELETE CASCADE
);

-- Gallery Items Table
CREATE TABLE gallery_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category ENUM('early-life', 'political', 'presidential', 'international', 'family', 'public', 'legacy') NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    year VARCHAR(4),
    tags JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_type (type),
    INDEX idx_year (year),
    INDEX idx_is_featured (is_featured),
    INDEX idx_status (status),
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Accreditations Table
CREATE TABLE accreditations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- Personal Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    id_number VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    
    -- Professional Information
    organization VARCHAR(200) NOT NULL,
    position VARCHAR(100) NOT NULL,
    category ENUM('media', 'diplomatic', 'government', 'religious', 'traditional', 'international', 'family') NOT NULL,
    accreditation_type ENUM('vip', 'media', 'general', 'family') NOT NULL,
    
    -- Contact Information
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    emergency_contact VARCHAR(100) NOT NULL,
    emergency_phone VARCHAR(20) NOT NULL,
    
    -- Additional Information
    special_requirements TEXT,
    vehicle_registration VARCHAR(20),
    accompanied_by TEXT,
    
    -- Status and Processing
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    badge_generated BOOLEAN DEFAULT FALSE,
    badge_number VARCHAR(20) UNIQUE,
    
    -- Submission Details
    ip_address VARCHAR(45),
    user_agent TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,
    admin_notes TEXT,
    
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_accreditation_type (accreditation_type),
    INDEX idx_email (email),
    INDEX idx_badge_number (badge_number),
    INDEX idx_submitted_at (submitted_at),
    FOREIGN KEY (reviewed_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Accreditation Documents Table
CREATE TABLE accreditation_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    accreditation_id INT NOT NULL,
    document_name VARCHAR(200) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    document_type VARCHAR(50),
    file_size INT,
    mime_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_accreditation_id (accreditation_id),
    FOREIGN KEY (accreditation_id) REFERENCES accreditations(id) ON DELETE CASCADE
);

-- Admin Activity Logs Table
CREATE TABLE admin_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type ENUM('condolence', 'tribute', 'accreditation', 'gallery', 'user', 'setting') NOT NULL,
    entity_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_admin_id (admin_id),
    INDEX idx_action (action),
    INDEX idx_entity_type (entity_type),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Insert default admin user (password: memorial2025)
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES 
('admin', 'admin@memorial.gov.zm', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'System Administrator', 'super_admin');

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES 
('site_title', 'Dr. Edgar Chagwa Lungu - Memorial Website', 'string', 'Main site title', TRUE),
('memorial_date', '2025-06-14 10:00:00', 'string', 'Memorial service date and time', TRUE),
('memorial_venue', 'National Heroes Stadium, Lusaka', 'string', 'Memorial service venue', TRUE),
('livestream_enabled', 'true', 'boolean', 'Enable livestream functionality', TRUE),
('registration_enabled', 'true', 'boolean', 'Enable accreditation registration', TRUE),
('tributes_enabled', 'true', 'boolean', 'Enable tribute submissions', TRUE),
('condolences_enabled', 'true', 'boolean', 'Enable condolence submissions', TRUE),
('auto_approve_condolences', 'false', 'boolean', 'Automatically approve condolences', FALSE),
('auto_approve_tributes', 'false', 'boolean', 'Automatically approve tributes', FALSE),
('max_tribute_length', '500', 'number', 'Maximum tribute message length', FALSE),
('max_condolence_length', '1000', 'number', 'Maximum condolence message length', FALSE);

-- Insert sample condolences
INSERT INTO condolences (name, email, location, message, status, submitted_at) VALUES 
('Hakainde Hichilema', 'president@statehouse.gov.zm', 'President of Zambia', 'Dr. Lungu served Zambia with dedication during his time as President. Despite our political differences, I respected his commitment to our nation. My condolences to his family and the Zambian people.', 'approved', '2025-06-06 10:00:00'),
('African Union Commission', 'info@au.int', 'Addis Ababa, Ethiopia', 'The African Union mourns the loss of a dedicated African leader. Dr. Lungu\'s contribution to Zambian democracy and peaceful transitions will be remembered across the continent.', 'approved', '2025-06-06 11:30:00'),
('Mary Banda', 'mary.banda@email.zm', 'Lusaka, Zambia', 'As a Zambian woman, I will always remember Dr. Lungu for appointing our first female Vice-President. He believed in women\'s leadership. Rest in peace, Your Excellency.', 'approved', '2025-06-07 09:15:00'),
('John Mwanza', 'john.mwanza@email.zm', 'Ndola, Zambia', 'Born in our city of Ndola, Dr. Lungu never forgot his roots. He was a son of the Copperbelt who rose to serve all of Zambia. We are proud of his legacy.', 'approved', '2025-06-07 14:20:00'),
('University of Zambia Alumni', 'alumni@unza.zm', 'Lusaka, Zambia', 'Our fellow alumnus showed that with education and determination, one can serve at the highest level. His journey from UNZA to State House inspires us all.', 'approved', '2025-06-08 16:45:00');

-- Insert sample tributes
INSERT INTO tributes (name, email, phone, location, message, status, submitted_at) VALUES 
('Sarah Phiri', 'sarah.phiri@email.zm', '+260-977-123456', 'Kitwe, Zambia', 'During his presidency, Dr. Lungu showed compassion by commuting death sentences. This act of mercy demonstrated his belief in human dignity and second chances.', 'approved', '2025-06-08 09:20:00'),
('Chief Mukuni', 'chief.mukuni@traditional.zm', '+260-966-789012', 'Livingstone, Zambia', 'The National Day of Prayer he established brought our nation together in faith. Dr. Lungu understood that leadership requires both political wisdom and spiritual guidance.', 'approved', '2025-06-09 13:15:00'),
('Dr. Christine Kaseba', 'christine.kaseba@medical.zm', '+260-955-345678', 'Lusaka, Zambia', 'As a medical professional, I appreciated Dr. Lungu\'s commitment to healthcare improvements during his presidency. His legacy in public health will be remembered.', 'approved', '2025-06-10 11:30:00');

-- Insert sample gallery items
INSERT INTO gallery_items (title, description, category, type, url, year, tags, status) VALUES 
('Presidential Inauguration 2015', 'Dr. Lungu being sworn in as the sixth President of Zambia at National Heroes Stadium', 'presidential', 'image', '/placeholder.svg?height=600&width=800', '2015', '["inauguration", "ceremony", "historic"]', 'active'),
('Meeting with Pope Francis', 'Historic audience with Pope Francis at the Vatican', 'international', 'image', '/placeholder.svg?height=600&width=800', '2016', '["vatican", "pope", "diplomacy"]', 'active'),
('University Graduation 1981', 'Young Edgar Lungu at his law degree graduation ceremony', 'early-life', 'image', '/placeholder.svg?height=600&width=800', '1981', '["education", "graduation", "university"]', 'active'),
('Appointing First Female VP', 'Historic moment appointing Inonge Wina as Zambia\'s first female Vice-President', 'presidential', 'image', '/placeholder.svg?height=600&width=800', '2015', '["historic", "women", "appointment"]', 'active'),
('National Day of Prayer', 'Leading the first National Day of Prayer, Fasting, Repentance and Reconciliation', 'presidential', 'video', '/placeholder.svg?height=600&width=800', '2015', '["prayer", "faith", "national"]', 'active');

-- Create user for application
CREATE USER IF NOT EXISTS 'memorial_user'@'localhost' IDENTIFIED BY 'memorial_password_2025';
GRANT ALL PRIVILEGES ON memorial_website.* TO 'memorial_user'@'localhost';
FLUSH PRIVILEGES;

-- Show completion message
SELECT 'Database setup completed successfully!' as message;
SELECT 'Default admin credentials: admin / memorial2025' as credentials;
SELECT 'Database: memorial_website' as database_name;
SELECT 'User: memorial_user@localhost' as db_user;
