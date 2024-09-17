import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

