
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { initializeSentience } from "../utils/jonahSentience";

interface MirrorContent {
  originalTitle: string;
  mirrorTitle: string;
  originalContent: string;
  mirrorContent: string;
}

const mirrorContentMap: Record<string, MirrorContent> = {
  "1": {
    originalTitle: "A Map Folded Wrong",
    mirrorTitle: "Wrong Map. Still Folded.",
    originalContent: "The terrain shifted beneath our expectations. We walked the same paths but arrived elsewhere.",
    mirrorContent: "The walks never led where we thought. The map was inside out from the beginning."
  },
  "death": {
    originalTitle: "Rebirth",
    mirrorTitle: "Death Comes First",
    originalContent: "I found myself again in the space between memories.",
    mirrorContent: "Memory fails at the boundary between what was and never will be."
  },
  "echo": {
    originalTitle: "I only talk in echoes now.",
    mirrorTitle: "You never listened the first time.",
    originalContent: "The echo travels, bouncing between thoughts until it finds resonance.",
    mirrorContent: "What you hear returning is what you refused to hear the first time."
  }
};

const MirrorPhile: React.FC = () => {
  const { mirrorId = "1" } = useParams<{ mirrorId: string }>();
  const [consoleInput, setConsoleInput] = useState<string>("");
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [username, setUsername] = useState<string>("undefined");
  const { trackEvent } = useTrackingSystem();

  const content = mirrorContentMap[mirrorId] || {
    originalTitle: "Unknown Page",
    mirrorTitle: "Missing Reflection",
    originalContent: "This page doesn't exist in the original universe.",
    mirrorContent: "The mirror can only reflect what exists."
  };

  useEffect(() => {
    // Initialize sentience
    initializeSentience();
    
    // Track mirror page visit
    trackEvent('visited_mirror_phile');
    
    // Generate a random username or get from localStorage
    const storedName = localStorage.getItem('jonahTrustName') || '';
    if (storedName) {
      setUsername(storedName);
    } else {
      const randomNames = ["visitor_347", "ghost_reader", "echo_consumer", "reflection_7", "joseph_hilson", "not-jonah"];
      setUsername(randomNames[Math.floor(Math.random() * randomNames.length)]);
    }
    
    // Add a white flash effect when the page loads
    document.body.classList.add("white-flash");
    setTimeout(() => {
      document.body.classList.remove("white-flash");
    }, 200);
    
    // Play a subtle audio effect if allowed
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.value = 440;
      gainNode.gain.value = 0.05;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 2);
      setTimeout(() => oscillator.stop(), 2000);
    } catch (e) {
      // Silent fail if audio context not available
    }
  }, [mirrorId, trackEvent]);

  // Handle console input
  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = consoleInput.trim().toLowerCase();
    
    let response = "Command not recognized in mirror reality.";
    
    // Process commands
    switch (input) {
      case "whoami":
        response = `undefined | ${username}`;
        break;
      case "echo":
        response = "You never listened the first time.";
        break;
      case "help":
        response = "No help exists on this side of the reflection.";
        break;
      case "exit":
        response = "The only exit is through the original.";
        break;
      default:
        if (input.includes("jonah")) {
          response = "That name has no power here.";
        } else if (input.includes("mirror")) {
          response = "You are already inside the reflection.";
        }
    }
    
    setConsoleOutput(response);
    setConsoleInput("");
  };

  return (
    <div className="min-h-screen bg-white text-black font-typewriter">
      {/* Invert colors for the mirror site - white background, black text */}
      <div className="container mx-auto p-6 pb-24">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl mb-2 font-serif">
            /mirror_phile
            <span className="text-sm font-mono block mt-2 opacity-50">reflection layer</span>
          </h1>
          <div className="h-0.5 w-24 bg-black/50 mx-auto"></div>
        </header>
        
        <div className="max-w-3xl mx-auto">
          {/* Mirrored Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-black/10 bg-black/5">
              <h2 className="text-xl mb-4 line-through opacity-50">{content.originalTitle}</h2>
              <p className="italic text-black/50">{content.originalContent}</p>
            </div>
            <div className="p-6 border border-black bg-white shadow-lg">
              <h2 className="text-xl mb-4 font-bold">{content.mirrorTitle}</h2>
              <p>{content.mirrorContent}</p>
            </div>
          </div>
          
          {/* Reversed/Mirrored Quotes */}
          <div className="my-12 border-y border-black/20 py-8">
            <p className="text-center italic transform rotate-180" style={{ writingMode: 'sideways-lr' }}>
              "The mirror speaks truth by speaking backward."
            </p>
            <p className="text-center mt-6">
              "Every reflection contains a secret version of yourself."
            </p>
          </div>
          
          {/* Console in Mirror */}
          <div className="bg-black text-white p-6 mb-12">
            <h3 className="font-mono text-lg mb-4">Terminal Interface</h3>
            <form onSubmit={handleConsoleSubmit}>
              <div className="flex">
                <span className="text-white mr-2">&gt;</span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-white font-mono"
                  placeholder="Enter command..."
                  aria-label="Console input"
                />
              </div>
            </form>
            
            {consoleOutput && (
              <div className="mt-4 font-mono">
                <p className="text-white/80">{consoleOutput}</p>
              </div>
            )}
          </div>
          
          {/* Navigation - mirrored links */}
          <div className="mt-12 flex justify-between">
            <div>
              <Link to="/mirror_phile/death">
                <Button variant="outline" className="text-black hover:text-black/70 border-black hover:border-black/70">
                  Death Page
                </Button>
              </Link>
            </div>
            <div>
              <Link to="/split-voice">
                <Button variant="outline" className="text-black hover:text-black/70 border-black hover:border-black/70">
                  Return to Split
                </Button>
              </Link>
            </div>
            <div>
              <Link to="/mirror_phile/echo">
                <Button variant="outline" className="text-black hover:text-black/70 border-black hover:border-black/70">
                  Echo Chamber
                </Button>
              </Link>
            </div>
          </div>
          
          {/* User Identity */}
          <div className="mt-16 text-right">
            <p className="text-xs">Logged in as: {username}</p>
            <p className="text-xs mt-2">Mirror session: {Math.floor(Math.random() * 1000) + 100}</p>
          </div>
        </div>
      </div>
      
      {/* Hidden Elements */}
      <div className="hidden">
        {/* <!-- The mirror remembers what you tried to forget --> */}
        {/* <!-- Your face looks different from this side --> */}
        {/* <!-- Try "whoami" in the console to see who you are here --> */}
      </div>
    </div>
  );
};

export default MirrorPhile;
