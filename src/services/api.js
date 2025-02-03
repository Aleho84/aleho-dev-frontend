const userToken = await localStorage.getItem('token');

const VITE__BACKEND_URL = import.meta.env.VITE__BACKEND_URL || 'http://localhost:9002/api/v1/users';
const VITE_DEBUG = import.meta.env.VITE_DEBUG || false;
const HEADER = {
    'User-Agent': 'aleho-dev-frontend',
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`,
};

const dataServerStatusMock = [
    { id: 1, name: 'Ubuntu Server', service: 'SSH', icon: 'Code', ip: '192.168.0.3', port: 22 },
    { id: 2, name: 'Ubuntu Server', service: 'Mongo DB', icon: 'Database', ip: '192.168.0.3', port: 27017 },
    { id: 3, name: 'Aleho-Bot', service: 'Node App', icon: 'Bot', ip: '192.168.0.3', port: 3000 },
    { id: 4, name: 'RPI-Control', service: 'Node App', icon: 'Cherry', ip: '192.168.0.11', port: 5000 },
];

async function fetchServiceStatus(ip, port) {
    try {
        const response = await fetch(VITE__BACKEND_URL + '/server/isOnline', {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify({ ip, port }),
        });

        if (!response.ok) {
            throw new Error(`Error al obtener datos del servicio: ${ip}:${port}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(`Error al verificar el servicio ${ip}:${port}:`, error);
        return 'offline';
    }
};

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
        if (VITE_DEBUG === true) {
            console.log('Obteniendo datos de los servicios del servidor.');
        }

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

        if (VITE_DEBUG === true) {
            console.log('Respuesta de la API:', statuses);
        }

        return statuses;
    } catch (error) {
        console.error('Error general al obtener datos del servidor:', error);
        throw error;
    }
}