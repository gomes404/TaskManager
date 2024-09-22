import axios from './axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get('/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log('Fetched tasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post('/api/tasks', taskData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    console.log('Updating task:', taskId, 'with updates:', updates);
    console.log('PUT request URL:', `/api/tasks/${taskId}`);
    const response = await axios.put(`/api/tasks/${taskId}`, updates, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Update task response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.response ? error.response.data : error.message);
    console.error('Full error object:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`, getAuthHeader());
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
