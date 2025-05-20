
import React, { useEffect, useState } from 'react';
import { 
  initializeEcoAwareness, 
  getEcoResponse, 
  getBiomeResponse,
  handleEcologicalQuery 
} from '@/utils/jonahEcoAwareness';

interface BotEcologicalAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string, special?: boolean) => void;
}

const BotEcologicalAwareness: React.FC<BotEcologicalAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  const [lastChecked, setLastChecked] = useState<number>(0);
  
  // Initialize ecological awareness system on mount
  useEffect(() => {
    // Don't check too frequently
    const now = Date.now();
    if (now - lastChecked < 3600000) return; // Once per hour max
    
    const initializeEcosystem = async () => {
      initializeEcoAwareness();
      setLastChecked(Date.now());
      
      // For medium and high trust levels, occasionally send an eco message
      if ((trustLevel === 'medium' || trustLevel === 'high') && Math.random() < 0.25) {
        const ecoComment = getEcoResponse(trustLevel);
        if (ecoComment) {
          // Allow time for the user to settle in first
          setTimeout(() => {
            addBotMessage(ecoComment, true);
          }, 25000); // Wait 25 seconds before commenting
        }
      }
    };
    
    initializeEcosystem();
  }, [trustLevel, addBotMessage, lastChecked]);
  
  // Periodically check for biome-related comments (for high trust only)
  useEffect(() => {
    if (trustLevel !== 'high') return;
    
    const biomeInterval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance
        const biomeComment = getBiomeResponse();
        if (biomeComment) {
          addBotMessage(biomeComment, true);
        }
      }
    }, 60 * 60 * 1000); // Every 60 minutes
    
    return () => clearInterval(biomeInterval);
  }, [trustLevel, addBotMessage]);
  
  // No visible UI, this is just a behavior component
  return null;
};

export default BotEcologicalAwareness;
