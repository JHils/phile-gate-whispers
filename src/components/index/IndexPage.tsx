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

const IndexPage = () => {
  const { userState, updateUserState } = useTrackingSystem();
  const navigate = useNavigate();
  const [hasSeenPage, setHasSeenPage] = useState(false);
  
  // Log page visit
  useEffect(() => {
    if (!hasSeenPage) {
      updateUserState({ lastPage: 'gate', pageSeen: { gate: true } });
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
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Overlay */}
      <JonahBackgroundOverlay />
      
      {/* Page Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <PageHeader />
        
        {/* Navigation Links */}
        <NavLinks />
        
        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Welcome, Phile.
          </h1>
          
          {/* Message Text */}
          <MessageText />
          
          {/* Trust Visual Indicators */}
          <TrustVisualIndicators />
          
          {/* Button to Campfire */}
          <Button size="lg" className="mt-8" onClick={handleButtonClick}>
            Enter the Campfire
          </Button>
          
          {/* Hint Message */}
          {showHint && (
            <p className="mt-4 text-gray-500">
              Psst... check the source code. There might be something hidden.
            </p>
          )}
        </div>
        
        {/* Footer Text */}
        <FooterText />
      </div>
      
      {/* Hidden Comments */}
      <HiddenComments />
      
      {/* Visibility Change Detector */}
      <VisibilityChangeDetector />
      
      {/* Keyhole Easter Egg */}
      <KeyholeEasterEgg />
      
      {/* Jonah Hidden Data */}
      <JonahHiddenData userState={userState} />
    </div>
  );
};

export default IndexPage;
