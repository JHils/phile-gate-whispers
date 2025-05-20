
import { useState, useEffect } from 'react';

export const useIdleTimer = () => {
  const [idleTime, setIdleTime] = useState(0);
  const [showIdleMessage, setShowIdleMessage] = useState(false);
  
  useEffect(() => {
    // Reset idle timer on user interaction
    const resetIdleTimer = () => setIdleTime(0);
    
    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    
    // Increment idle time every second
    const idleInterval = setInterval(() => {
      setIdleTime(prevTime => {
        // If on story section and idle for 3+ minutes, show ARG message
        if (prevTime >= 180 && window.scrollY > window.innerHeight) {
          setShowIdleMessage(true);
        }
        return prevTime + 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(idleInterval);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, []);
  
  return { idleTime, showIdleMessage };
};
