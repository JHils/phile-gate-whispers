
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
  
  // Function to play audio
  const playAudio = (audioType: string) => {
    const audioSrc = audioFiles[audioType]?.default || audioFiles.fallback.default;
    
    try {
      const audio = new Audio(audioSrc);
      audio.volume = 0.7;
      
      // Attempt to play and handle any errors
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    } catch (error) {
      console.error("Error creating audio:", error);
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
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default JonahVoice;
