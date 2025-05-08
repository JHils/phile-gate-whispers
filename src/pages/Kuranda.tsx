
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { Button } from '@/components/ui/button';
import { useConsoleMessages } from '../hooks/useConsoleMessages';

const Kuranda = () => {
  const { trackEvent, userState } = useTrackingSystem();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [cableCarHovered, setCableCarHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'kuranda_console_messages_shown',
    userState 
  });
  
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
    showConsoleMessages();
    
    // Animate quote into view
    setTimeout(() => {
      setShowQuote(true);
    }, 800);
  }, [trackEvent, showConsoleMessages]);
  
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
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-16 md:pt-24 relative overflow-hidden"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60')"
      }}
    >
      {/* Parallax layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          transform: "translateZ(-10px) scale(2)",
          zIndex: -2,
        }}
      ></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          transform: "translateZ(-5px) scale(1.5)",
          zIndex: -1,
        }}
      ></div>
      
      <div className="max-w-3xl p-8 bg-black/30 backdrop-blur-sm rounded-lg text-center text-white z-10">
        <h1 className="text-5xl md:text-6xl font-serif mb-4 animate-fade-in">KURANDA</h1>
        <p className="text-xl mb-12 italic animate-fade-in" style={{animationDelay: "0.3s"}}>
          "For one day, everything slowed down."
        </p>
        
        {/* Memory Quote */}
        <div className={`transition-opacity duration-1000 ${showQuote ? 'opacity-100' : 'opacity-0'}`}>
          <div className="my-12 p-6 bg-black/20 backdrop-blur-md rounded-lg font-serif">
            <p className="text-lg md:text-xl leading-relaxed">
              "We climbed the mountain by rail and came down in a floating glass coffin.<br/>
              Samantha was terrified. I was telling jokes no one laughed at.<br/>
              But for a moment, suspended between tree canopy and sky —<br/>
              I felt still."
            </p>
          </div>
          
          {/* Interactive Cable Car */}
          <div 
            className="my-12 relative hover-container cursor-pointer"
            onMouseEnter={() => setCableCarHovered(true)}
            onMouseLeave={() => setCableCarHovered(false)}
          >
            <div className="w-48 h-32 mx-auto border-2 border-white/50 rounded-lg flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 hover:bg-black/50 transition-all">
              <p className="text-white/70">Cable Car</p>
              <div className="absolute w-full -bottom-3 border-b border-white/30"></div>
              <div className="absolute w-1 h-16 -top-16 left-1/2 transform -translate-x-1/2 border-l border-white/30"></div>
            </div>
            
            {cableCarHovered && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/70 backdrop-blur-md p-3 rounded text-white/90 animate-fade-in max-w-xs">
                "If we fall out… do you think the web will catch us?"
              </div>
            )}
          </div>
          
          <Button 
            onClick={toggleAudio}
            variant="outline"
            className="mb-8 mt-4 border-white/30 text-white hover:bg-white/20"
          >
            {audioPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
          </Button>
        </div>
        
        <div className="absolute bottom-6 right-6 animate-subtle-flicker">
          <Link to="/gate" className="text-white/80 hover:text-white underline transition-colors font-serif">
            [Back to the philes]
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Kuranda;
