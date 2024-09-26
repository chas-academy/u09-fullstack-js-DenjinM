import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
