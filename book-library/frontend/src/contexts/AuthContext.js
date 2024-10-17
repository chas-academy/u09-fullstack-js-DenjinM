import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Lägg till isAdmin som en state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      console.log('Decoded token on page load:', decoded); // Logga token vid laddning av sidan
      setUser(decoded);
      setIsAdmin(decoded.role === 'admin'); // Kontrollera om användaren är admin
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    console.log('Decoded token after login:', decoded); // Logga token vid inloggning
    setUser(decoded);
    setIsAdmin(decoded.role === 'admin'); // Kontrollera om användaren är admin vid inloggning
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false); // Nollställ admin-status vid utloggning
    console.log('User logged out'); // Logga utloggning för felsökning
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
