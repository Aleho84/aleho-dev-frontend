'use client';

// components/main/CardStatusEmpty.jsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CardStatusEmpty() {
  return (
    <Card className="bg-[#161b22] border-[#30363d] animate-pulse">
      <CardHeader>
        <div className="h-5 bg-[#30363d] rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="h-6 bg-[#30363d] rounded mb-2"></div>
        <div className="h-6 bg-[#30363d] rounded w-1/2"></div>
      </CardContent>
    </Card>
  );
}
