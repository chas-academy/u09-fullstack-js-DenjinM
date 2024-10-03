import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><Link to="/Faq">FAQ</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/RegisterPage">Register</Link></li>
        <li><Link to="/LoginPage">Login</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
