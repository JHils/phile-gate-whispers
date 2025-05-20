
import React, { useState, useEffect } from 'react';
import JonahLogo from './JonahLogo';

interface LoadingScreenProps {
  message?: string;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message,
  duration = 2000
}) => {
  const [loadingText, setLoadingText] = useState('Loading...');
  const [visible, setVisible] = useState(true);
  const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
  
  const loadingMessages = [
    "Decrypting your alias...",
    "Synchronising with Whisper Network...",
    "Jonah is writing...",
    "Accessing memory fragments...",
    "Calibrating reality fabric...",
    "Scanning narrative patterns...",
    "Authenticating whisper protocol...",
    "Validating phile access...",
  ];
  
  useEffect(() => {
    // Set custom message or random one from the list
    if (message) {
      setLoadingText(message);
    } else {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingText(loadingMessages[randomIndex]);
    }
    
    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [message, duration]);
  
  if (!visible) return null;
  
  return (
    <div className="loading-screen">
      <div className="mb-6 animate-trust-pulse">
        <JonahLogo 
          variant="glyph" 
          size="lg" 
          animated={trustLevel === 'high'}
          trustLevel={trustLevel}
        />
      </div>
      <p className="loading-text">{loadingText}</p>
    </div>
  );
};

export default LoadingScreen;
