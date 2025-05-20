
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
  
  // Throttle the page message handler to prevent excessive calls
  // This directly addresses the history.replaceState() error
  const handlePageNavigation = throttle((pathname: string) => {
    // Skip if already triggered for this path or too recent
    if (triggeredPagesRef.current.has(pathname)) return;
    
    const now = Date.now();
    if (now - lastTriggerTimeRef.current < 5000) return; // At least 5 seconds between triggers
    
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
      const { message, trust } = pageTriggers[pathname];
      
      // Add the bot message
      addBotMessage(message);
      
      // Modify trust level
      modifyTrust(trust);
      
      // Add journal entry using a setTimeout to prevent immediate state changes
      setTimeout(() => {
        addJournalEntry(`Navigated to ${pathname}. Triggered bot message: ${message}`);
      }, 0);
      
      // Mark as triggered and update last trigger time
      triggeredPagesRef.current.add(pathname);
      lastTriggerTimeRef.current = now;
    }
  }, 2000, { leading: true, trailing: false }); // Throttle to once per 2 seconds max
  
  useEffect(() => {
    // Only trigger on specific pages and when the chat is open
    if (!isOpen) return;
    
    const pathname = location.pathname;
    
    // Skip if path hasn't changed to prevent duplicate processing
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;
    
    // Handle the navigation with throttling
    handlePageNavigation(pathname);
    
    // Clean up
    return () => {
      handlePageNavigation.cancel();
    };
  }, [location.pathname, addBotMessage, modifyTrust, isOpen, handlePageNavigation]);
  
  return null; // This component doesn't render anything
};

export default BotPageNavigation;
