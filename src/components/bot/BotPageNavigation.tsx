
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  updateInteractionTime,
  trackSecretPageVisit, 
  getARGResponse 
} from '@/utils/argTracking';
import {
  trackPageVisit,
  getParanoiaResponse,
  getPageDurationResponse
} from '@/utils/consoleMemoryParanoia';
import { addJournalEntry } from '@/utils/jonahRealityFabric';

interface BotPageNavigationProps {
  addBotMessage: (message: string) => void;
  modifyTrust: (amount: number) => void;
  isOpen: boolean;
}

const BotPageNavigation: React.FC<BotPageNavigationProps> = ({
  addBotMessage,
  modifyTrust,
  isOpen
}) => {
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string>("");
  const [pageEntryTime, setPageEntryTime] = useState<number>(Date.now());

  // Track user interaction with the page
  useEffect(() => {
    const handleUserInteraction = () => {
      updateInteractionTime();
    };
    
    // Add event listeners for user interactions
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction);
    
    return () => {
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
    };
  }, []);

  // Track page navigation for trust modifications, secret pages, and memory paranoia
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only process if path has changed
    if (currentPath !== lastPath) {
      // Reset page entry time for duration tracking
      const now = Date.now();
      
      // If we have a previous path, we can calculate duration
      if (lastPath) {
        const timeSpent = now - pageEntryTime;
        
        // Check if we should show a duration-based paranoia message
        const durationMessage = getPageDurationResponse(timeSpent);
        if (durationMessage && Math.random() > 0.7) {
          setTimeout(() => {
            addBotMessage(durationMessage);
          }, 1000);
          
          // Add journal entry about this observation
          addJournalEntry(`Duration observation: ${durationMessage} (${Math.round(timeSpent/1000)}s on ${lastPath})`);
        }
      }
      
      // Update page entry time for new page
      setPageEntryTime(now);
      
      // Check for repeat visit paranoia
      const repeatVisitMessage = trackPageVisit(currentPath);
      if (repeatVisitMessage && Math.random() > 0.6) {
        setTimeout(() => {
          addBotMessage(repeatVisitMessage);
        }, 1500);
      }
      
      // Special hidden pages that boost trust
      const hiddenPages = ['/rebirth', '/mirror-logs', '/legacy', '/monster', '/gatekeeper', '/philes', '/toggle-market'];
      
      if (hiddenPages.includes(currentPath)) {
        // Award trust points for visiting hidden pages
        modifyTrust(10);
        
        // Track the secret page visit
        const secretResponse = trackSecretPageVisit(currentPath);
        
        // Check for paranoia response for this page
        const paranoiaResponse = getParanoiaResponse('visitedPages', currentPath);
        
        // Choose between secret response and paranoia response
        const responseToUse = Math.random() > 0.5 ? secretResponse : paranoiaResponse;
        
        // For secret pages, add a unique comment
        if (responseToUse) {
          setTimeout(() => {
            addBotMessage(responseToUse);
          }, 2000);
        }
        
        // Add journal entry about visiting a hidden page
        addJournalEntry(`Hidden page visited: ${currentPath}`);
      }
      
      // Check for ARG progression responses - pass the currentPath and trustLevel
      const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
      const argResponse = getARGResponse(currentPath, trustLevel);
      if (argResponse && Math.random() > 0.7) { // 30% chance to show ARG-specific response on page change
        setTimeout(() => {
          addBotMessage(argResponse);
        }, 3000);
      }
      
      // Check for dream invasion on page change (small chance)
      if (Math.random() > 0.9) { // 10% chance
        // Check if it's night time (higher chance for dream events)
        const hour = new Date().getHours();
        const isNightTime = (hour >= 22 || hour <= 5);
        
        if (isNightTime || Math.random() > 0.7) {
          setTimeout(() => {
            const dreamMessages = [
              "I had a dream about this page. But it ended differently.",
              "The text is different when I see it in dreams.",
              "Be careful what you read here. It's changing as you watch.",
              "This page feels unstable. Like it's not fully in this timeline."
            ];
            
            addBotMessage(dreamMessages[Math.floor(Math.random() * dreamMessages.length)]);
          }, 2500);
        }
      }
      
      // Update the last path
      setLastPath(currentPath);
    }
  }, [location.pathname, modifyTrust, addBotMessage, lastPath, pageEntryTime]);

  // Add hover detection for specific elements
  useEffect(() => {
    // Function to handle element hover
    const handleElementHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check for special classes that might indicate secret elements
      const isSecretElement = 
        target.classList.contains('easter-egg') || 
        target.classList.contains('hidden-link') || 
        target.classList.contains('keyhole') ||
        target.getAttribute('data-secret') === 'true';
      
      // If it's a secret element and we have high trust, maybe give a hint
      if (isSecretElement && localStorage.getItem('jonahTrustLevel') === 'high' && Math.random() > 0.7) {
        const hintMessages = [
          "This isn't where the real story ends.",
          "Click again. Just once. Trust me.",
          "You're close. Look harder.",
          "There's something here worth finding."
        ];
        
        const randomHint = hintMessages[Math.floor(Math.random() * hintMessages.length)];
        
        addBotMessage(randomHint);
      }
    };
    
    // Only add the hover detection if we have high trust
    if (localStorage.getItem('jonahTrustLevel') === 'high') {
      document.addEventListener('mouseover', handleElementHover);
      
      return () => {
        document.removeEventListener('mouseover', handleElementHover);
      };
    }
  }, [addBotMessage, isOpen]);

  return null; // This component doesn't render anything
};

export default BotPageNavigation;
