// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes
import Login from './components/main/Login';
import Dashboard from './components/main/Dashboard';
import Chatpanel from './components/main/Chatpanel';

// Servicios
import { isAuthenticated } from './services/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    console.log(`isAutenticated: ${isAuthenticated()}`);
    setIsLoggedIn(isAuthenticated()); // Verificar el estado de autenticación al cargar la aplicación
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsLoggedIn} />} />
        <Route 
          path="/" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chatpanel" 
          element={isLoggedIn ? <Chatpanel /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
