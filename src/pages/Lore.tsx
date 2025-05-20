
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import refactored components
import HeroSection from '@/components/lore/HeroSection';
import StoriesSection from '@/components/lore/StoriesSection';
import CultureSection from '@/components/lore/CultureSection';
import MapSection from '@/components/lore/MapSection';
import QuoteCarousel from '@/components/lore/QuoteCarousel';
import CallToAction from '@/components/lore/CallToAction';

const Lore = () => {
  const [idleTime, setIdleTime] = useState(0);
  const [showMidnightMessage, setShowMidnightMessage] = useState(false);
  const [showIdleMessage, setShowIdleMessage] = useState(false);
  
  // Check if it's midnight
  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() < 30) {
      setShowMidnightMessage(true);
    }
    
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
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Dreamtime Story Section */}
      <StoriesSection showIdleMessage={showIdleMessage} />
      
      {/* Culture & Law Section */}
      <CultureSection />
      
      {/* Interactive Map */}
      <MapSection />
      
      {/* Quote Carousel */}
      <QuoteCarousel />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Midnight ARG Trigger */}
      {showMidnightMessage && (
        <div className="fixed bottom-10 left-10 text-amber-300/30 font-mono text-sm animate-pulse">
          <p>// The ancestors don't sleep. Why do you?</p>
        </div>
      )}
    </div>
  );
};

export default Lore;
