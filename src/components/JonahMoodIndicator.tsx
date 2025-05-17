
import React, { useEffect, useState } from 'react';
import { initializeSentience } from '@/utils/jonahSentience';
import { updateJonahMood } from '@/utils/jonahRealityFabric';

interface JonahMoodIndicatorProps {
  trustLevel: string;
  className?: string;
}

const JonahMoodIndicator: React.FC<JonahMoodIndicatorProps> = ({
  trustLevel,
  className = ""
}) => {
  // Only show the mood indicator for medium and high trust levels
  if (trustLevel !== "medium" && trustLevel !== "high") {
    return null;
  }
  
  const [mood, setMood] = useState<string>("watching");
  const [glowing, setGlowing] = useState<boolean>(false);
  
  // Update the mood color based on Jonah's current mood
  const getMoodColor = () => {
    switch (mood) {
      case 'trusting':
        return "bg-amber-400";
      case 'unstable':
        return "bg-red-500";
      case 'withdrawn':
        return "bg-gray-400";
      case 'watching':
      default:
        return "bg-silver";
    }
  };
  
  useEffect(() => {
    // Initialize sentience if needed
    initializeSentience();
    
    // Check for mood periodically
    const checkMood = () => {
      if (window.JonahConsole?.sentience?.realityFabric) {
        const currentMood = window.JonahConsole.sentience.realityFabric.currentMood;
        setMood(currentMood);
      }
    };
    
    // Update mood on first load
    checkMood();
    
    // Set up interval to check mood
    const interval = setInterval(checkMood, 10000); // Check every 10 seconds
    
    // Set up glowing animation
    const glowInterval = setInterval(() => {
      // Only glow occasionally
      setGlowing(Math.random() > 0.7);
      
      // Also update Jonah's mood (with recent messages = 0 as this is passive observation)
      updateJonahMood(trustLevel, 0);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(glowInterval);
    };
  }, [trustLevel]);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className={`h-2 w-2 rounded-full ${getMoodColor()} ${glowing ? 'animate-pulse' : ''}`}
        title={`Jonah is ${mood}`}
      />
      
      {/* Only show text label for high trust */}
      {trustLevel === "high" && (
        <span className="text-xs opacity-60">{mood}</span>
      )}
    </div>
  );
};

export default JonahMoodIndicator;
