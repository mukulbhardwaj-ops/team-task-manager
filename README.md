Ethara TaskFlow - Team Task Manager

Live URL
https://team-task-manager-production-8ed4.up.railway.app

GitHub Repository
https://github.com/mukulbhardwaj-ops/team-task-manager

Features
Authentication (Signup/Login with JWT)
Role-based access control (Admin/Member)
Project management (Create, View, Delete)
Task management (Create, Assign, Update Status, Delete)
Dashboard with task statistics (Total, Completed, In Progress, Overdue)

Tech Stack

Frontend: React + Vite

Backend: Node.js + Express

Database: PostgreSQL

ORM: Prisma

Auth: JWT + bcrypt
Deployment: Railway
Demo Credentials

Admin:
Email: admin@test.com
Password: 123456

Member:
Email: member@test.com
Password: 123456
Notes for Testing

Login as Admin to create projects and tasks
When creating a task, enter User ID: 1 for Admin or User ID: 2 for Member
Login as Member to view tasks and update status only

API Routes
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/projects
POST   /api/projects
DELETE /api/projects/:id
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/dashboard

Developer
Name: Mukul Bhardwaj
Email: mukul.bhardwaj@ethara.ai
