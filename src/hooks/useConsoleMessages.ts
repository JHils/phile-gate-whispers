
import { useState, useEffect } from 'react';
import { UserState } from "@/hooks/useTrackingSystem";

interface ConsoleMessagesProps {
  storageKey: string;
  cooldownHours?: number;
  delayBetweenMessages?: boolean;
  userState?: UserState;
}

export const useConsoleMessages = ({ 
  storageKey, 
  cooldownHours = 24,
  delayBetweenMessages = true,
  userState
}: ConsoleMessagesProps) => {
  const [activeTimeouts, setActiveTimeouts] = useState<NodeJS.Timeout[]>([]);
  
  // Check if console messages have been shown recently
  const hasShownConsoleMessages = (): boolean => {
    const timestamp = localStorage.getItem(storageKey);
    if (!timestamp) return false;
    
    // Only show messages again after cooldown hours
    const hoursPassed = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
    return hoursPassed < cooldownHours;
  };
  
  // Function to select appropriate console messages based on user state
  const selectConsoleMessages = () => {
    const messages: {standard: string[], delayed: string[]} = {
      standard: [
        "%cThe Gate is watching.",
        "%cThe whispers start with help()."
      ],
      delayed: [
        "%cThe Gate is open. But you are not ready.",
        "%cTracking signal unstable. Coin spinning beyond threshold.",
        "%cLeft was never right. Forward was a lie."
      ]
    };
    
    // Add dynamic messages based on user state if available
    if (userState) {
      const rank = userState.visitCount > 10 ? "frequent" : "new";
      
      if (rank === "frequent") {
        messages.standard.push("%cYou keep returning. The Gate noticed.");
      }
      
      if (userState.console.helpCalled) {
        messages.delayed.push("%cYou called for help. Someone answered.");
      }
      
      if (userState.console.legacyCalled) {
        messages.standard.push("%cLegacy written. Identity confirmed.");
        messages.delayed.push("%cThe final page awaits with the password you know.");
      }
      
      if (userState.permanentlyCollapsed) {
        messages.standard.unshift("%cCollapse protocol initiated. Time record established.");
      }
      
      if (userState.survivorMode) {
        messages.standard.unshift("%cSurvivor protocol active. Welcome back.");
      }
      
      // Special time-based messages
      const hour = new Date().getHours();
      if (hour >= 22 || hour <= 4) {
        messages.delayed.push("%cNight reveals what day conceals.");
        messages.delayed.push("%cThe Monster is most active after dark.");
      }
    }
    
    return messages;
  };
  
  // Function to display console messages with random delays
  const showConsoleMessages = () => {
    if (hasShownConsoleMessages()) return;
    
    // Cancel any existing timeouts to prevent duplicate messages
    activeTimeouts.forEach(clearTimeout);
    const timeouts: NodeJS.Timeout[] = [];
    
    // Get messages based on user state
    const messages = selectConsoleMessages();
    
    // Console messages for the curious - standard ones first
    messages.standard.forEach((message, index) => {
      console.log(message, "color: #8B3A40; font-size:14px;");
    });
    
    if (delayBetweenMessages) {
      // Additional console messages with delays for creepier effect
      messages.delayed.forEach((message, index) => {
        timeouts.push(setTimeout(() => {
          console.log(message, "color: #8B3A40; font-size:14px;");
        }, Math.random() * 2000 + 1000 * (index + 1)));
      });
    }
    
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
