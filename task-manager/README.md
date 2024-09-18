# Task Manager Application

## Overview

This Task Manager is a full-stack web application built with React for the frontend and Node.js with Express for the backend. It allows users to register, log in, and manage their tasks in a user-friendly interface with dark mode support.

## Features

- User Authentication (Register/Login)
- Task Management (Create, Read, Update, Delete)
- Dark Mode Toggle
- Responsive Design

## Tech Stack

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Context API for state management (theme)
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Project Structure

task-manager/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Registration.js
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   ├── PrivateRoute.js
│   │   ├── ThemeToggle.js
│   ├── utils/
│   │   └── axios.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── ThemeContext.js
├── public/
│   └── index.html
├── README.md
├── task-manager-be/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── README.md



## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd task-manager
   npm install
   cd ../task-manager-be
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `task-manager-be` directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   cd task-manager-be
   npm start
   ```

5. Start the frontend development server:
   ```
   cd task-manager
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Register a new account or log in with existing credentials.
2. Use the interface to add, view, update, or delete tasks.
3. Toggle between light and dark modes using the theme switch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.