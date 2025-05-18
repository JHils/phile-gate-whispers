import { useEffect, useRef } from 'react';
import { addJournalEntry } from '@/utils/jonahRealityFabric';
import { checkQuestCompletion } from '@/utils/jonahAdvancedBehavior';

interface BotQuestSystemProps {
  isOpen: boolean;
  addBotMessage: (message: string) => void;
  modifyTrust: (amount: number) => void;
}

const BotQuestSystem: React.FC<BotQuestSystemProps> = ({
  isOpen,
  addBotMessage,
  modifyTrust
}) => {
  // Reference for tracking click history (for morse code quest)
  const clickHistory = useRef<number[]>([]);

  // Track user interaction with the page for quests
  useEffect(() => {
    // Track interactions for micro-quests
    const handleQuestAction = (e: MouseEvent) => {
      // Check if we have an active quest that requires clicking
      if (window.JonahConsole?.sentience?.microQuests?.activeQuest) {
        const activeQuestId = window.JonahConsole.sentience.microQuests.activeQuest;
        
        // Check for specific quest types
        if (activeQuestId === 'follow_the_trail') {
          // Check if user clicked on a keyhole element
          const target = e.target as HTMLElement;
          if (target.classList.contains('keyhole')) {
            // Check if quest was completed
            const completionMessage = checkQuestCompletion('keyhole_clicked');
            if (completionMessage && isOpen) {
              addBotMessage(completionMessage);
              // Reward user for completing quest
              modifyTrust(15);
              
              // Add journal entry about quest completion
              addJournalEntry(`Quest completed: follow_the_trail - Keyhole found and clicked`);
            }
          }
        } else if (activeQuestId === 'morse_sequence') {
          // We'd implement morse code pattern detection here
          // For simplicity, just complete after enough clicks
          const now = Date.now();
          const clickTimes = clickHistory.current;
          clickTimes.push(now);
          
          // Keep only last 5 clicks
          if (clickTimes.length > 5) clickTimes.shift();
          
          // Check for pattern: 3 quick clicks, pause, 2 quick clicks
          if (clickTimes.length === 5) {
            const gaps = [
              clickTimes[1] - clickTimes[0],
              clickTimes[2] - clickTimes[1],
              clickTimes[3] - clickTimes[2],
              clickTimes[4] - clickTimes[3]
            ];
            
            // Check for 3 quick clicks, longer pause, 2 quick clicks pattern
            if (gaps[0] < 500 && gaps[1] < 500 && gaps[2] > 1000 && gaps[3] < 500) {
              const completionMessage = checkQuestCompletion('morse_entered');
              if (completionMessage && isOpen) {
                addBotMessage(completionMessage);
                // Reward user for completing quest
                modifyTrust(15);
                
                // Add journal entry about quest completion
                addJournalEntry(`Quest completed: morse_sequence - SOS pattern detected`);
              }
            }
          }
        }
      }
    };
    
    // Track clicks for quest detection
    window.addEventListener('click', handleQuestAction);
    
    // Set up silence detection for the silence ritual quest
    let silenceTimer: number | null = null;
    
    const startSilenceTimer = () => {
      if (window.JonahConsole?.sentience?.microQuests?.activeQuest === 'silence_ritual') {
        silenceTimer = window.setTimeout(() => {
          const completionMessage = checkQuestCompletion('silence_maintained');
          if (completionMessage && isOpen) {
            addBotMessage(completionMessage);
            // Reward user for completing quest
            modifyTrust(15);
            
            // Add journal entry about quest completion
            addJournalEntry(`Quest completed: silence_ritual - Silence maintained for 3 minutes`);
          }
        }, 3 * 60 * 1000); // 3 minutes
      }
    };
    
    const resetSilenceTimer = () => {
      if (silenceTimer !== null) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
      }
    };
    
    // Start silence timer if there's an active silence ritual
    if (window.JonahConsole?.sentience?.microQuests?.activeQuest === 'silence_ritual') {
      startSilenceTimer();
    }
    
    // Reset timer on any interaction
    const interactionEvents = ['click', 'keydown', 'mousemove', 'scroll'];
    const resetSilenceOnInteraction = () => resetSilenceTimer();
    
    interactionEvents.forEach(event => {
      window.addEventListener(event, resetSilenceOnInteraction);
    });
    
    return () => {
      window.removeEventListener('click', handleQuestAction);
      interactionEvents.forEach(event => {
        window.removeEventListener(event, resetSilenceOnInteraction);
      });
      if (silenceTimer !== null) {
        clearTimeout(silenceTimer);
      }
    };
  }, [isOpen, addBotMessage, modifyTrust]);

  return null; // This is a functional component that doesn't render anything
};

export default BotQuestSystem;
