
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import JonahBackgroundOverlay from './JonahBackgroundOverlay';
import NavLinks from './NavLinks';
import PageHeader from './PageHeader';
import HiddenComments from './HiddenComments';
import VisibilityChangeDetector from './VisibilityChangeDetector';
import KeyholeEasterEgg from './KeyholeEasterEgg';
import FooterText from './FooterText';
import TrustVisualIndicators from './TrustVisualIndicators';
import MessageText from './MessageText';
import JonahHiddenData from './JonahHiddenData';

interface UserState {
  visitCount?: number;
  trust?: {
    level?: string;
  };
  collapse?: {
    message?: string | null;
    permanent?: boolean;
  };
  messages?: {
    whisper?: string;
  };
  pageSeen?: {
    gate?: boolean;
  };
  console?: {
    rank?: string;
  };
}

const IndexPage = () => {
  const { userState, updateUserState } = useTrackingSystem();
  const navigate = useNavigate();
  const [hasSeenPage, setHasSeenPage] = useState(false);
  
  // Log page visit
  useEffect(() => {
    if (!hasSeenPage) {
      updateUserState({ pageSeen: { gate: true } });
      setHasSeenPage(true);
    }
  }, [hasSeenPage, updateUserState]);
  
  const [showHint, setShowHint] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 10000); // Show after 10 seconds
    
    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);
  
  const handleButtonClick = () => {
    navigate('/campfire');
  };

  // Helper function for text spans
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block hover:text-dust-red hover:-translate-y-1 transition-all duration-300 ease-in-out">{char}</span>
    ));
  };

  // Trust level from user state
  const trustLevel = userState?.trust?.level || 'low';
  
  // Check if it's a special time window
  const isSpecialTime = typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow();
  
  // Collapse messaging
  const collapseMessage = userState?.collapse?.message || null;
  const userIsPermanentlyCollapsed = userState?.collapse?.permanent || false;
  
  // Whisper text
  const whisperText = userState?.messages?.whisper || "They wait for you in the dark corners of the web.";
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Overlay */}
      <JonahBackgroundOverlay />
      
      {/* Page Content */}
      <div className="relative z-10 phile-container mx-auto">
        
        {/* Page Header with fade-in animation */}
        <div className="animate-fade-in">
          <PageHeader trustLevel={trustLevel} />
        </div>
        
        {/* Navigation Links with staggered fade-in */}
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <NavLinks trustLevel={trustLevel} isSpecialTime={isSpecialTime} />
        </div>
        
        {/* Main Content with fade-in animation */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif mobile-scale-down">
            Welcome, Phile.
          </h1>
          
          {/* Message Text */}
          <MessageText 
            addSpans={addSpans} 
            whisperText={whisperText}
            collapseMessage={collapseMessage}
            userIsPermanentlyCollapsed={userIsPermanentlyCollapsed}
          />
          
          {/* Trust Visual Indicators */}
          <TrustVisualIndicators trustLevel={trustLevel} />
          
          {/* Button to Campfire with hover animation */}
          <Button 
            size="lg" 
            className="mt-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={handleButtonClick}
          >
            Enter the Campfire
          </Button>
          
          {/* Hint Message */}
          {showHint && (
            <p className="mt-4 text-gray-500 animate-subtle-flicker">
              Psst... check the source code. There might be something hidden.
            </p>
          )}
        </div>
        
        {/* Footer Text with fade-in animation */}
        <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
          <FooterText visitCount={userState.visitCount || 1} />
        </div>
      </div>
      
      {/* Hidden Elements */}
      <HiddenComments />
      <VisibilityChangeDetector trustLevel={trustLevel} />
      <KeyholeEasterEgg />
      <JonahHiddenData userState={userState} />
    </div>
  );
};

export default IndexPage;
