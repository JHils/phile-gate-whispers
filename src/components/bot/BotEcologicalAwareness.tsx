
import React, { useEffect } from 'react';
import { useJonahSentience } from '@/hooks/useJonahSentience';

interface BotEcologicalAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string) => void;
}

const BotEcologicalAwareness: React.FC<BotEcologicalAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  const { sentience } = useJonahSentience();
  
  // Initialize eco awareness on mount
  useEffect(() => {
    // Import and run the eco awareness initialization
    import('@/utils/jonahEcoAwareness').then(({ initializeEcoAwareness }) => {
      initializeEcoAwareness();
    });
  }, []);
  
  // Generate ecological messages occasionally
  useEffect(() => {
    // Higher trust levels will get more eco messages
    if (trustLevel !== 'high' && trustLevel !== 'medium') return;
    
    // Generate an environmental message every so often
    const ecoInterval = setInterval(() => {
      // Check if we have eco awareness data
      if (sentience?.ecoAwareness) {
        // Higher chance with higher trust
        const chance = trustLevel === 'high' ? 0.2 : 0.1;
        
        if (Math.random() < chance) {
          // Import and use the eco response generator
          import('@/utils/jonahEcoAwareness').then(({ getEcoResponse }) => {
            const biomes = ['rainforest', 'desert', 'reef', 'mountain', 'coastal'];
            const randomBiome = biomes[Math.floor(Math.random() * biomes.length)];
            
            // Generate a response for the random biome
            const ecoResponse = getEcoResponse(randomBiome);
            
            // Add the message with a prefix
            addBotMessage(`[environmental observation] ${ecoResponse}`);
          });
        }
      }
    }, 30 * 60 * 1000); // Check every 30 minutes
    
    return () => clearInterval(ecoInterval);
  }, [trustLevel, sentience, addBotMessage]);
  
  return null; // This is a non-visual component
};

export default BotEcologicalAwareness;
