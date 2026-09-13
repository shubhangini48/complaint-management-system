# 📋 Complaint Management System

A full-stack web-based Complaint Management System designed to provide a centralized platform for submitting, tracking, assigning, and resolving complaints.

The system uses role-based access control for **Users, Staff, and Administrators**, helping organizations manage complaints efficiently and transparently.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#️-system-architecture)
- [Project Structure](#-project-structure)
- [Complaint Workflow](#-complaint-workflow)
- [Database Design](#️-database-design)
- [Authentication & Security](#-authentication--security)
- [API Endpoints](#-api-endpoints)
- [Installation & Setup](#️-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Documentation](#-documentation)
- [Project Information](#-project-information)
- [Developer](#-developer)

---

## 📖 Overview

The Complaint Management System is a full-stack web application that digitizes the complaint handling process.

Users can submit complaints and track their status, while staff members can manage assigned complaints and administrators can monitor and manage the complete complaint resolution workflow.

The system aims to reduce manual complaint handling, improve transparency, and maintain complaint records in a structured PostgreSQL database.

---

## 🚀 Key Features

### 👤 User Features

- User registration and login
- Secure authentication
- Submit new complaints
- Select complaint categories
- View submitted complaints
- Track complaint status
- View complaint details
- Add comments
- Monitor complaint resolution

### 🧑‍💼 Staff Features

- Staff authentication
- View assigned complaints
- View complaint details
- Update complaint status
- Add comments
- Manage complaints assigned by administrators

### 👨‍💻 Admin Features

- Admin authentication
- View all complaints
- Assign complaints to staff
- Manage users and staff
- Update complaint status
- Monitor complaint statistics
- Manage complaint categories
- Track overall complaint resolution

---

## 👥 User Roles

| Role | Responsibilities |
|------|------------------|
| 👤 User | Submit complaints, track complaints and add comments |
| 🧑‍💼 Staff | Handle assigned complaints and update their status |
| 👨‍💻 Admin | Manage users, complaints, assignments and system activities |

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt.js

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- pgAdmin

---

## 🏗️ System Architecture

```text
                 ┌───────────────────────┐
                 │        Users          │
                 │ User / Staff / Admin  │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │      React.js         │
                 │       Frontend        │
                 └───────────┬───────────┘
                             │
                       REST APIs
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Node.js + Express.js  │
                 │       Backend         │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │      PostgreSQL       │
                 │       Database        │
                 └───────────────────────┘
```

---

## 📂 Project Structure

```text
complaint-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── db/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   ├── SRS.md
│   └── architecture.md
│
├── .gitignore
└── README.md
```

---

## 🔄 Complaint Workflow

```text
User Registers / Logs In
          ↓
Submit Complaint
          ↓
Complaint Stored in Database
          ↓
Admin Reviews Complaint
          ↓
Complaint Assigned to Staff
          ↓
Staff Handles Complaint
          ↓
Status Updated
          ↓
Complaint Resolved
          ↓
User Tracks Resolution
```

---

## 📊 Complaint Status

The complaint can move through different stages:

```text
Pending
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
```

---

## 🗄️ Database Design

The application uses **PostgreSQL** for storing users, complaints, categories, comments, and assignment information.

### Main Entities

```text
Users
  │
  ├───────────────┐
  │               │
  ▼               ▼
Complaints     Comments
  │
  ├──────────────► Categories
  │
  └──────────────► Staff Assignment
```

### Main Database Components

| Entity | Purpose |
|--------|---------|
| Users | Stores user, staff and admin information |
| Complaints | Stores submitted complaints |
| Categories | Stores complaint categories |
| Comments | Stores complaint-related communication |
| Assignments | Links complaints with responsible staff |

---

## 🔐 Authentication & Security

The application implements basic security mechanisms including:

- JWT-based authentication
- Password hashing using bcrypt.js
- Role-based authorization
- Protected API routes
- Environment variables for sensitive configuration
- Authentication middleware
- Server-side validation

---

## 🔗 API Endpoints

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Complaints

```text
GET    /api/complaints
POST   /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id/status
```

### Comments

```text
POST   /api/complaints/:id/comments
```

> Note: The API documentation should be updated whenever new endpoints are added to the application.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shubhangini48/complaint-management-system.git
```

```bash
cd complaint-management-system
```

---

### 2. PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create a database:

```text
complaint_management
```

Execute the SQL files:

```text
database/schema.sql
database/seed.sql
```

You can execute them using **pgAdmin** or the PostgreSQL command line.

---

### 3. Backend Setup

Open a terminal inside the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

---

## 🔑 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/complaint_management
JWT_SECRET=your_secret_key
```

> Never commit your `.env` file to GitHub.

---

## ▶️ Running the Application

### Start Backend

Inside the `backend` folder:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

### Start Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 📸 Screenshots

Screenshots will be added here after completing and testing the application.

### Login Page

```text
<img width="946" height="977" alt="Screenshot 2026-09-13 142023" src="https://github.com/user-attachments/assets/89215648-883d-4426-b11e-061e6cfb88b2" />


```

### User Dashboard

```text
<img width="951" height="965" alt="Screenshot 2026-09-13 143405" src="https://github.com/user-attachments/assets/aa1ed211-d884-468f-8bc6-da5028083f93" />





```

### Submit Complaint

```text
<img width="1903" height="961" alt="Screenshot 2026-09-13 143816" src="https://github.com/user-attachments/assets/0eae723d-bb1f-49ad-899d-c928bb81bb31" />




```

### Complaint Details

```text
<img width="1901" height="951" alt="Screenshot 2026-09-13 143536" src="https://github.com/user-attachments/assets/15076aec-1959-45de-b8a3-e95206f5d8b0" />

```

### Staff Dashboard

```text
Add screenshot here
```

### Admin Dashboard

```text
Add screenshot here
```

---

## 🧪 Testing

The application can be tested using:

- Manual frontend testing
- API testing using Postman
- Authentication testing
- Role-based access testing
- Database validation
- Complaint workflow testing

### Test Cases

| Test Case | Expected Result |
|-----------|-----------------|
| User registration | Account created successfully |
| User login | User authenticated successfully |
| Submit complaint | Complaint stored in database |
| View complaints | User sees their complaints |
| Admin assignment | Complaint assigned to staff |
| Status update | Complaint status updated |
| Unauthorized access | Access denied |

---

## 🔮 Future Enhancements

The following features can be added in future versions:

- 📎 Complaint attachment support
- 🔔 Email notifications
- 📱 Improved mobile responsiveness
- 📊 Advanced analytics dashboard
- 🔍 Advanced search and filtering
- ⭐ Complaint feedback and rating
- 📝 Complete audit history
- 🔔 Real-time notifications
- 🐳 Docker support
- ☁️ Cloud deployment
- 🧪 Automated unit and integration testing
- 📈 Advanced reporting

---

## 🎓 Learning Outcomes

Through this project, the following concepts were practiced:

- Full-stack web development
- React.js development
- REST API development
- Node.js and Express.js
- PostgreSQL database management
- JWT authentication
- Role-based authorization
- CRUD operations
- Git and GitHub
- API testing
- MVC-style backend organization
- Software project documentation

---

## 📚 Documentation

Additional documentation is available in the `docs/` directory.

### Available Documentation

- Software Requirements Specification (SRS)
- System Architecture
- Database Design
- API Documentation

---

## 📌 Project Information

**Project Name:** Complaint Management System

**Project Type:** Full-Stack Web Application

**Domain:** Web Development / Complaint Management

**Frontend:** React.js

**Backend:** Node.js + Express.js

**Database:** PostgreSQL

**Authentication:** JWT

**Development Tools:** Git, GitHub, VS Code, Postman

---

## 👩‍💻 Developer

### Shubhangini Dhangar

B.Tech Computer Science & Engineering  
Galgotias University

GitHub:  
https://github.com/shubhangini48

LinkedIn:  
Add your LinkedIn profile link here

---

## ⭐ Project Status

🚧 **Currently under development**

This project is being developed as a practical full-stack application to strengthen skills in **React.js, Node.js, Express.js, PostgreSQL, REST APIs, authentication, database management, and software development practices.**

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐.

---

**Made with ❤️ by Shubhangini Dhangar**
