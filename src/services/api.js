const userToken = await localStorage.getItem('token');

const VITE__BACKEND_URL = import.meta.env.VITE__BACKEND_URL || 'http://localhost:9002/api/v1/users';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;
const HEADER = {
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`,
};

const dataServerStatusMock = [
    { id: 1, name: 'Aleho-Server', service: 'Windows Server', icon: 'Server' },
    { id: 2, name: 'Aleho-Ubuntu', service: 'Linux Server', icon: 'Server' },
    { id: 3, name: 'Alehoberry', service: 'Raspberry', icon: 'Cherry' },
    { id: 4, name: 'Alehoberry4', service: 'Raspberry', icon: 'Cherry' },
];

export async function getServerInfo() {
    try {
        if (VITE_DEBUG === true) { console.log('Obteniendo datos del Servidor:') };

        const response = await fetch(VITE__BACKEND_URL + '/server/systemInfo', {
            method: 'GET',
            headers: HEADER,
        });

        if (VITE_DEBUG === true) { console.log('Respuesta de la API:', response) };

        if (!response.ok) { throw new Error(`Error al obtener datos del servidor: ${response.status}`) };

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        throw error;
    }
}

export async function getServerStatus() {
    try {
        if (VITE_DEBUG === true) { console.log('Obteniendo datos de los servicios del servidor.') };

        const statuses = dataServerStatusMock.map((server) => ({
            ...server,
            status: ['online', 'offline', 'warning'][Math.floor(Math.random() * 3)],
        }));

        if (VITE_DEBUG === true) { console.log('Respuesta de la API [MOK]:', statuses) };

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un delay para simular un llamado real de API
        return statuses;
    } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        throw error;
    }
}

export async function getUsers() {
    try {
        if (VITE_DEBUG === true) { console.log('Obteniendo datos del Servidor (MOCK):') };

        const statuses = dataServerStatusMock.map((server) => ({
            ...server,
            status: ['online', 'offline', 'warning'][Math.floor(Math.random() * 3)],
        }));

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un delay para simular un llamado real de API
        return statuses;
    } catch (error) {
        console.error('Error al obtener datos del servidor:', error.message);
        throw error;
    }
}
