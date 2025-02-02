
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <Loader2 className="h-16 w-16 animate-spin text-white" />      
    </div>
  );
};

export default LoadingSpinner;
