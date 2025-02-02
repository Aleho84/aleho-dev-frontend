
import { VITE__BACKEND_URL, VITE__RASPBERRY_API_URL } from '../config/apiConfig.js';
import { logoff } from './auth.js';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;

const dataServerStatusMock = [
    { id: 1, name: 'Ubuntu Server', service: 'SSH', icon: 'Code', ip: '192.168.0.3', port: 22 },
    { id: 2, name: 'Ubuntu Server', service: 'Mongo DB', icon: 'Database', ip: '192.168.0.3', port: 27017 },
    { id: 3, name: 'Aleho-Bot', service: 'Node App', icon: 'Bot', ip: '192.168.0.3', port: 3000 },
    { id: 4, name: 'Jetson Orin Nano', service: 'Jetson', icon: 'Gpu', ip: '192.168.0.91', port: 22 },
    { id: 5, name: 'Raspberry 4', service: 'Raspberry', icon: 'Cherry', ip: '192.168.0.91', port: 22 },
];

export async function fetchWithLoading(url, options, setIsLoading = null) {
    if (setIsLoading) setIsLoading(true);
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 401) {
                logoff();
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 204) {
            return null;
        }
        return await response.json();
    } finally {
        if (setIsLoading) setIsLoading(false);
    }
}

async function fetchServiceStatus(ip, port) {
    try {
        const userToken = localStorage.getItem('token');
        const data = await fetchWithLoading(VITE__BACKEND_URL + '/server/isOnline', {
            method: 'POST',
            headers: {
                'User-Agent': 'aleho-dev-frontend',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify({ ip, port }),
        });
        return data.message;
    } catch (error) {
        console.error(`Error al verificar el servicio ${ip}:${port}:`, error);
        return 'offline';
    }
};

export async function getServerInfo() {
    try {
        const userToken = localStorage.getItem('token');
        const data = await fetchWithLoading(VITE__BACKEND_URL + '/server/systemInfo', {
            method: 'GET',
            headers: {
                'User-Agent': 'aleho-dev-frontend',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}`,
            },
        });
        if (VITE_DEBUG === 'true') { console.log('Respuesta de /server/systemInfo:', data) };
        return data;
    } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        throw error;
    }
}

export async function getServerStatus() {
    try {
        const statuses = await Promise.all(dataServerStatusMock.map(async (server) => {
            try {
                const status = await fetchServiceStatus(server.ip, server.port);
                return {
                    ...server,
                    status: status,
                };
            } catch (error) {
                console.error(`Error al procesar el servidor ${server.name}:`, error);
                return {
                    ...server,
                    status: 'offline', // Manejo de error individual
                };
            }
        }));

        return statuses;
    } catch (error) {
        console.error('Error general al obtener datos del servidor:', error);
        throw error;
    }
}

export async function sendChatMessage(message) {
    try {
        const data = await fetchWithLoading('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}
