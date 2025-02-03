'use client';

// components/main/Dashboard.jsx
import { useState, useEffect } from 'react';

// Servicios
import { getUserData } from '../../services/auth.js';
import { getServerInfo, getServerStatus } from '../../services/api.js';

// Components
import Sidebar from '../child/Sidebar.jsx';
import CardStatus from '../child/CardStatus.jsx';
import CardStatusEmpty from '../child/CardStatusEmpty.jsx';
import ServerInfoCard from '../child/ServerInfoCard.jsx';
import { Menu } from 'lucide-react';

export default function Dashboard({ setIsLoggedIn }) {
  const [serverStatuses, setServerStatuses] = useState([]);
  const [serverInfo, setServerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(getUserData); // Obtener los datos del usuario
    const intervalId = setInterval(fetchStatuses, 5000); // Llamar a fetchStatuses cada 5 segundos (5000 milisegundos)
    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
  }, []);

  const fetchStatuses = async () => {
    try {
      setServerStatuses(await getServerStatus());
      setServerInfo(await getServerInfo());
      setLoading(false);
      setError(null);
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        setError(
          'Error de conexión con el servidor. Inténtalo de nuevo más tarde.'
        );
      } else if (err.message.includes('NetworkError')) {
        setError('Error de red. Verifica tu conexión a Internet.');
      } else {
        setError('Error inesperado. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-4 text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        userData={userData}
        setIsLoggedIn={setIsLoggedIn} // Pasamos setIsLoggedIn como prop!
      />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6 border-b border-[#30363d] pb-4">
            <h1 className="text-2xl font-semibold text-white">
              Server Status Dashboard
            </h1>
          </div>
          {error && (
            <div
              className="bg-[#3c1e1e] border border-[#f85149] text-[#f85149] px-4 py-3 rounded-md mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <CardStatusEmpty />
            ) : (
              <ServerInfoCard serverInfo={serverInfo} />
            )}
            {loading
              ? serverStatuses.map((server) => {
                  return (
                    <CardStatusEmpty
                      key={`loading-${server.id}`}
                      server={server}
                    />
                  );
                })
              : serverStatuses.map((server) => {
                  return (
                    <CardStatus key={`server-${server.id}`} server={server} />
                  );
                })}
          </div>
        </div>
      </main>
    </div>
  );
}
