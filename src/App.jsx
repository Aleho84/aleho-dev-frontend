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

// Servicios
import { isAuthenticated } from './services/auth';

const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    if (VITE_DEBUG === true) {
      console.log(`isAutenticated: ${isAuthenticated()}`);
    }
    setIsLoggedIn(isAuthenticated()); // Verificar el estado de autenticación al cargar la aplicación
  }, []);

  return (
    <Router>
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
          element={isLoggedIn ? <Userpanel /> : <Navigate to="/login" />}
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

export default App;
