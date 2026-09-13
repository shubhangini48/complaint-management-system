# ComplaintHub – Complaint Management System

A full-stack web application for submitting, tracking, and managing complaints through a centralized platform.

ComplaintHub provides secure user authentication, complaint submission, complaint tracking, comments, status management, search functionality, and an administrative dashboard with complaint statistics.

---

## 📌 Project Overview

ComplaintHub is designed to simplify the complaint management process by providing a centralized system where users can submit complaints and track their progress, while administrators can monitor complaints and manage their status.

The application follows a client-server architecture:

- **Frontend:** React.js with Vite
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Password Security:** bcryptjs
- **API Communication:** Axios
- **Version Control:** Git & GitHub

---

## ✨ Features

### 👤 User Features

- User registration
- Secure user login
- JWT-based authentication
- Personalized dashboard
- Submit new complaints
- Select complaint category
- Set complaint priority
- View submitted complaints
- Search complaints
- View complaint details
- Add comments to complaints
- Track complaint status
- Logout functionality

### 🛡️ Admin Features

- Secure admin login
- Administrative dashboard
- View complaint statistics
- View complaints
- Search complaints
- View complaint details
- Update complaint status
- Monitor complaint priorities
- View assigned and unassigned complaints

### 🔐 Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Role-based authorization
- Protected API routes
- PostgreSQL parameterized queries
- Environment variables for sensitive configuration
- Restricted administrative routes
- `.env` excluded from Git

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend UI |
| Vite | Frontend development and build tool |
| JavaScript | Application logic |
| CSS3 | Styling and responsive design |
| Node.js | Backend runtime |
| Express.js | REST API |
| PostgreSQL | Relational database |
| pg | PostgreSQL client |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Axios | API communication |
| Git | Version control |
| GitHub | Source code hosting |

---

## 🏗️ System Architecture

```text
                    ┌───────────────────────┐
                    │      User / Admin     │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    React Frontend     │
                    │       + Vite          │
                    └───────────┬───────────┘
                                │
                         REST API / Axios
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Node.js + Express   │
                    │       Backend         │
                    └───────────┬───────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
         Authentication     Complaints      Admin APIs
             / JWT         / Comments        / Stats
                │               │               │
                └───────────────┼───────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      PostgreSQL       │
                    │       Database        │
                    └───────────────────────┘

## 📂 Project Structure

complaint-management-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── complaintController.js
│   │   │   └── adminController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── complaintRoutes.js
│   │   │   └── adminRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md

## 🔄 Complaint Workflow

SUBMITTED
    ↓
UNDER_REVIEW
    ↓
ASSIGNED
    ↓
IN_PROGRESS
    ↓
RESOLVED
    ↓
CLOSED

### Typical Status Flow

The application dashboard currently represents complaint progress using statuses such as:

```text
SUBMITTED
    ↓
UNDER REVIEW
    ↓
ASSIGNED
    ↓
IN PROGRESS
    ↓
RESOLVED
    ↓
CLOSED
```

The exact transitions depend on the role and actions permitted by the application.

---

## 🗄️ Database Design

The application uses **PostgreSQL** for persistent storage.

The database contains data related to:

- Users
- Complaints
- Categories
- Comments
- Complaint assignments

### Main Entities

```text
        USERS
          │
          │ creates
          ▼
     COMPLAINTS
       │     │
       │     └──────────────┐
       │                    │
       ▼                    ▼
 CATEGORIES             COMMENTS
                          │
                          ▼
                         USERS
```

### Main Database Components

| Entity | Purpose |
|--------|---------|
| Users | Stores user, staff, and admin account information |
| Complaints | Stores submitted complaint information |
| Categories | Stores complaint categories |
| Comments | Stores complaint-related communication |
| Assignments | Connects complaints with responsible staff |

The database setup scripts are available in the `database/` directory.

---

## 🔐 Authentication & Security

The application implements the following security mechanisms:

- JWT-based authentication
- Password hashing using bcrypt.js
- Role-based authorization
- Protected API routes
- Authentication middleware
- Server-side input validation
- Environment variables for sensitive configuration
- CORS configuration

### Authentication Flow

```text
User
 │
 ├── Register / Login
 │
 ▼
Backend
 │
 ├── Validate credentials
 │
 ├── Hash / verify password
 │
 ▼
JWT Token
 │
 ▼
Frontend
 │
 └── Stores authentication token
```

Passwords are **not stored as plain text**. Passwords are hashed before being stored in PostgreSQL.

---

## 🔗 API Endpoints

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Complaints

```text
GET    /api/complaints
GET    /api/complaints/categories
POST   /api/complaints
GET    /api/complaints/:id
PATCH  /api/complaints/:id/status
PATCH  /api/complaints/:id/assign
POST   /api/complaints/:id/comments
```

### Admin

```text
GET    /api/admin/stats
GET    /api/admin/users
```

### Health Check

```text
GET    /api/health
```

> API documentation should be updated whenever new routes are added or existing routes change.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shubhangini48/complaint-management-system.git
cd complaint-management-system
```

If the repository name changes, replace the clone URL with the final GitHub repository URL.

---

### 2. PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create a PostgreSQL database named:

```text
complaint_management
```

Then execute:

```text
database/schema.sql
database/seed.sql
```

You can run these files using **pgAdmin Query Tool** or the PostgreSQL command line.

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

Create:

```text
backend/.env
```

using the provided:

```text
backend/.env.example
```

---

### 4. Frontend Setup

Open a **second terminal** and run:

```bash
cd frontend
npm install
```

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
CLIENT_URL=http://localhost:5173
```

### Important

Never commit the actual `.env` file to GitHub.

The repository should contain `.env.example`, not your real credentials.

Example `.env.example`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/complaint_management
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## ▶️ Running the Application

The backend and frontend should be run in **two separate terminals**.

### Terminal 1 – Backend

```bash
cd backend
npm run dev
```

The backend should run on:

```text
http://localhost:5000
```

You can verify the server using:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

### Terminal 2 – Frontend

```bash
cd frontend
npm run dev
```

The Vite development server will normally be available at:

```text
http://localhost:5173
```

Open that address in your browser.

---

## 📸 Screenshots

Add real screenshots from the working application to:

```text
docs/screenshots/
```

Recommended screenshots:

```text
docs/screenshots/
├── login.png
├── register.png
├── user-dashboard.png
├── new-complaint.png
├── complaint-details.png
├── comments.png
└── admin-dashboard.png
```

### Login

Add the login page screenshot here.

### Registration

Add the registration page screenshot here.

### User Dashboard

Add the user complaint dashboard screenshot here.

### New Complaint

Add the complaint submission page screenshot here.

### Complaint Details

Add the complaint details and comments screenshot here.

### Admin Dashboard

Add the administrator dashboard screenshot here.

> Replace this section with actual Markdown image links after adding the screenshots. Do not leave "Add screenshot here" placeholders in the final repository.

---

## 🧪 Testing Checklist

The following areas should be tested before considering the project release-ready:

| Test Case | Expected Result |
|-----------|-----------------|
| User registration | Account created successfully |
| Duplicate email | Registration rejected |
| User login | User authenticated successfully |
| Invalid login | Access rejected |
| Submit complaint | Complaint stored in PostgreSQL |
| View complaints | User sees permitted complaints |
| View complaint details | Correct complaint displayed |
| Add comment | Comment stored and displayed |
| Search complaints | Matching complaints displayed |
| Admin dashboard | Statistics displayed |
| Admin assignment | Complaint assigned to staff |
| Status update | Complaint status updated |
| Unauthorized access | Access denied |
| Logout | User session/token cleared |

### Before GitHub submission

Manually test:

- [ ] Registration
- [ ] Login
- [ ] Logout
- [ ] New complaint
- [ ] Complaint list
- [ ] Complaint details
- [ ] Comments
- [ ] Search
- [ ] Admin dashboard
- [ ] Admin users
- [ ] Complaint assignment
- [ ] Status updates
- [ ] Invalid login
- [ ] Duplicate registration
- [ ] Unauthorized role access

---

## 🔮 Future Enhancements

Possible future improvements include:

- 📎 Complaint attachment support
- 🔔 Email notifications
- 📱 Improved mobile responsiveness
- 📊 Advanced analytics
- 🔍 Advanced search and filtering
- ⭐ Complaint feedback and rating
- 📝 Complete complaint audit history
- 🔔 Real-time notifications
- 🐳 Docker support
- ☁️ Cloud deployment
- 🧪 Automated unit and integration testing
- 📈 Advanced reporting

---

## 🎓 Learning Outcomes

This project provided practical experience with:

- Full-stack web development
- React.js development
- REST API development
- Node.js and Express.js
- PostgreSQL database management
- JWT authentication
- Role-based authorization
- Password hashing with bcrypt.js
- CRUD operations
- Frontend-backend integration
- Git and GitHub
- API testing
- MVC-style backend organization
- Software project documentation

---

## 📚 Documentation

Additional project documentation is available in the `docs/` directory.

Recommended documentation:

- Software Requirements Specification (SRS)
- System Architecture
- Database Design
- API Documentation

---

## 📌 Project Information

| Item | Details |
|------|---------|
| **Project Name** | ComplaintHub – Complaint Management System |
| **Project Type** | Full-Stack Web Application |
| **Domain** | Web Development / Complaint Management |
| **Frontend** | React.js + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JWT + bcrypt.js |
| **API Style** | REST |
| **Development Tools** | Git, GitHub, VS Code, Postman, pgAdmin |

---

## 👩‍💻 Developer

### Shubhangini Dhangar

**B.Tech Computer Science & Engineering**  
**Galgotias University**

GitHub:  
https://github.com/shubhangini48

LinkedIn:  
_Add your LinkedIn profile URL here before publishing the final version._

---

## ⭐ Project Status

### ✅ Functional MVP

ComplaintHub currently provides a working full-stack complaint management workflow with:

- User authentication
- Role-based access control
- Complaint submission
- Complaint tracking
- Complaint details
- Comments
- Dashboard statistics
- PostgreSQL persistence
- Administrative complaint management

The project is being further polished for documentation, testing, GitHub presentation, and deployment readiness.

---

## 📄 License

This project is intended as an academic and portfolio project.

---

**Made with ❤️ by Shubhangini Dhangar**
