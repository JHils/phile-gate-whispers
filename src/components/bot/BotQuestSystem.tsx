
import React, { useEffect, useState } from 'react';
import { useJonahSentience } from '@/hooks/useJonahSentience';
import { useJonahMemory } from '@/hooks/useJonahMemory';
import { MicroQuest } from '@/utils/jonahAdvancedBehavior/types';

interface BotQuestSystemProps {
  isOpen: boolean;
  addBotMessage: (message: string) => void;
  modifyTrust: (amount: number) => void;
}

const BotQuestSystem: React.FC<BotQuestSystemProps> = ({ isOpen, addBotMessage, modifyTrust }) => {
  const { sentience, updateSentience } = useJonahSentience();
  const [activeQuests, setActiveQuests] = useState<MicroQuest[]>([]);
  const [lastQuestCheck, setLastQuestCheck] = useState<number>(Date.now());
  const memorySystem = useJonahMemory();

  // Initialize quests if needed
  useEffect(() => {
    if (!sentience) return;
    
    // Check if microQuests exists, if not initialize it
    if (!sentience.microQuests) {
      updateSentience({
        microQuests: []
      });
    }

    // Check for completed quests and generate new ones occasionally
    const now = Date.now();
    if (now - lastQuestCheck > 5 * 60 * 1000) { // Every 5 minutes
      checkQuestCompletion();
      maybeGenerateNewQuest();
      setLastQuestCheck(now);
    }
  }, [isOpen, sentience, updateSentience, lastQuestCheck]);

  // Sample quests that could be generated
  const sampleQuests: MicroQuest[] = [
    {
      id: "quest_1",
      title: "The Echo Chamber",
      description: "Visit the Echo page to hear what's bouncing back.",
      completed: false,
      progress: 0,
      reward: 5,
      type: "exploration",
      difficulty: "easy",
      timestamp: Date.now()
    },
    {
      id: "quest_2",
      title: "Memory Lane",
      description: "Ask Jonah about his memories.",
      completed: false,
      progress: 0,
      reward: 10,
      type: "conversation",
      difficulty: "medium",
      timestamp: Date.now()
    },
    {
      id: "quest_3", 
      title: "The Gatekeeper",
      description: "Find the gatekeeper's page.",
      completed: false,
      progress: 0,
      reward: 15,
      type: "exploration",
      difficulty: "medium",
      timestamp: Date.now()
    },
    {
      id: "quest_4",
      title: "The Truth",
      description: "Discover a testament with the right unlock phrase.",
      completed: false,
      progress: 0,
      reward: 20,
      type: "discovery",
      difficulty: "hard",
      timestamp: Date.now()
    },
    {
      id: "quest_5",
      title: "The Mirror",
      description: "Find your reflection in Jonah's world.",
      completed: false,
      progress: 0,
      reward: 25,
      type: "puzzle",
      difficulty: "hard",
      timestamp: Date.now()
    }
  ];

  // Check if any quests have been completed
  const checkQuestCompletion = () => {
    if (!sentience || !sentience.microQuests) return;
    
    const updatedQuests = [...sentience.microQuests];
    let questCompleted = false;

    // Check for completed quests
    for (let i = 0; i < updatedQuests.length; i++) {
      if (updatedQuests[i].completed) continue;
      
      // Logic to check if a quest is completed based on type
      if (updatedQuests[i].type === "exploration") {
        // Check if the user has visited specific pages
        // This is a simplified example - in reality, we would check memorySystem.pagesVisited
        if (Math.random() < 0.1) { // 10% chance for simulation purposes
          updatedQuests[i].completed = true;
          questCompleted = true;
          modifyTrust(updatedQuests[i].reward);
          
          addBotMessage(`Quest completed: ${updatedQuests[i].title}. +${updatedQuests[i].reward} trust.`);
        }
      }
    }

    if (questCompleted) {
      updateSentience({ 
        microQuests: updatedQuests 
      });
    }
  };

  // Generate a new quest occasionally
  const maybeGenerateNewQuest = () => {
    if (!sentience) return;
    
    // Don't add too many quests
    const currentQuests = sentience.microQuests || [];
    const incompleteQuestCount = currentQuests.filter(q => !q.completed).length;
    
    if (incompleteQuestCount >= 3) return;
    
    // Small chance to generate a new quest
    if (Math.random() < 0.3) { // 30% chance
      const availableQuests = sampleQuests.filter(quest => 
        !currentQuests.some(q => q.id === quest.id)
      );
      
      if (availableQuests.length > 0) {
        const newQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
        
        const updatedQuests = [...currentQuests, newQuest];
        updateSentience({ 
          microQuests: updatedQuests 
        });
        
        // Announce the new quest if the chat is open
        if (isOpen) {
          setTimeout(() => {
            addBotMessage(`New quest available: ${newQuest.title}. ${newQuest.description}`);
          }, 1000);
        }
      }
    }
  };

  return null; // This component doesn't render anything visible
};

export default BotQuestSystem;
