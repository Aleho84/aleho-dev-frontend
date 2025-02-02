'use client';

// components/main/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { login } from '../../services/auth';

// Context
import { useLoading } from '../../context/LoadingContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar email

export default function Login({ setIsLoggedIn }) {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Resetea cualquier error anterior

    if (!emailRegex.test(email)) {
      setError('El email ingresado no es válido.');
      return; // Valida el email y detiene la ejecución si no es válido
    }

    try {
      const { token, user } = await login(email, password, setIsLoading);
      setIsLoggedIn(true); // Actualizar el estado de autenticación en App.jsx
      navigate('/'); // Redirigir al dashboard después de iniciar sesión
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="mx-auto mb-6 h-16 w-16 rounded-full"
        />
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Aleho-Dev
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-white text-sm font-medium mb-2"
            >
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#238636] hover:bg-[#2ea043] text-white w-full font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
