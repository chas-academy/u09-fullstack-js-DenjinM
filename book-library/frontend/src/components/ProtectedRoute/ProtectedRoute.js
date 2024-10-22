import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
  const { user, isAdmin } = useContext(AuthContext);

  // Kontrollera om användaren är inloggad
  if (!user) {
    return <Navigate to="/LoginPage" />;
  }

  // Om användaren inte är admin och rollen kräver admin, omdirigera till profilsidan
  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/profile" />;
  }

  // Om användaren är admin och försöker nå admin-sidan, tillåt åtkomst
  if (role === 'admin' && isAdmin) {
    return <Element {...rest} />;
  }

  // För andra vanliga användare, tillåt åtkomst till deras sidor
  return <Element {...rest} />;
};

export default ProtectedRoute;
