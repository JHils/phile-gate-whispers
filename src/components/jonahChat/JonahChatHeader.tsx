
import React from 'react';
import { EmotionCategory, EmotionalTrend, ResponseStyle } from '@/utils/jonahAdvancedBehavior/types';

export interface JonahChatHeaderProps {
  jonahMood: EmotionCategory;
  emotionalTrend: EmotionalTrend;
  responseStyle: ResponseStyle;
  jonahVersion: 'PRIME' | 'RESIDUE';
  toggleVersion: () => void;
  resetConversation: () => void;
  messageWeight: 'light' | 'medium' | 'heavy';
  conversationDepth: number;
}

const JonahChatHeader: React.FC<JonahChatHeaderProps> = ({
  jonahMood,
  emotionalTrend,
  responseStyle,
  jonahVersion,
  toggleVersion,
  resetConversation,
  messageWeight,
  conversationDepth
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div>
        <h2 className="text-lg font-medium flex items-center">
          <span className="mr-2">Jonah.{jonahVersion.toLowerCase()}</span>
          <span className={`w-3 h-3 rounded-full ${getMoodColor(jonahMood)}`}></span>
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
          <span className="mr-1">Mode: {responseStyle}</span>
          <span className="mx-1">|</span>
          <span className="mx-1">Trend: {emotionalTrend}</span>
          <span className="mx-1">|</span>
          <span>Depth: {conversationDepth}%</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={toggleVersion} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
          Switch to {jonahVersion === 'PRIME' ? 'RESIDUE' : 'PRIME'}
        </button>
        <button onClick={resetConversation} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

// Helper function to get color based on mood
function getMoodColor(mood: EmotionCategory): string {
  switch(mood) {
    case 'joy':
    case 'hope':
      return 'bg-green-500';
    case 'sadness':
    case 'melancholic':
      return 'bg-blue-500';
    case 'anger':
      return 'bg-red-500';
    case 'fear':
    case 'anxiety':
    case 'paranoia':
      return 'bg-purple-500';
    case 'surprise':
      return 'bg-yellow-500';
    case 'trust':
      return 'bg-teal-500';
    case 'curiosity':
    case 'curious':
      return 'bg-cyan-500';
    case 'neutral':
      return 'bg-gray-500';
    case 'confused':
    case 'confusion':
      return 'bg-amber-500';
    case 'watching':
      return 'bg-indigo-500';
    case 'analytical':
      return 'bg-blue-400';
    case 'protective':
      return 'bg-green-600';
    case 'suspicious':
      return 'bg-red-400';
    case 'disgust':
      return 'bg-emerald-600';
    case 'existential':
      return 'bg-violet-600';
    default:
      return 'bg-gray-400';
  }
}

export default JonahChatHeader;
