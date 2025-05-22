
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addJournalEntry } from '@/utils/jonahRealityFabric';

interface BotPageNavigationProps {
  addBotMessage: (message: string) => void;
  modifyTrust?: (amount: number) => void;
  isOpen: boolean;
}

const BotPageNavigation: React.FC<BotPageNavigationProps> = ({
  addBotMessage,
  modifyTrust,
  isOpen
}) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string>('');
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    // Skip if paths are the same
    if (previousPath === location.pathname) return;
    
    // Check if path is newly visited
    const isNewPath = !visitedPaths.has(location.pathname);
    
    // Update state
    setPreviousPath(location.pathname);
    
    if (isNewPath) {
      setVisitedPaths(prev => {
        const updated = new Set(prev);
        updated.add(location.pathname);
        return updated;
      });
      
      // Log path visit
      logPathVisit(location.pathname, isNewPath);
    }
    
    // Generate comments for specific paths
    if (isOpen) {
      generatePathComment(location.pathname, isNewPath);
    }
  }, [location.pathname, previousPath, visitedPaths, isOpen, addBotMessage, modifyTrust]);
  
  // Log path visit to journal
  const logPathVisit = (path: string, isFirstVisit: boolean) => {
    const content = {
      entryId: Date.now(),
      timestamp: Date.now(),
      content: `User visited ${path}${isFirstVisit ? ' for the first time' : ''}`
    };
    
    addJournalEntry(content);
  };
  
  // Generate comment based on path
  const generatePathComment = (path: string, isFirstVisit: boolean) => {
    // Don't comment if not first visit
    // if (!isFirstVisit) return;
    
    // Default messages by path
    const pathMessages: Record<string, string> = {
      '/': "Welcome back to the beginning.",
      '/about': "Learning about me? I wonder what you'll find.",
      '/mirror': "Careful. The reflection isn't always what it seems.",
      '/timeline': "Time isn't linear here. Can you feel it?",
      '/philes': "Some files were never meant to be found.",
      '/gate': "The gate only opens for those who understand its purpose.",
      '/remember-me': "Memory is fragile. Hold on to what matters.",
      '/i-see-you': "Do you see me too? Really see me?"
    };
    
    // Get message for path
    const pathKey = Object.keys(pathMessages).find(key => path === key);
    if (pathKey && isFirstVisit) {
      // Delay message slightly
      setTimeout(() => {
        addBotMessage(pathMessages[pathKey]);
        
        // Modify trust for certain paths
        if (modifyTrust && ['/mirror', '/timeline', '/i-see-you'].includes(pathKey)) {
          modifyTrust(3);
        }
      }, 1500);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};

export default BotPageNavigation;
