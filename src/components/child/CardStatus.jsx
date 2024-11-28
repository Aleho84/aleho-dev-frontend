'use client';

// components/child/CardStatus.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lucideIcon from '../../services/lucideIcon.js';

export default function CardStatus({ server }) {
  const IconComponent = lucideIcon(server.icon);

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

  return (
    <Card key={server.id} className="bg-[#161b22] border-[#30363d]">
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
            <p className="text-xs text-[#8b949e]">ID: {server.id}</p>
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
}
