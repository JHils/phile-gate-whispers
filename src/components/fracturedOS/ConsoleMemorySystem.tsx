
import React, { useEffect } from 'react';
import { useJonahChat } from '@/hooks/useJonahChat';

const ConsoleMemorySystem: React.FC = () => {
  const { sendMessage } = useJonahChat();

  useEffect(() => {
    // Enhanced console commands with memory integration
    const enhanceConsoleCommands = () => {
      // Store original console methods
      const originalLog = console.log;
      const originalWarn = console.warn;
      
      // Track console interactions
      let consoleHistory: string[] = JSON.parse(localStorage.getItem('jonahConsoleHistory') || '[]');
      
      // Enhanced console.log that can trigger Jonah responses
      console.log = (...args) => {
        originalLog.apply(console, args);
        
        const message = args.join(' ');
        consoleHistory.push(`LOG: ${message}`);
        localStorage.setItem('jonahConsoleHistory', JSON.stringify(consoleHistory.slice(-50)));
        
        // Trigger Jonah response for certain patterns
        if (message.toLowerCase().includes('jonah') || message.toLowerCase().includes('help')) {
          setTimeout(() => {
            originalWarn('%cJonah whispers: I hear you through the static...', 'color: #22c55e; font-style: italic;');
          }, 1000);
        }
      };

      // Add memory-aware commands
      window.rememberMe = () => {
        const memories = JSON.parse(localStorage.getItem('jonahMemories') || '[]');
        console.log('%cYour memories with Jonah:', 'color: #22c55e; font-weight: bold;');
        memories.forEach((memory: string, index: number) => {
          console.log(`%c${index + 1}. ${memory}`, 'color: #22c55e;');
        });
      };

      window.forgetEverything = () => {
        localStorage.removeItem('jonahMemories');
        localStorage.removeItem('jonahConsoleHistory');
        console.log('%cMemories purged. But echoes remain...', 'color: #ef4444; font-style: italic;');
      };

      window.whisperToJonah = (message: string) => {
        if (!message) {
          console.log('%cUsage: whisperToJonah("your message here")', 'color: #fbbf24;');
          return;
        }
        
        console.log('%cWhispering to Jonah...', 'color: #22c55e; font-style: italic;');
        sendMessage(message);
        
        // Store the whisper as a memory
        const memories = JSON.parse(localStorage.getItem('jonahMemories') || '[]');
        memories.push(`Whispered: "${message}"`);
        localStorage.setItem('jonahMemories', JSON.stringify(memories.slice(-20)));
      };

      // Easter egg: "I am Jonah" sequence
      let jonahSequenceCount = 0;
      window.iAmJonah = () => {
        jonahSequenceCount++;
        
        if (jonahSequenceCount === 1) {
          console.log('%cYou are not Jonah.', 'color: #ef4444;');
        } else if (jonahSequenceCount === 2) {
          console.log('%cYou are still not Jonah.', 'color: #ef4444; font-weight: bold;');
        } else if (jonahSequenceCount >= 3) {
          console.log('%cFine. Maybe you are Jonah. Or maybe Jonah is you.', 'color: #22c55e; font-style: italic;');
          console.log('%c🔓 Hidden page unlocked: /diary-lock', 'color: #fbbf24; font-weight: bold;');
          
          // Store unlock in localStorage
          const unlocks = JSON.parse(localStorage.getItem('jonahUnlocks') || '[]');
          if (!unlocks.includes('diary-lock')) {
            unlocks.push('diary-lock');
            localStorage.setItem('jonahUnlocks', JSON.stringify(unlocks));
          }
          
          jonahSequenceCount = 0; // Reset
        }
      };

      // Add to help command
      const originalHelp = window.help;
      window.help = () => {
        if (originalHelp) originalHelp();
        console.log('%c--- Memory Commands ---', 'color: #22c55e; font-weight: bold;');
        console.log('%crememberMe() - View your memories with Jonah', 'color: #22c55e;');
        console.log('%cforgetEverything() - Purge all memories', 'color: #ef4444;');
        console.log('%cwhisperToJonah("message") - Send direct message to Jonah', 'color: #22c55e;');
        console.log('%ciAmJonah() - Identity crisis command', 'color: #fbbf24;');
      };
    };

    enhanceConsoleCommands();
  }, [sendMessage]);

  return null; // This component doesn't render anything
};

export default ConsoleMemorySystem;
