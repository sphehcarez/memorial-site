# Dr. Edgar Chagwa Lungu Memorial Website

A memorial website built with Next.js frontend and FastAPI backend to honor the legacy of Dr. Edgar Chagwa Lungu.

## Project Structure

```
memorial-site/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                   # Utility libraries and API client
├── backend/               # FastAPI backend
├── public/                # Static assets
└── styles/               # Global styles
```

## Prerequisites

- Node.js 18+ and npm/pnpm
- Python 3.8+
- MySQL 8.0+

## Backend Setup

### 1. Database Configuration

Install and start MySQL server, then create the database:

```sql
CREATE DATABASE memorialDB;
CREATE USER 'memorial_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON memorialDB.* TO 'memorial_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Variables

Create `backend/.env` file:

```bash
# Database Configuration
MYSQL_USER=memorial_user
MYSQL_PASSWORD=your_password
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=memorialDB

# JWT Configuration
JWT_SECRET=memorial-website-secret-key-2025

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

### 3. Python Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Required packages (see `backend/requirements.txt`):
```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
aiomysql==0.2.0
pydantic==2.5.0
python-jose[cryptography]==3.3.0
bcrypt==4.1.2
python-multipart==0.0.6
python-dotenv==1.0.0
reportlab==4.0.7
```

### 4. Database Initialization

Initialize the database schema:

```bash
cd backend
python init_db.py
```

### 5. Create Admin User

Create an admin user for the system:

```bash
cd backend
python create_admin_user.py
```

This will create an admin user with:
- Username: `admin`
- Password: `memorial2025`

### 6. Start Backend Server

```bash
cd backend
python run.py
```

The API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## Frontend Setup

### 1. Environment Variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

The website will be available at `http://localhost:3000`

## Features

### Public Features
- **Memorial Home Page** - Overview and tribute sections
- **Biography** - Life story and achievements
- **Political Career** - Political journey and accomplishments
- **Obituary** - Official obituary with PDF download
- **Condolences** - Public condolence messages
- **Tribute Wall** - User-submitted tributes
- **Gallery** - Photo and video memories
- **Burial Details** - Service information
- **Accreditation Portal** - Service access registration

### Admin Features
- **Dashboard** - Overview statistics and recent activity
- **Content Management** - Approve/reject condolences, tributes, accreditations
- **Gallery Management** - Upload and manage media content
- **User Management** - Admin user administration
- **Reports** - Export data to Excel/PDF

## API Endpoints

### Authentication
- `POST /api/admin/auth` - Admin login

### Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

### Condolences
- `GET /api/condolences` - Get approved condolences (public)
- `POST /api/condolences` - Submit condolence
- `GET /api/admin/condolences` - List all condolences (admin)
- `PUT /api/admin/condolences/{id}/status` - Update condolence status (admin)

### Tributes
- `GET /api/admin/tributes` - List all tributes (admin)
- `PUT /api/admin/tributes/{id}/status` - Update tribute status (admin)

### Accreditations
- `GET /api/admin/accreditations` - List all accreditations (admin)
- `PUT /api/admin/accreditations/{id}/status` - Update accreditation status (admin)

### PDF Generation
- `POST /api/gallery/download-pdf` - Generate gallery PDF
- `POST /api/obituary/download-pdf` - Generate obituary PDF

## Database Schema

The system uses the following main tables:
- `admin_users` - Admin user accounts
- `condolences` - Condolence messages
- `tributes` - Tribute submissions
- `accreditations` - Service access registrations
- `gallery_items` - Media gallery content
- `admin_actions` - Admin activity logs

## Development

### Code Structure

**Frontend (`/app`, `/components`, `/lib`)**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/ui component library

**Backend (`/backend`)**
- FastAPI with async/await
- SQLAlchemy for database ORM
- Pydantic for data validation
- JWT authentication for admin access
- bcrypt for password hashing

### Key Files

**Frontend:**
- `lib/api.ts` - API client for backend communication
- `components/navigation.tsx` - Main site navigation
- `app/admin/*/page.tsx` - Admin dashboard pages

**Backend:**
- `main.py` - FastAPI application and routes
- `database.py` - Database connection and queries
- `models.py` - SQLAlchemy database models
- `schemas.py` - Pydantic request/response schemas

## Deployment

### Production Environment Variables

**Frontend:**
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

**Backend:**
```bash
MYSQL_USER=production_user
MYSQL_PASSWORD=secure_production_password
MYSQL_HOST=production-db-host
MYSQL_DB=memorial_production
JWT_SECRET=secure-production-jwt-secret
```

### Docker Deployment (Optional)

Create `Dockerfile` for backend:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Security Considerations

1. **Change default credentials** - Update admin password and JWT secret
2. **Database security** - Use strong passwords and restrict database access
3. **CORS configuration** - Update allowed origins for production
4. **HTTPS** - Use SSL certificates in production
5. **Environment variables** - Never commit `.env` files to version control

## Troubleshooting

### Common Issues

**Backend won't start:**
- Check MySQL connection settings
- Verify database exists and user has permissions
- Ensure all Python dependencies are installed

**Frontend API errors:**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend server is running on correct port
- Review CORS settings in backend

**Database connection errors:**
- Verify MySQL server is running
- Check database credentials
- Ensure database and tables exist

### Logs

**Backend logs:** Check console output when running `python run.py`
**Frontend logs:** Check browser console and terminal output

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review API documentation at `http://localhost:8000/docs`
3. Check database connections and environment variables
4. Verify all dependencies are properly installed

## License

This project is proprietary and confidential.
