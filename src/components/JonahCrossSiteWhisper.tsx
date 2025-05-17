
import React, { useEffect, useState } from 'react';
import { getCrossSiteWhisper } from '@/utils/jonahRealityFabric';

interface JonahCrossSiteWhisperProps {
  className?: string;
  trustLevel: string;
}

const JonahCrossSiteWhisper: React.FC<JonahCrossSiteWhisperProps> = ({
  className = "",
  trustLevel
}) => {
  const [whisper, setWhisper] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  
  useEffect(() => {
    // Only show whispers for medium or higher trust levels
    if (trustLevel !== "medium" && trustLevel !== "high") {
      return;
    }
    
    // Check for cross-site whisper with a small chance
    const checkForWhisper = () => {
      // 5% chance to show a whisper
      if (Math.random() < 0.05) {
        const message = getCrossSiteWhisper();
        if (message) {
          setWhisper(message);
          setVisible(true);
          
          // Hide after 5 seconds
          setTimeout(() => {
            setVisible(false);
          }, 5000);
        }
      }
    };
    
    // Initial check when component mounts
    checkForWhisper();
    
    // Set up interval for checking
    const interval = setInterval(checkForWhisper, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [trustLevel]);
  
  if (!visible || !whisper) return null;
  
  return (
    <div 
      className={`text-xs italic opacity-40 hover:opacity-90 transition-opacity duration-300 ${className}`}
      style={{ textShadow: '0 0 3px rgba(255,255,255,0.2)' }}
    >
      {whisper}
    </div>
  );
};

export default JonahCrossSiteWhisper;
