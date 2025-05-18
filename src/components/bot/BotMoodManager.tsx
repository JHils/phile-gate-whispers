
import { useEffect, useState } from 'react';
import { updateJonahMood } from '@/utils/jonahRealityFabric';

interface BotMoodManagerProps {
  trustLevel: string;
  messages: Array<{
    id: string;
    type: 'bot' | 'user';
    content: string;
    timestamp: number;
    special?: boolean;
  }>;
}

const BotMoodManager: React.FC<BotMoodManagerProps> = ({ trustLevel, messages }) => {
  const [moodColor, setMoodColor] = useState<string>("text-silver");

  // Update Jonah's mood display based on current mood
  useEffect(() => {
    if (window.JonahConsole?.sentience?.realityFabric) {
      const currentMood = window.JonahConsole.sentience.realityFabric.currentMood;
      
      // Update mood color based on current mood
      switch (currentMood) {
        case 'trusting':
          setMoodColor("text-amber-400 border-amber-400/50");
          break;
        case 'unstable':
          setMoodColor("text-red-500 border-red-500/50");
          break;
        case 'withdrawn':
          setMoodColor("text-gray-400 border-gray-400/50");
          break;
        case 'watching':
        default:
          setMoodColor("text-silver border-silver/50");
          break;
      }
      
      // Update Jonah's mood periodically
      updateJonahMood(trustLevel);
    }
  }, [messages.length, trustLevel]);

  return { moodColor };
};

export default BotMoodManager;
