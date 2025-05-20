
import React from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

interface JonahEmotionalIndicatorsProps {
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
}

const JonahEmotionalIndicators: React.FC<JonahEmotionalIndicatorsProps> = ({
  jonahMood,
  emotionalTrend
}) => {
  // Get mood class for styling
  const getMoodClass = (mood: EmotionCategory): string => {
    switch(mood) {
      case 'fear': return 'text-red-400';
      case 'sadness': return 'text-blue-400';
      case 'anger': return 'text-yellow-400';
      case 'joy': return 'text-purple-400';
      case 'hope': return 'text-green-400';
      case 'anxiety': return 'text-orange-400';
      case 'paranoia': return 'text-pink-400';
      case 'trust': return 'text-cyan-400';
      case 'curiosity': return 'text-indigo-400';
      case 'confusion': return 'text-teal-400';
      default: return 'text-green-400';
    }
  };
  
  // Get trend indicator
  const getTrendIndicator = (trend: string): string => {
    switch(trend) {
      case 'improving': return '↑';
      case 'deteriorating': return '↓';
      case 'fluctuating': return '↔';
      default: return '→';
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm">
        <span className="text-gray-500 mr-1">Status:</span>
        <span className={getMoodClass(jonahMood)}>
          {jonahMood} {getTrendIndicator(emotionalTrend)}
        </span>
      </div>
    </div>
  );
};

export default JonahEmotionalIndicators;
