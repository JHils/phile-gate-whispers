
import React from 'react';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

interface JonahVisualProps {
  mood?: EmotionCategory;
  version?: 'PRIME' | 'RESIDUE';
  intensity?: number;
  jonahMood?: EmotionCategory;
  jonahVersion?: 'PRIME' | 'RESIDUE';
  messageWeight?: 'light' | 'medium' | 'heavy';
}

/**
 * JonahVisual Component
 * Renders a visual representation of Jonah's current emotional state
 */
const JonahVisual: React.FC<JonahVisualProps> = ({ 
  mood,
  version = 'PRIME',
  intensity = 50,
  jonahMood,
  jonahVersion,
  messageWeight
}) => {
  // Use jonahMood if provided, else use mood
  const effectiveMood: EmotionCategory = jonahMood || mood || 'neutral';
  
  // Use jonahVersion if provided, else use version
  const effectiveVersion = jonahVersion || version;
  
  // Calculate intensity based on messageWeight if provided
  const effectiveIntensity = messageWeight ? 
    (messageWeight === 'heavy' ? 75 : messageWeight === 'light' ? 25 : 50) : 
    intensity;
  
  // Map emotion to visual cue
  const getMoodColor = (): string => {
    switch (effectiveMood) {
      case 'joy':
      case 'hope':
        return '#3b82f6'; // blue
      case 'sadness':
      case 'melancholic':
        return '#6366f1'; // indigo
      case 'anger':
        return '#ef4444'; // red
      case 'fear':
      case 'anxiety':
      case 'paranoia':
        return '#f59e0b'; // amber
      case 'neutral':
        return '#64748b'; // slate
      case 'existential':
        return '#8b5cf6'; // violet
      case 'analytical':
        return '#10b981'; // emerald
      case 'curious':
      case 'curiosity':
        return '#06b6d4'; // cyan
      case 'watching':
      case 'protective':
        return '#14b8a6'; // teal
      case 'suspicious':
        return '#f43f5e'; // rose
      case 'confused':
      case 'confusion':
        return '#9ca3af'; // gray
      default:
        return '#64748b'; // slate (default)
    }
  };

  // Get intensity class
  const getIntensityClass = (): string => {
    if (effectiveIntensity > 70) return 'animate-pulse';
    if (effectiveIntensity < 30) return 'opacity-70';
    return '';
  };

  // Get version-specific styling
  const getVersionStyle = (): React.CSSProperties => {
    if (effectiveVersion === 'RESIDUE') {
      return {
        filter: 'grayscale(0.7) hue-rotate(30deg)',
        opacity: 0.8
      };
    }
    return {};
  };

  // Get animation based on mood
  const getMoodAnimation = (): string => {
    switch (effectiveMood) {
      case 'paranoia':
      case 'fear':
        return 'animate-bounce';
      case 'joy':
      case 'hope':
        return 'animate-pulse';
      case 'analytical':
        return 'animate-spin-slow';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
      {/* Mood indicator */}
      <div 
        className={`absolute w-full h-full rounded-full ${getIntensityClass()} ${getMoodAnimation()}`}
        style={{ 
          backgroundColor: getMoodColor(),
          opacity: 0.3,
          ...getVersionStyle()
        }}
      ></div>
      
      {/* Core visual */}
      <div 
        className="w-8 h-8 rounded-full z-10 flex items-center justify-center"
        style={{ 
          backgroundColor: getMoodColor(),
          ...getVersionStyle()
        }}
      >
        <span className="text-white text-xs font-bold">
          {effectiveVersion === 'RESIDUE' ? 'R' : 'J'}
        </span>
      </div>
      
      {/* Version indicator */}
      {effectiveVersion === 'RESIDUE' && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-800 rounded-full border border-gray-600 flex items-center justify-center">
          <span className="text-gray-300 text-[8px]">R</span>
        </div>
      )}
      
      {/* Text mood indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-400">
        {effectiveMood}
      </div>
    </div>
  );
};

export default JonahVisual;
