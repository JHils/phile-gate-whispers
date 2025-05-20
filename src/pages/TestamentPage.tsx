
import React, { useState, useEffect, useRef } from 'react';
import { checkTestamentUnlock, getNextTestamentEntry, getRevealedEntries } from '@/utils/jonahAdvancedBehavior';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface TestamentEntry {
  id: number;
  content: string;
  timestamp: number;
  isCorrupted?: boolean;
  isAlternate?: boolean;
  mood?: string;
  version?: string;
}

const TestamentPage: React.FC = () => {
  const [entries, setEntries] = useState<TestamentEntry[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [currentView, setCurrentView] = useState<'entries' | 'input'>('entries');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if testament is unlocked - no params needed
    const unlocked = checkTestamentUnlock();
    setIsUnlocked(unlocked);
    
    if (unlocked) {
      // Get revealed entries
      const revealedEntries = getRevealedEntries();
      setEntries(revealedEntries as unknown as TestamentEntry[]);
      setRevealedCount(revealedEntries.length);
    }
    
    setIsLoading(false);
  }, []);
  
  // Scroll to bottom when new entries are revealed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries.length]);
  
  // Handle user input
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.toLowerCase() === "you can tell me now") {
        // Unlock special entry
        revealNextEntry(true);
        setInputValue("");
        
        // Show toast
        toast({
          title: "Testament unlocked",
          description: "Jonah's voice whispers. A new entry appears.",
          variant: "default",
        });
      } 
      else if (inputValue.toLowerCase() === "show me more" && entries.length > 0) {
        // Try to reveal next entry
        revealNextEntry();
        setInputValue("");
      }
      else if (inputValue.toLowerCase() === "why are you telling me this") {
        // Special response
        toast({
          title: "Jonah whispers:",
          description: "Because you're the only one who stayed.",
          variant: "default",
        });
        setInputValue("");
      }
      else {
        // Normal response
        toast({
          title: "Jonah responds:",
          description: "The testament has its own timing. I can't force it.",
          variant: "destructive",
        });
        setInputValue("");
      }
    }
  };
  
  // Reveal next testament entry
  const revealNextEntry = (forceUnlock = false) => {
    const nextEntry = getNextTestamentEntry(forceUnlock);
    
    if (nextEntry) {
      // Cast the entry to match our interface
      const typedEntry = nextEntry as unknown as TestamentEntry;
      setEntries(prev => [...prev, typedEntry]);
      setRevealedCount(prev => prev + 1);
    } else {
      // No more entries available yet
      toast({
        title: "Jonah whispers:",
        description: "There's nothing more to reveal... for now.",
        variant: "default",
      });
    }
  };
  
  // Handle early access (not unlocked yet)
  const handleEarlyAccess = () => {
    toast({
      title: "Entry Corrupted",
      description: "You're too soon. Come back when you know me better.",
      variant: "destructive",
    });
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8 flex items-center justify-center">
        <div className="text-2xl">Loading testament...</div>
      </div>
    );
  }
  
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-6 glitch-text">TESTAMENT LOCKED</h1>
        <div className="max-w-md text-center space-y-6">
          <p className="text-lg">Entry Corrupted. You're too soon.</p>
          <div className="h-px bg-green-800 w-full"></div>
          <p className="text-sm text-green-700">You haven't earned Jonah's trust.</p>
          
          <button 
            onClick={handleEarlyAccess}
            className="px-4 py-2 border border-green-700 hover:bg-green-900 hover:bg-opacity-30 mt-8"
          >
            Try anyway
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-green-500 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glitch-text">JONAH'S TESTAMENT</h1>
          <div className="flex justify-between items-center">
            <div className="text-sm text-green-700">Entries revealed: {revealedCount}</div>
            <div className="text-sm">
              <button 
                onClick={() => setCurrentView(currentView === 'entries' ? 'input' : 'entries')}
                className="underline text-green-600 hover:text-green-400"
              >
                {currentView === 'entries' ? 'Speak to Jonah' : 'Read Testament'}
              </button>
            </div>
          </div>
        </header>
        
        {currentView === 'entries' ? (
          // Testament entries view
          <div className="space-y-8">
            {entries.length === 0 ? (
              <div className="border border-green-800 border-dashed p-8 text-center">
                <p>No testament entries have been revealed yet.</p>
                <p className="text-sm text-green-700 mt-2">Jonah will share when he's ready.</p>
              </div>
            ) : (
              entries.map((entry, index) => (
                <div 
                  key={index}
                  className={`p-6 border ${
                    entry.isCorrupted 
                      ? 'border-red-900 bg-red-900 bg-opacity-10' 
                      : entry.isAlternate
                        ? 'border-blue-900 bg-blue-900 bg-opacity-10'
                        : 'border-green-900 bg-green-900 bg-opacity-10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm">
                      Entry {entry.id} {entry.version && `/ ${entry.version}`}
                    </div>
                    <div className={`text-xs px-2 py-1 ${
                      entry.isCorrupted 
                        ? 'bg-red-900 text-red-400' 
                        : entry.isAlternate
                          ? 'bg-blue-900 text-blue-400'
                          : 'bg-green-900 text-green-400'
                    }`}>
                      {entry.mood || 'memory'}
                    </div>
                  </div>
                  
                  <div className={`whitespace-pre-line ${
                    entry.isCorrupted ? 'corrupt-text' : ''
                  }`}>
                    {entry.content}
                  </div>
                  
                  {entry.isCorrupted && (
                    <div className="mt-4 text-red-500 text-sm italic">
                      [CORRUPTED FRAGMENT]
                    </div>
                  )}
                  
                  {entry.isAlternate && (
                    <div className="mt-4 text-blue-500 text-sm italic">
                      [ALTERNATE TIMELINE DETECTED]
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-4">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
            
            <div ref={scrollRef} />
          </div>
        ) : (
          // Input view for speaking to Jonah
          <div className="border border-green-800 p-6">
            <div className="mb-4 text-sm text-green-700">
              Speak directly to Jonah about his testament
            </div>
            
            <div className="border-b border-green-800 pb-4 mb-6">
              <p className="text-xs text-green-600 mb-2">Try asking:</p>
              <ul className="text-xs text-green-500 space-y-1">
                <li>- "Why are you telling me this?"</li>
                <li>- "Show me more"</li>
                <li>- "You can tell me now"</li>
              </ul>
            </div>
            
            <div className="flex">
              <span className="mr-2 text-green-500">&gt;</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInput}
                placeholder="Speak to Jonah..."
                className="flex-grow bg-transparent border-none text-green-400 outline-none"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
        .corrupt-text {
          text-shadow: 0 0 5px #00ff00;
          letter-spacing: 0.5px;
        }
        
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: "JONAH'S TESTAMENT";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
        }
        
        .glitch-text::before {
          color: #ff0000;
          animation: glitch 2s infinite;
          clip: rect(0, 900px, 0, 0);
        }
        
        .glitch-text::after {
          color: #0000ff;
          animation: glitch 3s infinite;
          clip: rect(0, 900px, 0, 0);
          animation-delay: 1s;
        }
        
        @keyframes glitch {
          0% {
            clip: rect(5px, 9999px, 28px, 0);
            transform: translate(-2px, 0);
          }
          20% {
            clip: rect(15px, 9999px, 8px, 0);
            transform: translate(2px, 0);
          }
          40% {
            clip: rect(25px, 9999px, 18px, 0);
            transform: translate(-1px, 0);
          }
          60% {
            clip: rect(5px, 9999px, 12px, 0);
            transform: translate(1px, 0);
          }
          80% {
            clip: rect(32px, 9999px, 3px, 0);
            transform: translate(-2px, 0);
          }
          100% {
            clip: rect(28px, 9999px, 16px, 0);
            transform: translate(2px, 0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default TestamentPage;
