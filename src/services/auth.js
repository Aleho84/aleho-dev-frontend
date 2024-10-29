// src/services/auth.js
import axios from 'axios';

const API_URL = 'https://aleho.sytes.net/api/users/login';

export async function login(email, password) {
    try {
        console.log('Enviando solicitud de inicio de sesión:', { email, password }); // Registro de datos enviados
        const response = await axios.post(API_URL, { email, password, });

        console.log('Respuesta de la API:', response); // Registro de la respuesta completa
        const token = response.data.token;
        
        localStorage.setItem('token', token); // Almacena el token en localStorage

        return token;
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado que cae fuera del rango de 2xx
            if (error.response.status === 401) {
                throw new Error('Usuario o contraseña incorrectos');
            } else {
                throw new Error('Error en el servidor. Por favor, inténtalo de nuevo más tarde.');
            }
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            throw new Error('Error de red. Verifica tu conexión a internet.');
        } else {
            // Algo sucedió al configurar la solicitud que provocó un error
            throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}
