

// import axios from 'axios';

// // Skapa en instans av axios med bas-URL
// const axiosInstance = axios.create({
//   baseURL: 'https://u09-fullstack-js-denjinm.onrender.com/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// // Lägg till interceptors...
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/LoginPage';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

//Vi testar//







import axios from 'axios';

// Skapa en instans av axios med bas-URL
const axiosInstance = axios.create({
  baseURL: 'https://u09-fullstack-js-denjinm.onrender.com/api', // Backend-URL
  headers: {
    'Content-Type': 'application/json', // Standard Content-Type
  },
});

// Lägg till request-interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Hämta token från localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Lägg till Bearer-token
    }
    return config; // Returnera config för att fortsätta med begäran
  },
  (error) => {
    // Hantera fel i request-interceptor
    console.error('Request Error:', error);
    return Promise.reject(error); // Skicka tillbaka felet
  }
);

// Lägg till response-interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Returnera svar direkt om det inte är ett fel
  (error) => {
    if (error.response) {
      // Om servern returnerar 401 (Unauthorized)
      if (error.response.status === 401) {
        console.warn('Unauthorized - loggar ut användaren...');
        localStorage.removeItem('token'); // Ta bort token
        localStorage.removeItem('user'); // Ta bort användardata
        window.location.href = '/LoginPage'; // Omdirigera till inloggningssidan
      }
      // Logga serverns felmeddelande
      console.error('Server Error:', error.response.data?.message || error.message);
    } else {
      // Om det är ett nätverksfel eller klientfel
      console.error('Nätverksfel eller okänt fel:', error.message);
    }
    return Promise.reject(error); // Skicka tillbaka felet till anroparen
  }
);

export default axiosInstance;
