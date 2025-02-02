
import { VITE__BACKEND_URL } from '../config/apiConfig.js';
import { fetchWithLoading } from './api.js';
import { logoff } from './auth.js';

const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;

const getUserToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            logoff();
            throw new Error('No authentication token found. Please log in.');
        }
        return token;
    } catch (error) {
        console.error('Error getting user token:', error);
        throw error;
    }
};

const getHeaders = () => ({
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getUserToken()}`,
});

export async function getUsers() {
    try {
        const data = await fetchWithLoading(VITE__BACKEND_URL + '/users/list', {
            method: 'GET',
            headers: getHeaders(),
        });
        if (VITE_DEBUG === 'true') { console.log('Respuesta de /users/list:', data); }
        return data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

export async function createUser(userData) {
    try {
        const data = await fetchWithLoading(VITE__BACKEND_URL + '/users/signin', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        if (VITE_DEBUG === 'true') { console.log('Respuesta de crear usuario:', data); }
        return data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

export async function updateUser(userId, userData) {
    try {
        const data = await fetchWithLoading(VITE__BACKEND_URL + `/users/${userId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        if (VITE_DEBUG === 'true') { console.log('Respuesta de actualizar usuario:', data); }
        return data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const data = await fetchWithLoading(VITE__BACKEND_URL + `/users/${userId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (VITE_DEBUG === 'true') { console.log('Respuesta de eliminar usuario:', data); }
        return data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}
