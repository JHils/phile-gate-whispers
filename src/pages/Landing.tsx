
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";

// Add the TypeScript interface to extend the Window object
declare global {
  interface Window {
    help: () => void;
    reveal: () => void;
    reincarnate: () => void;
    whois: () => void;
    gate: () => void;
    coinToss: () => void;
    showStatus: () => Promise<void>; // Renamed from status to showStatus
  }
}

// Keep track of whether console messages have been shown
// Use localStorage to prevent showing messages on every render
const CONSOLE_MESSAGES_KEY = 'console_messages_shown';
const hasShownConsoleMessages = () => {
  const timestamp = localStorage.getItem(CONSOLE_MESSAGES_KEY);
  if (!timestamp) return false;
  
  // Only show messages again after 24 hours
  const hoursPassed = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
  return hoursPassed < 24;
};

const Landing = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const { userState, trackEvent, getUserRank } = useTrackingSystem();
  
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
    
    // Only show console messages if they haven't been shown recently
    if (!hasShownConsoleMessages()) {
      // Console message for the curious
      console.log("%cThe Gate is watching.", "color: #8B3A40; font-size:14px;");
      console.log("%cThe whispers start with help().", "color: #475B74; font-size:14px; font-style:italic;");
      
      // Additional console messages with delays for creepier effect
      const timeout1 = setTimeout(() => {
        console.log("%cThe Gate is open. But you are not ready.", "color: #8B3A40; font-size:14px;");
      }, Math.random() * 2000 + 1000);
      
      const timeout2 = setTimeout(() => {
        console.log("%cTracking signal unstable. Coin spinning beyond threshold.", "color: #8B3A40; font-size:14px;");
      }, Math.random() * 3000 + 2000);
      
      // Mark that we've shown the messages
      localStorage.setItem(CONSOLE_MESSAGES_KEY, Date.now().toString());
      
      // Clean up timeouts
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
    
    // Define global Easter egg functions for console interaction
    
    // Define showStatus() function to show user rank and progress (renamed from status)
    window.showStatus = async function() {
      try {
        const { rank, score, position } = await getUserRank();
        
        console.log("%c=== STATUS REPORT ===", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log(`%cRank: ${rank}`, "color: #8B3A40; font-size:14px;");
        console.log(`%cScore: ${score}`, "color: #8B3A40; font-size:14px;");
        console.log(`%cPosition: #${position}`, "color: #8B3A40; font-size:14px;");
        
        // Calculate next rank threshold
        let nextRank = '';
        let pointsNeeded = 0;
        
        if (score < 100) {
          nextRank = 'Watcher';
          pointsNeeded = 100 - score;
        } else if (score < 300) {
          nextRank = 'Survivor';
          pointsNeeded = 300 - score;
        } else if (score < 500) {
          nextRank = 'Gatekeeper';
          pointsNeeded = 500 - score;
        } else if (score < 800) {
          nextRank = 'Monster';
          pointsNeeded = 800 - score;
        } else {
          console.log("%cYou've reached the highest rank.", "color: #475B74; font-size:14px; font-style:italic;");
        }
        
        if (nextRank) {
          console.log(`%c${pointsNeeded} points until ${nextRank}`, "color: #475B74; font-size:14px; font-style:italic;");
        }
        
        // Show console commands discovered
        const commands = [];
        if (userState.console.helpCalled) commands.push("help()");
        if (userState.console.whoisCalled) commands.push("whois()");
        if (userState.console.gateCalled) commands.push("gate()");
        if (userState.console.philesCalled) commands.push("philes()");
        if (userState.console.monsterCalled) commands.push("monster()");
        if (userState.console.legacyCalled) commands.push("legacy()");
        if (userState.console.revealCalled) commands.push("reveal()");
        if (userState.console.reincarnateCalled) commands.push("reincarnate()");
        
        console.log("%cDiscovered commands: " + commands.join(", "), "color: #8B3A40; font-size:14px;");
        
        trackEvent('console_status_called');
      } catch (error) {
        console.error("Error retrieving status:", error);
        console.log("%cUnable to retrieve status. The Gate is unstable.", "color: red; font-size:14px;");
      }
    };
    
    // @ts-ignore - This is intentionally added to window
    window.help = function() {
      console.log("%cWelcome, wanderer.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log("%cThis console is not monitored... but it remembers.", "color: #8B3A40; font-size:16px;");
      console.log("%cTry typing: reveal()", "color: #475B74; font-size:14px; font-style:italic;");
      trackEvent('console_help_called');
    };
    
    // @ts-ignore - This is intentionally added to window
    window.reveal = function() {
      console.log("%cBehind every Gate is a Gatekeeper.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log("%cBehind every story is an author.", "color: #8B3A40; font-size:16px;");
      console.log("%cNext, try: reincarnate()", "color: #475B74; font-size:16px; font-style:italic;");
      trackEvent('console_reveal_called');
    };
    
    // @ts-ignore - This is intentionally added to window
    window.reincarnate = function() {
      console.log("%cThe coin never lands.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log("%cYour story never ends.", "color: #8B3A40; font-size:16px;");
      console.log("%cType whois() to learn more", "color: #475B74; font-size:16px; font-style:italic;");
      trackEvent('console_reincarnate_called');
    };
    
    // Use a type guard to check if window.whois is defined
    if (!('whois' in window)) {
      // @ts-ignore - This is intentionally added to window
      window.whois = function() {
        console.log("%cJonah S.M. Phile.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cRearrange me, and you may find someone else hiding.", "color: #8B3A40; font-size:16px; font-style:italic;");
        console.log("%cOnce you understand, type: gate()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_whois_called');
      };
    }
    
    return () => {
      // No cleanup needed for localStorage events
    };
  }, [trackEvent, userState, getUserRank]);

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
