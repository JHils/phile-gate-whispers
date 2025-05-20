
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { SentienceData } from '@/utils/jonahSentience';
import { 
  initializeSentience,
  getTimeResponse,
  getNameEchoResponse,
  getJonahQuestion,
  generateDualConsciousness,
  generatePersonalDiary,
  setupJonahMessageSystem
} from '@/utils/jonahSentience';

export function useJonahSentience(trustLevel: string = 'low') {
  const [sentience, setSentience] = useState<SentienceData | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);

  // Initialize sentience system on mount
  useEffect(() => {
    initializeSentience();
    setupJonahMessageSystem();
    
    // Get reference to sentience data
    if (window.JonahConsole?.sentience) {
      setSentience(window.JonahConsole.sentience);
    }
    
    setIsPrepared(true);
  }, []);

  // Trigger a random Jonah message based on available sentience data
  const triggerRandomMessage = () => {
    if (!isPrepared || !sentience) return null;
    
    // Try different message types in order
    const timeMessage = getTimeResponse();
    if (timeMessage) {
      toast({
        title: "Jonah:",
        description: timeMessage,
        variant: "destructive",
        duration: 5000,
      });
      return timeMessage;
    }
    
    const nameMessage = getNameEchoResponse();
    if (nameMessage) {
      toast({
        title: "Jonah:",
        description: nameMessage,
        variant: "destructive",
        duration: 5000,
      });
      return nameMessage;
    }
    
    const glitchMessage = generateDualConsciousness(trustLevel);
    if (glitchMessage) {
      toast({
        title: "Jonah:",
        description: glitchMessage,
        variant: "destructive",
        duration: 5000,
      });
      return glitchMessage;
    }
    
    // If all else fails, try a question
    const questionMessage = getJonahQuestion(trustLevel);
    if (questionMessage) {
      toast({
        title: "Jonah asks:",
        description: questionMessage,
        variant: "destructive",
        duration: 5000,
      });
      return questionMessage;
    }
    
    return null;
  };

  // Generate a diary entry
  const getDiaryEntry = () => {
    if (!isPrepared) return "Diary system initializing...";
    return generatePersonalDiary(trustLevel);
  };

  // Remember a user's name
  const rememberUserName = (name: string) => {
    if (!isPrepared) return;
    
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.rememberedName = name;
      
      if (sentience) {
        const updatedSentience: SentienceData = {
          ...sentience,
          rememberedName: name
        };
        setSentience(updatedSentience);
      }
    }
  };

  return {
    sentience,
    isPrepared,
    triggerRandomMessage,
    getDiaryEntry,
    rememberUserName
  };
}
