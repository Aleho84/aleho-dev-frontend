'use client';

// components/main/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { logoff } from '../../services/auth.js';

// Components
import CardStatus from '../child/CardStatus.jsx';
import CardStatusEmpty from '../child/CardStatusEmpty.jsx';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare, LogOut, Menu } from 'lucide-react';

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
      setError(err.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Mobile menu button */}
      <button className="md:hidden p-4 text-white" onClick={toggleMobileMenu} aria-label="Toggle menu" >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside className={`w-full md:w-64 bg-[#161b22] border-r border-[#30363d] p-4 flex flex-col ${isMobileMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`} >
        <div className="flex items-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
          <h2 className="text-xl font-semibold text-white text-xl ml-4">
            Aleho-Dev
          </h2>
        </div>
        <div className="mt-2 h-1 bg-[#638cbb] mb-6"></div>
        <nav className="space-y-2 flex-grow">
          <Button variant="ghost" className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d]" onClick={handleChatRedirect} > <MessageSquare className="mr-2 h-5 w-5" />
            Chat
          </Button>
          {/* Add more navigation items here if needed */}
        </nav>

        <Button variant="ghost" className="w-full justify-start text-[#c9d1d9] hover:bg-[#30363d] mt-auto" onClick={handleLogOff} >
          <LogOut className="mr-2 h-5 w-5" />
          Log Off
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6 border-b border-[#30363d] pb-4">
            <h1 className="text-2xl font-semibold text-white">
              Estado de los Servicios de Aleho-Dev
            </h1>
            <Button onClick={fetchStatuses} disabled={loading} className="bg-[#238636] hover:bg-[#2ea043] text-white" >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          {error && (
            <div className="bg-[#3c1e1e] border border-[#f85149] text-[#f85149] px-4 py-3 rounded-md mb-4" role="alert" >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? serverStatuses.map((server) => {
                  return (<CardStatusEmpty key={`loading-${server.id}`} server={server} />);
                })
              : serverStatuses.map((server) => {
                    return (<CardStatus key={`server-${server.id}`} server={server} />);
                })}
          </div>
        </div>
      </main>
    </div>
  );
}
