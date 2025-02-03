'use client';

// components/main/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { logoff, getUserData } from '../../services/auth.js';
import { getServerInfo, getServerStatus } from '../../services/api.js';

// Components
import CardStatus from '../child/CardStatus.jsx';
import CardStatusEmpty from '../child/CardStatusEmpty.jsx';
import ServerInfoCard from '../child/ServerInfoCard.jsx';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare, LogOut, Menu, Users } from 'lucide-react';

export default function Dashboard({ setIsLoggedIn }) {
  const [serverStatuses, setServerStatuses] = useState([]);
  const [serverInfo, setServerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(getUserData());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(fetchStatuses, 5000); // Llamar a fetchStatuses cada 5 segundos (5000 milisegundos)
    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
  }, []);

  const fetchStatuses = async () => {    
    try {
      const statuses = await getServerStatus();
      const serverInfo = await getServerInfo();
      setServerStatuses(statuses);
      setServerInfo(serverInfo);
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

  const handleChatRedirect = () => {
    navigate('/chatpanel');
  };

  const handleUserMngRedirect = () => {
    navigate('/userpanel');
  };

  const handleLogOff = () => {
    logoff();
    setIsLoggedIn(false); // Actualizar el estado de autenticación en App.jsx
    navigate('/login');
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
      <aside
        className={`w-full md:w-64 bg-[#161b22] border-r border-[#30363d] p-4 flex flex-col ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center mb-6">
          <img
            src={userData.image}
            alt="Logo"
            className="h-14 w-14 rounded-full"
          />
          <h2 className="text-xl font-semibold text-white text-xl ml-4">
            {userData.name}
          </h2>
        </div>
        <div className="mt-2 h-1 bg-[#638cbb] mb-6"></div>
        <nav className="space-y-2 flex-grow">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]"
            onClick={handleUserMngRedirect}
          >
            {' '}
            <Users className="mr-2 h-5 w-5" />
            Usuarios
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]"
            onClick={handleChatRedirect}
          >
            {' '}
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat
          </Button>
          {/* Add more navigation items here if needed */}
        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d] mt-auto"
          onClick={handleLogOff}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Off
        </Button>
      </aside>

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
