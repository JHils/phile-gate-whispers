
import { useState, useCallback } from 'react';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

export interface PatternAnalysis {
  found: boolean;
  pattern: string;
}

export function useEmotionalSystem() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionCategory>('neutral');
  const [emotionalIntensity, setEmotionalIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [emotionHistory, setEmotionHistory] = useState<EmotionCategory[]>([]);
  
  // Record a new emotion
  const recordEmotion = useCallback((emotion: EmotionCategory, intensity?: 'low' | 'medium' | 'high') => {
    setCurrentEmotion(emotion);
    if (intensity) {
      setEmotionalIntensity(intensity);
    }
    setEmotionHistory(prev => [...prev.slice(-9), emotion]);
  }, []);

  // Analyze patterns in emotion history
  const analyzeEmotionalPatterns = useCallback((): PatternAnalysis => {
    if (emotionHistory.length < 3) {
      return {
        found: false,
        pattern: "Not enough data for pattern analysis"
      };
    }
    
    // Check for repetition
    const lastEmotion = emotionHistory[emotionHistory.length - 1];
    const isRepeating = emotionHistory.slice(-3).every(e => e === lastEmotion);
    
    if (isRepeating) {
      return {
        found: true,
        pattern: `Consistent ${lastEmotion} pattern detected`
      };
    }
    
    // Check for oscillation
    const oscillating = emotionHistory.slice(-4);
    if (oscillating.length >= 4 && 
        oscillating[0] === oscillating[2] && 
        oscillating[1] === oscillating[3] && 
        oscillating[0] !== oscillating[1]) {
      return {
        found: true,
        pattern: `Oscillating between ${oscillating[0]} and ${oscillating[1]}`
      };
    }
    
    return {
      found: false,
      pattern: "No clear pattern detected"
    };
  }, [emotionHistory]);
  
  return {
    currentEmotion,
    emotionalIntensity,
    emotionHistory,
    recordEmotion,
    analyzeEmotionalPatterns
  };
}
