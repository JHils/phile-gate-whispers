
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getCrossSiteWhisper } from '@/utils/jonahRealityFabric';

interface JonahCrossSiteWhisperProps {
  trustLevel: string;
}

const JonahCrossSiteWhisper: React.FC<JonahCrossSiteWhisperProps> = ({ trustLevel }) => {
  const [lastWhisperTime, setLastWhisperTime] = useState<number>(0);
  
  useEffect(() => {
    // Only show whispers occasionally and for higher trust levels
    if (trustLevel === 'low') return;
    
    // Check for whispers when the route changes
    const handleRouteChange = () => {
      // Don't show whispers too frequently
      if (Date.now() - lastWhisperTime < 5 * 60 * 1000) return; // 5 minute cooldown
      
      // Get a cross-site whisper
      const whisper = getCrossSiteWhisper();
      if (whisper) {
        // Show the whisper in a toast
        setTimeout(() => {
          toast({
            title: "Jonah whispers:",
            description: whisper,
            variant: "destructive",
            duration: 5000
          });
          
          // Update last whisper time
          setLastWhisperTime(Date.now());
        }, 1500); // Slight delay for effect
      }
    };
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Initial check
    handleRouteChange();
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trustLevel, lastWhisperTime]);
  
  return null; // This component doesn't render anything
};

export default JonahCrossSiteWhisper;
