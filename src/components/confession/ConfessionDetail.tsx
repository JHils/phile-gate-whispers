
import React from 'react';
import { ConfessionEntry } from '@/utils/jonahAdvancedBehavior/confessionSystem';

interface ConfessionDetailProps {
  confession: ConfessionEntry | null;
}

export const ConfessionDetail: React.FC<ConfessionDetailProps> = ({ confession }) => {
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!confession) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div>
          <div className="text-xl text-blue-500 mb-2">No confession selected</div>
          <div className="text-sm text-blue-600">
            Select a confession from the list to view details
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-blue-600">
            {formatDate(confession.timestamp)}
          </div>
          <div className="text-xs text-blue-600">
            Version: {confession.version || 1}
          </div>
        </div>
        
        <div className={`px-2 py-1 text-xs ${
          confession.isCorrupted 
            ? 'bg-red-900 bg-opacity-30 text-red-400' 
            : 'bg-blue-900 bg-opacity-30 text-blue-400'
        }`}>
          {confession.isCorrupted ? 'CORRUPTED' : 'INTACT'}
        </div>
      </div>
      
      <div className={`text-xl mt-8 mb-6 ${
        confession.isCorrupted ? 'corrupted-text' : ''
      }`}>
        {confession.content}
      </div>
      
      {confession.recursive && confession.originalId && (
        <div className="mt-8 pt-4 border-t border-blue-900">
          <div className="text-xs text-blue-600 mb-2">
            RECURSIVE REFERENCE:
          </div>
          <div className="text-sm">
            This confession refers to a previous statement.
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-4 border-t border-blue-900">
        <div className="text-xs text-blue-600 mb-2">
          EMOTIONAL CONTEXT:
        </div>
        <div className={`text-sm ${
          confession.emotionalContext === 'fear' ? 'text-red-400' :
          confession.emotionalContext === 'anger' ? 'text-orange-400' :
          confession.emotionalContext === 'sadness' ? 'text-blue-400' :
          confession.emotionalContext === 'trust' ? 'text-green-400' :
          'text-gray-400'
        }`}>
          {confession.emotionalContext.toUpperCase()}
        </div>
      </div>
      
      {confession.isCorrupted && (
        <div className="mt-8 pt-4 border-t border-blue-900">
          <div className="text-xs text-red-600 mb-2">
            CORRUPTION ANALYSIS:
          </div>
          <div className="text-sm text-red-500">
            Parts of this confession may have been deliberately altered or obscured.
            Meaning may be lost or distorted.
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-4 border-t border-blue-900">
        <div className="text-xs text-blue-600 mb-2">
          ARCHIVE NOTES:
        </div>
        <div className="text-sm italic">
          Jonah offered this confession without prompting. The emotional context
          suggests his state of mind when making this revelation.
        </div>
      </div>
    </div>
  );
};
