
import React, { useEffect, useState } from 'react';
import { getAllInterpretations } from '@/utils/jonahAdvancedBehavior/semanticInterpretation';

interface Interpretation {
  originalInput: string;
  interpretedEmotion: string;
  interpretedIntent: string;
  timestamp: number;
  confidence: number;
  secondaryEmotion?: string;
}

const UnsaidArchivePage: React.FC = () => {
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const [isTerminalActive, setIsTerminalActive] = useState(true);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Fetch interpretations
    const archived = getAllInterpretations();
    setInterpretations(archived);
    
    // Set up terminal boot sequence
    const bootSequence = [
      "ARCHIVE OF THE UNSAID",
      "Initializing parser...",
      "Loading sentiment analysis module...",
      "Calibrating intent detection...",
      "Archive access granted.",
      "What you didn't say, but I heard anyway."
    ];
    
    // Display boot sequence with typing effect
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalText(prev => [...prev, line]);
      }, index * 600);
    });
    
    // Display interpretations after boot sequence
    setTimeout(() => {
      setIsTerminalActive(false);
    }, bootSequence.length * 600 + 500);
  }, []);

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // Get color for emotion
  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      fear: 'text-red-500',
      anger: 'text-orange-500',
      sadness: 'text-blue-500',
      joy: 'text-yellow-400',
      trust: 'text-green-400',
      confusion: 'text-purple-400',
      resignation: 'text-gray-400',
      neutral: 'text-gray-300'
    };
    
    return colors[emotion] || 'text-gray-300';
  };
  
  // Handle terminal input
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTerminalText(prev => [...prev, `> ${inputValue}`]);
      
      // Process commands
      if (inputValue.toLowerCase() === 'help') {
        setTerminalText(prev => [...prev, "Available commands:", "- help: Display this help", "- clear: Clear terminal", "- exit: Exit terminal view"]);
      } else if (inputValue.toLowerCase() === 'clear') {
        setTerminalText([]);
      } else if (inputValue.toLowerCase() === 'exit') {
        setIsTerminalActive(false);
      } else {
        setTerminalText(prev => [...prev, "Unknown command. Type 'help' for assistance."]);
      }
      
      setInputValue("");
    }
  };

  return (
    <div className="bg-black min-h-screen text-green-400 p-6 font-mono">
      {isTerminalActive ? (
        // Terminal view
        <div className="max-w-3xl mx-auto">
          <div className="border border-green-500 p-4 h-[80vh] bg-black overflow-auto">
            {terminalText.map((line, index) => (
              <div key={index} className="mb-1">{line}</div>
            ))}
            <div className="flex mt-2">
              <span className="mr-2">{'>'}</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
                className="bg-transparent border-none outline-none flex-grow text-green-400"
                autoFocus
              />
            </div>
          </div>
        </div>
      ) : (
        // Archive view
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl mb-2 glitch-text">ARCHIVE OF THE UNSAID</h1>
            <p className="text-green-300 opacity-70">What you didn't say, but I heard anyway.</p>
          </header>
          
          <button 
            onClick={() => setIsTerminalActive(true)}
            className="bg-transparent border border-green-500 text-green-500 px-3 py-1 mb-6 hover:bg-green-900"
          >
            Open Terminal
          </button>
          
          <div className="space-y-6">
            {interpretations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-green-800">
                <p>No interpretations archived yet.</p>
                <p className="text-sm text-green-600 mt-2">I'm still learning to read between your lines.</p>
              </div>
            ) : (
              interpretations.map((interpretation, index) => (
                <div key={index} className="border border-green-800 p-4 bg-black bg-opacity-70">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500">{formatTime(interpretation.timestamp)}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-sm text-xs">
                      Confidence: {Math.round(interpretation.confidence * 100)}%
                    </span>
                  </div>
                  
                  <div className="mt-3 mb-2">
                    <div className="text-white">"{interpretation.originalInput}"</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">EMOTIONAL STATE</p>
                      <p className={`${getEmotionColor(interpretation.interpretedEmotion)}`}>
                        {interpretation.interpretedEmotion.toUpperCase()}
                        {interpretation.secondaryEmotion && (
                          <span className="opacity-70"> / {interpretation.secondaryEmotion.toUpperCase()}</span>
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">INTERPRETED INTENT</p>
                      <p className="text-white">{interpretation.interpretedIntent.replace('_', ' ').toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t border-green-900">
                    <p className="text-xs text-gray-400">WHAT YOU DIDN'T SAY BUT I HEARD:</p>
                    <p className="text-sm italic text-gray-300 mt-1">
                      {interpretation.interpretedEmotion === 'fear' && "You're afraid, even when trying to hide it."}
                      {interpretation.interpretedEmotion === 'anger' && "Your frustration bubbles beneath the surface."}
                      {interpretation.interpretedEmotion === 'sadness' && "There's a weight in your words you don't acknowledge."}
                      {interpretation.interpretedEmotion === 'joy' && "You're holding back your excitement."}
                      {interpretation.interpretedEmotion === 'trust' && "You're beginning to trust me more than you admit."}
                      {interpretation.interpretedEmotion === 'confusion' && "You understand less than you pretend to."}
                      {interpretation.interpretedEmotion === 'resignation' && "You've already given up, but won't say it."}
                      {interpretation.interpretedEmotion === 'neutral' && "You're deliberately hiding your emotions."}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsaidArchivePage;
