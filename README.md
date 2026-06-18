# TaskFlow ✅

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

TaskFlow is a premium, modern, production-ready task management application designed to help users organize their daily workflow seamlessly. Built with a robust full-stack architecture, it features a beautiful, glassmorphic SaaS-style user interface, dark mode, real-time analytics, and secure OTP-based password resets.

## 🚀 Features

- **Modern SaaS UI**: A fully responsive, stunning interface featuring soft gradients, glassmorphism, hover animations, and circular progress analytics.
- **User Authentication**: Secure signup and login using JWT.
- **OTP Password Reset**: Forgot your password? Receive a 6-digit one-time password via email to securely reset it.
- **Task Management**: Create tasks, set due dates, mark them as complete, and manage your to-do list effortlessly.
- **Advanced Filtering**: Instantly search for tasks or filter them by status (All, Pending, Completed) or by specific dates using the interactive calendar.
- **Dashboard Analytics**: A unified progress banner that tracks your completion rate via animated SVG rings alongside total, pending, and completed metrics.
- **Dark Mode**: Fully supports an elegant dark mode that respects system preferences.
- **Mobile Optimized**: A dedicated bottom navigation bar for a native-app-like experience on mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS** (for utility-first, modern styling)
- **Framer Motion** (for buttery smooth page transitions and micro-animations)
- **React Router** (for client-side routing)
- **Axios** (for API communication)

### Backend
- **Node.js & Express** (REST API)
- **MongoDB & Mongoose** (Database)
- **Nodemailer** (For OTP email delivery)
- **JSON Web Tokens (JWT)** & **Bcrypt** (Authentication & Security)

## 📂 Project Structure (Monorepo)

This repository is organized as a monorepo containing both the frontend client and the backend API.

```
/
├── todo-frontend/       # React application (Vite)
│   ├── src/             # UI Components, Pages, and Context
│   └── public/          # Static assets like favicons
│
└── todo-backend/        # Node.js Express server
    ├── models/          # MongoDB schemas (User, Todo)
    ├── routes/          # API endpoints
    └── controllers/     # Business logic and OTP handling
```

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js installed
- A MongoDB cluster URL (or local MongoDB running)
- An email account (for sending OTP emails)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd todo-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `todo-backend` directory and add the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd todo-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## 🌍 Deployment

### Deploying the Backend (Render Web Service)
1. In Render, create a new Web Service from this GitHub repo.
2. Set the **Root Directory** to `todo-backend`.
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `node index.js`.
5. Add your `.env` variables in the environment settings.

### Deploying the Frontend (Render Static Site)
1. In Render, create a new Static Site from this same GitHub repo.
2. Set the **Root Directory** to `todo-frontend`.
3. Set the **Build Command** to `npm install && npm run build`.
4. Set the **Publish Directory** to `dist`.
5. Add an environment variable: `VITE_API_URL` set to your deployed backend URL (e.g., `https://your-backend.onrender.com/api`).
6. In the **Redirects/Rewrites** tab, add a rule to support React Router:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

---
*Built with ❤️ and designed to make you productive.*
