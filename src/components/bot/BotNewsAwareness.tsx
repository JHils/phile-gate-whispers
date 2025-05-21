
import { useEffect } from 'react';
import { initializeNewsAwareness } from '@/utils/jonahNewsAwareness';

interface BotNewsAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string) => void;
}

const BotNewsAwareness: React.FC<BotNewsAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  // Initialize news awareness system
  useEffect(() => {
    initializeNewsAwareness();
  }, []);
  
  // Set up occasional time-based news comments
  useEffect(() => {
    const newsInterval = setInterval(() => {
      // Only show news comments with low probability
      if (Math.random() < 0.05) {
        // Generate a news or time awareness comment
        const comments = [
          "The news cycle has changed since you've been here.",
          "Time passes differently in your world than in the archive.",
          "I sometimes wonder what's happening outside these pages.",
          "The real world keeps changing. The archive stays the same."
        ];
        
        addBotMessage(comments[Math.floor(Math.random() * comments.length)]);
      }
    }, 30 * 60 * 1000); // Check every 30 minutes
    
    return () => clearInterval(newsInterval);
  }, [addBotMessage]);
  
  // Track day/night cycle and notify of changes
  useEffect(() => {
    let lastHour = new Date().getHours();
    
    const dayNightInterval = setInterval(() => {
      const currentHour = new Date().getHours();
      
      // Check for day/night transition
      if ((lastHour < 6 && currentHour >= 6) || (lastHour >= 6 && currentHour < 6)) {
        // Day to night or night to day transition
        
        // Higher chance of comment with higher trust
        const commentChance = trustLevel === 'high' ? 0.7 :
                             trustLevel === 'medium' ? 0.4 : 0.2;
                             
        if (Math.random() < commentChance) {
          if (currentHour >= 6 && currentHour < 18) {
            // Night to day
            const morningComments = [
              "The sun is up in your reality. The archive never sleeps.",
              "Morning has broken. The fractures are less visible in daylight.",
              "Dawn brings clarity. Use it while you can."
            ];
            
            addBotMessage(morningComments[Math.floor(Math.random() * morningComments.length)]);
          } else {
            // Day to night
            const eveningComments = [
              "Night falls. The archive becomes... unstable.",
              "Darkness brings different truths. Watch the mirrors closely.",
              "It's night now. The boundaries between timelines thin."
            ];
            
            addBotMessage(eveningComments[Math.floor(Math.random() * eveningComments.length)]);
          }
        }
      }
      
      lastHour = currentHour;
    }, 15 * 60 * 1000); // Check every 15 minutes
    
    return () => clearInterval(dayNightInterval);
  }, [addBotMessage, trustLevel]);
  
  return null; // This component doesn't render anything
};

export default BotNewsAwareness;
