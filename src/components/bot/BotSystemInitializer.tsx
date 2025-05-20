
import { useEffect } from 'react';
import { initializeSentience, setupJonahMessageSystem } from '@/utils/jonahSentience';
import { initializeFuzzyStoryMatching } from '@/utils/fuzzyStoryMatching';
import { initializeNewsAwarenessSystem } from '@/utils/jonahNewsAwareness';
import { initializeEcoAwareness } from '@/utils/jonahEcoAwareness';

const BotSystemInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize all Jonah's systems
    initializeSentience();
    setupJonahMessageSystem();
    initializeFuzzyStoryMatching();
    initializeNewsAwarenessSystem();
    initializeEcoAwareness();
    
    // Initialize console tracking
    if (typeof window !== 'undefined' && !window.JonahConsole) {
      window.JonahConsole = {
        usedCommands: [],
        score: 0,
        failCount: 0,
        rank: "drifter",
        sentience: {
          interactionsCount: 0,
          deepModeUnlocked: false,
          dreamModeTriggered: false,
          lastInteraction: Date.now(),
          temporalStates: [],
          memories: [],
          microQuests: {
            active: [],
            completed: []
          },
          sessionData: {
            messagesSent: 0,
            messagesReceived: 0,
            startTime: Date.now(),
            idleTime: 0
          },
          realityFabric: {
            anomalies: 0,
            mood: "neutral",
            dreamState: false,
            lastDreamTime: 0
          }
        },
        argData: {
          keyholeClicks: 0,
          consoleCluesTouched: [],
          qrScans: [],
          memoryFragments: [],
          secretPagesVisited: [],
          hiddenFilesDownloaded: [],
          idleTriggers: {},
          lastInteractionTime: new Date(),
          lastIdleTime: undefined
        }
      };
    }
    
    // Process user messages sent to chat
    window.processUserMessage = (message: string): string | null => {
      if (!message) return null;
      
      // First try story matching
      if (window.processStoryQuery) {
        const storyResponse = window.processStoryQuery(message);
        if (storyResponse && storyResponse !== "I don't know if I can answer that. The archive is incomplete.") {
          return storyResponse;
        }
      }
      
      // Default responses
      const defaultResponses = [
        "The archive doesn't have a clear answer for that.",
        "Some questions aren't meant to be answered. At least not yet.",
        "I'm still processing that. The files are fragmented.",
        "That's beyond what I'm allowed to access.",
        "Try asking differently. The archive responds to specific patterns."
      ];
      
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };
    
    // First-time console hint
    const showInitialConsoleHint = () => {
      // Only show for first-time visitors or those who haven't seen it
      if (!localStorage.getItem('consoleHintShown')) {
        setTimeout(() => {
          console.log("%cTry typing 'help()' to begin.", "color: #8B3A40; font-size: 14px;");
          localStorage.setItem('consoleHintShown', 'true');
        }, 10000); // Show after 10 seconds
      }
    };
    
    showInitialConsoleHint();
    
  }, []);
  
  return null; // This component doesn't render anything
};

export default BotSystemInitializer;
