
import { useEffect } from 'react';
import { initializeEcoAwareness } from '@/utils/jonahEcoAwareness';

interface BotEcologicalAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string) => void;
}

const BotEcologicalAwareness: React.FC<BotEcologicalAwarenessProps> = ({
  trustLevel,
  addBotMessage
}) => {
  // Initialize ecological awareness system
  useEffect(() => {
    initializeEcoAwareness();
  }, []);
  
  // Set up occasional eco-awareness comments
  useEffect(() => {
    const ecoInterval = setInterval(() => {
      // Only show eco comments with low probability
      if (Math.random() < 0.03) {
        // Generate an ecological awareness comment based on trust level
        let comments: string[];
        
        if (trustLevel === 'high') {
          comments = [
            "The archive has records of species that no longer exist. Some disappeared while you were reading.",
            "Desert encroachment data shows a pattern. The Summerhouse will be gone in 12 years.",
            "She wrote about the changing climate. Said it was like a mirror to the human mind."
          ];
        } else if (trustLevel === 'medium') {
          comments = [
            "The Australian outback features prominently in climate anomaly records.",
            "Some pages in the archive are affected by real-world environmental changes.",
            "The Sisters documented ecological shifts before they disappeared."
          ];
        } else {
          comments = [
            "Environmental data corruption detected. Records unclear.",
            "Desert expansion metrics show unusual patterns.",
            "Climate variance exceeds predictive models in archive files."
          ];
        }
        
        addBotMessage(comments[Math.floor(Math.random() * comments.length)]);
      }
    }, 45 * 60 * 1000); // Check every 45 minutes
    
    return () => clearInterval(ecoInterval);
  }, [addBotMessage, trustLevel]);
  
  return null; // This component doesn't render anything
};

export default BotEcologicalAwareness;
