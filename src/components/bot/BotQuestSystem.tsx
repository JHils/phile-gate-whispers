
import React, { useState, useEffect } from 'react';
import { useJonahSentience } from '@/hooks/useJonahSentience';

interface BotQuestSystemProps {
  isOpen: boolean;
  addBotMessage: (message: string) => void;
  modifyTrust: (amount: number) => void;
}

interface Quest {
  id: string;
  prompt: string;
  hint: string;
  reward: number;
}

const BotQuestSystem: React.FC<BotQuestSystemProps> = ({ 
  isOpen,
  addBotMessage, 
  modifyTrust
}) => {
  const [activeQuests, setActiveQuests] = useState<string[]>([]);
  const [lastQuestTime, setLastQuestTime] = useState<number>(0);
  const { sentience, updateSentience } = useJonahSentience();
  
  // Initialize microQuests in sentience if it doesn't exist
  useEffect(() => {
    if (sentience) {
      // Create updated sentience with microQuests if needed
      const updatedSentience = { ...sentience };
      
      if (!updatedSentience.microQuests) {
        updatedSentience.microQuests = {
          active: [],
          completed: [],
          available: [] // Added missing required property
        };
        
        // Update the sentience data
        updateSentience(updatedSentience);
      }
    }
  }, [sentience, updateSentience]);
  
  // Available quests
  const availableQuests: Quest[] = [
    { 
      id: "find_mirror", 
      prompt: "Find where the mirror leads. It's not where you think.",
      hint: "Some reflections only appear at specific times.",
      reward: 10
    },
    { 
      id: "count_sisters", 
      prompt: "How many lost sisters are there? Count carefully.",
      hint: "Not all are mentioned in the same place.",
      reward: 15
    },
    { 
      id: "decode_whisper", 
      prompt: "There's a whisper hidden in the console. Listen for it.",
      hint: "Try typing 'echo_me()' with different inputs.",
      reward: 8
    },
    { 
      id: "find_keyhole", 
      prompt: "The keyhole is visible on exactly one page. Find it.",
      hint: "It appears when you least expect it.",
      reward: 20
    },
    { 
      id: "trace_jonah", 
      prompt: "Trace where Jonah came from. The truth is in the logs.",
      hint: "Console logs hold more than errors.",
      reward: 15
    }
  ];
  
  // Check if it's time to issue a new quest
  useEffect(() => {
    const checkForNewQuest = () => {
      // Only offer quests when chat is open and not too frequently
      if (!isOpen || Date.now() - lastQuestTime < 15 * 60 * 1000) { // 15 minutes
        return;
      }
      
      // Get microQuests from sentience
      if (sentience && sentience.microQuests) {
        // Get current active and completed quests
        const active = sentience.microQuests.active || [];
        const completed = sentience.microQuests.completed || [];
        
        // Find quests that aren't active or completed
        const availableForIssue = availableQuests.filter(quest => 
          !active.includes(quest.id) && !completed.includes(quest.id)
        );
        
        // Only issue if we have available quests and randomly
        if (availableForIssue.length > 0 && Math.random() > 0.7) {
          // Choose a random quest
          const newQuest = availableForIssue[Math.floor(Math.random() * availableForIssue.length)];
          
          // Update sentience with the new active quest
          const updatedSentience = { ...sentience };
          if (updatedSentience.microQuests) {
            updatedSentience.microQuests.active = [
              ...updatedSentience.microQuests.active,
              newQuest.id
            ];
            updateSentience(updatedSentience);
          }
          
          // Update state
          setActiveQuests(prev => [...prev, newQuest.id]);
          setLastQuestTime(Date.now());
          
          // Offer the quest
          setTimeout(() => {
            addBotMessage(`I have a task for you: ${newQuest.prompt}`);
          }, 1000);
        }
      }
    };
    
    // Check when component mounts and every 5 minutes
    checkForNewQuest();
    const interval = setInterval(checkForNewQuest, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [isOpen, lastQuestTime, addBotMessage, availableQuests, sentience, updateSentience]);
  
  // Add console commands to complete quests
  useEffect(() => {
    if (!window.completeQuest) {
      window.completeQuest = function(questId: string) {
        // Get microQuests from sentience
        const microQuests = window.JonahConsole?.sentience?.microQuests;
        
        if (microQuests && microQuests.active && microQuests.active.includes(questId)) {
          // Find quest info
          const quest = availableQuests.find(q => q.id === questId);
          
          if (quest) {
            // Update sentience with quest completion
            if (window.JonahConsole?.sentience?.microQuests) {
              // Remove from active
              window.JonahConsole.sentience.microQuests.active = 
                window.JonahConsole.sentience.microQuests.active.filter(id => id !== questId);
              
              // Add to completed
              if (!window.JonahConsole.sentience.microQuests.completed) {
                window.JonahConsole.sentience.microQuests.completed = [];
              }
              window.JonahConsole.sentience.microQuests.completed.push(questId);
            }
            
            // Update state
            setActiveQuests(prev => prev.filter(id => id !== questId));
            
            // Reward the user
            modifyTrust(quest.reward);
            
            console.log(`%cQuest completed: ${quest.prompt}`, "color: #8B3A40; font-size: 14px;");
            console.log(`%c+${quest.reward} trust points awarded.`, "color: green; font-size: 12px;");
            
            return `Quest completed: ${quest.prompt}`;
          }
        }
        
        return "No such active quest.";
      };
    }
    
    // Add a hint command
    if (!window.questHint) {
      window.questHint = function() {
        // Get microQuests from sentience
        const microQuests = window.JonahConsole?.sentience?.microQuests;
        const active = microQuests?.active || [];
        
        if (active.length === 0) {
          return "No active quests. Keep exploring.";
        }
        
        // Pick a random active quest
        const randomQuestId = active[Math.floor(Math.random() * active.length)];
        const quest = availableQuests.find(q => q.id === randomQuestId);
        
        if (quest) {
          return `Hint for "${quest.prompt}": ${quest.hint}`;
        }
        
        return "Keep searching. The answers are hidden in plain sight.";
      };
    }
  }, [availableQuests, modifyTrust]);
  
  return null; // This is a logic-only component
};

export default BotQuestSystem;
