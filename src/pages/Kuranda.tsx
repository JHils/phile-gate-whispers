
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { Button } from '@/components/ui/button';

const Kuranda = () => {
  const { trackEvent } = useTrackingSystem();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element for jungle ambience
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Track page visit
  useEffect(() => {
    trackEvent('visited_kuranda');
  }, [trackEvent]);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };
  
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60')"
      }}
    >
      <div className="max-w-lg p-8 bg-black/30 backdrop-blur-sm rounded-lg text-center text-white">
        <h1 className="text-4xl font-serif mb-6">You Survived the Web</h1>
        <p className="text-xl mb-8">Breathe. The rainforest welcomes you to Kuranda.</p>
        
        <Button 
          onClick={toggleAudio}
          variant="outline"
          className="mb-6 border-white/30 text-white hover:bg-white/20"
        >
          {audioPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
        </Button>
        
        <div className="mt-8">
          <Link to="/gate" className="text-white/80 hover:text-white underline transition-colors">
            Return to the Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Kuranda;
