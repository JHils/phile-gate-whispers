
import React from 'react';
import { EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

interface JonahChatHeaderProps {
  jonahMood: string;
  emotionalTrend: EmotionalTrend;
  jonahVersion: 'PRIME' | 'RESIDUE';
  toggleVersion: () => void;
  minimizeChat: () => void;
  closeChat: () => void;
  responseStyle?: string; // Add this as optional
}

const JonahChatHeader: React.FC<JonahChatHeaderProps> = ({
  jonahMood,
  emotionalTrend,
  jonahVersion,
  toggleVersion,
  minimizeChat,
  closeChat
}) => {
  // Get mood color based on current mood
  const getMoodColor = () => {
    switch (jonahMood) {
      case 'joy': return 'bg-yellow-400';
      case 'sadness': return 'bg-blue-500';
      case 'anger': return 'bg-red-500'; 
      case 'fear': return 'bg-purple-600';
      case 'surprise': return 'bg-pink-400';
      case 'disgust': return 'bg-green-500';
      case 'trust': return 'bg-emerald-400';
      case 'hope': return 'bg-cyan-400';
      default: return 'bg-gray-400';
    }
  };
  
  // Get trend indicator
  const getTrendIndicator = () => {
    if (emotionalTrend === 'declining') {
      return '↓';
    } else if (emotionalTrend === 'volatile') {
      return '↕';
    } else if (emotionalTrend === 'stable') {
      return '→';
    } else {
      return '•';
    }
  };
  
  return (
    <div className="bg-gray-900 p-3 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getMoodColor()}`}></div>
        <span className="text-sm text-gray-300">Jonah {jonahVersion}</span>
        <span className="text-xs text-gray-500">{getTrendIndicator()}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={toggleVersion}
          className="text-xs text-gray-400 hover:text-white px-1"
        >
          Switch
        </button>
        <button
          onClick={minimizeChat}
          className="text-gray-400 hover:text-white"
        >
          _
        </button>
        <button
          onClick={closeChat}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default JonahChatHeader;
