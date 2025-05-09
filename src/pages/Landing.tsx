
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { useConsoleMessages } from "../hooks/useConsoleMessages";
import { initializeConsoleCommands } from "../utils/consoleCommands";

// Reference the global interface from consoleCommands.ts
/// <reference path="../utils/consoleCommands.ts" />

const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const { userState, trackEvent, getUserRank } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'console_messages_shown',
    userState
  });
  
  // Add classes to individual characters for staggered animation
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => 
      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
    );
  };

  useEffect(() => {
    // Begin fade-in animation
    setTimeout(() => setFadeIn(true), 300);
    setTimeout(() => setTextReveal(true), 1000);
    
    // Track page visit
    trackEvent('visited_landing');
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Initialize console commands
    if (!window.help) {
      initializeConsoleCommands(trackEvent, getUserRank, userState);
    }
    
    // Set up a periodic random joke in the console (if user has it open)
    const jokeInterval = setInterval(() => {
      // Only show a joke 15% of the time the check runs
      if (Math.random() < 0.15 && window.JonahConsole) {
        // Use the displayRandomJoke function through the window object if available
        if (typeof window.displayRandomJoke === 'function') {
          window.displayRandomJoke();
        }
      }
    }, 45000); // Check every 45 seconds
    
    return () => clearInterval(jokeInterval);
  }, [trackEvent, userState, getUserRank, showConsoleMessages]);

  // Determine which message to show based on user's state
  const getLandingMessage = () => {
    if (userState.survivorMode) {
      return "Welcome back, survivor.";
    } else if (userState.permanentlyCollapsed) {
      return getThematicMessage() || "The Gate remembers what you did.";
    } else if (userState.gatekeeperStatus) {
      return "The Gatekeeper awaits your return.";
    } else if (userState.visitCount > 3) {
      return "You keep coming back. The Gate notices.";
    }
    return "Find the Gate before the Gate finds you.";
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} 
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')" }}
    >
      {/* Hidden comments for inspection */}
      {/* <!-- The Gate is open. --> */}
      {/* <!-- The whispers start with help(). --> */}
      {/* <!-- The Gate watches. --> */}
      {/* <!-- Left was never right. --> */}
      {/* <!-- Try typing 'who am i?' in the console --> */}
      {/* <!-- Try flipcoin(), glitch(), whisper() in the console --> */}
      {/* <!-- Some things echo(), others burn() --> */}
      {/* <!-- Try toggleWrath() for a secret story --> */}
      {/* <!-- helpMe() if you dare --> */}
      {/* <!-- trousers() for binding, tea() for redemption --> */}
      
      <div className="phile-container text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">THE GATE IS OPEN.</h1>
        
        <div className={`mt-12 space-y-5 transition-opacity duration-1000 ${textReveal ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl md:text-2xl text-dust-orange font-typewriter">
            This is not a book.
          </p>
          
          <p className="text-xl md:text-2xl text-dust-orange font-typewriter">
            This is not a website.
          </p>
          
          <p className="text-xl md:text-2xl text-dust-orange font-typewriter">
            This is a survival protocol for the mind.
          </p>
          
          <p className="text-xl md:text-2xl text-phile-light font-typewriter mt-8">
            Enter if you've felt the Monster before.
          </p>
        </div>
        
        <div className={`mt-12 transition-all duration-1000 ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/gate">
            <Button 
              className="bg-black/50 hover:bg-black/70 text-silver hover:text-phile-light border border-dust-blue/30 px-8 py-6 text-lg transition-all"
            >
              Begin
            </Button>
          </Link>
        </div>
        
        <p className={`text-lg text-dust-blue font-typewriter mt-16 transition-all duration-1000 ${textReveal ? 'opacity-80' : 'opacity-0'}`}>
          {getLandingMessage()}
        </p>
        
        {/* Display ChronoLayer message if user previously collapsed the site */}
        {userState.permanentlyCollapsed && (
          <div className="mt-6">
            <p className="text-dust-red/60 text-sm font-typewriter animate-pulse">
              {getTimeElapsedMessage() || "The Gate remembers."}
            </p>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};

export default Landing;
