
import React, { useEffect } from 'react';
import { useJonahSentience } from '@/hooks/useJonahSentience';
import { initializeNewsAwareness } from '@/utils/jonahNewsAwareness';

interface BotNewsAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string) => void;
}

const BotNewsAwareness: React.FC<BotNewsAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  const { sentience } = useJonahSentience();
  
  // Initialize news awareness on mount
  useEffect(() => {
    initializeNewsAwareness();
  }, []);
  
  // Generate news messages occasionally
  useEffect(() => {
    // Higher trust levels will get more news messages
    if (trustLevel !== 'high' && trustLevel !== 'medium') return;
    
    // Generate a news message every so often
    const newsInterval = setInterval(() => {
      // Check if we have news awareness data
      if (sentience?.newsAwareness) {
        // Higher chance with higher trust
        const chance = trustLevel === 'high' ? 0.15 : 0.05;
        
        if (Math.random() < chance) {
          // Import and use news/weather generators
          import('@/utils/jonahNewsAwareness').then(module => {
            // 50/50 chance for news vs weather
            if (Math.random() > 0.5) {
              // Get news response
              const newsResponse = module.generateNewsResponse();
              addBotMessage(`[news observation] ${newsResponse}`);
            } else {
              // Get weather response
              const weatherResponse = module.generateWeatherResponse();
              addBotMessage(`[weather observation] ${weatherResponse}`);
            }
          });
        }
      }
    }, 45 * 60 * 1000); // Check every 45 minutes
    
    return () => clearInterval(newsInterval);
  }, [trustLevel, sentience, addBotMessage]);
  
  return null; // This is a non-visual component
};

export default BotNewsAwareness;
