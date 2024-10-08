import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Book Library</h1>
      <span className="navbar-toggle" onClick={toggleMenu}>
        &#9776; {/* Hamburger-ikon */}
      </span>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/BookPage">Books</Link></li>
        <li><Link to="/LoginPage">Login</Link></li>
        <li><Link to="/RegisterPage">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
