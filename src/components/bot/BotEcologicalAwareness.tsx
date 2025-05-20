
import React, { useEffect, useState } from 'react';
import { getUserWeather, getWeatherDescription } from '@/utils/weatherService';

interface BotEcologicalAwarenessProps {
  trustLevel: string;
  addBotMessage: (content: string, special?: boolean) => void;
}

const BotEcologicalAwareness: React.FC<BotEcologicalAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  const [lastWeatherCheck, setLastWeatherCheck] = useState<number>(0);
  
  // Only proceed if trust level is medium or high
  useEffect(() => {
    if (trustLevel !== 'medium' && trustLevel !== 'high') return;
    
    // Check weather randomly - but not too often
    const checkWeather = async () => {
      const now = Date.now();
      // Only check if 24 hours have passed since last check
      if (now - lastWeatherCheck < 24 * 60 * 60 * 1000) return;
      
      try {
        // Get weather data and generate description
        const weatherData = await getUserWeather();
        const weatherDesc = getWeatherDescription(weatherData);
        
        // 30% chance to share weather observations
        if (Math.random() < 0.3 && weatherDesc) {
          setTimeout(() => {
            addBotMessage(weatherDesc, true);
            setLastWeatherCheck(now);
          }, 2000);
        }
      } catch (error) {
        console.error("Weather check failed:", error);
      }
    };
    
    // Run weather check on component mount
    checkWeather();
    
    // Also run weather check every few hours
    const interval = setInterval(checkWeather, 6 * 60 * 60 * 1000); // every 6 hours
    
    return () => clearInterval(interval);
  }, [trustLevel, addBotMessage, lastWeatherCheck]);
  
  return null; // This is a non-visual component
};

export default BotEcologicalAwareness;
