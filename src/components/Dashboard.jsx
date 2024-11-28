'use client';

// components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import lucideIcon from '../services/lucideIcon.js';
import { logoff } from '../services/auth';

// Components
import CardStatusEmpty from './CardStatusEmpty.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  XCircle,
  MessageSquare,
  LogOut,
  Menu,
} from 'lucide-react';


// Mock server data
const dataServerStatusMock = [
  { id: 1, name: 'Aleho-Server', service: 'Windows Server', icon: 'Server' },
  { id: 2, name: 'Aleho-Ubuntu', service: 'Linux Server', icon: 'Server' },
  { id: 3, name: 'Alehoberry', service: 'Raspberry', icon: 'Cherry' },
  { id: 4, name: 'Alehoberry4', service: 'Raspberry', icon: 'Cherry' },
];

// Mock API call to fetch server statuses
const fetchServerStatusMock = async () => {
  const statuses = dataServerStatusMock.map((server) => ({
    ...server,
    status: ['online', 'offline', 'warning'][Math.floor(Math.random() * 3)],
  }));

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un delay para simular un llamado real de API
  return statuses;
};

export default function Dashboard({ setIsLoggedIn }) {
  const [serverStatuses, setServerStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const statuses = await fetchServerStatusMock();
      setServerStatuses(statuses);
    } catch (err) {
      setError('Failed to fetch server statuses');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const iconSize = 'h-6 w-6';
    switch (status) {
      case 'online':
        return <CheckCircle className={`${iconSize} text-green-500`} />;
      case 'offline':
        return <XCircle className={`${iconSize} text-red-500`} />;
      case 'warning':
        return <AlertCircle className={`${iconSize} text-yellow-500`} />;
      default:
        return null;
    }
  };

  const handleChatRedirect = () => {
    navigate('/chatpanel');
  };

  const handleLogOff = () => {
    logoff();
    setIsLoggedIn(false); // Actualizar el estado de autenticación en App.jsx
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const enviarMensaje = () => {
    alert('¡Ay, papi! Me enviaste un mensaje... 🥵'); 
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
        <div className="flex items-center justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="mx-auto mb-6 h-14 w-14 rounded-full"
          />
          <h2 className="text-xl font-semibold text-white">Aleho-Dev Panel</h2>
        </div>
        <div className="mt-2 h-1 bg-[#638cbb] mb-6"></div>
        <nav className="space-y-2 flex-grow">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]"
            onClick={handleChatRedirect}
          >
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
            <Button
              onClick={fetchStatuses}
              disabled={loading}
              className="bg-[#238636] hover:bg-[#2ea043] text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Botoncito texto="Enviame un mensajito" onClick={enviarMensaje} />
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
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card
                      key={index}
                      className="bg-[#161b22] border-[#30363d] animate-pulse"
                    >
                      <CardHeader>
                        <div className="h-5 bg-[#30363d] rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-6 bg-[#30363d] rounded mb-2"></div>
                        <div className="h-6 bg-[#30363d] rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))
              : serverStatuses.map((server) => {
                  const IconComponent = lucideIcon(server.icon);
                  return (
                    <Card
                      key={server.id}
                      className="bg-[#161b22] border-[#30363d]"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-white">
                          {server.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-[#30363d] p-2 rounded-full">
                            <IconComponent className="h-6 w-6 text-[#58a6ff]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#58a6ff]">
                              {server.service}
                            </p>
                            <p className="text-xs text-[#8b949e]">
                              ID: {server.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(server.status)}
                            <span
                              className={`capitalize text-sm ${
                                server.status === 'online'
                                  ? 'text-green-500'
                                  : server.status === 'offline'
                                  ? 'text-red-500'
                                  : 'text-yellow-500'
                              }`}
                            >
                              {server.status}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#58a6ff] hover:bg-[#30363d]"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </div>
      </main>
    </div>
  );
}
