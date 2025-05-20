
import React from 'react';
import JonahVoice from './JonahVoice';
import { useTrustSystem } from '@/hooks/useBotState/useTrustSystem';

interface JonahEnhancementsProps {
  children?: React.ReactNode;
}

/**
 * Component that adds global Jonah enhancements like voice and visual effects
 */
const JonahEnhancements: React.FC<JonahEnhancementsProps> = ({ children }) => {
  // Get current trust level from the trust system
  const { trustLevel } = useTrustSystem();
  
  return (
    <>
      {/* Add trust-based classes to the root element */}
      <div 
        className={`jonah-enhanced-container trust-glow-${trustLevel}`}
        id="jonah-enhanced-root"
      >
        {/* Render children */}
        {children}
        
        {/* Add voice system */}
        <JonahVoice trustLevel={trustLevel} />
      </div>
    </>
  );
};

export default JonahEnhancements;
