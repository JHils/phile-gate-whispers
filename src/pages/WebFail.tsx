
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTrackingSystem } from '@/hooks/useTrackingSystem';
import { useConsoleMessages } from '@/hooks/useConsoleMessages';
import { Button } from '@/components/ui/button';

const WebFail = () => {
  const { trackEvent, userState } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'webfail_console_messages',
    userState
  });
  
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showFullDialogue, setShowFullDialogue] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number}[]>([]);
  
  const dialogue = [
    "Jonah: If we fall out of the cable car, do you think the web will catch us?",
    "Internet Guy: ...",
    "Samantha: [visibly dying inside]",
    "Jonah: It's a double joke. Like spider web? Internet? Anyone?",
    "System: Audience Not Found."
  ];
  
  const corruptedFiles = [
    { name: "confidence.exe", tooltip: "File Corrupted. Humour Failed." },
    { name: "joke_delivery.dll", tooltip: "Fatal Error: Comedic Timing Not Found" },
    { name: "social_timing.bat", tooltip: "Process Terminated: Awkward Silence" },
    { name: "redemption_cache.tmp", tooltip: "Cache Corrupted: No Recovery Available" }
  ];

  // Terminal typing effect
  useEffect(() => {
    if (currentDialogueIndex >= dialogue.length) return;
    
    const text = dialogue[currentDialogueIndex];
    if (typingIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentDialogueIndex(prev => prev + 1);
        setTypingIndex(0);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, currentDialogueIndex, dialogue]);
  
  // Show full dialogue once typing is complete
  useEffect(() => {
    if (currentDialogueIndex >= dialogue.length) {
      setShowFullDialogue(true);
    }
  }, [currentDialogueIndex, dialogue]);
  
  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY };
      setMouseTrail(prev => {
        const newTrail = [...prev, newPoint];
        if (newTrail.length > 10) newTrail.shift();
        return newTrail;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Track page visit
  useEffect(() => {
    trackEvent('visited_webfail');
    showConsoleMessages();
  }, [trackEvent, showConsoleMessages]);
  
  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono flex flex-col">
      {/* Mouse trail */}
      {mouseTrail.map((point, i) => (
        <div 
          key={i}
          className="fixed w-2 h-2 rounded-full bg-white/30 pointer-events-none z-50"
          style={{ 
            left: `${point.x}px`, 
            top: `${point.y}px`,
            opacity: (i / mouseTrail.length) * 0.5
          }}
        />
      ))}
      
      {/* Background cable cars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-10 border border-gray-600/30 rounded transform rotate-12"></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-10 border border-gray-600/30 rounded transform -rotate-6"></div>
        <div className="absolute bottom-1/4 left-2/3 w-20 h-10 border border-gray-600/30 rounded transform rotate-45"></div>
      </div>
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 bg-scanlines bg-repeat-y opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center justify-center relative z-10">
        {/* Title */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold glitch-text mb-2">
            THE MAN WHO PUT THE INTERNET ONLINE
          </h1>
          <p className="text-gray-400 italic">
            But couldn't catch a joke if it fell on him from 600 feet.
          </p>
        </header>

        {/* Terminal Section */}
        <section className="w-full max-w-2xl bg-black/80 border border-gray-700 p-6 mb-12 min-h-[200px]">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-400 text-sm ml-2">terminal.exe</span>
          </div>
          
          <div className="font-mono text-green-400 space-y-4">
            {showFullDialogue ? (
              <>
                {dialogue.map((line, index) => (
                  <p key={index} className={line.includes("System:") ? "text-red-400" : ""}>{line}</p>
                ))}
              </>
            ) : (
              <>
                {dialogue.slice(0, currentDialogueIndex).map((line, index) => (
                  <p key={index} className={line.includes("System:") ? "text-red-400" : ""}>{line}</p>
                ))}
                {currentDialogueIndex < dialogue.length && (
                  <p>{dialogue[currentDialogueIndex].slice(0, typingIndex)}</p>
                )}
              </>
            )}
            <p className="animate-pulse">_</p>
          </div>
        </section>
        
        {/* Corrupted Web Section */}
        <section className="w-full max-w-3xl bg-black/50 border border-gray-700 p-6 mb-12 relative">
          <h2 className="text-2xl mb-6 text-center">CORRUPTED WEB</h2>
          
          {/* Spider web background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <path d="M500,0 L500,1000 M0,500 L1000,500 M0,0 L1000,1000 M0,1000 L1000,0" 
                stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
              <circle cx="500" cy="500" r="200" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
              <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>
          
          {/* Corrupted files */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {corruptedFiles.map((file, index) => (
              <div 
                key={index}
                className="bg-gray-800 border border-gray-700 p-4 flex flex-col items-center group relative"
                title={file.tooltip}
              >
                <div className="w-12 h-12 bg-gray-700 flex items-center justify-center mb-2">
                  <span className="text-red-500">{index % 2 === 0 ? '✕' : '⚠'}</span>
                </div>
                <p className="text-sm text-center">{file.name}</p>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 p-2 rounded text-xs 
                  w-40 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {file.tooltip}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer Section */}
        <section className="w-full max-w-md text-center p-4 bg-black/50 border border-gray-700">
          <p className="text-lg mb-4">Jonah's Ego: <span className="text-red-500">[404 - Not Found]</span></p>
          <button className="px-4 py-2 bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed animate-[shake_5s_ease-in-out_infinite]">
            Retry?
          </button>
          <div className="mt-6">
            <Link to="/kuranda" className="text-blue-300 hover:underline">
              Return to safety: [somewhere-safe]
            </Link>
          </div>
        </section>
        
        {/* Back to Gate link */}
        <div className="text-center mt-12">
          <Link to="/gate" className="text-gray-400 hover:text-white transition-colors text-sm">
            &lt; Return to Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebFail;
