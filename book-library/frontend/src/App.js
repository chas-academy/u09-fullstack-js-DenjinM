import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; 
import BookPage from './pages/BookPage/BookPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Faq from './pages/Faq/Faq';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookPage" element={<BookPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}


export default App;
