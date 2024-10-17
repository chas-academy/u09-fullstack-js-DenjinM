import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
  const { user, isAdmin } = useContext(AuthContext); // Lägg till isAdmin från AuthContext

  // Kontrollera om användaren är inloggad
  if (!user) {
    return <Navigate to="/LoginPage" />;
  }

  // Om routen kräver admin och användaren inte är admin, omdirigera till profil
  if (role !== 'admin' && !isAdmin) {
    return <Navigate to="/profile" />; // Omdirigera om användaren inte är admin
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
