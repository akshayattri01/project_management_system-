# 🚀 Team Task Manager (MERN Stack)

A full-stack **Team Task Management System** built using the **MERN Stack** that helps teams manage projects, assign tasks, assign members, and track project progress efficiently.

---

## 🌐 Live Project

### 🔗 Frontend (Vercel)
https://project-management-system-chi-ten.vercel.app

### 🔗 Backend API (Render)
https://project-management-system-apoy.onrender.com

### 🔗 API Health Check
https://project-management-system-apoy.onrender.com/api/health

---

## 📌 Features

✅ Secure User Authentication (Signup/Login)  
✅ JWT Authentication & Authorization  
✅ Role-Based Access (**Admin / Member**)  
✅ Create and Manage Projects  
✅ Assign Tasks to Team Members  
✅ Dashboard for Project Overview  
✅ Task Tracking & Progress Management  
✅ Protected Routes  
✅ MongoDB Database Integration  
✅ Responsive UI Design  
✅ Full Stack Deployment

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Helmet
- Morgan
- CORS
- dotenv

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas

---

## 📂 Folder Structure

```bash
project-management-system/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

### Backend `.env`

```env
NODE_ENV=production
PORT=5000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://project-management-system-chi-ten.vercel.app
```

### Frontend `.env`

```env
VITE_API_URL=https://project-management-system-apoy.onrender.com
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akshayattri01/project_management_system.git
cd project_management_system
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm start
```

---

## 📸 Screenshots

### Login Page
(Add Screenshot Here)

### Dashboard
(Add Screenshot Here)

### Task Management
(Add Screenshot Here)

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get All Projects |
| POST | `/api/projects` | Create Project |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get All Tasks |
| POST | `/api/tasks` | Create Task |

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
npm run build
```

### Backend Deployment (Render)

```bash
npm start
```

---

## 👨‍💻 Author

### Ashu Attri

📧 Email: aashuattri01@gmail.com  
💻 GitHub: https://github.com/akshayattri01

---

## ⭐ Show Your Support

If you like this project, please consider giving it a **Star ⭐** on GitHub.

---

## 📜 License

This project is licensed under the **MIT License**.