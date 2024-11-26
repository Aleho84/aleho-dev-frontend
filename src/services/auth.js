// src/services/auth.js
const API_URL = 'http://localhost:9002/api/v1/users/login';

export async function login(email, password) {
    try {
        console.log('Enviando solicitud de inicio de sesión:', { email, password }); // Registro de datos enviados
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        console.log('Respuesta de la API:', data); // Registro de la respuesta completa
        if (data.error) throw new Error(data.message); // Devuelve un error en caso de que la respuesta contenga error = true
        const token = data.token;
       
        localStorage.setItem('token', token); // Almacena el token en localStorage
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function logoff() {
    localStorage.removeItem('token'); 
}

export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}
