# Team Task Manager

A full-stack role-based team task manager built with React, Vite, Tailwind CSS, Express, MongoDB, JWT, and bcrypt. Admins can create projects, manage project members, create and assign tasks, and track progress. Members can view assigned work and update task status.

## Features

- JWT signup/login/logout flow
- bcrypt password hashing
- Protected React routes
- Role-based access control for admin and member users
- Project create/list/delete flows
- Task create/list/update/delete flows
- Member-only assigned task visibility
- Dashboard metrics for admins and members
- Task search, status filtering, priority filtering, and priority levels
- Responsive Tailwind sidebar layout
- Dark mode toggle
- Express validation and centralized error handling
- Railway-ready environment configuration

## Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, express-validator

Deployment: Railway, MongoDB Atlas

## Project Structure

```text
backend/
  controllers/
  models/
  routes/
  middleware/
  config/
  scripts/
  server.js
frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
```

## Installation

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
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000` by default.

## Environment Variables

Backend `.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Sample Test Users

After configuring MongoDB, run:

```bash
cd backend
npm run seed
```

Created users:

- Admin: `admin@example.com` / `password123`
- Member: `member@example.com` / `password123`

You can also create accounts from the Signup page.

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users`
- `GET /api/users/dashboard`
- `GET /api/users/:id`

### Projects

- `POST /api/projects` admin only
- `GET /api/projects` admin sees all, members see assigned projects
- `PUT /api/projects/:id` admin only
- `DELETE /api/projects/:id` admin only

### Tasks

- `POST /api/tasks` admin only
- `GET /api/tasks` admin sees all, members see assigned tasks
- `PUT /api/tasks/:id` admin can update all fields, members can update assigned task status
- `DELETE /api/tasks/:id` admin only

Task query filters:

- `status=Pending|In Progress|Completed|Overdue`
- `priority=Low|Medium|High`
- `search=keyword`
- `projectId=<mongo-id>`

## Railway Deployment

### Backend Service

1. Create a Railway project.
2. Add a new service from this repository and set the root directory to `backend`.
3. Add environment variables:

```env
NODE_ENV=production
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=<your-frontend-railway-url>
```

4. Deploy. Railway will run `npm start` from `backend/railway.toml`.

### Frontend Service

1. Add another Railway service from the same repository and set the root directory to `frontend`.
2. Add environment variable:

```env
VITE_API_URL=<your-backend-railway-url>/api
```

3. Deploy. Railway will build the Vite app and serve the production preview using the Railway `PORT`.

## Production Notes

- Use a strong `JWT_SECRET` with at least 32 random characters.
- Restrict MongoDB Atlas network access to Railway egress where possible.
- Keep `CLIENT_URL` aligned with deployed frontend domains for CORS.
- Consider adding refresh tokens and audit logs for higher-security teams.

## Screenshots

Add screenshots after deployment:

- `screenshots/login.png`
- `screenshots/admin-dashboard.png`
- `screenshots/task-list.png`
- `screenshots/project-list.png`
How to Run Project:

1. Clone repository:
   git clone https://github.com/akshayattri01/task-manager-backend

2. Install dependencies:
   npm install

3. Start server:
   npm start

4. Open API:
   http://tramway.proxy.rlwy.net:51428/api/health