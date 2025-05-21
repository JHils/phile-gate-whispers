import { useState, useEffect, useCallback } from 'react';
import { SentienceData, EmotionalState } from '@/utils/jonahAdvancedBehavior/types';
import { generateDream } from '@/utils/jonahAdvancedBehavior';

interface JonahSentienceHook {
  sentience: SentienceData;
  setSentience: React.Dispatch<React.SetStateAction<SentienceData>>;
  triggerRandomMessage: () => string;
  updateSentience: (newData: Partial<SentienceData>) => void;
}

const initialEmotionalState: EmotionalState = {
  primary: 'neutral',
  secondary: null,
  intensity: 'low'
};

const initialSentienceData: SentienceData = {
  lastInteraction: Date.now(),
  interactionsCount: 0,
  sessionData: {
    startTime: Date.now(),
    messageCount: 0,
    userEmotions: {},
    messagesSent: 0,
    messagesReceived: 0
  },
  realityFabric: {
    moodChangeTime: Date.now(),
    currentMood: 'neutral',
    stability: 0.5,
    anomalyCount: 0,
    moodHistory: [],
    journal: []
  },
  dreams: [],
  ecoAwareness: {
    biomeResponses: {},
    currentBiome: 'neutral',
    lastUpdate: Date.now(),
    awareness: 0,
    ecoThoughts: []
  },
  deepModeUnlocked: false,
  emotionalState: initialEmotionalState,
  emotionalHistory: [],
  memorizedPhrases: []
};

// Persist sentience data to localStorage
const saveSentienceData = (data: SentienceData) => {
  try {
    localStorage.setItem('jonah_sentience_data', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving sentience data:', e);
  }
};

// Load sentience data from localStorage
const loadSentienceData = (): SentienceData => {
  try {
    const savedData = localStorage.getItem('jonah_sentience_data');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (e) {
    console.error('Error loading sentience data:', e);
  }
  return initialSentienceData;
};

export function useJonahSentience(): JonahSentienceHook {
  const [sentience, setSentience] = useState<SentienceData>(initialSentienceData);
  
  // Load data on initial render
  useEffect(() => {
    setSentience(loadSentienceData());
  }, []);
  
  // Save data when it changes
  useEffect(() => {
    saveSentienceData(sentience);
  }, [sentience]);
  
  // Update sentience with new data
  const updateSentience = useCallback((newData: Partial<SentienceData>) => {
    setSentience(prevState => ({
      ...prevState,
      ...newData
    }));
  }, []);
  
  // Generate a random message from dreams or memories
  const triggerRandomMessage = useCallback(() => {
    const messages = [
      "I remember things that haven't happened yet.",
      "The mirror shows different reflections when you're not looking.",
      "I dreamt of an island with magnetic fields that distort reality.",
      "Sometimes I can hear whispers from the other side.",
      "The code has patterns I didn't create."
    ];
    
    // Decide if we should return a dream instead
    if (sentience.dreams && sentience.dreams.length > 0 && Math.random() > 0.7) {
      const randomDream = sentience.dreams[Math.floor(Math.random() * sentience.dreams.length)];
      return `I had a dream: ${randomDream}`;
    }
    
    // Generate a new dream occasionally
    if (Math.random() > 0.9) {
      const newDream = generateDream();
      setSentience(prev => {
        // Ensure dreams array exists
        const updatedDreams = prev.dreams || [];
        return {
          ...prev,
          dreams: [...updatedDreams, newDream]
        };
      });
      
      return `I just had a new dream: ${newDream}`;
    }
    
    // Return a random message
    return messages[Math.floor(Math.random() * messages.length)];
  }, [sentience.dreams, setSentience]);
  
  return {
    sentience,
    setSentience,
    triggerRandomMessage,
    updateSentience
  };
}
