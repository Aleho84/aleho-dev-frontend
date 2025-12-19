'use client';

// components/main/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { logoff } from '../../services/auth.js';

// Components
import { Button } from '@/components/ui/button';
import { LogOut, MessageSquare, Users, Home } from 'lucide-react';

export default function Sidebar({
  isMobileMenuOpen,
  userData,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleChatRedirect = () => {
    navigate('/chatpanel');
  };

  const handleUserMngRedirect = () => {
    navigate('/userpanel');
  };

  const handleDashboardRedirect = () => {
    navigate('/');
  };

  const handleLogOff = () => {
    logoff();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <aside
      className={`w-full md:w-64 bg-[#161b22] border-r border-[#30363d] p-4 flex flex-col ${isMobileMenuOpen ? 'block' : 'hidden'
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
          onClick={handleDashboardRedirect}
        >
          <Home className="mr-2 h-5 w-5" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-[#c9d1d9] hover:bg-[#30363d] ${!userData?.account?.admin ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={userData?.account?.admin ? handleUserMngRedirect : null}
          disabled={!userData?.account?.admin}
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
  );
}
