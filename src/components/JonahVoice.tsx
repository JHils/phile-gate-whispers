
import React, { useEffect, useState } from 'react';

interface JonahVoiceProps {
  trustLevel: string;
}

interface AudioMap {
  [key: string]: string;
}

const JonahVoice: React.FC<JonahVoiceProps> = ({ trustLevel }) => {
  const [lastVisit, setLastVisit] = useState<Date | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('');
  
  // Audio file paths organized by type and trust level
  const audioFiles: {[key: string]: AudioMap} = {
    return: {
      default: '/audio/jonah/you-came-back.mp3'
    },
    testament: {
      default: '/audio/jonah/dont-ask-what-happened-here.mp3'
    },
    hidden: {
      default: '/audio/jonah/i-dreamed-you-would-find-this.mp3'
    },
    fallback: {
      default: '/audio/jonah/i-cant-say-that-but-i-can-hum.mp3'
    }
  };
  
  // Check for last visit time
  useEffect(() => {
    const storedVisit = localStorage.getItem('lastVisitTime');
    if (storedVisit) {
      const lastVisitDate = new Date(storedVisit);
      setLastVisit(lastVisitDate);
      
      const currentTime = new Date();
      const hoursDiff = (currentTime.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60);
      
      // If user returns after >12 hours
      if (hoursDiff > 12) {
        playAudio('return');
      }
    }
    
    // Update last visit time
    localStorage.setItem('lastVisitTime', new Date().toISOString());
    
    // Track current path
    setCurrentPath(window.location.pathname);
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);
  
  // Watch for path changes to trigger audio
  useEffect(() => {
    if (currentPath === '/testament') {
      playAudio('testament');
    } else if (['/door', '/mirror-logs', '/legacy', '/philes'].includes(currentPath) && trustLevel === 'high') {
      playAudio('hidden');
    }
  }, [currentPath, trustLevel]);
  
  // Function to play audio based on trigger type
  const playAudio = (triggerType: string) => {
    // Check if audio exists for this trust level, otherwise use default
    const trustKey = audioFiles[triggerType][trustLevel] ? trustLevel : 'default';
    const audioSrc = audioFiles[triggerType][trustKey];
    
    if (!audioSrc) {
      console.error(`No audio found for trigger: ${triggerType}, trust: ${trustKey}`);
      return;
    }
    
    try {
      const audio = new Audio(audioSrc);
      audio.volume = 0.7; // Slightly reduced volume
      audio.play().catch(err => {
        console.warn('Audio playback prevented:', err);
        // Most browsers require user interaction before audio can play
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  
  // No UI elements to render
  return null;
};

export default JonahVoice;
