import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinningCoin from "../components/SpinningCoin";
import HiddenNav from "../components/HiddenNav";
import { getTimeElapsedMessage, getThematicMessage } from "../utils/chronoLayer";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { Button } from "@/components/ui/button";

// Keep track of whether console messages have been shown
// Use localStorage to prevent showing messages on every render
const CONSOLE_MESSAGES_KEY = 'index_console_messages_shown';
const hasShownConsoleMessages = () => {
  const timestamp = localStorage.getItem(CONSOLE_MESSAGES_KEY);
  if (!timestamp) return false;
  
  // Only show messages again after 24 hours
  const hoursPassed = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
  return hoursPassed < 24;
};

// Track active timeouts to prevent duplicate messages
let activeTimeouts: NodeJS.Timeout[] = [];

// Extend window interface for the global functions
declare global {
  interface Window {
    showStatus: () => Promise<void>; // Renamed from status to showStatus
    help: () => void;
    whois: () => void;
    gate: () => void;
    philes: () => void;
    monster: () => void;
    legacy: () => void;
    reveal: () => void;
    reincarnate: () => void;
    coinToss: () => void;
  }
}

const Index = () => {
  const [collapseMessage, setCollapseMessage] = useState<string | null>(null);
  const { userState, trackEvent, getUserRank } = useTrackingSystem();

  // Add classes to individual characters for staggered animation
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => 
      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
    );
  };

  useEffect(() => {
    // Track page visit
    trackEvent('visited_gate');
    
    // Check for ChronoLayer messages
    const timeMessage = getTimeElapsedMessage();
    if (timeMessage) {
      setCollapseMessage(timeMessage);
    }
    
    // Only show console messages if they haven't been shown recently
    if (!hasShownConsoleMessages()) {
      // Cancel any existing timeouts to prevent duplicate messages
      activeTimeouts.forEach(clearTimeout);
      activeTimeouts = [];
      
      // Console message for the curious
      console.log("%cThe Gate is watching.", "color: #8B3A40; font-size:14px;");
      console.log("%cThe whispers start with help().", "color: #475B74; font-size:14px; font-style:italic;");
      
      // Additional console messages with delays for creepier effect
      const timeouts: NodeJS.Timeout[] = [];
      
      timeouts.push(setTimeout(() => {
        console.log("%cThe Gate is open. But you are not ready.", "color: #8B3A40; font-size:14px;");
      }, Math.random() * 2000 + 1000));
      
      timeouts.push(setTimeout(() => {
        console.log("%cTracking signal unstable. Coin spinning beyond threshold.", "color: #8B3A40; font-size:14px;");
      }, Math.random() * 3000 + 2000));
      
      timeouts.push(setTimeout(() => {
        console.log("%cLeft was never right. Forward was a lie.", "color: #8B3A40; font-size:14px;");
      }, Math.random() * 4000 + 3000));
      
      // Mark that we've shown the messages
      localStorage.setItem(CONSOLE_MESSAGES_KEY, Date.now().toString());
      
      // Store timeouts for cleanup
      activeTimeouts = timeouts;
      
      // Clean up timeouts on unmount
      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
    
    // Create the console functions only once
    if (!window.help) {
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
    
      // Define global Easter egg functions for console interaction
      // @ts-ignore - This is intentionally added to window
      window.help = function() {
        console.log("%cWelcome, wanderer.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cThis console is not monitored... but it remembers.", "color: #8B3A40; font-size:16px;");
        console.log("%cTry typing: whois()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_help_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.whois = function() {
        console.log("%cJonah S.M. Phile.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cRearrange me, and you may find someone else hiding.", "color: #8B3A40; font-size:16px;");
        console.log("%cOnce you understand, type: gate()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_whois_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.gate = function() {
        console.log("%cThe Gate never opened. You walked through it anyway.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cThe coin is still spinning. So are you.", "color: #8B3A40; font-size:16px;");
        console.log("%cNow try: philes()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_gate_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.philes = function() {
        console.log("%cYou're deeper than most.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cThe Monster is watching.", "color: #8B3A40; font-size:16px;");
        console.log("%cInvoke him at your own risk: monster()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_philes_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.monster = function() {
        console.log("%cHe smiled with your voice. He walks in your skin.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cThere was no rescue. Only transformation.", "color: #8B3A40; font-size:16px;");
        console.log("%cYou've earned the truth. Type: legacy()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_monster_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.legacy = function() {
        console.log("%cYou saw through the cracks.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cYou decoded survival.", "color: #8B3A40; font-size:16px;");
        console.log("%cLegacy is not given. It is built. You are the Gatekeeper now.", "color: #8B3A40; font-size:16px;");
        console.log("%cPassword for final page: 'N0tFict10n'", "color: #475B74; font-size:16px; font-weight:bold;");
        trackEvent('console_legacy_called');
        updateUIBasedOnProgress();
      };
      
      // Add new console functions
      // @ts-ignore - This is intentionally added to window
      window.reveal = function() {
        console.log("%cBehind every Gate is a Gatekeeper.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cBehind every story is an author.", "color: #8B3A40; font-size:16px;");
        console.log("%cNext, try: reincarnate()", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_reveal_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.reincarnate = function() {
        console.log("%cThe coin never lands.", "color: #8B3A40; font-size:16px; font-weight:bold;");
        console.log("%cYour story never ends.", "color: #8B3A40; font-size:16px;");
        console.log("%cType whois() to continue your journey", "color: #475B74; font-size:16px; font-style:italic;");
        trackEvent('console_reincarnate_called');
        updateUIBasedOnProgress();
      };
      
      // @ts-ignore - This is intentionally added to window
      window.coinToss = function() {
        const side = Math.random() < 0.5 ? "HEADS" : "TAILS";
        if (side === "HEADS") {
          console.log("%cHeads: You chose to heal.", "color: #475B74; font-size:16px;");
        } else {
          console.log("%cTails: You chose to break.", "color: #8B3A40; font-size:16px;");
        }
      };
    }
    
    // Function to update UI based on progress
    function updateUIBasedOnProgress() {
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
      }
    }
    
    // Call on load to reflect any existing progress
    setTimeout(updateUIBasedOnProgress, 1000);
  }, [trackEvent, userState, getUserRank]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')" }}
    >
      {/* Hidden comments for inspection */}
      {/* <!-- Phile initiated. Tracking subject... --> */}
      {/* <!-- The coin will fall. --> */}
      {/* <!-- Warning: Surface Integrity Failing. --> */}
      {/* <!-- The Gate watches. --> */}
      {/* <!-- Left was never right. --> */}
      {/* <!-- Coin Toss initiated. --> */}
      
      <div className="phile-container text-center z-10">
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
          
          {/* Add campfire link */}
          <div className="mt-8">
            <Link to="/campfire">
              <Button 
                variant="ghost" 
                className="text-dust-orange hover:text-dust-red hover:bg-black/20 border border-transparent hover:border-dust-red/30"
              >
                Join the Campfire
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <HiddenNav />
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};

export default Index;
