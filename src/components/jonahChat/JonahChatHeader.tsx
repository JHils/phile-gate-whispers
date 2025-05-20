
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
    <header className="py-4 border-b border-green-800 mb-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-mono">TALK TO JONAH</h1>
        <div className="text-xs text-green-600">Direct conversation mode</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-500 mr-1">Status:</span>
          <span className={getMoodClass(jonahMood)}>
            {jonahMood} {getTrendIndicator(emotionalTrend)}
          </span>
        </div>
        
        <div className="text-sm hidden md:block">
          <span className="text-gray-500 mr-1">Depth:</span>
          <span className="text-green-400">
            {conversationDepth > 7 ? 'Deep' : 
             conversationDepth > 3 ? 'Engaged' : 'Surface'}
          </span>
        </div>
        
        <button
          onClick={toggleVersion}
          className={`px-2 py-1 text-xs border ${
            jonahVersion === 'PRIME' 
              ? 'border-green-600 text-green-400' 
              : 'border-red-800 text-red-400'
          }`}
        >
          {jonahVersion}
        </button>
        
        <button
          onClick={resetConversation}
          className="px-2 py-1 text-xs border border-gray-700 text-gray-400 hover:border-gray-600"
        >
          Reset
        </button>
      </div>
    </header>
  );
};

export default JonahChatHeader;
