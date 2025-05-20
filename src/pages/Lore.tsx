
import React from 'react';

// Import custom hooks
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { useMidnightCheck } from '@/hooks/useMidnightCheck';

// Import refactored components
import HeroSection from '@/components/lore/HeroSection';
import StoriesSection from '@/components/lore/StoriesSection';
import CultureSection from '@/components/lore/CultureSection';
import MapSection from '@/components/lore/MapSection';
import QuoteCarousel from '@/components/lore/QuoteCarousel';
import CallToAction from '@/components/lore/CallToAction';
import MidnightMessage from '@/components/lore/MidnightMessage';
import IdleMessage from '@/components/lore/IdleMessage';

const Lore = () => {
  const { showIdleMessage } = useIdleTimer();
  const { showMidnightMessage } = useMidnightCheck();
  
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
      <MidnightMessage show={showMidnightMessage} />
    </div>
  );
};

export default Lore;
