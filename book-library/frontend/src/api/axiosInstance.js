// src/api/axiosInstance.js

import axios from 'axios';

// Skapa en instans av axios med bas-URL från miljövariabel
const axiosInstance = axios.create({
  baseURL: 'https://u09-fullstack-js-denjinm.onrender.com/api', // Observera "/api" här
  headers: {
    'Content-Type': 'application/json',
  },
});


// Lägg till interceptors...
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/LoginPage';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
