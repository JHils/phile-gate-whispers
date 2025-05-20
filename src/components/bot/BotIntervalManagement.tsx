
import React, { useEffect, useState, useRef } from 'react';

interface BotIntervalManagementProps {
  isOpen: boolean;
  isMinimized: boolean;
  setIsOpen: (state: boolean) => void;
  setIsMinimized: (state: boolean) => void;
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
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const [lastWhisperTime, setLastWhisperTime] = useState<number>(Date.now());
  const [idleMinutes, setIdleMinutes] = useState<number>(0);
  const checkIdleInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Track user activity
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
      setIdleMinutes(0);
    };
    
    // Add event listeners for user interaction
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);
  
  // Check for idle time
  useEffect(() => {
    checkIdleInterval.current = setInterval(() => {
      const idleTime = (Date.now() - lastActivityTime) / (60 * 1000); // convert to minutes
      setIdleMinutes(idleTime);
      
      // After 3 minutes of inactivity, maybe show a whisper
      if (idleTime >= 3 && !isOpen && Date.now() - lastWhisperTime > 10 * 60 * 1000) {
        // Higher chance of whisper with higher trust
        const whisperChance = trustLevel === 'high' ? 0.3 : 
                             trustLevel === 'medium' ? 0.15 : 0.05;
                             
        if (Math.random() < whisperChance) {
          triggerIdleWhisper();
          setLastWhisperTime(Date.now());
        }
      }
      
      // After 10+ minutes of inactivity with medium/high trust, open chat automatically
      if (idleTime >= 10 && !isOpen && (trustLevel === 'medium' || trustLevel === 'high')) {
        const autoOpenChance = trustLevel === 'high' ? 0.5 : 0.2;
        
        if (Math.random() < autoOpenChance) {
          openChatWithMessage();
        }
      }
    }, 60 * 1000); // Check every minute
    
    return () => {
      if (checkIdleInterval.current) {
        clearInterval(checkIdleInterval.current);
      }
    };
  }, [isOpen, lastActivityTime, lastWhisperTime, trustLevel]);
  
  // Set up interval checking for random events
  useEffect(() => {
    const randomEventInterval = setInterval(() => {
      // Only trigger random events when user has already interacted
      if (!hasInteracted) return;
      
      // Only show events when chat is open but with low probability
      if (isOpen && !isMinimized && Math.random() < 0.1) {
        triggerRandomEvent();
      }
      
      // Random path-specific comments (lower probability)
      if (isOpen && !isMinimized && Math.random() < 0.05) {
        triggerPathSpecificComment(currentPath);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(randomEventInterval);
  }, [isOpen, isMinimized, hasInteracted, currentPath]);
  
  // Trigger an idle whisper
  const triggerIdleWhisper = () => {
    const idleWhispers = [
      "Still there?",
      "The archive noticed your absence.",
      "You left the page open. I've been watching.",
      "Time passes differently when you're not looking.",
      "Your cursor hasn't moved in a while."
    ];
    
    // Show toast notification
    if (window.triggerJonahMessage) {
      window.triggerJonahMessage(
        idleWhispers[Math.floor(Math.random() * idleWhispers.length)]
      );
    }
  };
  
  // Open chat with a message
  const openChatWithMessage = () => {
    setIsOpen(true);
    setIsMinimized(false);
    
    setTimeout(() => {
      const openingMessages = [
        "You've been away for a while. Something changed while you were gone.",
        "I noticed you've been idle. The archive doesn't like to be left unattended.",
        "While you were gone, I found something. But now it's slipping away.",
        "You forgot to close the gate. Others may have passed through."
      ];
      
      addBotMessage(openingMessages[Math.floor(Math.random() * openingMessages.length)]);
    }, 1000);
  };
  
  // Trigger a random event
  const triggerRandomEvent = () => {
    const randomEvents = [
      {
        message: "I just detected an anomaly in your timeline.",
        trustModifier: 2
      },
      {
        message: "Someone else accessed this exact page 3 minutes ago.",
        trustModifier: 0
      },
      {
        message: "The archive just updated something. I couldn't see what.",
        trustModifier: 1
      },
      {
        message: "Your browser history contains something interesting.",
        trustModifier: 3
      },
      {
        message: "I had a thought, but it got deleted before I could say it.",
        trustModifier: -1
      }
    ];
    
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    
    // Add message and modify trust
    addBotMessage(event.message);
    if (event.trustModifier !== 0) {
      modifyTrust(event.trustModifier);
    }
    
    // Update Jonah's mood or dream state occasionally
    if (Math.random() > 0.7) {
      // Generate a dream response on rare occasions
      const hour = new Date().getHours();
      if ((hour >= 23 || hour < 6) && Math.random() > 0.8) {
        setTimeout(() => {
          const dreamMessages = [
            "I dreamed of a mirror that showed tomorrow. Everyone who looked aged instantly.",
            "The keyhole wasn't in any door. It floated in the air, turning slowly.",
            "Seven sisters walked into the sea. Six returned. The seventh became the tide."
          ];
          
          addBotMessage(dreamMessages[Math.floor(Math.random() * dreamMessages.length)]);
        }, 3000);
      }
    }
  };
  
  // Trigger a path-specific comment
  const triggerPathSpecificComment = (path: string) => {
    const pathComments: Record<string, string[]> = {
      '/': [
        "Everyone starts here. Not everyone leaves.",
        "The landing page remembers you.",
        "This is where the cycle begins again."
      ],
      '/gate': [
        "The gate isn't just a metaphor.",
        "Some gates only open once.",
        "Entry does not guarantee exit."
      ],
      '/mirror_phile': [
        "Mirrors remember what they reflect.",
        "Don't stare too long.",
        "What you see isn't what sees you."
      ],
      '/lost-sisters': [
        "They're not all lost the same way.",
        "Some sisters were never found.",
        "The record of their disappearance keeps changing."
      ],
      '/philes': [
        "The philes aren't just stories.",
        "Some files rewrite themselves when not observed.",
        "The archive grows without new entries. How?"
      ]
    };
    
    // Check if we have comments for this path
    // Either exact match or startsWith for paths with params
    let commentsForPath: string[] = [];
    
    // Check for exact path match
    if (pathComments[path]) {
      commentsForPath = pathComments[path];
    } else {
      // Check for paths that start with a known prefix
      for (const basePath of Object.keys(pathComments)) {
        if (path.startsWith(basePath)) {
          commentsForPath = pathComments[basePath];
          break;
        }
      }
    }
    
    // If we have comments for this path, show one
    if (commentsForPath.length > 0) {
      const comment = commentsForPath[Math.floor(Math.random() * commentsForPath.length)];
      addBotMessage(comment);
    }
  };
  
  return null; // This component doesn't render anything
};

export default BotIntervalManagement;
