'use client';

// components/child/ServerInfoCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import lucideIcon from '../../services/lucideIcon.js';

const MemoryStickIcon = lucideIcon('MemoryStickIcon');
const Clock = lucideIcon('Clock');
const Cpu = lucideIcon('Cpu');
const Zap = lucideIcon('Zap');

export default function CardStatus({ serverInfo }) {
  return (
    <Card className="bg-[#161b22] border-[#30363d] col-span-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          Server Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <MemoryStickIcon className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">Total Memory</p>
              <p className="text-xs text-[#8b949e]">
                {serverInfo.totalMemory.GB.toFixed(2)} GB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MemoryStickIcon className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">Free Memory</p>
              <p className="text-xs text-[#8b949e]">
                {serverInfo.freeMemory.GB.toFixed(2)} GB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">Uptime</p>
              <p className="text-xs text-[#8b949e]">
                {serverInfo.uptime.dias}d {serverInfo.uptime.horas}h{' '}
                {serverInfo.uptime.minutos}m
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">CPU Model</p>
              <p className="text-xs text-[#8b949e]">{serverInfo.cpu.model}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">CPU Cores</p>
              <p className="text-xs text-[#8b949e]">{serverInfo.cpu.cores}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-[#58a6ff]" />
            <div>
              <p className="text-sm font-medium text-[#58a6ff]">CPU Speed</p>
              <p className="text-xs text-[#8b949e]">
                {serverInfo.cpu.speed} MHz
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
