# Complaint Management System

Full-stack complaint management system using React, Node.js, Express and PostgreSQL.

## Features
- JWT authentication
- User, Staff and Admin roles
- Complaint creation and tracking
- Categories and priorities
- Staff assignment
- Status workflow
- Comments
- Search/filter
- Admin statistics dashboard
- Responsive React UI

## Setup

### Database
Create a PostgreSQL database named `complaint_management`, then run `database/schema.sql` and `database/seed.sql`.

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Demo accounts
The seed file contains demo users. Change their passwords before deployment.

## Stack
React + Vite, Node.js + Express, PostgreSQL, JWT, bcrypt
