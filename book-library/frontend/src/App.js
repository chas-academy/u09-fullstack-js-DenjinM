import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';  // Kontrollera den korrekta sökvägen till AuthContext.js
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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const AppContent = () => {
  const { user, isAdmin } = useContext(AuthContext); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookPage" element={<BookPage />} />
        {/* Route for viewing detailed book information */}
        <Route path="/book/:id" element={<BookDetail />} />

        {/* Omdirigera om användaren eller admin är inloggad och försöker nå LoginPage */}
        <Route 
          path="/LoginPage" 
          element={user || isAdmin ? <Navigate to={isAdmin ? "/admin" : "/profile"} /> : <LoginPage />} 
        />
        
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Contact" element={<Contact />} />
        
        {/* Profile och admin */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<ProtectedRoute element={Admin} role="admin" />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
