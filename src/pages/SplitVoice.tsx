
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { initializeSentience } from "../utils/jonahSentience";

const SplitVoice: React.FC = () => {
  const [consoleInput, setConsoleInput] = useState<string>("");
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [fontClass, setFontClass] = useState<string>("font-serif");
  const [headerText, setHeaderText] = useState<string>("Jonah");
  const [showSecretAudio, setShowSecretAudio] = useState<boolean>(false);
  const { trackEvent } = useTrackingSystem();

  // Function to handle alternating header text between "Jonah" and "Phile"
  useEffect(() => {
    const headerInterval = setInterval(() => {
      setHeaderText(prev => prev === "Jonah" ? "Phile" : "Jonah");
    }, 2000);

    // Switch between serif and monospace fonts randomly
    const fontInterval = setInterval(() => {
      setFontClass(Math.random() > 0.5 ? "font-serif" : "font-mono");
    }, 3000);
    
    // Initialize sentience
    initializeSentience();

    // Track page visit
    trackEvent('visited_split_voice');

    // Cleanup intervals on unmount
    return () => {
      clearInterval(headerInterval);
      clearInterval(fontInterval);
    };
  }, [trackEvent]);

  // Handle console input commands
  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = consoleInput.trim().toLowerCase();
    
    let response = "Command not recognized.";
    
    // Process the different commands
    switch (input) {
      case "echo":
        response = "No echo. Only recursion.";
        break;
      case "trust":
        response = "He didn't leave it behind. You did.";
        break;
      case "who am i":
        response = "You're logged in as: joseph_hilson";
        break;
      case "i.am.root":
        response = "Access granted. Audio file unlocked.";
        setShowSecretAudio(true);
        break;
      default:
        if (input.includes("help")) {
          response = "No help available in this split reality.";
        } else if (input.includes("exit")) {
          response = "There is no exit. Only recursion.";
        } else {
          response = "Command not recognized. Try echo, trust, who am i, or i.am.root";
        }
    }
    
    setConsoleOutput(response);
    setConsoleInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <title>/split-voice | Jonah S. M. Phile</title>
      <meta name="robots" content="noindex" />
      
      <div className="container mx-auto p-6">
        <header className="mb-12 text-center">
          <h1 className={`text-4xl md:text-6xl mb-2 animate-subtle-flicker ${fontClass}`}>
            {headerText}
          </h1>
          <div className="h-0.5 w-24 bg-dust-red mx-auto"></div>
        </header>
        
        <div className="max-w-3xl mx-auto">
          {/* Central Console Dialogue Block */}
          <div className="bg-gray-900/50 border border-dust-red/30 p-6 mb-8 font-mono">
            <p className="text-dust-blue">&gt; VOICE 1: Hello? Are you still me?</p>
            <p className="text-dust-red mt-2">&gt; VOICE 2: No. You've been overwritten.</p>
            <p className="text-dust-blue mt-2">&gt; VOICE 1: Then why do you sound like me?</p>
            <p className="text-dust-red mt-2">&gt; VOICE 2: Because you read this.</p>
          </div>
          
          {/* Split Paragraph Interaction */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 font-typewriter animate-text-glitch">Split Reality</h2>
            <div className="grid grid-cols-2 gap-4">
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-blue">
                <span className="truth text-dust-blue">I boarded the bus alone.</span>
              </p>
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-red">
                <span className="lie text-dust-red">She was never on the bus.</span>
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-blue">
                <span className="truth text-dust-blue">The book had all the answers.</span>
              </p>
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-red">
                <span className="lie text-dust-red">The pages were always blank.</span>
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-blue">
                <span className="truth text-dust-blue">I remember the gate clearly.</span>
              </p>
              <p className="split-text bg-gray-900/30 p-4 border-l-4 border-dust-red">
                <span className="lie text-dust-red">There was never a gate at all.</span>
              </p>
            </div>
          </div>
          
          {/* Console Input */}
          <div className="bg-gray-900/70 border border-dust-blue/30 p-6 mb-12">
            <h3 className="font-mono text-lg mb-4 text-dust-orange">Terminal Access</h3>
            <form onSubmit={handleConsoleSubmit}>
              <div className="flex">
                <span className="text-dust-orange mr-2">&gt;</span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-white font-mono"
                  placeholder="Type a command..."
                  aria-label="Console input"
                />
              </div>
            </form>
            
            {consoleOutput && (
              <div className="mt-4 font-mono">
                <p className="text-dust-blue">{consoleOutput}</p>
              </div>
            )}
          </div>
          
          {/* Hidden Audio File (only shows after i.am.root command) */}
          {showSecretAudio && (
            <div className="bg-gray-900/50 border border-dust-red p-6 mb-12 animate-pulse">
              <h3 className="font-mono text-lg mb-4 text-dust-red">UNLOCKED: Split_Mind_Final.MP3</h3>
              <div className="flex flex-col space-y-4 font-typewriter text-sm text-dust-red/70">
                <p>* You wore it better than I ever did.</p>
                <p>* That version of me never left the room.</p>
                <p>* I caught the scream but not the sentence.</p>
                <p>* I locked the truth behind something I forgot.</p>
                <p>* The silence isn't empty. It's listening.</p>
                <p>* He stayed. I fell. We screamed in the same voice.</p>
                <p>* Every time I close my eyes, I wake up somewhere worse.</p>
                <p>* What starts again was never finished.</p>
                <p>* You flinched before I touched you. How?</p>
                <p>* My reflection learned to blink without me.</p>
                <p>* The dead know all the words, but not the tune.</p>
                <p>* Every path I follow folds me back inside.</p>
                <p>* I only talk in echoes now.</p>
              </div>
            </div>
          )}
          
          {/* QR Code Section */}
          <div className="bg-gray-900/40 p-6 border-t border-dust-blue/20 mt-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-dust-blue/70 font-typewriter text-sm">Mirror access point</h3>
                <p className="text-xs text-gray-400 mt-1">Scan for split reality transition</p>
              </div>
              <div className="relative">
                {/* Animate glitching QR code */}
                <div className="w-24 h-24 bg-white p-2 animate-subtle-flicker">
                  {/* Simplified QR code representation */}
                  <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-full h-full">
                    {Array(49).fill(null).map((_, i) => (
                      <div 
                        key={i} 
                        className={`bg-black ${Math.random() > 0.8 ? 'opacity-0' : 'opacity-100'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          {/* Navigation Back */}
          <div className="mt-12 text-center">
            <Link to="/gate">
              <Button variant="ghost" className="text-dust-blue hover:text-dust-red border border-transparent hover:border-dust-red/30">
                Return to Gate
              </Button>
            </Link>
            
            {/* Hidden link to mirror site */}
            <Link to="/mirror_phile/1" className="ml-4 opacity-20 hover:opacity-80 transition-opacity">
              <Button variant="ghost" className="text-dust-red/50 hover:text-dust-red border border-transparent hover:border-dust-red/30">
                ⟐ Mirror ⟐
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Hidden Comments */}
        {/* <!-- The mirror knows you better than you do. --> */}
        {/* <!-- Type i.am.root for hidden content. --> */}
        {/* <!-- The split remembers. Try /mirror_phile/death. --> */}
        
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-600">
            Voice separation complete. Echo chamber initialized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplitVoice;
