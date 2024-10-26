// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importera serviceWorkerRegistration
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrera service workern
serviceWorkerRegistration.register();
