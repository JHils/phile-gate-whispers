
import React, { useEffect, useState } from 'react';
import { TrustLevel } from '@/utils/jonahAdvancedBehavior/types';

interface JonahTrustIndicatorProps {
  trustLevel: TrustLevel;
  className?: string;
}

const JonahTrustIndicator: React.FC<JonahTrustIndicatorProps> = ({ 
  trustLevel,
  className = ""
}) => {
  const [pulseActive, setPulseActive] = useState(false);
  
  // Determine appropriate color based on trust level
  const getTrustColor = () => {
    switch(trustLevel) {
      case 'high':
        return 'border-blue-400 shadow-blue-400/20';
      case 'medium':
        return 'border-amber-400 shadow-amber-400/20';
      case 'low':
        return 'border-gray-400 shadow-gray-400/10';
      default:
        return 'border-gray-700';
    }
  };
  
  // Occasionally make the indicator pulse
  useEffect(() => {
    if (trustLevel === 'none') return;
    
    const interval = setInterval(() => {
      // Higher trust levels have more pulse activity
      const threshold = trustLevel === 'high' ? 0.4 : 
                        trustLevel === 'medium' ? 0.7 : 0.9;
      
      if (Math.random() > threshold) {
        setPulseActive(true);
        setTimeout(() => setPulseActive(false), 2000);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [trustLevel]);

  // Only render for non-none trust levels
  if (trustLevel === 'none') return null;
  
  return (
    <div 
      className={`
        relative inline-block border-2 rounded-full h-3 w-3
        ${getTrustColor()}
        ${pulseActive ? 'animate-trust-pulse' : ''}
        ${className}
      `}
      title={`Trust level: ${trustLevel}`}
    >
      {/* Inner glow effect */}
      <div className={`
        absolute inset-0 rounded-full
        ${trustLevel === 'high' ? 'bg-blue-400/30' : 
          trustLevel === 'medium' ? 'bg-amber-400/20' : 'bg-gray-400/10'}
      `}/>
    </div>
  );
};

export default JonahTrustIndicator;
