# Sahihi Interior Builders - Access Control System

## Project Overview
This project implements a Role-Based Access Control (RBAC) system for Sahihi Interior Builders, featuring different user roles (Admin, Project Manager, Engineer) with varying levels of access and permissions.

## Technologies Used
### Backend
- NestJS
- TypeORM
- MySQL
- JWT for authentication
- bcrypt for password hashing

### Frontend
- Vue.js
- Axios for API communication
- Vue Router
- Local Storage for token management

## Features
- User Authentication (Login/Logout)
- Role-Based Access Control (RBAC)
- KYC Information Management
- Document Upload & Management
- User Management (CRUD operations)
- Protected Routes based on User Roles

## Project Structure

```
sahihi_project/
├── sahihi_backend/           # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
|   |   ├── projects/       # Projects module
|   |   ├── crm/            #CRM Module
|   |   ├── config/         # Configurations
│   │   ├── users/          # Users module
│   │   ├── project/        # Database entities
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   └── package.json
│
└── sahihi_frontend/         # Vue.js frontend
    ├── src/
    |   ├── assets/         # images
    │   ├── views/          # Vue components
    |   ├── components      # Components
    │   ├── router/         # Route definitions
    |   ├── utils/          # server configuration
    │   ├── store/          # State management
    │   └── App.vue         # Root component
    └── package.json
```

## Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

## Installation

### Backend Setup
1. Navigate to the backend directory:
```bash
cd sahihi_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `src/config/` file directory with the following content:
```env
constants.ts = JwtConstanst secret= ....
database.constants.ts with database configurations
```

4. Create the database:
```sql
CREATE DATABASE sahihi_db;
```

5. Start the backend server:
```bash
npm run start:dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd sahihi_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run serve
```

## API Endpoints

### Authentication
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout

### Users
- GET `/users` - Get all users (Admin, Project Manager)
- POST `/users` - Create new user (Admin)
- GET `/users/:id` - Get specific user (Admin, Project Manager)
- PUT `/users/:id` - Update user (Admin)
- DELETE `/users/:id` - Delete user (Admin)

## Security Implementation
- JWT-based authentication
- Password hashing using bcrypt
- Role-based route protection
- CORS configuration
- Protected API endpoints

## Common Issues and Solutions
Having issues implementing roles guard

### Database Connection Issues
- Ensure MySQL service is running
- Check if database exists and is accessible

### CORS Issues
- Verify the frontend URL is allowed in backend CORS configuration
- Check if the API URL in frontend matches the backend URL

### Authentication Issues
- Ensure JWT secret is properly set in `config/`
- Check if token is being properly stored in localStorage
- Verify token expiration settings
