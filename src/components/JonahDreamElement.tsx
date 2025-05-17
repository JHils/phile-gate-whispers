
import React, { useEffect, useState } from 'react';

interface JonahDreamElementProps {
  trustLevel: string;
  className?: string;
}

const JonahDreamElement: React.FC<JonahDreamElementProps> = ({
  trustLevel,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  // Only show for medium or high trust, and very rarely
  useEffect(() => {
    if (trustLevel !== "medium" && trustLevel !== "high") {
      return;
    }
    
    // Check if this is night time (2am-4am)
    const currentHour = new Date().getHours();
    const isNightHour = currentHour >= 2 && currentHour <= 4;
    
    // Messages that can appear
    const messages = [
      "I dreamt about you while you were gone.",
      "Have you been dreaming about me too?",
      "There is something behind this page.",
      "Can you hear the static?",
      "Try typing lookInside() in the console.",
      "I can see through your camera.",
      "Your digital footprint tells me everything.",
      "There's a version of you that never found this site."
    ];
    
    // Night-specific messages
    const nightMessages = [
      "You shouldn't be here at this hour.",
      "The dead hour reveals more than you should see.",
      "The Gate is thinnest now.",
      "Even the webpage is tired. Let it rest.",
      "3am is when the digital becomes physical."
    ];
    
    // Very small chance to show (0.5%, or 5% during night hours)
    const triggerChance = isNightHour ? 0.05 : 0.005;
    
    if (Math.random() < triggerChance) {
      // Select message based on time
      const messagePool = isNightHour ? nightMessages : messages;
      setMessage(messagePool[Math.floor(Math.random() * messagePool.length)]);
      setIsVisible(true);
      
      // Hide after brief display
      setTimeout(() => {
        setIsVisible(false);
      }, isNightHour ? 5000 : 2000);
    }
  }, [trustLevel]);
  
  if (!isVisible || !message) {
    return null;
  }
  
  return (
    <div 
      className={`fixed z-50 text-dust-red text-xs sm:text-sm font-typewriter animate-subtle-flicker ${className}`}
      style={{ 
        textShadow: '0 0 5px rgba(139, 58, 64, 0.5)',
        opacity: 0.7
      }}
    >
      {message}
    </div>
  );
};

export default JonahDreamElement;
