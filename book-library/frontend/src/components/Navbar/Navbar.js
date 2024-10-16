import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import bookLogo from '../../images/book-logo.png'; // Uppdatera sökvägen till logotypen
import { AuthContext } from '../../contexts/AuthContext'; // Importera AuthContext

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Hämta user och logout från AuthContext

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={bookLogo} alt="Book Logo" className="navbar-logo-img" />
        <h1 className="navbar-logo">Book Library</h1>
      </div>
      <span className="navbar-toggle" onClick={toggleMenu}>
        &#9776; {/* Hamburger-ikon */}
      </span>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/BookPage">Books</Link></li>

        {/* Visa Profil och Logga ut om användaren är inloggad */}
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={logout} className="navbar-logout-btn">Log out</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/LoginPage">Login</Link></li>
            <li><Link to="/RegisterPage">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
