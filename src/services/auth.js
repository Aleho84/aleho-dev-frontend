
// services/auth.js
import { VITE__BACKEND_URL } from '../config/apiConfig.js';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;
const HEADER = {
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
};

async function fetchWithLoading(url, options, setIsLoading = null) {
    if (setIsLoading) setIsLoading(true);
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 401) {
                logoff();
                throw new Error('Usuario o contraseña incorrecta');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } finally {
        if (setIsLoading) setIsLoading(false);
    }
}

export async function login(email, password) {
    try {
        if (VITE_DEBUG === 'true') { console.log('Enviando solicitud de inicio de sesión:', { email, password }) };

        const data = await fetchWithLoading(VITE__BACKEND_URL + '/users/login', {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify({ email, password }),
        });

        if (VITE_DEBUG === 'true') { console.log('Respuesta de /users/login:', data) };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return { token: data.token, user: data.user };
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
    try {
        const isAuthStatus = localStorage.getItem('token') !== null;
        return isAuthStatus;
    } catch (error) {
        console.error('Error accessing token from Local Storage:', error);
        logoff(); // Clear token and user from Local Storage
        throw new Error('Error accessing authentication token. Please log in again.');
    }
}

export function getUserData() {
    try {
        const userData = localStorage.getItem('user');
        return JSON.parse(userData);
    } catch (error) {
        console.error('Error parsing user data from Local Storage:', error);
        logoff(); // Clear token and user from Local Storage
        throw new Error('Invalid user data in Local Storage. Please log in again.');
    }
}
