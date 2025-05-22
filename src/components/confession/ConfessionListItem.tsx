
import React from 'react';
import { ConfessionEntry, EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

interface ConfessionListItemProps {
  confession: ConfessionEntry;
  onClick: (confession: ConfessionEntry) => void;
}

const ConfessionListItem: React.FC<ConfessionListItemProps> = ({ confession, onClick }) => {
  // Get short preview of confession content
  const getPreview = (content: string): string => {
    if (content.length <= 60) return content;
    return content.substring(0, 60) + '...';
  };
  
  // Helper function to get emotion color class
  const getEmotionColor = (emotion: EmotionCategory | string): string => {
    if (typeof emotion === 'string') {
      switch (emotion) {
        case 'fear':
          return 'bg-purple-900 text-white';
        case 'anger':
          return 'bg-red-900 text-white';
        case 'sadness':
          return 'bg-blue-900 text-white';
        case 'joy':
          return 'bg-yellow-600 text-black';
        case 'trust':
          return 'bg-green-800 text-white';
        case 'curiosity':
          return 'bg-cyan-800 text-white';
        default:
          return 'bg-gray-700 text-white';
      }
    }
    return 'bg-gray-700 text-white';
  };

  // Use either emotionalContext or sentiment as the emotion
  const emotionToDisplay = confession.emotionalContext || confession.sentiment;
  const displayContent = confession.content || confession.text;

  return (
    <div 
      className="p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
      onClick={() => onClick(confession)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getEmotionColor(emotionToDisplay)}`}>
            {typeof emotionToDisplay === 'string' ? emotionToDisplay : 'unknown'}
          </span>
          
          {confession.isCorrupted && (
            <span className="ml-2 inline-block px-2 py-0.5 bg-red-800 text-white rounded-full text-xs">
              Corrupted
            </span>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          {new Date(confession.timestamp).toLocaleDateString()}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm">
        {getPreview(displayContent)}
      </p>
    </div>
  );
};

export default ConfessionListItem;
