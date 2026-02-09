# Praxis - Professional Task Management

Praxis is a sophisticated, minimalist task management application designed for focus and clarity. Built with a clean professional UI that puts your tasks front and center.

## Features
- **Professional UI**: Clean, minimalist light theme with superior readability
- **Smart Organization**: Categorize tasks (Personal, Work, Shopping, Health, Learning)
- **Focus Mode**: Distraction-free interface
- **Real-time Stats**: Track your progress with clean visual statistics
- **Data Persistence**: Robust storage with MongoDB

## Tech Stack
- **Frontend**: React.js, Vite, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Setup Instructions

### 1. Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### 2. Configure MongoDB
Ensure you have a MongoDB connection string in `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

### 3. Run Application
**Backend Server:**
```bash
cd server
npm run dev
```

**Frontend Client:**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` to experience Praxis.
