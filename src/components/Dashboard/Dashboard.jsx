// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al usuario a la pantalla de inicio de sesión después de cerrar sesión
    };

    return (
        <div>
            <h2>Bienvenido al Dashboard</h2>
            {/* Aquí puedes agregar el contenido del dashboard */}
            <div>
                {/* Ejemplo de datos del usuario */}
                <h3>Información del usuario:</h3>
                <p>Nombre: {/* Aquí mostrarías el nombre del usuario */}</p>
                <p>Email: {/* Aquí mostrarías el email del usuario */}</p>
            </div>

            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;
