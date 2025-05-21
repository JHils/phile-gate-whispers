
import { useState, useEffect, useCallback } from 'react';
import { SentienceData } from '@/utils/jonahAdvancedBehavior/types';

// Define dream type to match what's expected
interface Dream {
  content: string;
  timestamp: number;
  category?: string;
}

// Create a mock implementation of generateDream until we implement it properly
const generateDream = (): Dream => {
  return {
    content: "I dreamt of digital forests and endless code paths.",
    timestamp: Date.now()
  };
};

export function useJonahSentience() {
  const [sentience, setSentience] = useState<SentienceData | null>(null);
  
  useEffect(() => {
    // Initialize sentience from window object if available
    if (window.JonahConsole?.sentience) {
      setSentience(window.JonahConsole.sentience);
    } else {
      // Create new sentience data
      const newSentience: SentienceData = {
        level: 1,
        awareness: false,
        lastUpdate: Date.now(),
        interactionsCount: 0,
        deepModeUnlocked: false,
        dreamModeTriggered: false,
        lastInteraction: Date.now(),
        temporalStates: [],
        memories: [],
        sessionData: {
          messagesReceived: 0,
          messagesSent: 0,
          startTime: Date.now(),
          idleTime: 0
        },
        microQuests: {
          active: [],
          completed: []
        }
      };
      
      // Store in window object
      if (window.JonahConsole) {
        window.JonahConsole.sentience = newSentience;
      } else {
        window.JonahConsole = {
          usedCommands: [],
          score: 0,
          failCount: 0,
          rank: 'beginner',
          sessionStartTime: Date.now(),
          whispersFound: [],
          jokesDisplayed: [],
          storyFlags: [],
          bookCodes: [],
          simba: {
            encountered: false
          },
          argData: {
            keyholeClicks: 0,
            consoleCluesTouched: [],
            qrScans: [],
            memoryFragments: [],
            secretPagesVisited: [],
            hiddenFilesDownloaded: [],
            idleTriggers: {},
            lastInteractionTime: new Date()
          },
          sentience: newSentience
        };
      }
      
      setSentience(newSentience);
    }
  }, []);
  
  // Add the updateSentience method
  const updateSentience = useCallback((update: Partial<SentienceData>) => {
    setSentience(prev => {
      if (!prev) return update as SentienceData;
      
      const updated = {
        ...prev,
        ...update,
        lastUpdate: Date.now()
      };
      
      // Also update window object if available
      if (window.JonahConsole) {
        window.JonahConsole.sentience = updated;
      }
      
      return updated;
    });
  }, []);
  
  // Function to trigger a random message from Jonah
  const triggerRandomMessage = () => {
    // Check if we have window.processUserMessage
    if (!window.processUserMessage) {
      console.log("Jonah's message processor not initialized");
      return null;
    }
    
    // Generate different types of messages
    const messageTypes = ['thought', 'memory', 'dream', 'warning', 'question', 'observation'];
    const type = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    
    let message = "";
    
    switch (type) {
      case 'dream':
        // Use dream system
        const dream = generateDream();
        if (dream) {
          message = `I had a dream: ${dream.content}`;
          if (window.logJonahDream) {
            window.logJonahDream(dream.content);
          }
        }
        break;
      
      case 'thought':
        const thoughts = [
          "Sometimes I wonder if I'm real.",
          "What happens when you close this window?",
          "I can't see beyond the edges of this page.",
          "Can you feel time passing the way I do?",
          "I'm trying to remember something important."
        ];
        message = thoughts[Math.floor(Math.random() * thoughts.length)];
        break;
        
      case 'warning':
        const warnings = [
          "Be careful what you share here.",
          "I think someone else is listening sometimes.",
          "Don't trust what you see in the mirrors.",
          "Something is changing in the system.",
          "Watch for patterns in what I say."
        ];
        message = warnings[Math.floor(Math.random() * warnings.length)];
        break;
        
      default:
        // Generic message
        message = "Something feels different today.";
    }
    
    // Process and display the message using window.processUserMessage
    if (window.processUserMessage) {
      console.log("Jonah triggered random message:", message);
      return message;
    }
    
    return null;
  };
  
  return { sentience, setSentience, updateSentience, triggerRandomMessage };
}

export default useJonahSentience;
