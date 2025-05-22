
import React, { useState, useEffect } from 'react';
import { getAllConfessions } from '@/utils/jonahAdvancedBehavior/confessionSystem';
import { ConfessionEntry, EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';
import ConfessionListItem from '@/components/confession/ConfessionListItem';
import ConfessionDetail from '@/components/confession/ConfessionDetail';

const ConfessionLog: React.FC = () => {
  const [confessions, setConfessions] = useState<ConfessionEntry[]>([]);
  const [selectedConfession, setSelectedConfession] = useState<ConfessionEntry | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Fetch confessions on component mount
    const fetchedConfessions = getAllConfessions();
    
    // Convert from one type to the other (they have the same shape)
    setConfessions(fetchedConfessions as unknown as ConfessionEntry[]);
  }, []);

  // Get emotion counts for filter badges
  const getEmotionCounts = () => {
    const counts: Record<string, number> = { all: confessions.length };
    
    confessions.forEach(confession => {
      // Use either emotionalContext or sentiment
      const emotionKey = (typeof confession.emotionalContext === 'string' 
        ? confession.emotionalContext 
        : confession.sentiment || 'unknown') as string;
        
      counts[emotionKey] = (counts[emotionKey] || 0) + 1;
    });
    
    return counts;
  };

  // Filter confessions by selected emotion
  const getFilteredConfessions = () => {
    if (filter === 'all') return confessions;
    
    return confessions.filter(confession => {
      // Use either emotionalContext or sentiment
      const emotionKey = (typeof confession.emotionalContext === 'string' 
        ? confession.emotionalContext 
        : confession.sentiment || 'unknown') as string;
        
      return emotionKey === filter;
    });
  };

  const emotionCounts = getEmotionCounts();
  const filteredConfessions = getFilteredConfessions();

  return (
    <div className="bg-black text-gray-300 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-amber-500 mb-8">Confession Archive</h1>
        
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(emotionCounts).map(([emotion, count]) => (
            <button
              key={emotion}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === emotion 
                  ? 'bg-amber-600 text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setFilter(emotion)}
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)} ({count})
            </button>
          ))}
        </div>
        
        {/* Confessions List */}
        <div className="border border-gray-800 rounded-md overflow-hidden">
          {filteredConfessions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No confessions found.
            </div>
          ) : (
            filteredConfessions.map((confession, index) => (
              <ConfessionListItem 
                key={confession.id || index}
                confession={confession}
                onClick={(c) => setSelectedConfession(c)}
              />
            ))
          )}
        </div>
        
        {/* Selected Confession Detail */}
        {selectedConfession && (
          <ConfessionDetail 
            confession={selectedConfession} 
            onClose={() => setSelectedConfession(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default ConfessionLog;
