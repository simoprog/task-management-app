# Task Manager - Full-Stack Application

A modern, responsive task management application built with Spring Boot and React. This project demonstrates professional full-stack development practices with clean architecture, type safety, and modern UI/UX design.

## 🎯 Project Overview

**Task Manager** is a comprehensive CRUD application that allows users to create, manage, and track tasks with priorities, due dates, and status updates. Built with enterprise-grade technologies and modern development practices.

### 🌟 Key Features

- ✅ **Complete CRUD Operations** - Create, read, update, and delete tasks
- 📱 **Responsive Design** - Mobile-first UI that works on all devices
- 🎨 **Modern Interface** - Clean, intuitive design with Tailwind CSS
- ⚡ **Real-time Updates** - Instant UI feedback with optimistic updates
- 🚨 **Due Date Management** - Overdue and due-soon indicators
- 🎯 **Priority System** - Visual priority levels with color coding
- 🔄 **Status Workflow** - Todo → In Progress → Completed workflow

## 🏗️ Architecture

### Backend (Spring Boot)

- **RESTful API** with proper HTTP methods and status codes
- **Clean Architecture** - Controller → Service → Repository pattern
- **Data Validation** - Bean validation with custom error handling
- **Exception Management** - Global exception handler with meaningful responses
- **Database Integration** - MySQL with Docker containerization
- **Professional Logging** - Structured logging for debugging and monitoring

### Frontend (React + TypeScript)

- **Modern React** with hooks and functional components
- **TypeScript** for type safety and better developer experience
- **Responsive Design** with Tailwind CSS
- **State Management** using TanStack Query for server state
- **Client-side Routing** with React Router
- **Component Architecture** with reusable UI components

## 🛠️ Technology Stack

### Backend

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| **Spring Boot 3.2** | REST API framework        |
| **Java 17**         | Programming language      |
| **MySQL 8.0**       | Production database       |
| **Docker**          | Database containerization |
| **Maven**           | Dependency management     |
| **Lombok**          | Code generation           |
| **Bean Validation** | Input validation          |

### Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **React 18**        | UI framework            |
| **TypeScript**      | Type safety             |
| **Vite**            | Build tool              |
| **Tailwind CSS**    | Styling framework       |
| **TanStack Query**  | Server state management |
| **React Router**    | Client-side routing     |
| **React Hot Toast** | Notifications           |
| **Lucide React**    | Icon library            |

## 🚀 Getting Started

### Prerequisites

- **Java 17+**
- **Node.js 18+**
- **Docker Desktop**
- **Git**

### Quick Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Start the database**

   ```bash
   docker run --name task-mysql \
     -e MYSQL_ROOT_PASSWORD=password123 \
     -e MYSQL_DATABASE=task_management_db \
     -p 3306:3306 \
     -d mysql:8.0
   ```

3. **Run the backend**

   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

5. **Start the frontend**

   ```bash
   npm run dev
   ```

6. **Access the application**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## 📁 Project Structure

```
task-management-app/
├── backend/                          # Spring Boot API
│   ├── src/main/java/com/taskapp/
│   │   ├── controller/              # REST controllers
│   │   ├── service/                 # Business logic
│   │   ├── repository/              # Data access
│   │   ├── entity/                  # JPA entities
│   │   ├── dto/                     # Data transfer objects
│   │   ├── exception/               # Exception handling
│   │   └── config/                  # Configuration
│   ├── src/main/resources/
│   │   └── application.yml          # App configuration
│   └── pom.xml                      # Maven dependencies
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── ui/                  # Basic UI components
│   │   │   ├── layout/              # Layout components
│   │   │   └── task/                # Task-specific components
│   │   ├── pages/                   # Page components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API services
│   │   ├── types/                   # TypeScript types
│   │   └── utils/                   # Utility functions
│   ├── package.json                 # NPM dependencies
│   └── tailwind.config.js           # Tailwind configuration
└── README.md                        # Project documentation
```

## 🔌 API Endpoints

### Task Management

| Method   | Endpoint             | Description     |
| -------- | -------------------- | --------------- |
| `GET`    | `/api/v1/tasks`      | Get all tasks   |
| `GET`    | `/api/v1/tasks/{id}` | Get task by ID  |
| `POST`   | `/api/v1/tasks`      | Create new task |
| `PUT`    | `/api/v1/tasks/{id}` | Update task     |
| `DELETE` | `/api/v1/tasks/{id}` | Delete task     |

### Task Operations

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| `PUT`  | `/api/v1/tasks/{id}/complete` | Mark as completed   |
| `PUT`  | `/api/v1/tasks/{id}/start`    | Mark as in progress |
| `PUT`  | `/api/v1/tasks/{id}/status`   | Update status       |
| `PUT`  | `/api/v1/tasks/{id}/priority` | Update priority     |

## 🎨 Features Showcase

### Task Management

- **Smart Forms** - Intuitive create/edit forms with validation
- **Status Workflow** - Visual status transitions with color coding
- **Priority Levels** - High, Medium, Low priority with visual indicators
- **Due Date Tracking** - Automatic overdue and due-soon detection

### Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Touch Friendly** - Proper touch targets and gestures
- **Adaptive Layout** - Seamless experience across all screen sizes
- **Progressive Enhancement** - Works well on any device

## 🧪 Testing the Application

### Backend Testing

```bash
# Health check
curl http://localhost:8080/api/v1/tasks/health

# Create a task
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Task",
    "description": "This is a test task",
    "priority": "HIGH",
    "dueDate": "2024-12-31"
  }'

# Get all tasks
curl http://localhost:8080/api/v1/tasks
```

### Frontend Testing

1. Navigate to http://localhost:5173
2. Create a new task using the "New Task" button
3. Edit tasks by clicking the edit button
4. Mark tasks as complete using the check button
5. Test responsive design by resizing the browser

## 🔧 Development

### Backend Development

```bash
cd backend
mvn spring-boot:run                 # Run in development mode
mvn test                           # Run tests
mvn clean package                  # Build JAR file
```

### Frontend Development

```bash
cd frontend
npm run dev                        # Development server
npm run build                      # Production build
npm run preview                    # Preview build
npm run lint                       # Lint code
```

## 🚀 Deployment

### Backend Deployment

```bash
# Build the application
mvn clean package

# Run the JAR file
java -jar target/task-management-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting platform
```

### Docker Deployment (Optional)

```bash
# Backend Dockerfile example
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend Dockerfile example
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

---

**Built with ❤️ using Spring Boot and React**
