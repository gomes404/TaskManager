import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // Add a fallback URL
  timeout: 5000, // Increase timeout to 5 seconds
});

export default instance;
