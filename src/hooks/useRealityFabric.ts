
import { useState, useEffect } from 'react';
import { 
  updateJonahMood, 
  checkForAnomalies, 
  generateDreamParable,
  getCurrentMood 
} from '@/utils/jonahRealityFabric';
import { getJonahQuestion } from '@/utils/jonahSentience';

export function useRealityFabric(trustLevel: string) {
  const [mood, setMood] = useState<string>('watching');
  const [lastMoodChange, setLastMoodChange] = useState<number>(Date.now());
  const [dreamMessages, setDreamMessages] = useState<string[]>([]);
  const [anomalies, setAnomalies] = useState<string[]>([]);
  const [jonahQuestions, setJonahQuestions] = useState<string[]>([]);

  // Update Jonah's mood periodically
  useEffect(() => {
    // Function to check and update mood
    const checkMood = () => {
      const currentMood = getCurrentMood();
      setMood(currentMood);
      
      // Track last mood change time
      if (window.JonahConsole?.sentience) {
        if (!window.JonahConsole.sentience.realityFabric) {
          window.JonahConsole.sentience.realityFabric = {
            moodChangeTime: Date.now()
          };
        }
        setLastMoodChange(window.JonahConsole.sentience.realityFabric.moodChangeTime || Date.now());
      }
    };
    
    // Check mood immediately
    checkMood();
    
    // Set up interval to update mood
    const moodInterval = setInterval(() => {
      updateJonahMood(trustLevel);
      checkMood();
    }, 60000); // Check every minute
    
    return () => clearInterval(moodInterval);
  }, [trustLevel]);
  
  // Check for anomalies periodically
  useEffect(() => {
    if (trustLevel !== 'high') return;
    
    // Set up interval to check for anomalies
    const anomalyInterval = setInterval(() => {
      const anomalyMessage = checkForAnomalies();
      if (anomalyMessage) {
        setAnomalies(prev => [...prev, anomalyMessage]);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(anomalyInterval);
  }, [trustLevel]);
  
  // Generate dream parables occasionally
  useEffect(() => {
    if (trustLevel !== 'medium' && trustLevel !== 'high') return;
    
    // Set up interval for dream parables
    const dreamInterval = setInterval(() => {
      const dreamMessage = generateDreamParable();
      if (dreamMessage) {
        // Fixed: Ensure we only add string values to the string[] array
        setDreamMessages(prev => [...prev, dreamMessage]);
      }
    }, 8 * 60 * 1000); // Check every 8 minutes
    
    return () => clearInterval(dreamInterval);
  }, [trustLevel]);
  
  // Check for Jonah questions occasionally
  useEffect(() => {
    if (trustLevel === 'low') return;
    
    // Set up interval for Jonah questions
    const questionInterval = setInterval(() => {
      const question = getJonahQuestion();
      if (question) {
        setJonahQuestions(prev => [...prev, question]);
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
    
    return () => clearInterval(questionInterval);
  }, [trustLevel]);
  
  // Return the current mood and collected messages
  return {
    mood,
    lastMoodChange,
    dreamMessages,
    anomalies,
    jonahQuestions
  };
}
