
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
  const [audioPlayed, setAudioPlayed] = useState<{[key: string]: boolean}>({});
  
  // Audio file paths organized by type and trust level
  const audioFiles: {[key: string]: AudioMap} = {
    return: {
      default: '/audio/jonah/return-after-12h.mp3'
    },
    testament: {
      default: '/audio/jonah/testament.mp3'
    },
    hidden: {
      default: '/audio/jonah/high-trust-hidden.mp3'
    },
    fallback: {
      default: '/audio/jonah/glitch-hum.mp3'
    },
    door: {
      default: '/audio/jonah/glitch-door-trigger.mp3'
    },
    eye: {
      default: '/audio/jonah/eye-swap-event.mp3'
    },
    confess: {
      default: '/audio/jonah/confess-loop.mp3' 
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
      if (hoursDiff > 12 && !audioPlayed.return) {
        playAudio('return');
        setAudioPlayed(prev => ({...prev, return: true}));
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
  }, [audioPlayed]);
  
  // Watch for path changes to trigger audio
  useEffect(() => {
    // Reset audio played status for new page
    if (currentPath !== window.location.pathname) {
      setCurrentPath(window.location.pathname);
    }
    
    if (currentPath === '/testament' && !audioPlayed.testament) {
      playAudio('testament');
      setAudioPlayed(prev => ({...prev, testament: true}));
    } 
    else if (currentPath === '/door' && !audioPlayed.door) {
      playAudio('door');
      setAudioPlayed(prev => ({...prev, door: true}));
    }
    else if (['/mirror-logs', '/legacy', '/philes'].includes(currentPath) && trustLevel === 'high' && !audioPlayed.hidden) {
      playAudio('hidden');
      setAudioPlayed(prev => ({...prev, hidden: true}));
    }
  }, [currentPath, trustLevel, audioPlayed]);
  
  // Listen for eye symbol transitions
  useEffect(() => {
    const handleEyeTransition = () => {
      if (!audioPlayed.eye) {
        playAudio('eye');
        setAudioPlayed(prev => ({...prev, eye: true}));
      }
    };
    
    // Custom event listener for eye symbol appearance
    document.addEventListener('jonahEyeSymbolAppears', handleEyeTransition);
    
    return () => {
      document.removeEventListener('jonahEyeSymbolAppears', handleEyeTransition);
    };
  }, [audioPlayed]);
  
  // Reset played status after some time to allow replaying
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setAudioPlayed({});
    }, 3600000); // Reset after 1 hour
    
    return () => clearTimeout(resetTimer);
  }, [audioPlayed]);
  
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
      
      // For looping audio like hum or confess
      if (triggerType === 'fallback' || triggerType === 'confess') {
        audio.loop = true;
      }
      
      // Add fade in effect for smoother audio experience
      audio.volume = 0;
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.7) {
          audio.volume += 0.05;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
      
      audio.play().catch(err => {
        console.warn('Audio playback prevented:', err);
        // Most browsers require user interaction before audio can play
      });
      
      // Add event to console for debugging
      console.log(`%cJonah Voice: ${triggerType} triggered`, "color: #8B3A40;");
      
      // Dispatch a custom event that other components can listen to
      document.dispatchEvent(new CustomEvent('jonahVoicePlayed', { 
        detail: { triggerType, trustLevel } 
      }));
      
      return audio;
    } catch (error) {
      console.error('Error playing audio:', error);
      return null;
    }
  };
  
  // Expose the play function to the global window object for other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.playJonahAudio = (triggerType: string) => playAudio(triggerType);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.playJonahAudio;
      }
    };
  }, [trustLevel]);
  
  // No UI elements to render
  return null;
};

// Add to the global window type
declare global {
  interface Window {
    playJonahAudio?: (triggerType: string) => void;
  }
}

export default JonahVoice;
