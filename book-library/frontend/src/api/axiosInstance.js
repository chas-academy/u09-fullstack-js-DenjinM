// src/api/axiosInstance.js

import axios from 'axios';

// Skapa en instans av axios med bas-URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Byt ut mot din backend-URL vid behov
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lägg till en interceptor för att inkludera tokenet i varje förfrågan
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lägg till en interceptor för svarsfel
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token är ogiltig eller har löpt ut
      // Logga ut användaren eller omdirigera till inloggningssidan
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/LoginPage';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
