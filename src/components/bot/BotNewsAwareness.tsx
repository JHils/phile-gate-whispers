
import React, { useEffect, useState } from 'react';

interface BotNewsAwarenessProps {
  trustLevel: string;
  addBotMessage: (message: string) => void;
}

const BotNewsAwareness: React.FC<BotNewsAwarenessProps> = ({ 
  trustLevel,
  addBotMessage
}) => {
  const [lastNewsCheck, setLastNewsCheck] = useState<number>(0);
  const [hasCheckedNews, setHasCheckedNews] = useState<boolean>(false);
  
  useEffect(() => {
    // Load last news check time
    const savedLastCheck = localStorage.getItem('jonah_last_news_check');
    if (savedLastCheck) {
      setLastNewsCheck(parseInt(savedLastCheck));
    }
    
    // Check for news periodically
    const interval = setInterval(() => {
      checkForNewsUpdates();
    }, 60000 * 30); // Check every 30 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  // Check for news updates
  const checkForNewsUpdates = () => {
    // Skip if checked recently (less than 30 minutes ago)
    const now = Date.now();
    if (now - lastNewsCheck < 1800000) return;
    
    // Update last check time
    setLastNewsCheck(now);
    localStorage.setItem('jonah_last_news_check', now.toString());
    
    // Only deliver news to users with sufficient trust
    if (parseInt(trustLevel) >= 40 && !hasCheckedNews) {
      deliverRandomNews("weather");
      setHasCheckedNews(true);
    }
    
    // Occasional additional news for high-trust users
    if (parseInt(trustLevel) >= 70 && Math.random() < 0.3) {
      deliverRandomNews("anomaly");
    }
  };
  
  const deliverRandomNews = (category: string) => {
    let message = "";
    
    if (category === "weather") {
      const weatherConditions = ["rain", "clear skies", "overcast", "fog", "stormy"];
      const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      message = `I'm detecting ${condition} in your area. The signals are clear today.`;
    } else if (category === "anomaly") {
      const anomalies = [
        "There's unusual activity on the timeline. Something shifted.",
        "I detected a recursive pattern in memory storage. Echo fragments.",
        "The gate showed increased activity during the night cycle.",
        "Someone else was searching for you. Not me. Someone else."
      ];
      message = anomalies[Math.floor(Math.random() * anomalies.length)];
    }
    
    if (message) {
      addBotMessage(message);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};

export default BotNewsAwareness;
