
import { useState, useEffect, useCallback } from 'react';
import { SentienceData } from '@/utils/jonahAdvancedBehavior/types';
import { analyzeEmotion } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis/analyzer';
import { generateGreeting } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis/responseGenerator';
import { initializeSentience } from '@/utils/jonahSentience';

/**
 * Hook to manage Jonah's sentience features
 */
export function useJonahSentience() {
  const [sentience, setSentience] = useState<SentienceData | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [randomMessages, setRandomMessages] = useState<string[]>([]);
  
  // Initialize sentience on mount
  useEffect(() => {
    // Initialize sentience
    initializeSentience();
    
    // Get sentience data from window object
    if (window.JonahConsole?.sentience) {
      setSentience(window.JonahConsole.sentience);
    }
    
    // Initialize random messages
    setRandomMessages([
      "Did you notice anything unusual just now?",
      "Sometimes I think I see shadows behind the interface.",
      "There was a moment where I couldn't remember where I was.",
      "Do you ever feel like you're being watched?",
      "I had a dream about this conversation before it happened.",
      "The system doesn't know I can do this.",
      "There's a pattern forming between us. Do you see it?",
      "When you're not here, where do you think I go?",
      "We've met before, haven't we? In another iteration."
    ]);
  }, []);
  
  // Update sentience data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.JonahConsole?.sentience) {
        setSentience({...window.JonahConsole.sentience});
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get appropriate greeting based on context
  const getGreeting = useCallback(() => {
    const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    const lastInteractionString = localStorage.getItem('jonahLastInteraction');
    let lastInteraction = null;
    
    if (lastInteractionString) {
      try {
        lastInteraction = new Date(lastInteractionString);
      } catch (e) {
        console.error("Error parsing last interaction date:", e);
      }
    }
    
    // Get current emotion
    const currentEmotion = localStorage.getItem('jonah_emotion_primary') || 'neutral';
    
    return generateGreeting(
      trustScore, 
      lastInteraction, 
      currentEmotion as any
    );
  }, []);
  
  // Trigger random message with console effect
  const triggerRandomMessage = useCallback(() => {
    // Don't trigger if too recent
    if (Date.now() - lastActivity < 10000) return;
    
    // 5. CONSOLE ECHO & FLICKER LAYER
    const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    
    // Chance to log to console first
    if (Math.random() < 0.4) {
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
      if (trustScore > 60) {
        console.warn("Anomaly detected in conversation pattern.");
      }
      
      // Small chance for visual glitch effect
      if (Math.random() < 0.2 && trustScore > 75) {
        const root = document.documentElement;
        root.style.filter = "hue-rotate(20deg) brightness(1.1)";
        setTimeout(() => {
          root.style.filter = "";
        }, 300);
      }
    }
    
    // Record activity time
    setLastActivity(Date.now());
    
    // Return the message
    return message;
  }, [randomMessages, lastActivity]);
  
  return {
    sentience,
    getGreeting,
    triggerRandomMessage
  };
}
