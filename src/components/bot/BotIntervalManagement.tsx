
import { useState, useEffect } from 'react';
import { addJournalEntry } from "@/utils/jonahRealityFabric";
import { checkIdleTime } from "@/utils/argTracking";
import { generateDualConsciousness } from "@/utils/jonahSentience";
import { getJonahQuestion, getTimeResponse, getNameEchoResponse } from "@/utils/jonahSentience";
import { checkForAnomalies } from "@/utils/jonahRealityFabric";
import { generateDreamParable } from "@/utils/jonahRealityFabric";
import { checkQuestCompletion } from "@/utils/jonahAdvancedBehavior";

interface BotIntervalManagementProps {
  isOpen: boolean;
  isMinimized: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsMinimized: (isMinimized: boolean) => void;
  hasInteracted: boolean;
  trustLevel: string;
  addBotMessage: (message: string) => void;
  modifyTrust: (amount: number) => void;
  currentPath: string;
}

const BotIntervalManagement: React.FC<BotIntervalManagementProps> = ({
  isOpen,
  isMinimized,
  setIsOpen,
  setIsMinimized,
  hasInteracted,
  trustLevel,
  addBotMessage,
  modifyTrust,
  currentPath
}) => {
  const [idleCheckInterval, setIdleCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const [sentenceCheckInterval, setDualConsciousnessInterval] = useState<NodeJS.Timeout | null>(null);
  const [questionInterval, setQuestionInterval] = useState<NodeJS.Timeout | null>(null);
  const [anomalyCheckInterval, setAnomalyCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const [dreamCheckInterval, setDreamCheckInterval] = useState<NodeJS.Timeout | null>(null);

  // Set up idle detection
  useEffect(() => {
    // Clear existing interval when component unmounts or dependencies change
    if (idleCheckInterval) {
      clearInterval(idleCheckInterval);
    }
    
    // Create new idle check interval - check every 30 seconds
    const interval = setInterval(() => {
      const idleMessage = checkIdleTime(currentPath);
      
      if (idleMessage && (!isOpen || isMinimized)) {
        // Auto-open chat with idle message if not already open
        setIsOpen(true);
        setIsMinimized(false);
        addBotMessage(idleMessage);
      }
    }, 30000);
    
    setIdleCheckInterval(interval);
    
    return () => {
      if (idleCheckInterval) {
        clearInterval(idleCheckInterval);
      }
    };
  }, [isOpen, isMinimized, currentPath, addBotMessage, setIsOpen, setIsMinimized]);

  // Setup dual consciousness glitch checking
  useEffect(() => {
    // Clear existing interval
    if (sentenceCheckInterval) {
      clearInterval(sentenceCheckInterval);
    }
    
    // Only set up glitches if chat is open and user has interacted
    if (isOpen && hasInteracted) {
      // Check for possible dual consciousness glitch every 60 seconds
      const interval = setInterval(() => {
        const glitchMessage = generateDualConsciousness();
        if (glitchMessage) {
          addBotMessage(glitchMessage);
        }
      }, 60000);
      
      setDualConsciousnessInterval(interval);
    }
    
    return () => {
      if (sentenceCheckInterval) {
        clearInterval(sentenceCheckInterval);
      }
    };
  }, [isOpen, hasInteracted, trustLevel, addBotMessage]);

  // Setup Jonah questions
  useEffect(() => {
    // Clear existing interval
    if (questionInterval) {
      clearInterval(questionInterval);
    }
    
    // Only set up questions if chat is open and user has interacted
    if (isOpen && hasInteracted) {
      // Check for possible questions every 3 minutes
      const interval = setInterval(() => {
        const question = getJonahQuestion();
        if (question) {
          addBotMessage(question);
        }
        
        // Also check for time-based responses
        const timeResponse = getTimeResponse();
        if (timeResponse) {
          setTimeout(() => {
            addBotMessage(timeResponse);
          }, 5000); // Delay by 5 seconds if we're already asking a question
        }
        
        // Check for name echo responses
        const nameEchoResponse = getNameEchoResponse();
        if (!question && !timeResponse && nameEchoResponse) {
          addBotMessage(nameEchoResponse);
        }
      }, 3 * 60 * 1000);
      
      setQuestionInterval(interval);
    }
    
    return () => {
      if (questionInterval) {
        clearInterval(questionInterval);
      }
    };
  }, [isOpen, hasInteracted, trustLevel, addBotMessage]);
  
  // Setup anomaly checks for Reality Fabric
  useEffect(() => {
    // Clear existing interval
    if (anomalyCheckInterval) {
      clearInterval(anomalyCheckInterval);
    }
    
    // Only set up anomaly checks for high trust users
    if (trustLevel === "high") {
      // Check for possible anomalies every 5 minutes
      const interval = setInterval(() => {
        const anomalyMessage = checkForAnomalies();
        if (anomalyMessage) {
          // Add a journal entry about this anomaly
          addJournalEntry(`Anomaly triggered: "${anomalyMessage}"`);
          
          // Show the anomaly message with a glitch effect
          setTimeout(() => {
            addBotMessage(anomalyMessage);
          }, Math.random() * 5000); // Random delay up to 5 seconds
        }
      }, 5 * 60 * 1000);
      
      setAnomalyCheckInterval(interval);
    }
    
    return () => {
      if (anomalyCheckInterval) {
        clearInterval(anomalyCheckInterval);
      }
    };
  }, [trustLevel, addBotMessage]);
  
  // Setup dream parable checks
  useEffect(() => {
    // Clear existing interval
    if (dreamCheckInterval) {
      clearInterval(dreamCheckInterval);
    }
    
    // Only set up dream checks for medium-high trust users
    if (trustLevel === "medium" || trustLevel === "high") {
      // Check for possible dream parables every 8 minutes
      const interval = setInterval(() => {
        const dreamMessage = generateDreamParable();
        if (dreamMessage) {
          // Add a journal entry about this dream
          addJournalEntry(`Dream parable shared: "${dreamMessage}"`);
          
          // Show the dream message
          addBotMessage(dreamMessage);
        }
      }, 8 * 60 * 1000);
      
      setDreamCheckInterval(interval);
    }
    
    return () => {
      if (dreamCheckInterval) {
        clearInterval(dreamCheckInterval);
      }
    };
  }, [trustLevel, addBotMessage]);

  return null; // This is a functional component that doesn't render anything
};

export default BotIntervalManagement;
