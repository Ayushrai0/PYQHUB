# EduArchive

> DIT University Question Paper Portal

A full-stack web application for DIT University students to search, preview, and download past exam question papers. Includes a separate admin panel for managing papers.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, Vite, Tailwind CSS
- **Auth**: JWT (separate tokens for Student and Admin)
- **Storage**: Cloudinary (PDF URLs stored in MongoDB)

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Seed the Database
```bash
cd backend
npm run seed
```
This creates:
- **Admin account**: username: `admin`, password: `admin123`
- 3 sample papers with placeholder PDF URLs

### 4. Start Backend
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000`

### 5. Start Frontend
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

## Environment Variables

### Root `.env` (used by backend)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduarchive
JWT_SECRET=eduarchive_dit_secret_2024
```

### `frontend/.env`
```
VITE_API_URL=http://localhost:5000
```

## Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`
- **Login URL**: `http://localhost:5173/admin`

## How to Add a Paper

1. Upload your PDF to [Cloudinary](https://cloudinary.com)
2. Copy the Cloudinary URL
3. Go to `http://localhost:5173/admin`
4. Login with admin credentials
5. Fill in: Subject, Exam Type, Year, PDF URL
6. Click "Add Paper"

## Features

- 🔐 Student registration & login with JWT
- 🔍 Search subjects instantly
- 📄 Filter papers by exam type and year
- 👁️ Preview PDFs in-browser
- ⬇️ Download papers directly
- 🌙 Dark/Light mode with persistence
- 📱 Fully responsive design
- 🛡️ Separate admin panel with CRUD
