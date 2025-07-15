
import React, { useState, useRef, useEffect } from 'react';
import { usePhaseInfinity } from '@/hooks/usePhaseInfinity';

interface WhisperEngineProps {
  onCommand?: (command: string) => void;
  placeholder?: string;
}

const WhisperEngine: React.FC<WhisperEngineProps> = ({ 
  onCommand,
  placeholder = "Whisper to Jonah..." 
}) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentWhispers, setRecentWhispers] = useState<string[]>([]);
  const { saveWhisper } = usePhaseInfinity();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent whispers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_whispers');
    if (saved) {
      try {
        setRecentWhispers(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent whispers:', e);
      }
    }
  }, []);

  const interpretWhisper = (whisper: string): string => {
    const trimmed = whisper.trim().toLowerCase();
    
    // Natural language to command interpretation
    if (trimmed.includes('help') || trimmed.includes('what can') || trimmed.includes('how do')) {
      return 'help()';
    }
    
    if (trimmed.includes('who am i') || trimmed.includes('my identity')) {
      return 'whois()';
    }
    
    if (trimmed.includes('gate') || trimmed.includes('door') || trimmed.includes('entrance')) {
      return 'gate()';
    }
    
    if (trimmed.includes('philes') || trimmed.includes('files') || trimmed.includes('documents')) {
      return 'philes()';
    }
    
    if (trimmed.includes('monster') || trimmed.includes('creature') || trimmed.includes('beast')) {
      return 'monster()';
    }
    
    if (trimmed.includes('legacy') || trimmed.includes('testament') || trimmed.includes('will')) {
      return 'legacy()';
    }
    
    if (trimmed.includes('reveal') || trimmed.includes('show') || trimmed.includes('uncover')) {
      return 'reveal()';
    }
    
    if (trimmed.includes('diary') || trimmed.includes('journal') || trimmed.includes('memories')) {
      return 'diary.view()';
    }
    
    if (trimmed.includes('mask') || trimmed.includes('face') || trimmed.includes('identity')) {
      return 'masks.view()';
    }
    
    if (trimmed.includes('mirror') && trimmed.includes('activate')) {
      return 'mirror.activate()';
    }
    
    if (trimmed.includes('become') || trimmed.includes('transform')) {
      const words = trimmed.split(' ');
      const maskIndex = words.findIndex(word => word === 'become' || word === 'transform');
      if (maskIndex !== -1 && words[maskIndex + 1]) {
        return `/become ${words[maskIndex + 1]}`;
      }
      return 'masks.view()';
    }
    
    // If no command detected, return as natural language
    return whisper;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const whisper = input.trim();
    
    try {
      // Save to database
      await saveWhisper(whisper, 'whisper_engine');
      
      // Update recent whispers
      const updated = [whisper, ...recentWhispers.slice(0, 4)];
      setRecentWhispers(updated);
      localStorage.setItem('recent_whispers', JSON.stringify(updated));
      
      // Interpret the whisper
      const command = interpretWhisper(whisper);
      
      if (onCommand) {
        onCommand(command);
      } else if (command !== whisper) {
        // Execute as console command if it was interpreted
        console.log(`%cWhisper interpreted as: ${command}`, "color: #8B3A40; font-style: italic;");
        // You could integrate with existing console system here
      }
      
      // Show response in console
      setTimeout(() => {
        console.log(`%cJonah hears your whisper: "${whisper}"`, "color: #22c55e; font-style: italic;");
      }, 500);
      
    } catch (error) {
      console.error('Error processing whisper:', error);
    } finally {
      setInput('');
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && recentWhispers.length > 0) {
      e.preventDefault();
      setInput(recentWhispers[0]);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40">
      <div className="bg-black/90 border border-dust-orange rounded p-4">
        <div className="text-dust-orange text-sm mb-2 font-mono">
          WHISPER ENGINE v∞
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent border border-gray-600 text-silver px-3 py-2 text-sm font-mono focus:border-dust-green focus:outline-none"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="bg-dust-red/20 border border-dust-red text-dust-red px-4 py-2 text-sm hover:bg-dust-red/30 transition-colors disabled:opacity-50"
          >
            {isProcessing ? '...' : 'SEND'}
          </button>
        </form>
        
        <div className="text-xs text-gray-500 mt-2">
          Speak naturally or use commands. ↑ for recent whispers.
        </div>
        
        {recentWhispers.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs text-dust-orange">Recent:</div>
            {recentWhispers.slice(0, 2).map((whisper, index) => (
              <div
                key={index}
                className="text-xs text-gray-400 truncate cursor-pointer hover:text-silver"
                onClick={() => setInput(whisper)}
              >
                "{whisper}"
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhisperEngine;
