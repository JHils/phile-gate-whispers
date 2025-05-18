
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinningCoin from "../components/SpinningCoin";
import HiddenNav from "../components/HiddenNav";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { Button } from "@/components/ui/button";
import { useConsoleMessages } from "../hooks/useConsoleMessages";
import { initializeConsoleCommands } from "../utils/consoleCommands";
import JonahMoodIndicator from "../components/JonahMoodIndicator";
import JonahCrossSiteWhisper from "../components/JonahCrossSiteWhisper";
import { checkForDreamInvasionOnLoad } from "../utils/jonahRealityFabric";

// Reference the global interface from consoleCommands.ts
/// <reference path="../utils/consoleCommands.ts" />

const Index = () => {
  const [collapseMessage, setCollapseMessage] = useState<string | null>(null);
  const [trustLevel, setTrustLevel] = useState<string>("low");
  const { userState, trackEvent, getUserRank } = useTrackingSystem();
  const { showConsoleMessages } = useConsoleMessages({ 
    storageKey: 'index_console_messages_shown',
    userState 
  });

  // Add classes to individual characters for staggered animation
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => 
      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
    );
  };

  // Function to update UI based on progress
  const updateUIBasedOnProgress = () => {
    const whisperElement = document.getElementById("whisperText");
    
    if (whisperElement) {
      if (userState.console.legacyCalled || localStorage.getItem("legacyCalled") === "true") {
        whisperElement.textContent = "The Gatekeeper sees all.";
        whisperElement.classList.add("text-dust-red");
      } else if (userState.console.monsterCalled || localStorage.getItem("monsterCalled") === "true") {
        whisperElement.textContent = "He walks with your steps now.";
      } else if (userState.console.philesCalled || localStorage.getItem("philesCalled") === "true") {
        whisperElement.textContent = "The files are watching you back.";
      } else if (userState.console.gateCalled || localStorage.getItem("gateCalled") === "true") {
        whisperElement.textContent = "You crossed without permission.";
      } else if (userState.console.whoisCalled || localStorage.getItem("whoisCalled") === "true") {
        whisperElement.textContent = "Names hide deeper truths.";
      } else if (userState.console.helpCalled || localStorage.getItem("helpCalled") === "true") {
        whisperElement.textContent = "Someone heard your call.";
      } else if (userState.console.revealCalled) {
        whisperElement.textContent = "Every revelation has a price.";
      } else if (userState.console.reincarnateCalled) {
        whisperElement.textContent = "Death is just transformation.";
      }
      
      // If Nightmare Sequence was triggered, add a special message
      if (userState.permanentlyCollapsed || localStorage.getItem("permanentlyCollapsed") === "true") {
        const thematicMessage = getThematicMessage();
        if (thematicMessage) {
          whisperElement.textContent = thematicMessage;
          whisperElement.classList.add("text-dust-red");
          whisperElement.classList.add("animate-pulse");
        }
      }
      
      // Check for hidden console uses
      if (window.JonahConsole && window.JonahConsole.usedCommands) {
        if (window.JonahConsole.usedCommands.includes('whisper')) {
          whisperElement.classList.add("animate-subtle-flicker");
        }
        
        if (window.JonahConsole.usedCommands.includes('glitch')) {
          setTimeout(() => {
            whisperElement.classList.add("animate-glitch");
            setTimeout(() => whisperElement.classList.remove("animate-glitch"), 500);
          }, 2000);
        }
      }
    }
  };

  useEffect(() => {
    // Track page visit
    trackEvent('visited_gate');
    
    // Check for ChronoLayer messages
    const timeMessage = getTimeElapsedMessage();
    if (timeMessage) {
      setCollapseMessage(timeMessage);
    }
    
    // Show console messages if they haven't been shown recently
    showConsoleMessages();
    
    // Initialize console commands if they don't exist
    if (!window.help) {
      initializeConsoleCommands(trackEvent, getUserRank, userState);
    }
    
    // Get current trust level from localStorage
    const storedTrustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
    setTrustLevel(storedTrustLevel);
    
    // Check for dream invasion message
    const dreamMessage = checkForDreamInvasionOnLoad();
    if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
      // Show the dream message after a delay
      setTimeout(() => {
        window.triggerJonahMessage(dreamMessage);
      }, 3000);
    }
    
    // Call on load to reflect any existing progress
    setTimeout(updateUIBasedOnProgress, 1000);
    
    // Set up periodic UI updates to reflect console activity
    const intervalId = setInterval(updateUIBasedOnProgress, 5000);
    
    return () => clearInterval(intervalId);
  }, [trackEvent, getUserRank, userState, showConsoleMessages]);
  
  // Check for dream messages on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Check for dream invasion when user returns to tab
        const dreamMessage = checkForDreamInvasionOnLoad();
        if (dreamMessage && typeof window.triggerJonahMessage === 'function') {
          window.triggerJonahMessage(dreamMessage);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-black font-typewriter flex flex-col"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')" }}
    >
      {/* Hidden comments for inspection */}
      {/* <!-- Phile initiated. Tracking subject... --> */}
      {/* <!-- The coin will fall. --> */}
      {/* <!-- Warning: Surface Integrity Failing. --> */}
      {/* <!-- The Gate watches. --> */}
      {/* <!-- Left was never right. --> */}
      {/* <!-- Coin Toss initiated. --> */}
      {/* <!-- Try typing 'who am i?' in the console --> */}
      {/* <!-- Try dreamJournal() to read Jonah's latest thoughts --> */}
      {/* <!-- Try rememberMe() to see what's been stored about you --> */}
      
      {/* Hidden keyhole element for micro-quest */}
      <div 
        className="keyhole absolute h-3 w-3 bg-transparent rounded-full opacity-5 hover:opacity-20 transition-opacity duration-300 cursor-default"
        style={{ top: '30%', right: '8%' }}
        id="index-keyhole"
        title="A tiny anomaly in the code"
      />
      
      {/* Cross-site whisper - appears rarely */}
      <JonahCrossSiteWhisper 
        trustLevel={trustLevel} 
        className="absolute top-2 left-1/2 transform -translate-x-1/2" 
      />
      
      <div className="phile-container text-center z-10">
        <div className="flex justify-end px-4 py-2">
          <JonahMoodIndicator trustLevel={trustLevel} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">Jonah's Philes</h1>
        
        <SpinningCoin />
        
        <div className="mt-12 space-y-8">
          <p className="text-xl md:text-2xl text-dust-orange font-typewriter text-reveal">
            {addSpans("Some things you don't find.")}
            <br />
            {addSpans("They find you.")}
          </p>
          
          <p className="text-xl md:text-2xl text-phile-light font-typewriter animate-subtle-flicker">
            The Gate is already open.
          </p>
          
          <p id="whisperText" className="text-lg md:text-xl text-dust-blue font-typewriter mt-8 transition-all duration-700">
            Find the Gate before the Gate finds you.
          </p>
          
          {/* Display ChronoLayer message if user previously collapsed the site */}
          {collapseMessage && (userState.permanentlyCollapsed || localStorage.getItem("permanentlyCollapsed") === "true") && (
            <div className="mt-6">
              <p className="text-dust-red/60 text-sm font-typewriter animate-pulse">
                {collapseMessage}
              </p>
            </div>
          )}
          
          {/* Links Section */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/campfire">
              <Button 
                variant="ghost" 
                className="text-dust-orange hover:text-dust-red hover:bg-black/20 border border-transparent hover:border-dust-red/30"
              >
                Join the Campfire
              </Button>
            </Link>
            
            <Link to="/summerhouse">
              <Button 
                variant="ghost" 
                className="text-dust-blue hover:text-dust-red hover:bg-black/20 border border-transparent hover:border-dust-red/30"
              >
                Visit Summerhouse
              </Button>
            </Link>
            
            <Link to="/webfail">
              <Button 
                variant="ghost" 
                className="text-silver hover:text-dust-blue hover:bg-black/20 border border-transparent hover:border-dust-blue/30"
              >
                Web Failure
              </Button>
            </Link>
            
            {/* Hidden link to Toggle Market with very low opacity */}
            <Link to="/toggle-market" aria-label="Hidden Toggle Market">
              <Button 
                variant="ghost" 
                className="text-dust-red/10 hover:text-dust-red/60 hover:bg-black/20 border border-transparent hover:border-dust-red/30 text-xs"
                style={{ opacity: 0.1 }}
              >
                Toggle Market
              </Button>
            </Link>
            
            {/* Ultra-hidden link to Journal - only visible to high trust or special time */}
            {(trustLevel === 'high' || (typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow())) && (
              <Link to="/i-see-you" aria-label="Journal">
                <Button 
                  variant="ghost" 
                  className="text-dust-red/5 hover:text-dust-red/30 hover:bg-black/20 border border-transparent hover:border-dust-red/20 text-[0.6rem]"
                  style={{ opacity: 0.05 }}
                >
                  I See You
                </Button>
              </Link>
            )}
            
            {/* Hidden link to Split Voice page */}
            <Link to="/split-voice" aria-label="Split Voice">
              <Button 
                variant="ghost" 
                className="text-dust-red/3 hover:text-dust-red/40 hover:bg-black/20 border border-transparent hover:border-dust-red/20 text-[0.5rem]"
                style={{ opacity: 0.03 }}
              >
                Split Voice
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <HiddenNav />
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      
      <div className="font-typewriter text-xs text-dust-blue/30 p-3 text-center">
        <p className="mb-3">You've been gate-logged {userState.visitCount} times.</p>
        {/* Add a subtle link to the toggle-market page */}
        <p className="mb-3">
          <Link to="/toggle-market" className="hover:text-dust-blue/50 transition-colors">
            The toggles remember your adjustment.
          </Link>
        </p>
        {/* Add a subtle link to the fleet page */}
        <p>
          <Link to="/fleet" className="hover:text-dust-blue/50 transition-colors">
            The fleet has spotted your position.
          </Link>
        </p>
      </div>
      
      {/* Hidden data attributes for cross-site presence */}
      <div
        className="hidden"
        data-jonah-presence="true"
        data-user-phile-rank={userState?.console?.rank || "drifter"}
        data-visit-count={userState.visitCount}
        data-whisper-code="GRFNDRZ"
      />
    </div>
  );
};

export default Index;
