
import React, { useState } from 'react';
import { jonahVoice } from '@/utils/jonahVoice';

interface MoodPollProps {
  onMoodSelect?: (mood: string) => void;
  pageContext?: string;
}

const MoodPoll: React.FC<MoodPollProps> = ({ onMoodSelect, pageContext = 'unknown' }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showPoll, setShowPoll] = useState(true);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect?.(mood);
    
    // Store mood data
    const moodData = JSON.parse(localStorage.getItem('jonahMoodData') || '{}');
    if (!moodData[pageContext]) moodData[pageContext] = {};
    if (!moodData[pageContext][mood]) moodData[pageContext][mood] = 0;
    moodData[pageContext][mood]++;
    localStorage.setItem('jonahMoodData', JSON.stringify(moodData));
    
    // Hide poll after selection
    setTimeout(() => setShowPoll(false), 2000);
  };

  if (!showPoll) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm">
      <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 font-mono">
        <div className="text-red-400 text-sm mb-3">
          How did this make you feel?
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {jonahVoice.moodPoll.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className="px-3 py-1 text-xs border border-red-500/30 rounded hover:bg-red-500/10 hover:border-red-500/60 transition-all duration-200 text-red-300 hover:text-red-200"
            >
              {mood}
            </button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="mt-3 pt-3 border-t border-red-500/20 text-red-400/80 text-xs italic">
            "{selectedMood}" - Noted in your psychological profile.
          </div>
        )}
        
        <button
          onClick={() => setShowPoll(false)}
          className="absolute top-2 right-2 text-red-500/60 hover:text-red-400 text-xs"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MoodPoll;
