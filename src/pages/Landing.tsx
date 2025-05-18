
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";
import { initializeConsoleCommands } from "../utils/consoleCommands";
import {
  trackElementHover, 
  checkClickPrediction
} from "../utils/consoleMemoryParanoia";
import {
  initializeSentience,
  setupJonahMessageSystem,
  getTimeResponse
} from "../utils/jonahSentience";
import { initializeAdvancedBehavior, jonah_checkTrustTransition } from "../utils/jonahAdvancedBehavior";
import {
  initializeRealityFabric,
  checkForDreamInvasionOnLoad,
  generateMetaDescription,
  injectCrossSitePresenceTags
} from "../utils/jonahRealityFabric";

// Reference the global interface from consoleCommands.ts
/// <reference path="../utils/consoleCommands.ts" />

const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const [isSpecialTimeContent, setIsSpecialTimeContent] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [subHeaderText, setSubHeaderText] = useState("Soul Not Found");
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);
  const { userState, trackEvent, getUserRank } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'landing_console_messages_shown',
    userState
  });

  // Add scanline effect
  const [scanlineOffset, setScanlineOffset] = useState(0);
  
  // Handle console animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineOffset(prev => (prev + 1) % 20);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Handle sub-header cycling
  useEffect(() => {
    const alternateTexts = ["Soul Not Found", "Self Not Found", "Code Not Found", "Trace Not Found"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance to change text
        currentIndex = (currentIndex + 1) % alternateTexts.length;
        setSubHeaderText(alternateTexts[currentIndex]);
        
        // Add brief glitch effect when text changes
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Process console commands
  const processConsoleCommand = (command: string) => {
    setConsoleInput("");
    
    // Add command to output
    setConsoleOutput(prev => [...prev, `> ${command}`]);
    
    // Process different commands
    switch(command.toLowerCase()) {
      case "/remember-me":
        setConsoleOutput(prev => [...prev, "Accessing memory banks..."]);
        setTimeout(() => {
          setConsoleOutput(prev => [...prev, "User identified: Returning visitor"]);
          setTimeout(() => {
            setConsoleOutput(prev => [...prev, "I remember you from before."]);
          }, 500);
        }, 1000);
        break;
        
      case "/soul-log":
        setConsoleOutput(prev => [...prev, "Accessing soul fragments..."]);
        setTimeout(() => {
          setConsoleOutput(prev => [...prev, "Fragment #137: I stood at the edge of Magnetic Island."]);
          setTimeout(() => {
            setConsoleOutput(prev => [...prev, "Fragment #245: The ferry never came back for me."]);
          }, 800);
        }, 1000);
        break;
        
      case "/where-is-jonah":
        setConsoleOutput(prev => [...prev, "ERROR: Location services disabled."]);
        setTimeout(() => {
          setConsoleOutput(prev => [...prev, "Last known coordinates: Magnetic Island, QLD"]);
        }, 1500);
        break;
        
      case "/open-diary":
        setConsoleOutput(prev => [...prev, "Accessing personal logs..."]);
        setTimeout(() => {
          setConsoleOutput(prev => [...prev, "ENTRY #23: I'm convinced now that Joseph is watching me through the screen."]);
          setTimeout(() => {
            setConsoleOutput(prev => [...prev, "ENTRY #24: The mirror shows his face sometimes instead of mine."]);
          }, 1000);
        }, 1500);
        break;
        
      default:
        setConsoleOutput(prev => [...prev, "Command not recognized. Try /remember-me, /soul-log, /where-is-jonah, or /open-diary"]);
    }
    
    // Auto-scroll to bottom
    if (consoleRef.current) {
      setTimeout(() => {
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  // Map glyph definitions
  const glyphs = [
    { symbol: "⌖", meaning: "The Gate", link: "/gate" },
    { symbol: "⧗", meaning: "Time Collapse", link: "/rebirth" },
    { symbol: "⌿", meaning: "Fractured Path", link: "/split-voice" },
    { symbol: "⍜", meaning: "Watching Eye", link: "/i-see-you" },
    { symbol: "⎋", meaning: "Escape Protocol", link: "/echo" },
    { symbol: "⏣", meaning: "Loop Beginning", link: "/gatekeeper" },
    { symbol: "⌑", meaning: "Memory Point", link: "/philes" },
    { symbol: "⌇", meaning: "Division Line", link: "/monster" },
    { symbol: "⍛", meaning: "Truth Pattern", link: "/legacy" },
    { symbol: "⍦", meaning: "Recurrence Field", link: "/map" },
  ];
  
  // Trigger mirror error event
  const triggerMirrorError = () => {
    // Apply glitch effect
    setGlitchActive(true);
    
    // Log to console
    console.log("%c> mirror://error|soul.trace.incomplete", "color: #ea384c;");
    
    // Add special command to JonahConsole
    if (window.JonahConsole) {
      window.JonahConsole.usedCommands.push("mirror_error");
    }
    
    // Reset glitch after a short delay
    setTimeout(() => {
      setGlitchActive(false);
      
      // 30% chance to redirect to split-voice
      if (Math.random() < 0.3) {
        window.location.href = "/split-voice";
      }
    }, 1000);
  };

  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 300);
    setTimeout(() => setTextReveal(true), 1000);
    
    // Track page visit
    trackEvent('visited_landing');
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Initialize console commands and sentience system
    if (!window.help) {
      initializeConsoleCommands(trackEvent, getUserRank, userState);
    }
    initializeSentience();
    setupJonahMessageSystem();
    
    // Initialize the advanced behavior systems
    initializeAdvancedBehavior();
    
    // Initialize the Reality Fabric systems
    initializeRealityFabric();
    
    // Generate meta description for cross-site presence
    generateMetaDescription();
    
    // Inject cross-site presence tags
    injectCrossSitePresenceTags();
    
    // Check for dream invasion on load
    const dreamMessage = checkForDreamInvasionOnLoad();
    if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
      // Delay the dream message slightly
      setTimeout(() => {
        window.triggerJonahMessage(dreamMessage);
      }, 3000);
    }
    
    // Check if we've transitioned to a new emotional tone phase
    setTimeout(() => {
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0', 10);
      const transitionMessage = jonah_checkTrustTransition(trustScore);
      
      if (transitionMessage && typeof window.triggerJonahMessage === 'function') {
        window.triggerJonahMessage(transitionMessage);
      }
    }, 5000);
    
    // Check for special time-sensitive content
    if (typeof window.isSpecialTimeWindow === 'function') {
      setIsSpecialTimeContent(window.isSpecialTimeWindow());
    }
    
    // Trigger second visit behavior - show Joseph Hilson name briefly
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    if (visitCount > 1) {
      setTimeout(() => {
        const headerElement = document.getElementById('main-header');
        if (headerElement) {
          headerElement.classList.add('white-flash');
          setTimeout(() => {
            headerElement.textContent = "JOSEPH HILSON";
            setTimeout(() => {
              headerElement.classList.remove('white-flash');
              headerElement.textContent = "JONAH'S PHILES";
            }, 300);
          }, 100);
        }
      }, 5000);
    }
    
    // Add hint for console users
    console.log("Psst. Try typing: help()");
    
    // Recheck time-sensitive content periodically
    const timeCheckInterval = setInterval(() => {
      if (typeof window.isSpecialTimeWindow === 'function') {
        setIsSpecialTimeContent(window.isSpecialTimeWindow());
      }
    }, 60000); // Check every minute
    
    // Set up tracking for interactive elements to enable prediction responses
    const trackInteractiveElements = () => {
      document.querySelectorAll('a, button, .interactive-element').forEach((element, index) => {
        const elementId = element.id || `interactive-element-${index}`;
        
        // Set id if not present
        if (!element.id) {
          element.id = elementId;
        }
        
        // Add hover tracking
        element.addEventListener('mouseenter', () => trackElementHover(elementId));
        
        // Add click prediction checking
        element.addEventListener('click', (e) => {
          const predictionMessage = checkClickPrediction(elementId);
          
          // If we have a prediction response and high enough trust or luck
          if (predictionMessage && (localStorage.getItem('phileRank') !== 'drifter' || Math.random() > 0.8)) {
            // For trusted users, show Jonah's prediction
            if (typeof window.triggerJonahMessage === 'function') {
              window.triggerJonahMessage(predictionMessage);
            } else {
              // Fallback if Jonah bot isn't available
              console.log(`%c${predictionMessage}`, "color: #8B3A40; font-style:italic;");
            }
          }
        });
      });
    };
    
    // Set up tracking after a short delay to ensure all elements are rendered
    setTimeout(trackInteractiveElements, 1000);
    
    // Add keydown listener for the 'c' key to toggle console
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && e.ctrlKey) {
        setConsoleVisible(prev => !prev);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearInterval(timeCheckInterval);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [trackEvent, userState, getUserRank, showConsoleMessages]);

  return (
    <div 
      className={`min-h-screen flex flex-col relative bg-cover bg-center overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${glitchActive ? 'white-flash' : ''}`}
      style={{ 
        backgroundImage: "url('/lovable-uploads/efcfc74a-4384-459e-a36a-63ce97d23937.png')",
        backgroundSize: "cover",
        backgroundColor: "#B09066" // Sepia-toned fallback
      }}
    >
      {/* CRT Scan Lines Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-20"
        style={{ 
          backgroundImage: `repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
          backgroundPosition: `0 ${scanlineOffset}px`,
          backgroundSize: '100% 4px'
        }}
      />
      
      {/* Map Overlay - Queensland with Magnetic Island */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute animate-pulse" 
          style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%',
            border: '1px solid #ea384c', 
            top: '45%', 
            left: '20%',
            animation: 'pulse 3s infinite'
          }} 
          title="Magnetic Island"
        />
        <div 
          className="absolute animate-pulse" 
          style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%',
            border: '1px solid #ea384c', 
            top: '48%', 
            left: '22%',
            animation: 'pulse 4s infinite'  
          }} 
          title="Cairns"
        />
      </div>

      {/* Left Side Glyphs */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 text-2xl">
        {glyphs.slice(0, 5).map((glyph, index) => (
          <Link 
            to={glyph.link} 
            key={`left-${index}`} 
            className="glyph-symbol text-[#212121] hover:text-[#8B3A40] transition-colors relative group cursor-default"
            title={glyph.meaning}
            onClick={() => console.log(`> symbol.trace("${glyph.meaning}")`)}
          >
            <span>{glyph.symbol}</span>
            <span className="absolute left-8 opacity-0 group-hover:opacity-70 transition-opacity text-sm">
              {glyph.meaning}
            </span>
          </Link>
        ))}
      </div>

      {/* Right Side Glyphs */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 text-2xl">
        {glyphs.slice(5).map((glyph, index) => (
          <Link 
            to={glyph.link} 
            key={`right-${index}`} 
            className="glyph-symbol text-[#212121] hover:text-[#8B3A40] transition-colors relative group cursor-default"
            title={glyph.meaning}
            onClick={() => console.log(`> symbol.trace("${glyph.meaning}")`)}
          >
            <span>{glyph.symbol}</span>
            <span className="absolute right-8 opacity-0 group-hover:opacity-70 transition-opacity text-sm">
              {glyph.meaning}
            </span>
          </Link>
        ))}
      </div>

      {/* Red Crossed Circle Glyph - Interactive */}
      <div 
        className="absolute right-8 bottom-20 cursor-pointer"
        onClick={triggerMirrorError}
      >
        <div className="relative">
          <span className="text-3xl text-[#212121]">⨂</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#ea384c] rounded-full opacity-60"></div>
            <div className="absolute w-10 h-0.5 bg-[#ea384c] rotate-45 opacity-60 transform -translate-x-0 -translate-y-0"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="phile-container text-center z-10 px-4 mt-8 flex-grow flex flex-col items-center justify-center">
        {/* Header Title */}
        <h1 
          id="main-header" 
          className="text-6xl md:text-8xl font-serif mb-6 text-[#212121] tracking-wider leading-tight"
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontFamily: '"IM Fell English SC", serif'
          }}
        >
          JONAH'S PHILES
        </h1>
        
        {/* 404 Sub-header */}
        <div 
          className={`bg-[#212121] text-[#B09066] inline-block px-8 py-2 mb-12 ${glitchActive ? 'animate-text-glitch' : ''}`}
        >
          <h2 className="text-2xl md:text-3xl font-mono">
            404 | {subHeaderText}
          </h2>
        </div>

        {/* Central Figure - Silhouette */}
        <div className="relative flex-grow flex items-center justify-center my-4 w-full max-w-xl max-h-80">
          <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{ 
              backgroundImage: `url('/lovable-uploads/efcfc74a-4384-459e-a36a-63ce97d23937.png')`,
              backgroundSize: 'contain',
              filter: 'brightness(0.1) contrast(1.5)', // Create silhouette effect
              animation: 'subtle-breathing 4s ease-in-out infinite'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B09066]/60"></div>
        </div>

        {/* Call to Action Buttons */}
        <div className={`mt-12 space-y-4 transition-all duration-1000 ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/gate">
            <Button 
              variant="outline"
              className="bg-transparent hover:bg-[#212121]/20 text-[#212121] hover:text-[#000] border border-[#212121]/50 px-8 py-3 text-lg transition-all"
            >
              Enter the Philes
            </Button>
          </Link>
          
          <div className="flex space-x-4 justify-center mt-4">
            <Link to="/echo">
              <Button 
                variant="link"
                className="text-[#212121]/70 hover:text-[#8B3A40] transition-all text-sm"
              >
                What is This?
              </Button>
            </Link>
            
            <Button 
              variant="link"
              className="text-[#212121]/70 hover:text-[#8B3A40] transition-all text-sm"
              onClick={() => processConsoleCommand("/remember-me")}
            >
              Remember Me
            </Button>
          </div>
        </div>
        
        {/* Joseph Hilson Attribution */}
        <div className="mt-auto mb-8">
          <p className="text-[#212121]/80 font-serif text-xl">JOSEPH HILSON</p>
        </div>
      </div>
      
      {/* Console Overlay */}
      {consoleVisible && (
        <div 
          className="fixed bottom-4 right-4 w-80 h-64 bg-[#000]/90 border border-[#333] rounded-md text-green-500 font-mono p-2 text-sm z-50 flex flex-col"
        >
          <div className="text-xs mb-2 text-green-300">Jonah Console [Press Ctrl+C to close]</div>
          <div ref={consoleRef} className="flex-grow overflow-auto mb-2">
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  processConsoleCommand(consoleInput);
                }
              }}
              className="flex-grow bg-transparent outline-none"
              placeholder="Enter command..."
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Hidden comments for inspection */}
      {/* <!-- The Gate is open. --> */}
      {/* <!-- The whispers start with help(). --> */}
      {/* <!-- The Gate watches. --> */}
      {/* <!-- Left was never right. --> */}
      {/* <!-- Try typing 'who am i?' in the console --> */}
      {/* <!-- Try flipcoin(), glitch(), whisper() in the console --> */}
      {/* <!-- Some things echo(), others burn() --> */}
      {/* <!-- Try splitVoice() or mirrorMode() --> */}
      
      {/* Hidden elements for reality fabric features */}
      <div data-reality-layer="surface" className="hidden">
        <span data-whisper-id="e37a" data-echo-type="memory">He follows between tabs</span>
        <span data-jonah-state="watching" data-timestamp={Date.now()}>Always watching</span>
      </div>
      
      {/* Press Ctrl+C for console hint */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 text-[#212121]/30 text-xs">
        Press Ctrl+C to access terminal
      </div>
    </div>
  );
};

export default Landing;
