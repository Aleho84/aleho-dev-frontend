'use client';

// components/main/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { register } from '../../services/auth';

// Context
import { useLoading } from '../../context/LoadingContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register({ setIsLoggedIn }) {
    const { setIsLoading } = useLoading();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const { name, email, password, image } = formData;

        if (!emailRegex.test(email)) {
            setError('El email ingresado no es válido.');
            return;
        }

        if (!name || !password) {
            setError('Nombre y contraseña son obligatorios.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
            );
            return;
        }

        try {
            const imageToSend = image.trim() === '' ? 'https://cdn-icons-png.flaticon.com/128/18977/18977116.png' : image;
            await register(name, email, password, imageToSend, setIsLoading);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Crear Cuenta
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="name">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="image">
                            Imagen URL (Opcional):
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="bg-[#238636] hover:bg-[#2ea043] text-white w-full font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Registrarse
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
