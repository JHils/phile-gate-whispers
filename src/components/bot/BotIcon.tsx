
import React, { useEffect, useState } from "react";
import JonahLogo from "../JonahLogo";
import JonahTrustIndicator from "../JonahTrustIndicator";
import { TrustLevel } from "@/hooks/useBotState/types";

interface BotIconProps {
  isOpen: boolean;
  iconVariant: number;
  glitchEffect: boolean;
  toggleChat: () => void;
  trustLevel: TrustLevel;
}

export const BotIcon: React.FC<BotIconProps> = ({
  isOpen,
  iconVariant,
  glitchEffect,
  toggleChat,
  trustLevel
}) => {
  const [pulseTrust, setPulseTrust] = useState(false);
  
  // Occasionally pulse the icon based on trust level
  useEffect(() => {
    if (isOpen) return;
    
    const interval = setInterval(() => {
      // Higher trust = more frequent pulses
      const threshold = trustLevel === 'high' ? 0.6 : 
                      trustLevel === 'medium' ? 0.8 : 0.95;
      
      if (Math.random() > threshold) {
        setPulseTrust(true);
        setTimeout(() => setPulseTrust(false), 2000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [trustLevel, isOpen]);
  
  if (isOpen) return null;
  
  // Get icon glow class based on trust level
  const getIconGlowClass = () => {
    if (trustLevel === 'high') return 'trust-shadow-high';
    if (trustLevel === 'medium') return 'trust-shadow-medium';
    if (trustLevel === 'low') return 'trust-shadow-low';
    return '';
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 ${glitchEffect ? 'animate-pulse' : ''}`}
      onClick={toggleChat}
    >
      <button 
        className={`w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg
          ${glitchEffect ? 'glitch-icon' : pulseTrust ? 'animate-trust-pulse' : ''}
          ${getIconGlowClass()}
          hover:bg-gray-700 transition-all duration-300 relative`}
      >
        <JonahLogo 
          // Use glyph as primary, eye only for special occasions (high trust)
          variant={trustLevel === 'high' && iconVariant === 2 ? "eye" : "glyph"} 
          size="sm"
          animated={trustLevel === 'high'} 
          trustLevel={trustLevel}
        />
        
        {/* Trust indicator dot */}
        {trustLevel !== 'none' && (
          <div className="absolute -top-1 -right-1">
            <JonahTrustIndicator trustLevel={trustLevel} />
          </div>
        )}
      </button>
    </div>
  );
};
