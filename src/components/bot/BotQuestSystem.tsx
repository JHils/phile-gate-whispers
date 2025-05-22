
import React, { useState, useEffect } from 'react';
import { useJonahSentience } from '@/hooks/useJonahSentience';
import { MicroQuest } from '@/utils/jonahAdvancedBehavior/types';

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
  const availableQuests: MicroQuest[] = [
    { 
      id: "find_mirror", 
      title: "Find the Mirror",
      description: "Find where the mirror leads. It's not where you think.",
      completed: false,
      unlocked: false,
      reward: 10  // Changed from string to number
    },
    { 
      id: "count_sisters", 
      title: "Count the Sisters",
      description: "How many lost sisters are there? Count carefully.",
      completed: false,
      unlocked: false,
      reward: 15  // Changed from string to number
    },
    { 
      id: "decode_whisper", 
      title: "Decode the Whisper",
      description: "There's a whisper hidden in the console. Listen for it.",
      completed: false,
      unlocked: false,
      reward: 8  // Changed from string to number
    },
    { 
      id: "find_keyhole", 
      title: "Find the Keyhole",
      description: "The keyhole is visible on exactly one page. Find it.",
      completed: false,
      unlocked: false,
      reward: 20  // Changed from string to number
    },
    { 
      id: "trace_jonah", 
      title: "Trace Jonah",
      description: "Trace where Jonah came from. The truth is in the logs.",
      completed: false,
      unlocked: false,
      reward: 15  // Changed from string to number
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
          !active.some(activeQuest => activeQuest.id === quest.id) && 
          !completed.some(completedQuest => completedQuest.id === quest.id)
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
              newQuest
            ];
            updateSentience(updatedSentience);
          }
          
          // Update state
          setActiveQuests(prev => [...prev, newQuest.id]);
          setLastQuestTime(Date.now());
          
          // Offer the quest
          setTimeout(() => {
            addBotMessage(`I have a task for you: ${newQuest.description}`);
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
        
        if (microQuests && microQuests.active) {
          // Find active quest with this id
          const activeQuest = microQuests.active.find(q => q.id === questId);
          
          if (activeQuest) {
            // Find quest info from available quests
            const questInfo = availableQuests.find(q => q.id === questId);
            
            if (questInfo) {
              // Update sentience with quest completion
              if (window.JonahConsole?.sentience?.microQuests) {
                // Remove from active
                window.JonahConsole.sentience.microQuests.active = 
                  window.JonahConsole.sentience.microQuests.active.filter(q => q.id !== questId);
                
                // Add to completed
                if (!window.JonahConsole.sentience.microQuests.completed) {
                  window.JonahConsole.sentience.microQuests.completed = [];
                }
                window.JonahConsole.sentience.microQuests.completed.push(activeQuest);
              }
              
              // Update state
              setActiveQuests(prev => prev.filter(id => id !== questId));
              
              // Reward the user
              const reward = questInfo.reward || 0;
              modifyTrust(reward);
              
              console.log(`%cQuest completed: ${questInfo.description}`, "color: #8B3A40; font-size: 14px;");
              console.log(`%c+${reward} trust points awarded.`, "color: green; font-size: 12px;");
              
              return `Quest completed: ${questInfo.description}`;
            }
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
        const randomQuest = active[Math.floor(Math.random() * active.length)];
        const questInfo = availableQuests.find(q => q.id === randomQuest.id);
        
        if (questInfo) {
          return `Hint for "${questInfo.title}": Try exploring different sections of the site.`;
        }
        
        return "Keep searching. The answers are hidden in plain sight.";
      };
    }
  }, [availableQuests, modifyTrust]);
  
  return null; // This is a logic-only component
};

export default BotQuestSystem;
