// src/App.js

import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage'; 
import BookPage from './pages/BookPage/BookPage';
import BookDetail from './pages/BookPage/BookDetail'; 
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Faq from './pages/Faq/Faq';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';

const AppContent = () => {
  const { user, isAdmin } = useContext(AuthContext); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookPage" element={<BookPage />} />
        {/* Route för att visa detaljerad bokinformation */}
        <Route path="/book/:id" element={<BookDetail />} />

        {/* Omdirigera om användaren eller admin är inloggad och försöker nå LoginPage */}
        <Route 
          path="/LoginPage" 
          element={user || isAdmin ? <Navigate to={isAdmin ? "/admin" : "/profile"} /> : <LoginPage />} 
        />
        
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Contact" element={<Contact />} />
        
        {/* Skyddade rutter för Profile och Admin */}
        <Route 
          path="/profile" 
          element={
            user ? <Profile /> : <Navigate to="/LoginPage" />
          } 
        />
        <Route 
          path="/admin" 
          element={
            isAdmin ? <Admin /> : <Navigate to="/LoginPage" />
          } 
        />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
