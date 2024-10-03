import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Book Library</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/BookPage">Books</Link></li>
        <li><Link to="/AboutUs">About us</Link></li>
        <li><Link to="/LoginPage">Login</Link></li>
        <li><Link to="/RegisterPage">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
