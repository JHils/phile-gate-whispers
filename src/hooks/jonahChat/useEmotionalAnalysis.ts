/**
 * Hook for emotional analysis in Jonah Chat
 */

import { useState, useCallback, useEffect } from 'react';
import { EmotionCategory, EmotionalTrend } from '@/utils/jonahAdvancedBehavior/types';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis';

export function analyzeEmotionalShift(messages: Message[]): EmotionalTrend {
  if (messages.length < 3) {
    return 'stable';
  }
  
  // Get the emotional values for the last few messages
  const recentValues = messages
    .slice(-5)
    .map(msg => getEmotionalValue(msg.content))
    .filter(val => val !== null);
  
  if (recentValues.length < 2) {
    return 'stable';
  }
  
  // Calculate the trend
  const differences = [];
  for (let i = 1; i < recentValues.length; i++) {
    differences.push(recentValues[i] - recentValues[i-1]);
  }
  
  const avgDiff = differences.reduce((sum, diff) => sum + diff, 0) / differences.length;
  const volatility = differences.map(d => Math.abs(d)).reduce((sum, d) => sum + d, 0) / differences.length;
  
  if (volatility > 3) {
    return 'volatile';
  }
  
  if (avgDiff < -1.5) {
    return 'declining';
  }
  
  if (avgDiff > 1.5) {
    return 'stable'; // Previously "intensifying", changed to match EmotionalTrend type
  }
  
  return 'stable';
}

export function useEmotionalAnalysis() {
  // State for emotional analysis
  const [jonahMood, setJonahMood] = useState<EmotionCategory>('neutral');
  const [emotionalTrend, setEmotionalTrend] = useState<EmotionalTrend>('stable');
  const [emotionalHistory, setEmotionalHistory] = useState<EmotionCategory[]>([]);
  
  // Initialize mood from localStorage if available
  useEffect(() => {
    const savedMood = localStorage.getItem('jonah_emotion_primary');
    if (savedMood) {
      setJonahMood(savedMood as EmotionCategory);
    }
    
    // Load emotional history if available
    const savedHistory = localStorage.getItem('jonah_emotional_history');
    if (savedHistory) {
      try {
        setEmotionalHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading emotional history:", e);
      }
    }
  }, []);
  
  // Update mood and trend based on recent emotions
  const updateMoodAndTrend = useCallback((newMood: EmotionCategory) => {
    // Update mood
    setJonahMood(newMood);
    localStorage.setItem('jonah_emotion_primary', newMood);
    
    // Update history
    const updatedHistory = [...emotionalHistory, newMood].slice(-5);
    setEmotionalHistory(updatedHistory);
    localStorage.setItem('jonah_emotional_history', JSON.stringify(updatedHistory));
    
    // Analyze trend
    if (updatedHistory.length < 3) {
      setEmotionalTrend('stable');
      return;
    }
    
    // Analyze emotional pattern
    const negativeEmotions = ['sadness', 'anger', 'fear', 'disgust', 'anxiety', 'paranoia'];
    const positiveEmotions = ['joy', 'trust', 'hope', 'surprise'];
    
    const recentEmotions = updatedHistory.slice(-3);
    const allNegative = recentEmotions.every(e => negativeEmotions.includes(e));
    const allPositive = recentEmotions.every(e => positiveEmotions.includes(e));
    const mixed = recentEmotions.some(e => positiveEmotions.includes(e)) && 
                recentEmotions.some(e => negativeEmotions.includes(e));
    
    if (allNegative) {
      setEmotionalTrend('declining' as EmotionalTrend);
    } else if (allPositive) {
      setEmotionalTrend('stable' as EmotionalTrend);
    } else if (mixed) {
      setEmotionalTrend('volatile' as EmotionalTrend);
    } else {
      setEmotionalTrend('stable' as EmotionalTrend);
    }
  }, [emotionalHistory]);
  
  return { jonahMood, emotionalTrend, updateMoodAndTrend };
}
