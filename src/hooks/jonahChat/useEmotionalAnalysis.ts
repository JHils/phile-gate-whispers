
import { useState, useCallback } from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

export function useEmotionalAnalysis() {
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [previousMoods, setPreviousMoods] = useState<EmotionCategory[]>([]);
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  
  const updateMoodAndTrend = useCallback((mood: EmotionCategory) => {
    setJonahMood(mood);
    
    // Update previous moods for trend analysis
    setPreviousMoods(prev => {
      const updatedMoods = [mood, ...prev].slice(0, 5);
      
      // Calculate trend based on mood changes
      if (updatedMoods.length >= 3) {
        const positiveEmotions = ['joy', 'hope', 'trust'];
        const negativeEmotions = ['fear', 'sadness', 'anger', 'anxiety', 'paranoia'];
        
        // Count positive and negative emotions in recent history
        const positiveCount = updatedMoods.filter(m => positiveEmotions.includes(m)).length;
        const negativeCount = updatedMoods.filter(m => negativeEmotions.includes(m)).length;
        
        if (positiveCount > negativeCount) {
          setEmotionalTrend('improving');
        } else if (negativeCount > positiveCount) {
          setEmotionalTrend('deteriorating');
        } else {
          setEmotionalTrend('stable');
        }
      }
      
      return updatedMoods;
    });
    
    return mood;
  }, []);
  
  return {
    jonahMood,
    emotionalTrend,
    updateMoodAndTrend
  };
}
