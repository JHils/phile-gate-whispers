
import React from 'react';
import JonahLogo from './JonahLogo';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 z-50">
      <div className="animate-pulse">
        <JonahLogo variant="glyph" size="lg" />
      </div>
      <p className="mt-4 text-white font-mono text-sm">{message}</p>
    </div>
  );
};

export default LoadingScreen;
