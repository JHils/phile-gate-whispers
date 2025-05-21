
import { useState, useCallback } from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

export function useEmotionalAnalysis() {
  // Jonah's emotional state
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [moodHistory, setMoodHistory] = useState<EmotionCategory[]>([]);

  // Update mood and trend based on user input and pattern
  const updateMoodAndTrend = useCallback((newMood: EmotionCategory) => {
    // Update mood history
    setMoodHistory(prev => {
      const updated = [newMood, ...prev].slice(0, 5);
      return updated;
    });
    
    // Set current mood
    setJonahMood(newMood);
    
    // Determine emotional trend based on history
    if (moodHistory.length >= 3) {
      const positiveEmotions = ['joy', 'hope', 'trust', 'curiosity'];
      const negativeEmotions = ['fear', 'sadness', 'anger', 'anxiety', 'paranoia'];
      
      // Count positive and negative emotions in history
      const positiveCount = moodHistory.filter(mood => positiveEmotions.includes(mood)).length;
      const negativeCount = moodHistory.filter(mood => negativeEmotions.includes(mood)).length;
      
      // Determine trend
      if (positiveCount > negativeCount && positiveCount >= 2) {
        setEmotionalTrend('improving');
      } else if (negativeCount > positiveCount && negativeCount >= 2) {
        setEmotionalTrend('deteriorating');
      } else if (moodHistory[0] === moodHistory[1] && moodHistory[1] === moodHistory[2]) {
        setEmotionalTrend('fixated');
      } else if (positiveEmotions.includes(moodHistory[0]) && negativeEmotions.includes(moodHistory[1]) ||
                 negativeEmotions.includes(moodHistory[0]) && positiveEmotions.includes(moodHistory[1])) {
        setEmotionalTrend('volatile');
      } else {
        setEmotionalTrend('stable');
      }
    }
  }, [moodHistory]);
  
  return {
    jonahMood,
    emotionalTrend,
    moodHistory,
    updateMoodAndTrend
  };
}
