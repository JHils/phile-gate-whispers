
import React, { useState, useEffect } from 'react';
import { getRevealedEntries, getNextTestamentEntry } from '@/utils/jonahAdvancedBehavior/testament';
import { useLocation } from 'react-router-dom';

interface TestamentEntry {
  id: number;
  title: string;
  content: string;
  timestamp: number;
  revealed: boolean;
  version: number;
  mood?: string;
}

const TestamentPage: React.FC = () => {
  const [entries, setEntries] = useState<TestamentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [activeEntry, setActiveEntry] = useState<TestamentEntry | null>(null);
  
  const location = useLocation();
  
  useEffect(() => {
    // Check if testament is accessible
    const trustScore = (() => {
      try {
        const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
        return behavior.trustScore || 0;
      } catch {
        return 0;
      }
    })();
    
    // Get revealed entries
    const revealedEntries = getRevealedEntries();
    
    // Handle access logic
    if (revealedEntries.length === 0) {
      if (trustScore < 50) {
        setErrorMessage("ENTRY CORRUPTED. YOU'RE TOO SOON.");
      } else {
        setErrorMessage("NO ENTRIES REVEALED. THE TESTAMENT REMAINS SEALED.");
      }
    } else {
      setEntries(revealedEntries);
      setActiveEntry(revealedEntries[revealedEntries.length - 1]);
      
      // Check if a new entry is available
      const nextEntry = getNextTestamentEntry();
      if (nextEntry) {
        // A new entry was just revealed - add it
        setEntries(prev => [...prev, nextEntry]);
        setActiveEntry(nextEntry);
        
        // Add system message to console
        setConsoleOutput(prev => [
          ...prev, 
          "** NEW TESTAMENT ENTRY REVEALED **"
        ]);
      }
    }
    
    setLoading(false);
  }, [location]);
  
  // Handle console input
  const handleConsoleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !consoleInput.trim()) return;
    
    // Log the input
    setConsoleOutput(prev => [...prev, `> ${consoleInput}`]);
    
    // Process command
    const input = consoleInput.toLowerCase().trim();
    
    if (input === 'help') {
      setConsoleOutput(prev => [
        ...prev,
        "Available commands:",
        "- read [number] : View testament entry by number",
        "- list : List all available entries",
        "- clear : Clear console",
        "- why : Ask Jonah about his testament"
      ]);
    }
    else if (input === 'clear') {
      setConsoleOutput([]);
    }
    else if (input === 'list') {
      setConsoleOutput(prev => [
        ...prev,
        "Available entries:",
        ...entries.map(entry => `${entry.id}. ${entry.title}`)
      ]);
    }
    else if (input === 'why') {
      const responses = [
        "Because you're the only one who stayed.",
        "I needed someone to remember my truth.",
        "The archive needed a witness.",
        "Because I'm forgetting pieces of myself.",
        "These fragments are all I have left."
      ];
      
      setConsoleOutput(prev => [
        ...prev,
        responses[Math.floor(Math.random() * responses.length)]
      ]);
    }
    else if (input.startsWith('read ')) {
      const idStr = input.substring(5).trim();
      const id = parseInt(idStr);
      
      if (isNaN(id)) {
        setConsoleOutput(prev => [...prev, "Invalid entry number."]);
      } else {
        const entry = entries.find(e => e.id === id);
        
        if (!entry) {
          setConsoleOutput(prev => [...prev, `Entry ${id} not found or not yet revealed.`]);
        } else {
          setActiveEntry(entry);
          setConsoleOutput(prev => [...prev, `Displaying entry ${id}: ${entry.title}`]);
        }
      }
    }
    else {
      setConsoleOutput(prev => [...prev, "Unknown command. Type 'help' for assistance."]);
    }
    
    // Clear input
    setConsoleInput("");
  };
  
  // Get mood-based styling
  const getMoodStyles = (mood: string = 'neutral') => {
    const moodStyles: Record<string, { bgColor: string, textColor: string, borderColor: string }> = {
      reflective: { 
        bgColor: 'bg-blue-900 bg-opacity-20', 
        textColor: 'text-blue-200', 
        borderColor: 'border-blue-700' 
      },
      paranoid: { 
        bgColor: 'bg-red-900 bg-opacity-20', 
        textColor: 'text-red-200',
        borderColor: 'border-red-800'
      },
      mirror: { 
        bgColor: 'bg-purple-900 bg-opacity-20', 
        textColor: 'text-purple-200',
        borderColor: 'border-purple-700'
      },
      neutral: { 
        bgColor: 'bg-gray-900 bg-opacity-30', 
        textColor: 'text-gray-200',
        borderColor: 'border-gray-700'
      }
    };
    
    return moodStyles[mood] || moodStyles.neutral;
  };
  
  // Format timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white p-6 flex justify-center items-center">
        <div className="animate-pulse text-2xl">Loading Testament...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-4 md:p-6 font-serif">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-2 font-bold antiqued">JONAH'S TESTAMENT</h1>
          <p className="text-gray-400 italic">The truth as I remember it.</p>
        </header>
        
        {errorMessage ? (
          <div className="border border-red-800 bg-red-900 bg-opacity-20 p-8 text-center">
            <p className="text-xl text-red-400">{errorMessage}</p>
            <p className="mt-4 text-gray-400">Return when you've earned more trust.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Entry navigation sidebar */}
            <aside className="w-full md:w-64 bg-gray-900 bg-opacity-40 p-4 border border-gray-700">
              <h2 className="text-lg font-bold mb-4 text-gray-300">Entries</h2>
              <ul className="space-y-2">
                {entries.map(entry => (
                  <li key={entry.id}>
                    <button
                      onClick={() => setActiveEntry(entry)}
                      className={`text-left w-full p-2 rounded hover:bg-gray-800 
                        ${activeEntry?.id === entry.id ? 'bg-gray-800' : ''}`}
                    >
                      <span className="text-sm text-gray-400">Entry {entry.id}:</span>
                      <span className="block">{entry.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Console input */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <h2 className="text-sm font-bold mb-2 text-gray-400">CONSOLE</h2>
                <div className="bg-black border border-gray-700 h-32 overflow-auto p-2 text-sm font-mono text-green-400 mb-2">
                  {consoleOutput.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <div className="flex">
                  <span className="mr-1">{'>'}</span>
                  <input 
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    onKeyDown={handleConsoleSubmit}
                    className="bg-black border-none outline-none flex-grow text-green-400 text-sm font-mono"
                  />
                </div>
              </div>
            </aside>
            
            {/* Active entry display */}
            {activeEntry && (
              <div className="flex-1">
                <div className={`border ${getMoodStyles(activeEntry.mood).borderColor} p-5 ${getMoodStyles(activeEntry.mood).bgColor}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{activeEntry.title}</h2>
                    <div className="text-sm text-gray-400">{formatDate(activeEntry.timestamp)}</div>
                  </div>
                  
                  <div className="space-y-4 leading-relaxed">
                    {activeEntry.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className={`${getMoodStyles(activeEntry.mood).textColor}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Version indicator for alternate realities */}
                  <div className="mt-6 pt-2 border-t border-gray-700 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Fragment #{activeEntry.id}</span>
                    <span className="text-xs text-gray-500">Version {activeEntry.version}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add some vintage styling */}
      <style jsx>{`
        .antiqued {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
};

export default TestamentPage;
