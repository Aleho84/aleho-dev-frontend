'use client';

// components/child/ErrorDisplay.jsx
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ErrorDisplay({ title, message }) {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 shadow-lg rounded-xl">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-300">{message}</p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            variant="ghost"
            className="w-full flex justify-center bg-[#238636] hover:bg-[#2ea043] text-white"
            onClick={handleLoginRedirect}
          >
            Volver al inicio.
          </Button>
        </div>
      </div>
    </div>
  );
}
