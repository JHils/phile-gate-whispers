
import { useState, useCallback } from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';

export function useEmotionalAnalysis() {
  // Jonah's emotional state
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [emotionHistory, setEmotionHistory] = useState<EmotionCategory[]>([]);
  
  // Update Jonah's mood and emotional trend
  const updateMoodAndTrend = useCallback((newMood: EmotionCategory) => {
    // Set new mood
    setJonahMood(newMood);
    
    // Update emotion history
    setEmotionHistory(prev => {
      const updated = [...prev, newMood].slice(-5); // Keep last 5 emotions
      return updated;
    });
    
    // Analyze trend based on history
    if (emotionHistory.length >= 3) {
      // Simple trend analysis based on emotional valence
      const positiveEmotions: EmotionCategory[] = ['joy', 'trust', 'hope'];
      const negativeEmotions: EmotionCategory[] = ['fear', 'sadness', 'anger', 'anxiety', 'paranoia'];
      
      // Count recent emotions
      const recentEmotions = emotionHistory.slice(-3);
      const positiveCount = recentEmotions.filter(e => positiveEmotions.includes(e)).length;
      const negativeCount = recentEmotions.filter(e => negativeEmotions.includes(e)).length;
      
      // Determine trend
      if (positiveCount >= 2 && positiveEmotions.includes(newMood)) {
        setEmotionalTrend('improving');
      } else if (negativeCount >= 2 && negativeEmotions.includes(newMood)) {
        setEmotionalTrend('deteriorating');
      } else if (recentEmotions[0] === recentEmotions[1] && recentEmotions[1] === recentEmotions[2]) {
        setEmotionalTrend('stable');
      } else {
        setEmotionalTrend('fluctuating');
      }
    }
  }, [emotionHistory]);
  
  return {
    jonahMood,
    emotionalTrend,
    updateMoodAndTrend
  };
}
