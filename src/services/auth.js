// services/auth.js
const API_URL = 'http://localhost:9002/api/v1/users/login';
const DEBUG = true;
const HEADER = {
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
};

export async function login(email, password) {
    try {
        DEBUG ? console.log('Enviando solicitud de inicio de sesión:', { email, password }) : null;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        DEBUG ? console.log('Respuesta de la API:', data) : null;

        if (data.error) throw new Error(data.message); // Devuelve un error en caso de que la respuesta devuelva error=true

        const token = JSON.stringify(data.token);
        const user = JSON.stringify(data.user);

        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        return token;
    } catch (error) {
        throw new Error(error.message);
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
