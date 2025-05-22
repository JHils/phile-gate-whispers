
import React from 'react';
import { ConfessionEntry, EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

interface ConfessionDetailProps {
  confession: ConfessionEntry;
  onClose: () => void;
}

const ConfessionDetail: React.FC<ConfessionDetailProps> = ({ confession, onClose }) => {
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

  // Helper function to get emotion display name
  const getEmotionDisplayName = (emotion: EmotionCategory | string): string => {
    if (typeof emotion === 'string') {
      return emotion.charAt(0).toUpperCase() + emotion.slice(1);
    }
    return 'Unknown';
  };

  // Use either emotionalContext or sentiment as the emotion
  const emotionToDisplay = confession.emotionalContext || confession.sentiment;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className={`px-3 py-1 rounded-full text-sm ${getEmotionColor(emotionToDisplay)}`}>
                {getEmotionDisplayName(emotionToDisplay)}
              </span>
              
              {confession.isCorrupted && (
                <span className="ml-2 px-3 py-1 bg-red-800 text-white rounded-full text-sm">
                  Corrupted
                </span>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-gray-200 whitespace-pre-wrap">{confession.content || confession.text}</p>
          </div>
          
          <div className="text-sm text-gray-400">
            {new Date(confession.timestamp).toLocaleString()}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            {confession.recursive && (
              <div className="text-sm text-amber-400">
                This is a recursive confession, echoing a previous thought.
              </div>
            )}
            
            {confession.version && (
              <div className="text-xs text-gray-500 mt-2">
                Version: {confession.version}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionDetail;
