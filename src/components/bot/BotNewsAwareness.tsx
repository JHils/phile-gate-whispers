
import React, { useEffect, useState } from 'react';
import { updateNewsAwareness, getNewsResponse, getWeatherResponse } from '@/utils/jonahNewsAwareness';

interface BotNewsAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string, special?: boolean) => void;
}

const BotNewsAwareness: React.FC<BotNewsAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  const [lastChecked, setLastChecked] = useState<number>(0);
  
  // Initialize news awareness system on mount
  useEffect(() => {
    // Don't check too frequently
    const now = Date.now();
    if (now - lastChecked < 3600000) return; // Once per hour max
    
    const initializeNewsSystem = async () => {
      await updateNewsAwareness();
      setLastChecked(Date.now());
      
      // For medium and high trust levels, occasionally send a news comment
      if ((trustLevel === 'medium' || trustLevel === 'high') && Math.random() < 0.3) {
        const newsComment = getNewsResponse(trustLevel);
        if (newsComment) {
          // Allow time for the user to settle in first
          setTimeout(() => {
            addBotMessage(newsComment, true);
          }, 20000); // Wait 20 seconds before commenting
        }
      }
    };
    
    initializeNewsSystem();
  }, [trustLevel, addBotMessage, lastChecked]);
  
  // Periodically check for weather comments (for high trust only)
  useEffect(() => {
    if (trustLevel !== 'high') return;
    
    const weatherInterval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance
        const weatherComment = getWeatherResponse();
        if (weatherComment) {
          addBotMessage(weatherComment, true);
        }
      }
    }, 45 * 60 * 1000); // Every 45 minutes
    
    return () => clearInterval(weatherInterval);
  }, [trustLevel, addBotMessage]);
  
  // No visible UI, this is just a behavior component
  return null;
};

export default BotNewsAwareness;
