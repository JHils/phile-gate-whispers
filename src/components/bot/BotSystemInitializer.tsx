
import React, { useEffect } from 'react';
import { initializeAdvancedBehavior } from '@/utils/jonahAdvancedBehavior';

/**
 * Initializes all required Jonah systems for the chat bot
 */
const BotSystemInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize Jonah's advanced behavior system
    initializeAdvancedBehavior();
    
    // Mark that Jonah was initialized (for other components to use)
    window.JonahInitialized = true;
  }, []);
  
  return null; // This is a utility component with no UI
};

export default BotSystemInitializer;

// Add to window global type
declare global {
  interface Window {
    JonahInitialized?: boolean;
  }
}
