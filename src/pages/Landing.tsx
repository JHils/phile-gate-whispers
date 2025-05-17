import React, { useEffect, useState } from "react";
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

// Reference the global interface from consoleCommands.ts
/// <reference path="../utils/consoleCommands.ts" />

const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const [isSpecialTimeContent, setIsSpecialTimeContent] = useState(false);
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
    
    // Initialize console commands and sentience system
    if (!window.help) {
      initializeConsoleCommands(trackEvent, getUserRank, userState);
    }
    initializeSentience();
    setupJonahMessageSystem();
    
    // Initialize the advanced behavior systems
    initializeAdvancedBehavior();
    
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
    
    // Trigger Simba comment if available
    setTimeout(() => {
      if (typeof window.triggerSimbaComment === 'function') {
        window.triggerSimbaComment('landing');
      }
    }, 5000);
    
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
    
    // Check for time-based responses
    setTimeout(() => {
      const timeResponse = getTimeResponse();
      if (timeResponse && typeof window.triggerJonahMessage === 'function') {
        window.triggerJonahMessage(timeResponse);
      }
    }, 15000);
    
    // Increase trust if user visits landing page and triggers a special QR code
    const trustUpdateValue = localStorage.getItem('jonahBotQrTrust');
    if (trustUpdateValue) {
      // Dispatch an event that the bot can listen for
      const trustEvent = new CustomEvent('jonahTrustChange', { 
        detail: { value: parseInt(trustUpdateValue, 10) } 
      });
      window.dispatchEvent(trustEvent);
      localStorage.removeItem('jonahBotQrTrust');
    }
    
    // Add hint for console users
    console.log("Psst. Try typing: help()");
    
    // Recheck time-sensitive content periodically
    const timeCheckInterval = setInterval(() => {
      if (typeof window.isSpecialTimeWindow === 'function') {
        setIsSpecialTimeContent(window.isSpecialTimeWindow());
      }
    }, 60000); // Check every minute
    
    // Add tracking for interactive elements to enable prediction responses
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
    
    return () => {
      clearInterval(jokeInterval);
      clearInterval(timeCheckInterval);
    };
  }, [trackEvent, userState, getUserRank, showConsoleMessages]);

  // Determine which message to show based on user's state
  const getLandingMessage = () => {
    if (isSpecialTimeContent) {
      return "The Gate shifts during this hour. New paths emerge.";
    }
    
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
      
      {/* New clues for book codes */}
      {/* <!-- Check page 23: BLRYLSK --> */}
      {/* <!-- The ferry log mentions SMBWLKS --> */}
      {/* <!-- Read between lines for GRFNDRZ --> */}
      
      <div className="phile-container text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">
          {isSpecialTimeContent ? "THE GATE SHIFTS." : "THE GATE IS OPEN."}
        </h1>
        
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
          
          {isSpecialTimeContent && (
            <p className="text-xl md:text-2xl text-dust-red font-typewriter animate-pulse">
              Time window active: Different paths are visible.
            </p>
          )}
          
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
          
          {/* Special time button */}
          {isSpecialTimeContent && (
            <Link to="/rebirth" className="ml-4">
              <Button 
                className="bg-black/50 hover:bg-black/70 text-dust-red hover:text-dust-orange border border-dust-red/30 px-8 py-6 text-lg transition-all animate-pulse"
              >
                Alternative Path
              </Button>
            </Link>
          )}
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
        
        {/* Add console hint */}
        <p className="font-typewriter mt-12 text-phile-light" style={{ fontSize: "0.85rem", opacity: 0.6 }}>
          Who needs a console when the real story plays out inside your head?<br />
          <em>Unless you mean… <strong>that</strong> console. In which case, inspect… closely.</em>
        </p>
        
        {/* Book code hint - only visible during special time windows */}
        {isSpecialTimeContent && (
          <p className="font-typewriter mt-6 text-dust-orange animate-subtle-flicker" style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            bookCode('BLRYLSK') might unlock something from page 23.
          </p>
        )}
      </div>
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};

export default Landing;
