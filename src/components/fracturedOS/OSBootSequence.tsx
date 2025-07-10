
import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onBootComplete: () => void;
}

const OSBootSequence: React.FC<BootSequenceProps> = ({ onBootComplete }) => {
  const [bootStage, setBootStage] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    "JONAH OS v3.7.2 INITIALIZING...",
    "Loading memory fragments... [████████████] 100%",
    "Scanning for identity files... FOUND: Joseph.exe",
    "WARNING: Identity fragmentation detected",
    "Attempting to resolve split consciousness...",
    "Loading persona: JONAH [████████████] 100%",
    "Console interface: ACTIVE",
    "Memory palace: ACCESSIBLE",
    "Hidden commands: UNLOCKED",
    "Welcome to the fractured mind of healing...",
    "SYSTEM READY"
  ];

  useEffect(() => {
    if (bootStage < bootSequence.length) {
      const timer = setTimeout(() => {
        setLoadingText(bootSequence[bootStage]);
        setBootStage(prev => prev + 1);
      }, bootStage === 0 ? 1000 : 800 + Math.random() * 400);
      
      return () => clearTimeout(timer);
    } else {
      setTimeout(onBootComplete, 1500);
    }
  }, [bootStage, bootSequence, onBootComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-center p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-green-300 text-sm mb-4">
            JONAH'S FRACTURED OS - LOADING CONSCIOUSNESS
          </div>
          <div className="border border-green-800 p-1 mb-4">
            <div 
              className="bg-green-800 h-2 transition-all duration-300"
              style={{ width: `${(bootStage / bootSequence.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 mb-8">
          {bootSequence.slice(0, bootStage).map((line, index) => (
            <div key={index} className="text-sm opacity-80">
              {line}
            </div>
          ))}
          {loadingText && (
            <div className="text-sm">
              {loadingText}
              {showCursor && bootStage < bootSequence.length && (
                <span className="bg-green-400 text-black">█</span>
              )}
            </div>
          )}
        </div>

        {bootStage >= bootSequence.length && (
          <div className="text-center animate-fade-in">
            <div className="text-lg text-green-300 mb-2">
              System Ready
            </div>
            <div className="text-sm text-gray-400">
              Press any key to enter the memory palace...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OSBootSequence;
