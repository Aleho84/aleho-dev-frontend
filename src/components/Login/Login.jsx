// src/components/Login.jsx
import React, { useState } from 'react';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ setIsLoggedIn }) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Limpiar cualquier error anterior

        try {
            const token = await login(email, password);
            setIsLoggedIn(true); // Actualizar el estado de autenticación en App.jsx
            navigate('/'); // Redirigir al dashboard después de iniciar sesión
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <img src="/logo.jpg" alt="Logo" className={styles.logo} />
                <h2 className={styles.title}>Aleho-Dev</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Usuario:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div>
                        <button type="submit" className={styles.button}>
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
