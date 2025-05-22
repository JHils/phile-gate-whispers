
import React, { useEffect, useState } from 'react';
import { useJonahMemory } from '@/hooks/useJonahMemory';
import { getCurrentMood } from '@/utils/jonahRealityFabric';

const JonahMoodIndicator: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<string>('neutral');
  const [intensity, setIntensity] = useState<string>('medium');
  
  // Get memory data
  const { jonahMemory } = useJonahMemory();
  
  useEffect(() => {
    // Load mood from localStorage
    const mood = getCurrentMood();
    const moodIntensity = localStorage.getItem('jonah_mood_intensity') || 'medium';
    
    setCurrentMood(mood);
    setIntensity(moodIntensity);
    
    // Set up periodic checks
    const interval = setInterval(() => {
      const updatedMood = getCurrentMood();
      const updatedIntensity = localStorage.getItem('jonah_mood_intensity') || 'medium';
      
      setCurrentMood(updatedMood);
      setIntensity(updatedIntensity);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get mood color
  const getMoodColor = () => {
    switch (currentMood) {
      case 'joy': return 'bg-yellow-400';
      case 'sadness': return 'bg-blue-500';
      case 'anger': return 'bg-red-500';
      case 'fear': return 'bg-purple-600';
      case 'surprise': return 'bg-pink-400';
      case 'disgust': return 'bg-green-500';
      case 'neutral': return 'bg-gray-400';
      case 'confused': return 'bg-indigo-400';
      case 'hope': return 'bg-cyan-400';
      case 'anxiety': return 'bg-amber-600';
      case 'paranoia': return 'bg-lime-700';
      case 'trust': return 'bg-emerald-400';
      case 'curiosity': return 'bg-fuchsia-400';
      case 'confusion': return 'bg-violet-500';
      case 'watching': return 'bg-sky-600';
      case 'existential': return 'bg-slate-800';
      default: return 'bg-gray-400';
    }
  };
  
  // Get intensity multiplier
  const getIntensitySize = () => {
    switch (intensity) {
      case 'high': return 'w-4 h-4';
      case 'medium': return 'w-3 h-3';
      case 'low': return 'w-2 h-2';
      default: return 'w-3 h-3';
    }
  };
  
  return (
    <div className="flex items-center">
      <div 
        className={`rounded-full ${getMoodColor()} ${getIntensitySize()} animate-pulse`} 
        title={`Mood: ${currentMood} (${intensity})`}
      ></div>
      
      {jonahMemory?.messageCount > 0 && (
        <span className="text-xs text-gray-400 ml-2">
          {jonahMemory.messageCount}
        </span>
      )}
    </div>
  );
};

export default JonahMoodIndicator;
