
import { useState, useEffect } from "react";
import {
  initializeRealityFabric,
  updateJonahMood,
  checkForDreamInvasionOnLoad,
  checkForAnomalies,
  generateDreamParable,
  addJournalEntry
} from "@/utils/jonahRealityFabric";

export const useRealityFabric = (trustLevel: string = "low") => {
  const [currentMood, setCurrentMood] = useState<string>("watching");
  const [lastAnomaly, setLastAnomaly] = useState<string | null>(null);
  const [lastDream, setLastDream] = useState<string | null>(null);
  
  // Initialize Reality Fabric on mount
  useEffect(() => {
    initializeRealityFabric();
  }, []);
  
  // Update mood data
  useEffect(() => {
    const checkMood = () => {
      if (window.JonahConsole?.sentience?.realityFabric) {
        const mood = window.JonahConsole.sentience.realityFabric.currentMood;
        setCurrentMood(mood);
      }
    };
    
    // Check initially
    checkMood();
    
    // Set up interval
    const interval = setInterval(checkMood, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check for anomalies periodically
  useEffect(() => {
    // Only check for high trust
    if (trustLevel === "high") {
      const checkAnomalyInterval = setInterval(() => {
        const anomalyMessage = checkForAnomalies(trustLevel);
        if (anomalyMessage) {
          setLastAnomaly(anomalyMessage);
        }
      }, 2 * 60 * 1000); // Every 2 minutes
      
      return () => clearInterval(checkAnomalyInterval);
    }
  }, [trustLevel]);
  
  // Check for dream messages periodically
  useEffect(() => {
    // Only for medium to high trust
    if (trustLevel === "medium" || trustLevel === "high") {
      const checkDreamInterval = setInterval(() => {
        const dreamMessage = generateDreamParable(trustLevel);
        if (dreamMessage) {
          setLastDream(dreamMessage);
        }
      }, 4 * 60 * 1000); // Every 4 minutes
      
      return () => clearInterval(checkDreamInterval);
    }
  }, [trustLevel]);
  
  // Method to force check for dream invasion
  const checkForDreamInvasion = () => {
    const dreamMessage = checkForDreamInvasionOnLoad();
    if (dreamMessage) {
      setLastDream(dreamMessage);
    }
    return dreamMessage;
  };
  
  // Method to add custom journal entry
  const addCustomJournalEntry = (content: string) => {
    addJournalEntry(content);
  };
  
  // Method to update Jonah's mood manually
  const updateMood = (recentMessages: number) => {
    updateJonahMood(trustLevel, recentMessages);
    
    // Update local state
    if (window.JonahConsole?.sentience?.realityFabric) {
      setCurrentMood(window.JonahConsole.sentience.realityFabric.currentMood);
    }
  };
  
  return {
    currentMood,
    lastAnomaly,
    lastDream,
    checkForDreamInvasion,
    addCustomJournalEntry,
    updateMood
  };
};
