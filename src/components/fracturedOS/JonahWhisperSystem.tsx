
import React, { useEffect, useState, useCallback } from 'react';
import { getRandomIdleWhisper, getRandomHoverQuote } from '@/utils/jonahVoice';

const JonahWhisperSystem: React.FC = () => {
  const [idleWhisper, setIdleWhisper] = useState<string>('');
  const [showWhisper, setShowWhisper] = useState<boolean>(false);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Track user activity
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowWhisper(false);
  }, []);

  // Set up activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [updateActivity]);

  // Check for idle state and show whispers
  useEffect(() => {
    const checkIdle = setInterval(() => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      
      // Show whisper after 2 minutes of inactivity
      if (timeSinceActivity > 120000 && !showWhisper) {
        setIdleWhisper(getRandomIdleWhisper());
        setShowWhisper(true);
        
        // Hide whisper after 5 seconds
        setTimeout(() => {
          setShowWhisper(false);
        }, 5000);
      }
    }, 5000);

    return () => clearInterval(checkIdle);
  }, [lastActivity, showWhisper]);

  // Add hover quote system to elements
  useEffect(() => {
    const addHoverQuotes = () => {
      const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
      
      interactiveElements.forEach(element => {
        if (!element.hasAttribute('data-whisper-added')) {
          element.setAttribute('data-whisper-added', 'true');
          element.setAttribute('title', getRandomHoverQuote());
        }
      });
    };

    // Initial setup
    addHoverQuotes();
    
    // Re-run when DOM changes
    const observer = new MutationObserver(addHoverQuotes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!showWhisper) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="bg-black/90 text-green-400 px-4 py-2 rounded-lg border border-green-500/30 font-mono text-sm max-w-xs animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="italic">{idleWhisper}</span>
        </div>
      </div>
    </div>
  );
};

export default JonahWhisperSystem;
