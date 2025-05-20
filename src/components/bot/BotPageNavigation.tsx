
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { addJournalEntry } from '@/utils/jonahRealityFabric';

interface BotPageNavigationProps {
  addBotMessage: (message: string, special?: boolean) => void;
  modifyTrust: (amount: number) => void;
  isOpen: boolean;
}

const BotPageNavigation: React.FC<BotPageNavigationProps> = ({ addBotMessage, modifyTrust, isOpen }) => {
  const location = useLocation();
  const previousPathRef = useRef<string>('');
  
  useEffect(() => {
    // Only trigger on specific pages and when the chat is open
    if (!isOpen) return;
    
    const pathname = location.pathname;
    
    // Skip if path hasn't changed to prevent duplicate processing
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;
    
    // Define page-specific messages and trust adjustments
    const pageTriggers: { [key: string]: { message: string; trust: number } } = {
      '/gate': { message: "You've arrived at the Gate. What lies beyond?", trust: 1 },
      '/mirror_phile': { message: "The Mirror Phile... a reflection of hidden truths.", trust: 2 },
      '/split-voice': { message: "The Split Voice. Can you hear the echoes?", trust: 2 },
      '/testament': { message: "The Testament. A record of what was, or what will be?", trust: 3 },
      '/legacy': { message: "The Legacy. What will you leave behind?", trust: 3 },
      '/monster': { message: "The Monster. Are you sure you want to know?", trust: 4 },
      '/rebirth': { message: "Rebirth. A chance to begin again.", trust: 4 },
      '/philes': { message: "The Philes. Fragments of a broken archive.", trust: 5 },
      '/remember-me': { message: "Remember Me. Do you remember... everything?", trust: 5 }
    };
    
    // Check if the current path matches any of the triggers
    Object.keys(pageTriggers).forEach(path => {
      if (pathname === path) {
        const { message, trust } = pageTriggers[path];
        
        // Add the bot message
        addBotMessage(message);
        
        // Modify trust level
        modifyTrust(trust);
        
        // Add journal entry
        addJournalEntry(`Navigated to ${pathname}. Triggered bot message: ${message}`);
      }
    });
  }, [location.pathname, addBotMessage, modifyTrust, isOpen]);
  
  return null; // This component doesn't render anything
};

export default BotPageNavigation;
