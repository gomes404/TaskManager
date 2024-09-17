import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
import TaskList from './components/TaskList';
import PrivateRoute from './components/PrivateRoute'; // Ensure this is correctly imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;