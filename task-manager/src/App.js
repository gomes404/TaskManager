import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
import TaskList from './components/TaskList';
import PrivateRoute from './components/PrivateRoute';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './TaskManager.css';

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <ThemeToggle />
      <ToastContainer />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;