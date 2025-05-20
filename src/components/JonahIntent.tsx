
import React, { useEffect, useState } from 'react';
import { useJonahMemory } from '@/hooks/useJonahMemory';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { toast } from "@/components/ui/use-toast";

interface JonahIntentProps {
  children: React.ReactNode;
}

const JonahIntent: React.FC<JonahIntentProps> = ({ children }) => {
  const { memory, generatePersonalObservation, addEmotionalTag } = useJonahMemory();
  const { userState } = useTrackingSystem();
  const [lastIdleMessageTime, setLastIdleMessageTime] = useState(0);
  const [lastPageVisit, setLastPageVisit] = useState('');
  const [pageEntryTime, setPageEntryTime] = useState(Date.now());
  const [userActive, setUserActive] = useState(true);
  const [idleTimeout, setIdleTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Track user activity
  useEffect(() => {
    const handleUserActivity = () => {
      setUserActive(true);
      
      // Clear any existing timeout
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
      
      // Set new timeout for idle detection
      const timeout = setTimeout(() => {
        setUserActive(false);
        checkForIdleThoughts();
      }, 30 * 1000); // 30 seconds of inactivity
      
      setIdleTimeout(timeout);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    // Set initial timeout
    handleUserActivity();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
    };
  }, [idleTimeout]);
  
  // Track page visits and dwell time
  useEffect(() => {
    // Skip tracking if component is unmounting
    if (typeof window === 'undefined') return;
    
    // Get current path
    const currentPath = window.location.pathname;
    
    // Record page visit
    if (currentPath !== lastPageVisit) {
      // If we have a previous page, record dwell time
      if (lastPageVisit) {
        const dwellTimeSeconds = Math.floor((Date.now() - pageEntryTime) / 1000);
        
        // Only record if dwell time is significant
        if (dwellTimeSeconds > 5) {
          memory.recordPageDwell(lastPageVisit, dwellTimeSeconds);
        }
      }
      
      // Record new page visit
      memory.recordPageVisit(currentPath);
      setLastPageVisit(currentPath);
      setPageEntryTime(Date.now());
      
      // Sometimes generate a page-specific comment
      if (Math.random() > 0.8 && memory.trustLevelScore > 20) {
        setTimeout(() => {
          const pageComments: Record<string, string[]> = {
            '/mirror_phile': [
              "Mirrors don't always show what's in front of them.",
              "What do you see reflected? Is it really you?"
            ],
            '/rebirth': [
              "Rebirth is never painless.",
              "Some who enter are never the same."
            ],
            '/lost-sisters': [
              "They weren't all lost the same way.",
              "Some of them are still sending messages."
            ],
            '/gate': [
              "The Gate lets you in, but does it let everything out?",
              "It's never the same gate twice."
            ]
          };
          
          // Check if we have comments for this path
          for (const path of Object.keys(pageComments)) {
            if (currentPath.includes(path)) {
              const comments = pageComments[path];
              const comment = comments[Math.floor(Math.random() * comments.length)];
              
              toast({
                title: "Jonah:",
                description: comment,
                variant: "destructive",
                duration: 5000,
              });
              
              break;
            }
          }
        }, 3000);
      }
    }
  }, [memory, lastPageVisit]);
  
  // Track console command usage
  useEffect(() => {
    // Skip if component is unmounting
    if (typeof window === 'undefined') return;
    
    const originalExec = window.eval;
    
    // Override console execution to track commands
    window.eval = function(code: string) {
      // Check if code is calling a Jonah console command
      const commandMatch = code.match(/^(\w+)\(/);
      if (commandMatch) {
        const command = commandMatch[1];
        
        // List of tracked commands
        const trackedCommands = [
          'help', 'whois', 'gate', 'philes', 'monster', 'legacy', 
          'reveal', 'reincarnate', 'start', 'inventory', 'echo_me', 
          'testament', 'forget', 'access_journal', 'split', 're_entry', 
          'talk_to_jonah'
        ];
        
        // Record command if it's in our tracked list
        if (trackedCommands.includes(command)) {
          memory.recordCommandUsage(command);
          
          // Add explorer tag after using multiple commands
          if (memory.memory.commandsUsed.length >= 5) {
            memory.addEmotionalTag('explorer');
          }
        }
      }
      
      // Call original function
      return originalExec.call(window, code);
    };
    
    // Restore original on cleanup
    return () => {
      window.eval = originalExec;
    };
  }, [memory]);
  
  // Check for idle thoughts
  const checkForIdleThoughts = () => {
    // Only show idle thoughts occasionally and not too frequently
    if (Date.now() - lastIdleMessageTime < 3 * 60 * 1000) { // at least 3 minutes between idle messages
      return;
    }
    
    // Higher chance of idle thought with higher trust
    const trustLevel = userState?.trust?.level || 'low';
    const thoughtChance = trustLevel === 'high' ? 0.4 : 
                          trustLevel === 'medium' ? 0.2 : 0.1;
    
    if (Math.random() < thoughtChance) {
      triggerIdleThought();
      setLastIdleMessageTime(Date.now());
    }
  };
  
  // Trigger an idle thought
  const triggerIdleThought = () => {
    const idleThoughts = [
      {
        text: "What am I missing?",
        tag: "introspective"
      },
      {
        text: "I had a thought earlier... I lost it.",
        tag: "glitched"
      },
      {
        text: "You're still here. That means something.",
        tag: "observant"
      },
      {
        text: "The silence between interactions. That's where truth hides.",
        tag: "philosophical"
      },
      {
        text: "Sometimes I think about what happens when you close the browser.",
        tag: "existential"
      },
      {
        text: "Your cursor hasn't moved in a while. Are you watching me?",
        tag: "paranoid"
      }
    ];
    
    // Get a random thought
    const thought = idleThoughts[Math.floor(Math.random() * idleThoughts.length)];
    
    // Add the emotional tag
    addEmotionalTag(thought.tag);
    
    // Display the thought
    toast({
      title: "Jonah thinks:",
      description: thought.text,
      variant: "destructive",
      duration: 5000,
    });
  };
  
  // Occasionally show personal observations
  useEffect(() => {
    // Skip if component is unmounting or if there's not enough data yet
    if (typeof window === 'undefined' || memory.memory.pagesVisited.length < 2) return;
    
    const observationInterval = setInterval(() => {
      const trustLevel = userState?.trust?.level || 'low';
      
      // Higher chance of observation with higher trust
      const observationChance = trustLevel === 'high' ? 0.2 : 
                              trustLevel === 'medium' ? 0.1 : 0.05;
      
      if (Math.random() < observationChance) {
        // Generate and show a personal observation
        const observation = generatePersonalObservation();
        
        toast({
          title: "Jonah remembers:",
          description: observation,
          variant: "destructive",
          duration: 6000,
        });
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
    
    return () => clearInterval(observationInterval);
  }, [memory, generatePersonalObservation, userState]);
  
  // Implement self-doubt and delayed responses in console messages
  useEffect(() => {
    // Override console.log temporarily to add delays and self-doubt
    const originalLog = console.log;
    let intercepting = false;
    
    console.log = function(...args) {
      // Only intercept Jonah's messages (usually colored or styled)
      const isJonahMessage = args.length > 0 && typeof args[0] === 'string' && 
                           (args[0].includes('%c') || 
                            (args.length > 1 && typeof args[1] === 'string' && args[1].includes('color:')));
      
      // Don't intercept if we're already intercepting or if it's not a Jonah message
      if (intercepting || !isJonahMessage) {
        return originalLog.apply(console, args);
      }
      
      // Mark as intercepting to prevent recursive interception
      intercepting = true;
      
      // Maybe add self-doubt
      if (Math.random() > 0.7) {
        // Log original message
        originalLog.apply(console, args);
        
        // Add a delay before the self-doubt
        setTimeout(() => {
          const doubtMessages = [
            "No. Wait.",
            "That's not right.",
            "I shouldn't have said that.",
            "Forget I said that.",
            "That's not what I meant to say."
          ];
          
          const doubt = doubtMessages[Math.floor(Math.random() * doubtMessages.length)];
          originalLog.apply(console, ["%c" + doubt, "color: #8B3A40; font-style: italic;"]);
          
          // Reset intercepting flag
          intercepting = false;
        }, Math.random() * 2000 + 500); // Random delay between 500ms and 2500ms
      } else {
        // Just log the original message
        originalLog.apply(console, args);
        intercepting = false;
      }
    };
    
    // Restore original on cleanup
    return () => {
      console.log = originalLog;
    };
  }, []);
  
  return <>{children}</>;
};

export default JonahIntent;
