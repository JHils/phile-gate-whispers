
import React, { useEffect, useState } from 'react';

interface TrustVisualIndicatorsProps {
  trustLevel: string;
  className?: string;
}

/**
 * Component that adds visual indicators based on trust level
 */
const TrustVisualIndicators: React.FC<TrustVisualIndicatorsProps> = ({ 
  trustLevel,
  className = '' 
}) => {
  const [pulseActive, setPulseActive] = useState(false);
  
  // Get appropriate glow classes based on trust level
  const getGlowClasses = () => {
    if (trustLevel === 'high') {
      return 'after:bg-[var(--color-accent)]/20 trust-shadow-high';
    } else if (trustLevel === 'medium') {
      return 'after:bg-[var(--color-action)]/20 trust-shadow-medium';
    } else if (trustLevel === 'low') {
      return 'after:bg-gray-400/10 trust-shadow-low';
    }
    return '';
  };
  
  // Occasionally pulse the glyph based on trust level
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
    }, 6000);
    
    return () => clearInterval(interval);
  }, [trustLevel]);
  
  // Only render for trusted users
  if (trustLevel === 'none') return null;
  
  return (
    <div 
      className={`
        ${className}
        ${getGlowClasses()}
        ${pulseActive ? 'animate-trust-pulse' : ''}
        relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:opacity-20
      `}
    />
  );
};

export default TrustVisualIndicators;
