
import React from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

interface JonahChatHeaderProps {
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  conversationDepth: number;
  jonahVersion: 'PRIME' | 'RESIDUE';
  toggleVersion: () => void;
  resetConversation: () => void;
}

const JonahChatHeader: React.FC<JonahChatHeaderProps> = ({
  jonahMood,
  emotionalTrend,
  conversationDepth,
  jonahVersion,
  toggleVersion,
  resetConversation
}) => {
  // Map emotions to user-friendly descriptions
  const moodDescriptions: Record<EmotionCategory, string> = {
    fear: "anxious",
    sadness: "melancholic",
    anger: "agitated",
    joy: "optimistic",
    confusion: "uncertain",
    curiosity: "inquisitive",
    hope: "hopeful",
    anxiety: "nervous",
    paranoia: "suspicious",
    trust: "receptive",
    neutral: "observant"
  };

  // Get current mood description
  const moodDescription = moodDescriptions[jonahMood] || "observant";
  
  // Create color class based on mood
  const getMoodColorClass = () => {
    switch (jonahMood) {
      case 'fear':
      case 'anxiety':
      case 'paranoia':
        return 'bg-purple-800';
      case 'sadness':
        return 'bg-blue-700';
      case 'anger':
        return 'bg-red-600';
      case 'joy':
      case 'hope':
        return 'bg-amber-500';
      case 'confusion':
        return 'bg-gray-500';
      case 'curiosity':
      case 'trust':
        return 'bg-emerald-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  // Get trend indicator
  const getTrendIndicator = () => {
    switch (emotionalTrend) {
      case 'improving':
        return '↗';
      case 'deteriorating':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <header className="border-b border-gray-700 p-3 flex items-center justify-between bg-gray-900">
      <div className="flex items-center">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white">
            J
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Jonah {jonahVersion}</h2>
          <div className="flex items-center text-xs">
            <div className={`w-2 h-2 rounded-full mr-2 ${getMoodColorClass()}`}></div>
            <span className="text-gray-300">
              Jonah is {moodDescription} {getTrendIndicator()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={toggleVersion}
          className="px-3 py-1 rounded text-xs bg-gray-800 hover:bg-gray-700 text-white transition"
        >
          Switch
        </button>
        <button 
          onClick={resetConversation}
          className="px-3 py-1 rounded text-xs bg-gray-800 hover:bg-gray-700 text-white transition"
        >
          Reset
        </button>
      </div>
    </header>
  );
};

export default JonahChatHeader;
