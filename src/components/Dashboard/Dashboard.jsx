'use client';

import { useState, useEffect } from 'react';
import { logoff } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  XCircle,
  Globe,
  Database,
  Code,
  Zap,
  BarChart,
  HardDrive,
  MessageSquare,
  LogOut,
} from 'lucide-react';

// Mock server data
const servers = [
  { id: 1, name: 'Main Web Server', service: 'Apache', icon: Globe },
  { id: 2, name: 'Primary Database', service: 'PostgreSQL', icon: Database },
  { id: 3, name: 'API Gateway', service: 'Express.js', icon: Code },
  { id: 4, name: 'Redis Cache', service: 'Redis', icon: Zap },
  { id: 5, name: 'Load Balancer', service: 'NGINX', icon: BarChart },
  { id: 6, name: 'Backup Storage', service: 'AWS S3', icon: HardDrive },
];

// Mock API call to fetch server statuses
const fetchServerStatuses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const statuses = servers.map((server) => ({
        ...server,
        status: ['online', 'offline', 'warning'][Math.floor(Math.random() * 3)],
      }));
      resolve(statuses);
    }, 1500);
  });
};

export default function ServerStatusDashboard() {
  const [serverStatuses, setServerStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const statuses = await fetchServerStatuses();
      setServerStatuses(statuses);
    } catch (err) {
      setError('Failed to fetch server statuses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleChatRedirect = () => {
    navigate('/chatpanel');
  };

  const handleLogOff = () => {
    logoff();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] border-r border-[#30363d] p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Dashboard Menu</h2>
          <div className="mt-2 h-1 w-10 bg-[#58a6ff]"></div>
        </div>
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
                  const IconComponent = server.icon;
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
                            <span className="capitalize text-sm">
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
