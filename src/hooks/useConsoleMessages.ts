
import { useState, useEffect } from 'react';

interface ConsoleMessagesProps {
  storageKey: string;
  cooldownHours?: number;
}

export const useConsoleMessages = ({ storageKey, cooldownHours = 24 }: ConsoleMessagesProps) => {
  const [activeTimeouts, setActiveTimeouts] = useState<NodeJS.Timeout[]>([]);
  
  // Check if console messages have been shown recently
  const hasShownConsoleMessages = (): boolean => {
    const timestamp = localStorage.getItem(storageKey);
    if (!timestamp) return false;
    
    // Only show messages again after cooldown hours
    const hoursPassed = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
    return hoursPassed < cooldownHours;
  };
  
  // Function to display console messages with random delays
  const showConsoleMessages = () => {
    if (hasShownConsoleMessages()) return;
    
    // Cancel any existing timeouts to prevent duplicate messages
    activeTimeouts.forEach(clearTimeout);
    const timeouts: NodeJS.Timeout[] = [];
    
    // Console message for the curious
    console.log("%cThe Gate is watching.", "color: #8B3A40; font-size:14px;");
    console.log("%cThe whispers start with help().", "color: #475B74; font-size:14px; font-style:italic;");
    
    // Additional console messages with delays for creepier effect
    timeouts.push(setTimeout(() => {
      console.log("%cThe Gate is open. But you are not ready.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 2000 + 1000));
    
    timeouts.push(setTimeout(() => {
      console.log("%cTracking signal unstable. Coin spinning beyond threshold.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 3000 + 2000));
    
    timeouts.push(setTimeout(() => {
      console.log("%cLeft was never right. Forward was a lie.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 4000 + 3000));
    
    // Mark that we've shown the messages
    localStorage.setItem(storageKey, Date.now().toString());
    
    // Store timeouts for cleanup
    setActiveTimeouts(timeouts);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      activeTimeouts.forEach(clearTimeout);
    };
  }, [activeTimeouts]);
  
  return { showConsoleMessages, hasShownConsoleMessages };
};
