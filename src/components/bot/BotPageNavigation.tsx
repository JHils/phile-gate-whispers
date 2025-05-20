
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { addJournalEntry } from '@/utils/jonahRealityFabric';
import { throttle } from 'lodash';

interface BotPageNavigationProps {
  addBotMessage: (message: string, special?: boolean) => void;
  modifyTrust: (amount: number) => void;
  isOpen: boolean;
}

const BotPageNavigation: React.FC<BotPageNavigationProps> = ({ addBotMessage, modifyTrust, isOpen }) => {
  const location = useLocation();
  const previousPathRef = useRef<string>('');
  const triggeredPagesRef = useRef<Set<string>>(new Set());
  const lastTriggerTimeRef = useRef<number>(0);
  
  // Super-heavily throttled handler with multiple safeguards
  const handlePageNavigation = throttle((pathname: string) => {
    try {
      // Skip if already triggered for this path
      if (triggeredPagesRef.current.has(pathname)) return;
      
      const now = Date.now();
      // Much longer cooldown period - 2 minutes between triggers
      if (now - lastTriggerTimeRef.current < 120000) return;
      
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
      if (pathname in pageTriggers) {
        // Add additional random chance to further reduce frequency
        if (Math.random() < 0.3) { // Only 30% chance to even proceed
          const { message, trust } = pageTriggers[pathname];
          
          // Add the bot message
          addBotMessage(message);
          
          // Modify trust level
          modifyTrust(trust);
          
          // Add journal entry with an extremely small chance (5%)
          if (Math.random() < 0.05) {
            // Use setTimeout with a longer delay
            setTimeout(() => {
              try {
                addJournalEntry(`Navigated to ${pathname}. Triggered bot message: ${message}`);
              } catch (error) {
                console.error("Error adding journal entry:", error);
              }
            }, 10000); // 10 second delay
          }
          
          // Mark as triggered and update last trigger time
          triggeredPagesRef.current.add(pathname);
          lastTriggerTimeRef.current = now;
        }
      }
    } catch (error) {
      console.error("Error in page navigation handler:", error);
    }
  }, 30000, { leading: true, trailing: false }); // Extreme throttle - once per 30 seconds maximum
  
  useEffect(() => {
    // Only trigger on specific pages and when the chat is open
    if (!isOpen) return;
    
    const pathname = location.pathname;
    
    // Skip if path hasn't changed to prevent duplicate processing
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;
    
    // Add extreme randomness to further reduce frequency
    if (Math.random() < 0.2) { // Only 20% chance to even try handling navigation
      handlePageNavigation(pathname);
    }
    
    // Clean up
    return () => {
      handlePageNavigation.cancel();
    };
  }, [location.pathname, addBotMessage, modifyTrust, isOpen, handlePageNavigation]);
  
  return null; // This component doesn't render anything
};

export default BotPageNavigation;
