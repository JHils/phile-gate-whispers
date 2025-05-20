
import React from 'react';
import { ConfessionEntry } from '@/utils/jonahAdvancedBehavior/confessionSystem';

interface ConfessionListItemProps {
  confession: ConfessionEntry;
  isSelected: boolean;
  onSelect: (confession: ConfessionEntry) => void;
}

export const ConfessionListItem: React.FC<ConfessionListItemProps> = ({ 
  confession, 
  isSelected,
  onSelect
}) => {
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div 
      onClick={() => onSelect(confession)}
      className={`p-4 cursor-pointer hover:bg-blue-900 hover:bg-opacity-10 ${
        isSelected ? 'bg-blue-900 bg-opacity-20' : ''
      }`}
    >
      <div className="text-xs text-blue-600 mb-1">
        {formatDate(confession.timestamp)}
      </div>
      <div className="line-clamp-2">
        {confession.content}
      </div>
      <div className="flex mt-2">
        <span className={`text-xs px-2 py-0.5 ${
          confession.emotionalContext === 'fear' ? 'bg-red-900 bg-opacity-30 text-red-400' :
          confession.emotionalContext === 'anger' ? 'bg-orange-900 bg-opacity-30 text-orange-400' :
          confession.emotionalContext === 'sadness' ? 'bg-blue-900 bg-opacity-30 text-blue-400' :
          confession.emotionalContext === 'trust' ? 'bg-green-900 bg-opacity-30 text-green-400' :
          'bg-gray-800 text-gray-400'
        }`}>
          {confession.emotionalContext}
        </span>
        {confession.isCorrupted && (
          <span className="text-xs px-2 py-0.5 bg-red-900 bg-opacity-30 text-red-400 ml-2">
            corrupted
          </span>
        )}
        {confession.recursive && (
          <span className="text-xs px-2 py-0.5 bg-purple-900 bg-opacity-30 text-purple-400 ml-2">
            recursive
          </span>
        )}
      </div>
    </div>
  );
};
