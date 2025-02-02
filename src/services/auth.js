// services/auth.js
const REACT_APP_BACKEND_URL = import.meta.env.VITE__BACKEND_URL || 'http://localhost:9002/api/v1/users';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;
const HEADER = {
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
};

export async function login(email, password) {
    try {
        if (VITE_DEBUG === true) { console.log('Enviando solicitud de inicio de sesión:', { email, password }) };

        const response = await fetch(REACT_APP_BACKEND_URL + '/users/login', {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify({ email, password }),
        });

        if (VITE_DEBUG === true) { console.log('Respuesta de la API:', response) };

        if (!response.ok) { throw new Error(`Error en la solicitud de inicio de sesión: ${response.status}`) };

        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data.token;
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
        throw error;
    }
}

export function logoff() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export function isAuthenticated() {
    const isAuthStatus = localStorage.getItem('token') !== null;
    return isAuthStatus;
}

export function getUserData() {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData);
}