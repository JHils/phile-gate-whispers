
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
    
    // Store in localStorage for persistence
    localStorage.setItem('jonah_emotion_primary', newMood);
    
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
      let newTrend: EmotionalTrend = 'stable';
      
      if (positiveCount >= 2 && positiveEmotions.includes(newMood)) {
        newTrend = 'improving';
      } else if (negativeCount >= 2 && negativeEmotions.includes(newMood)) {
        newTrend = 'deteriorating';
      } else if (recentEmotions[0] === recentEmotions[1] && recentEmotions[1] === recentEmotions[2]) {
        newTrend = 'stable';
      } else {
        newTrend = 'fluctuating';
      }
      
      setEmotionalTrend(newTrend);
      localStorage.setItem('jonah_emotional_trend', newTrend);
      
      // 5. CONSOLE ECHO & FLICKER LAYER - Show mood transitions in console
      if (newTrend !== 'stable') {
        const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
        if (trustScore > 50 && Math.random() < 0.3) {
          console.log(`%cEmotional shift detected: ${newTrend}`, "color: #8B3A40; font-style: italic;");
        }
      }
    }
  }, [emotionHistory]);
  
  return {
    jonahMood,
    emotionalTrend,
    updateMoodAndTrend
  };
}
