
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook to track and respond to `/forget` command with emotional responses
 */
export default function useConsoleForgetEmotions() {
  const [hasShownForgetRegret, setHasShownForgetRegret] = useState(false);
  
  // Watch for forget command usage
  useEffect(() => {
    // Check if forget command exists in JonahConsole
    if (!window.JonahConsole) return;
    
    // Set up a mutation observer to watch for console commands
    const checkForgetCommand = () => {
      // Check if forget command was ever used
      const usedCommands = window.JonahConsole?.usedCommands || [];
      const forgetUsed = usedCommands.includes('forget');
      
      // Show regret toast if command was used and we haven't shown regret yet
      if (forgetUsed && !hasShownForgetRegret && Math.random() > 0.7) {
        // Show regret toast after a delay
        setTimeout(() => {
          toast({
            title: "Jonah:",
            description: "I wish I hadn't told you that. But now it's yours.",
            variant: "destructive",
            duration: 6000,
          });
          
          // Mark as shown
          setHasShownForgetRegret(true);
        }, 30000 + Math.random() * 30000); // Random delay between 30-60 seconds
      }
    };
    
    // Check on mount
    checkForgetCommand();
    
    // Set interval to check periodically
    const interval = setInterval(checkForgetCommand, 120000); // Check every 2 minutes
    
    return () => clearInterval(interval);
  }, [hasShownForgetRegret]);
  
  // Function to manually trigger forget regret response
  const triggerForgetRegret = () => {
    if (!hasShownForgetRegret) {
      toast({
        title: "Jonah:",
        description: "I shouldn't have shared that with you. Some memories were meant to stay buried.",
        variant: "destructive",
        duration: 8000,
      });
      
      setHasShownForgetRegret(true);
      return true;
    }
    return false;
  };
  
  return {
    hasShownForgetRegret,
    triggerForgetRegret
  };
}
