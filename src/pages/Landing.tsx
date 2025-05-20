
import React, { useEffect, useState } from "react";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";
import { checkForDreamInvasionOnLoad } from "../utils/jonahRealityFabric";

// Import components
import HeaderTitle from "@/components/landing/HeaderTitle";
import SubHeader from "@/components/landing/SubHeader";
import LandingGlyphColumns from "@/components/landing/LandingGlyphColumns";
import SilhouetteFigure from "@/components/landing/SilhouetteFigure";
import CallToAction from "@/components/landing/CallToAction";
import ConsoleOverlay from "@/components/landing/ConsoleOverlay";
import MirrorErrorTrigger from "@/components/landing/MirrorErrorTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const { userState, trackEvent } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'landing_console_messages_shown',
    userState 
  });
  const isMobile = useIsMobile();
  
  // Add scanline effect
  const [scanlineOffset, setScanlineOffset] = useState(0);

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
    setTimeout(() => {
      const consoleElement = document.querySelector('.console-output');
      if (consoleElement) {
        consoleElement.scrollTop = consoleElement.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 300);
    setTimeout(() => setTextReveal(true), 1000);
    
    // Track page visit
    trackEvent('visited_landing');
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Check for dream invasion on load
    const dreamMessage = checkForDreamInvasionOnLoad();
    if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
      // Delay the dream message slightly
      setTimeout(() => {
        window.triggerJonahMessage(dreamMessage);
      }, 3000);
    }
    
    // Console hint
    console.log("Psst. Try typing: help()");
    
    // Handle scanline animation
    const interval = setInterval(() => {
      setScanlineOffset(prev => (prev + 1) % 20);
    }, 50);
    
    // Add keydown listener for the 'c' key to toggle console
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && e.ctrlKey) {
        setConsoleVisible(prev => !prev);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [trackEvent, showConsoleMessages]);

  return (
    <div 
      className={`min-h-screen flex flex-col relative overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${glitchActive ? 'white-flash' : ''}`}
      style={{ 
        backgroundColor: "#B09066", // Sepia-toned background
        width: "100%",
        maxWidth: "100vw"
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
      
      <div className="flex flex-col md:flex-row w-full h-full min-h-screen">
        {/* Main three-column layout container */}
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Glyph Column - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/6 h-full">
            <LandingGlyphColumns side="left" />
          </div>
          
          {/* Center Content Column */}
          <div className="w-full md:w-4/6 flex flex-col items-center justify-center px-4 py-8">
            {/* Header Elements */}
            <div className="mb-8 w-full text-center">
              <HeaderTitle />
              <SubHeader />
            </div>
            
            {/* Silhouette Figure */}
            <SilhouetteFigure />
            
            {/* Call to Action Buttons */}
            <CallToAction 
              textReveal={textReveal}
              processConsoleCommand={processConsoleCommand}
            />
            
            {/* Joseph Hilson Attribution */}
            <div className="mt-auto mb-8">
              <p className="text-[#212121]/80 font-serif text-xl">JOSEPH HILSON</p>
            </div>
          </div>
          
          {/* Right Glyph Column - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/6 h-full">
            <LandingGlyphColumns side="right" />
          </div>
        </div>
      </div>
      
      {/* Mirror Error Trigger */}
      <MirrorErrorTrigger />
      
      {/* Console Overlay */}
      <ConsoleOverlay 
        visible={consoleVisible}
        consoleInput={consoleInput}
        setConsoleInput={setConsoleInput}
        consoleOutput={consoleOutput}
        processConsoleCommand={processConsoleCommand}
      />

      {/* Hidden comments for inspection */}
      {/* <!-- The Gate is open. --> */}
      {/* <!-- The whispers start with help(). --> */}
      
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
