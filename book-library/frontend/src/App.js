import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import BookPage from './pages/BookPage/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={<BookPage />} />
      </Routes>
    </Router>
  );
}


export default App;
