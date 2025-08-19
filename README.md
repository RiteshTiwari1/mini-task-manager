# Mini Task Manager

A full-stack task management application built with React, TypeScript, Node.js, Express, PostgreSQL, and Prisma.

## Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🎯 **Task Status** - Mark tasks as pending or completed
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔄 **Real-time Updates** - Instant task status changes
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🐳 **Docker Support** - Easy deployment with Docker Compose

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM and database management
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Input validation

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-service orchestration

## Project Structure

```
mini-task-manager/
├── backend/                    # Express.js API
│   ├── prisma/                # Database schema and migrations
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Authentication & validation
│   │   ├── routes/           # API endpoints
│   │   ├── types/            # TypeScript definitions
│   │   ├── utils/            # Helper functions
│   │   └── config/           # Database configuration
│   ├── Dockerfile
│   └── package.json
├── frontend/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── api/              # API client functions
│   │   ├── components/       # React components
│   │   ├── context/          # React contexts
│   │   ├── pages/            # Page components
│   │   └── types/            # TypeScript definitions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml         # Multi-service configuration
└── README.md
```

## Setup Instructions

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-task-manager
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Run database migrations**
   ```bash
   # In a new terminal
   docker exec -it mini-task-manager-backend npx prisma migrate dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: postgresql://postgres:postgres@localhost:5432/mini_task_manager

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your database credentials
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file if needed (default API URL should work)
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

1. **Sign Up** - Create a new account with email and password
2. **Log In** - Sign in to access your task dashboard
3. **Create Tasks** - Click "Add Task" to create new tasks
4. **Manage Tasks** - Mark tasks as complete/incomplete, edit, or delete
5. **Filter Tasks** - Use filters to view all, pending, or completed tasks

## Development

### Backend Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Database operations
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema changes
npm run db:studio     # Open Prisma Studio
```

### Frontend Commands
```bash
# Development
npm start

# Build
npm run build

# Test
npm test
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_task_manager?schema=public
JWT_SECRET=TaskManager2024!@#SecureJwtKey$%^RandomString789&*()MiniApp
PORT=5000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with Zod
- CORS configuration
- Security headers with Helmet
- SQL injection prevention with Prisma

## License

This project is created for assignment purposes.