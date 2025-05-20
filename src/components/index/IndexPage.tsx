
import React, { useState, useEffect } from 'react';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useConsoleMessages } from '@/hooks/useConsoleMessages';
import JonahHiddenData from './JonahHiddenData';
import JonahBackgroundOverlay from './JonahBackgroundOverlay';
import HiddenComments from './HiddenComments';
import KeyholeEasterEgg from './KeyholeEasterEgg';
import { Link } from 'react-router-dom';

interface IndexPageProps {
  title?: string;
  subtitle?: string;
  description?: string | string[];
  callToAction?: {
    text: string;
    url: string;
  };
}

const IndexPage: React.FC<IndexPageProps> = ({
  title = "JONAH'S PHILES",
  subtitle = "TIMELINE ARCHIVE",
  description = "Explore the fractured timelines and discover the truth behind the Gate.",
  callToAction = { text: "ENTER THE GATE", url: "/gate" }
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const { userState, trackEvent } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'index_console_messages_shown',
    userState 
  });

  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 300);
    
    // Track page visit
    trackEvent('visited_index');
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Occasionally trigger glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 8000);
    
    // Console hint
    console.log("Psst. Try typing: help()");
    
    return () => clearInterval(glitchInterval);
  }, [trackEvent, showConsoleMessages]);

  // Format description as string if it's an array
  const formattedDescription = typeof description === 'string' 
    ? description 
    : description.join(' ');

  return (
    <div 
      className={`min-h-screen flex flex-col justify-center items-center relative overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${glitchActive ? 'white-flash' : ''}`}
      style={{ 
        backgroundColor: "#0F0F0F", 
        backgroundImage: "radial-gradient(circle at center, #1F1F1F 0%, #0F0F0F 70%)"
      }}
    >
      {/* CRT scan lines effect */}
      <div className="fixed inset-0 bg-scanlines pointer-events-none opacity-20"></div>
      
      {/* Main content */}
      <div className="z-10 text-center px-4">
        <h1 className={`text-4xl md:text-6xl font-serif text-gray-200 glitch-text ${glitchActive ? 'active' : ''}`}>
          {title}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-gray-400 mt-2 font-mono tracking-wider">
          {subtitle}
        </h2>
        
        <p className="max-w-md mx-auto mt-8 text-gray-300 text-lg">
          {formattedDescription}
        </p>
        
        <div className="mt-12">
          <Link
            to={callToAction.url}
            className="px-8 py-3 border border-gray-400 text-gray-200 hover:bg-gray-800 transition-colors duration-300 font-mono tracking-widest"
          >
            {callToAction.text}
          </Link>
        </div>
      </div>
      
      {/* Hidden elements and data */}
      <JonahHiddenData userState={userState} />
      <JonahBackgroundOverlay />
      <HiddenComments />
      <KeyholeEasterEgg />
      
      {/* Version number */}
      <div className="fixed bottom-2 right-2 text-gray-600 text-xs font-mono">
        v3.7.2 / TIMELINE STABLE
      </div>
    </div>
  );
};

export default IndexPage;
