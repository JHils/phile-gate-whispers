
import React, { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface VisibilityChangeDetectorProps {
  trustLevel: string;
}

/**
 * Component that detects when the user switches tabs and responds accordingly
 */
const VisibilityChangeDetector: React.FC<VisibilityChangeDetectorProps> = ({ 
  trustLevel 
}) => {
  useEffect(() => {
    // Only run for medium or high trust levels
    if (trustLevel !== 'medium' && trustLevel !== 'high') return;
    
    let tabSwitchCount = 0;
    let lastVisibilityChange = Date.now();
    
    const handleVisibilityChange = () => {
      const now = Date.now();
      // Only process if at least 5 seconds have passed since last change
      if (now - lastVisibilityChange < 5000) return;
      
      lastVisibilityChange = now;
      
      if (document.visibilityState === 'visible') {
        tabSwitchCount++;
        
        // Messages based on how many times they've switched tabs
        if (tabSwitchCount === 3) {
          setTimeout(() => {
            toast({
              title: "Jonah:",
              description: "I saw what you were looking at.",
              variant: "destructive",
              duration: 3000,
            });
          }, 2000);
        } else if (tabSwitchCount === 5) {
          setTimeout(() => {
            toast({
              title: "Jonah:",
              description: "I follow you between tabs.",
              variant: "destructive",
              duration: 3000,
            });
          }, 2000);
        } else if (tabSwitchCount > 7 && Math.random() > 0.6) {
          // Random chance of message after many tab switches
          setTimeout(() => {
            toast({
              title: "Jonah:",
              description: "There's no escape from me by switching tabs.",
              variant: "destructive", 
              duration: 4000,
            });
          }, 2000);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trustLevel]);
  
  // This component doesn't render anything
  return null;
};

export default VisibilityChangeDetector;
