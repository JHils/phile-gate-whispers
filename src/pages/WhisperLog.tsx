
import React, { useState, useEffect } from 'react';
import { getAllWhispers, getDiscoveredWhispers, getWhisperHint } from '@/utils/jonahAdvancedBehavior/whispers';

const WhisperLog: React.FC = () => {
  const [discoveredWhispers, setDiscoveredWhispers] = useState<any[]>([]);
  const [totalWhisperCount, setTotalWhisperCount] = useState<number>(0);
  const [hint, setHint] = useState<string>("");
  
  useEffect(() => {
    // Get whispers data
    const allWhispers = getAllWhispers();
    const discovered = getDiscoveredWhispers();
    
    setDiscoveredWhispers(discovered);
    setTotalWhisperCount(allWhispers.length);
    setHint(getWhisperHint());
  }, []);
  
  // Get a new hint
  const refreshHint = () => {
    setHint(getWhisperHint());
  };
  
  // Format discovery time
  const formatDiscoveryTime = (isoTime: string) => {
    if (!isoTime) return "Unknown";
    try {
      const date = new Date(isoTime);
      return date.toLocaleString();
    } catch (e) {
      return "Invalid date";
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-200">Whispers Log</h1>
      
      <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Discovery Progress</h2>
        <div className="flex items-center mb-4">
          <div className="w-full bg-gray-700 rounded-full h-4 mr-4">
            <div 
              className="bg-indigo-500 h-4 rounded-full"
              style={{ width: `${(discoveredWhispers.length / totalWhisperCount) * 100}%` }}
            ></div>
          </div>
          <span className="text-white whitespace-nowrap">
            {discoveredWhispers.length} / {totalWhisperCount}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Hint</h2>
          <button 
            onClick={refreshHint}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white text-sm"
          >
            New Hint
          </button>
        </div>
        <p className="text-gray-300 italic">{hint}</p>
      </div>
      
      <div className="grid gap-6">
        <h2 className="text-xl font-semibold mb-2">Discovered Whispers</h2>
        
        {discoveredWhispers.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center">
            <p className="text-gray-400">No whispers discovered yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Whispers can be found through conversation with Jonah, console commands, and exploration.
            </p>
          </div>
        ) : (
          discoveredWhispers.map(whisper => (
            <div key={whisper.id} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-indigo-300">Whisper #{whisper.id}</h3>
                <span className="text-xs text-gray-400">
                  Discovered: {formatDiscoveryTime(whisper.discoveryTime)}
                </span>
              </div>
              <p className="text-white mt-2">{whisper.content}</p>
              <div className="mt-2 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  whisper.importance > 8 ? 'bg-red-500' : 
                  whisper.importance > 5 ? 'bg-yellow-500' : 'bg-green-500'
                }`}></span>
                <span className="text-xs text-gray-400">
                  {whisper.type === 'console' ? 'Console Whisper' : 
                   whisper.type === 'visual' ? 'Visual Whisper' : 
                   whisper.type === 'audio' ? 'Audio Whisper' : 'Text Whisper'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WhisperLog;
