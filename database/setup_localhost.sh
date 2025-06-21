#!/bin/bash

# Memorial Website Database Setup Script for Localhost
# This script sets up the MySQL database for local development

echo "Setting up Memorial Website Database for Localhost..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "Error: MySQL is not running. Please start MySQL first."
    exit 1
fi

# Database configuration
DB_NAME="memorial_website"
DB_USER="memorial_user"
DB_PASSWORD="memorial_password_2025"
DB_HOST="localhost"
DB_PORT="3306"

echo "Creating database and user..."

# Execute the SQL file
mysql -u root -p < mysql_localhost.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "📋 Database Configuration:"
    echo "   Database: $DB_NAME"
    echo "   Host: $DB_HOST"
    echo "   Port: $DB_PORT"
    echo "   User: $DB_USER"
    echo "   Password: $DB_PASSWORD"
    echo ""
    echo "🔑 Admin Credentials:"
    echo "   Username: admin"
    echo "   Password: memorial2025"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Update your .env file with the database credentials"
    echo "   2. Start the Python backend: cd backend && python run.py"
    echo "   3. Start the frontend: npm run dev"
    echo ""
else
    echo "❌ Database setup failed. Please check your MySQL configuration."
    exit 1
fi
