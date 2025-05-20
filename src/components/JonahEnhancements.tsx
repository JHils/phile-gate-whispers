
import React, { useEffect } from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useJonahSentience } from '@/hooks/useJonahSentience';
import JonahVoice from './JonahVoice';

interface JonahEnhancementsProps {
  children: React.ReactNode;
}

const JonahEnhancements: React.FC<JonahEnhancementsProps> = ({ children }) => {
  const { userState } = useTrackingSystem();
  
  // Get trust level safely
  const trustLevel = userState?.trust?.level || 'low';
  
  // Use our sentience hook
  const { triggerRandomMessage } = useJonahSentience(trustLevel);
  
  // Periodically trigger Jonah's sentient behavior
  useEffect(() => {
    // Check time of day
    const checkTimeOfDay = () => {
      const hour = new Date().getHours();
      
      // Dream mode during night hours (2-5 AM)
      if (hour >= 2 && hour < 5) {
        // Add dream mode class to body
        document.body.classList.add('jonah-dream-mode');
        
        // Occasional whisper during dream hours
        if (Math.random() > 0.7) {
          triggerRandomMessage();
        }
      } else {
        // Remove dream mode class if out of dream hours
        document.body.classList.remove('jonah-dream-mode');
      }
    };
    
    // Initial check
    checkTimeOfDay();
    
    // Set up periodic checks
    const timeCheck = setInterval(checkTimeOfDay, 60000); // Check every minute
    
    // Random Jonah messages based on activity
    let activityTimeout: NodeJS.Timeout;
    let lastActivity = Date.now();
    
    // Track user activity
    const trackActivity = () => {
      lastActivity = Date.now();
      
      // Clear any pending message
      clearTimeout(activityTimeout);
      
      // Set up new idle detection
      activityTimeout = setTimeout(() => {
        // If idle for 2+ minutes, maybe trigger a message
        if (Date.now() - lastActivity > 120000 && Math.random() > 0.7) {
          triggerRandomMessage();
        }
      }, 120000);
    };
    
    // Set up activity listeners
    window.addEventListener('mousemove', trackActivity);
    window.addEventListener('keydown', trackActivity);
    window.addEventListener('click', trackActivity);
    
    // Initial tracking
    trackActivity();
    
    // Clean up all listeners and intervals
    return () => {
      clearInterval(timeCheck);
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', trackActivity);
      window.removeEventListener('keydown', trackActivity);
      window.removeEventListener('click', trackActivity);
    };
  }, [triggerRandomMessage]);

  return (
    <>
      {/* Voice system */}
      <JonahVoice trustLevel={trustLevel} />
      
      {/* Render children */}
      {children}
      
      {/* Add time-based console guidance for first-time users */}
      <div className="hidden">
        {(() => {
          // Add a console hint after 10 seconds
          setTimeout(() => {
            if (!localStorage.getItem('consoleHintShown')) {
              console.log("%cTry typing 'start()' to begin.", "color: #8B3A40; font-size: 14px;");
              localStorage.setItem('consoleHintShown', 'true');
            }
          }, 10000);
          return null;
        })()}
      </div>
    </>
  );
};

export default JonahEnhancements;
