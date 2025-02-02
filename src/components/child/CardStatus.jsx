'use client';

// components/child/CardStatus.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lucideIcon from '../../services/lucideIcon.js';

const statusStyles = {
  online: { icon: CheckCircle, color: 'text-green-500' },
  offline: { icon: XCircle, color: 'text-red-500' },
  warning: { icon: AlertCircle, color: 'text-yellow-500' },
};

const handleViewDetails = (server) => {
  console.log(`El servidor ${server.name} está ${server.status}! 😋`);
};

export default function CardStatus({ server }) {
  const IconComponent = lucideIcon(server.icon);
  const { icon: StatusIcon, color } = statusStyles[server.status] || {
    icon: null,
    color: 'text-gray-400',
  };

  return (
    <Card
      key={server.id}
      className="bg-[#161b22] border-[#30363d] dark:bg-gray-800 dark:border-gray-700"
    >
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          {server.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#30363d] p-2 rounded-full dark:bg-gray-700">
            <IconComponent className="h-6 w-6 text-[#58a6ff]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#58a6ff]">
              {server.service}
            </p>
            <p className="text-xs text-[#8b949e] dark:text-gray-400">
              ID: {server.id}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {StatusIcon && <StatusIcon className={`h-6 w-6 ${color}`} />}
            <span className={`capitalize text-sm ${color}`}>
              {server.status}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#58a6ff] hover:bg-[#30363d] dark:text-[#58a6ff] dark:hover:bg-gray-700"
            onClick={() => handleViewDetails(server)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
