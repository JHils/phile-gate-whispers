
import { useState, useEffect } from 'react';
import { TrustLevel } from './types';

export function useVisualEffects(trustLevel: TrustLevel) {
  const [iconVariant, setIconVariant] = useState<number>(1); // Changed to use numbers: 1 = default, 2 = glitch
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Update icon variant based on trust level
  useEffect(() => {
    if (trustLevel === 'high') {
      // Sometimes show glitch effect for high trust users
      if (Math.random() > 0.7) {
        setIconVariant(2); // Glitch glyph variant
      } else {
        setIconVariant(1); // Default eye variant
      }
    } else if (trustLevel === 'medium') {
      // Rarely show glitch effect for medium trust users
      if (Math.random() > 0.9) {
        setIconVariant(2); // Glitch glyph variant
      } else {
        setIconVariant(1); // Default eye variant
      }
    } else {
      // Always default for low trust
      setIconVariant(1); // Default eye variant
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
