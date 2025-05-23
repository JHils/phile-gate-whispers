
import React from 'react';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

interface JonahVisualProps {
  jonahMood: EmotionCategory;
  jonahVersion: 'PRIME' | 'RESIDUE';
  messageWeight: 'light' | 'medium' | 'heavy';
}

/**
 * JonahVisual Component
 * Renders a visual representation of Jonah's current emotional state
 */
const JonahVisual: React.FC<JonahVisualProps> = ({
  jonahMood,
  jonahVersion,
  messageWeight
}) => {
  // Map emotion categories to visual styles
  const getMoodVisualClass = (mood: EmotionCategory): string => {
    switch(mood) {
      case 'fear':
      case 'anxiety':
        return 'bg-red-900/20 border-red-700';
      case 'sadness':
      case 'melancholic':
        return 'bg-blue-900/20 border-blue-700';
      case 'anger':
        return 'bg-yellow-900/20 border-yellow-700';
      case 'joy':
      case 'hope':
        return 'bg-purple-900/20 border-purple-700';
      case 'paranoia':
      case 'suspicious':
        return 'bg-pink-900/20 border-pink-700';
      case 'trust':
        return 'bg-cyan-900/20 border-cyan-700';
      case 'curiosity':
      case 'curious':
        return 'bg-indigo-900/20 border-indigo-700';
      case 'existential':
        return 'bg-violet-900/20 border-violet-700';
      case 'analytical':
        return 'bg-emerald-900/20 border-emerald-700';
      case 'watching':
        return 'bg-slate-900/20 border-slate-700';
      case 'protective':
        return 'bg-green-900/20 border-green-700';
      case 'confusion':
      case 'confused':
        return 'bg-orange-900/20 border-orange-700';
      default:
        return 'bg-gray-900/20 border-gray-700';
    }
  };
  
  // Get emoji representation for mood (temporary until actual sprites are provided)
  const getMoodEmoji = (mood: EmotionCategory): string => {
    switch(mood) {
      case 'fear': return '😨';
      case 'anxiety': return '😰';
      case 'sadness': return '😢';
      case 'melancholic': return '😔';
      case 'anger': return '😠';
      case 'joy': return '😊';
      case 'hope': return '🙂';
      case 'paranoia': return '😳';
      case 'suspicious': return '🤨';
      case 'trust': return '🙏';
      case 'curiosity': 
      case 'curious': return '🧐';
      case 'existential': return '🌌';
      case 'analytical': return '🔍';
      case 'watching': return '👁️';
      case 'protective': return '🛡️';
      case 'confusion':
      case 'confused': return '😵';
      default: return '😐';
    }
  };

  // Animation effect based on version
  const versionEffect = jonahVersion === 'RESIDUE' 
    ? 'animate-pulse opacity-80' 
    : '';

  // Size based on message weight
  const sizeClass = {
    'light': 'w-8 h-8',
    'medium': 'w-10 h-10',
    'heavy': 'w-12 h-12'
  }[messageWeight];
  
  return (
    <div className={`relative ${versionEffect}`}>
      <div 
        className={`${sizeClass} rounded-full border-2 flex items-center justify-center ${getMoodVisualClass(jonahMood)}`}
      >
        <span className="text-xl" role="img" aria-label={`Jonah mood: ${jonahMood}`}>
          {getMoodEmoji(jonahMood)}
        </span>
      </div>
      
      {/* Version indicator */}
      {jonahVersion === 'RESIDUE' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default JonahVisual;
