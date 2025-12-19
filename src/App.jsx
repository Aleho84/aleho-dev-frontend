// App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Componentes
import Login from './components/main/Login';
import Dashboard from './components/main/Dashboard';
import Chatpanel from './components/main/Chatpanel';
import Userpanel from './components/main/Userpanel';
import Errorpage from './components/main/Errorpage';
import Notfoundpage from './components/main/Notfoundpage';
import LoadingSpinner from './components/child/LoadingSpinner';

// Servicios
import { isAuthenticated, getUserData } from './services/auth';

// Context
import { LoadingProvider, useLoading } from './context/LoadingContext';

const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;

const isUserAdmin = () => {
  const user = getUserData();
  return user?.account?.admin;
};

function AppContent() {
  const { isLoading } = useLoading();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    if (VITE_DEBUG === 'true') {
      console.log(`isAutenticated: ${isAuthenticated()}`);
    }
    setIsLoggedIn(isAuthenticated()); // Verificar el estado de autenticación al cargar la aplicación
  }, []);

  return (
    <Router>
      {isLoading && <LoadingSpinner />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/userpanel"
          element={isLoggedIn && isUserAdmin() ? <Userpanel /> : <Navigate to="/" />}
        />
        <Route
          path="/chatpanel"
          element={isLoggedIn ? <Chatpanel /> : <Navigate to="/login" />}
        />
        <Route path="/error" element={<Errorpage />} />
        <Route path="/*" element={<Notfoundpage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
