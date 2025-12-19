
import { VITE__BACKEND_URL, VITE__RASPBERRY_API_URL } from '../config/apiConfig.js';
import { logoff } from './auth.js';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;

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

export async function getDevices() {
    try {
        const userToken = localStorage.getItem('token');
        const data = await fetchWithLoading(VITE__BACKEND_URL + '/devices', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
}

export async function createDevice(deviceData) {
    const userToken = localStorage.getItem('token');
    return await fetchWithLoading(VITE__BACKEND_URL + '/devices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${userToken}`,
        },
        body: JSON.stringify(deviceData),
    });
}

export async function updateDevice(id, deviceData) {
    const userToken = localStorage.getItem('token');
    return await fetchWithLoading(VITE__BACKEND_URL + `/devices/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${userToken}`,
        },
        body: JSON.stringify(deviceData),
    });
}

export async function deleteDevice(id) {
    const userToken = localStorage.getItem('token');
    return await fetchWithLoading(VITE__BACKEND_URL + `/devices/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${userToken}`,
        },
    });
}

export async function getServerStatus() {
    try {
        let devices = [];
        try {
            devices = await getDevices();
        } catch (e) {
            console.warn("Could not fetch devices from DB, using empty list", e);
        }

        const statuses = await Promise.all(devices.map(async (server) => {
            try {
                const status = await fetchServiceStatus(server.ip, server.port);
                return {
                    ...server,
                    id: server._id, // Ensure ID is mapped correctly
                    status: status,
                };
            } catch (error) {
                console.error(`Error al procesar el servidor ${server.name}:`, error);
                return {
                    ...server,
                    id: server._id,
                    status: 'offline',
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
