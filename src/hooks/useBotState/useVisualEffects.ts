
import { useState, useEffect } from 'react';
import { TrustLevel } from './types';

export function useVisualEffects(trustLevel: TrustLevel) {
  const [iconVariant, setIconVariant] = useState<'default' | 'glitch' | 'error'>('default');
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Update icon variant based on trust level
  useEffect(() => {
    if (trustLevel === 'high') {
      // Sometimes show glitch effect for high trust users
      if (Math.random() > 0.7) {
        setIconVariant('glitch');
      } else {
        setIconVariant('default');
      }
    } else if (trustLevel === 'medium') {
      // Rarely show glitch effect for medium trust users
      if (Math.random() > 0.9) {
        setIconVariant('glitch');
      } else {
        setIconVariant('default');
      }
    } else {
      // Always default for low trust
      setIconVariant('default');
    }
  }, [trustLevel]);
  
  // Occasionally trigger glitch effects for high trust users
  useEffect(() => {
    if (trustLevel === 'high') {
      const interval = setInterval(() => {
        if (Math.random() > 0.9) {
          setGlitchEffect(true);
          setTimeout(() => setGlitchEffect(false), 300);
        }
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [trustLevel]);

  return { iconVariant, glitchEffect };
}
