
import { UserState } from "@/hooks/useTrackingSystem";

// Define type for getRank function to ensure proper typing
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Define type for trackEvent function
type TrackEventFunction = (eventName: string) => void;

// Initialize console functions on the window object
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  // Define showStatus() function to show user rank and progress
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

  // Define basic console commands
  window.help = function() {
    console.log("%cWelcome, wanderer.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThis console is not monitored... but it remembers.", "color: #8B3A40; font-size:16px;");
    console.log("%cTry typing: reveal()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_help_called');
  };
  
  window.reveal = function() {
    console.log("%cBehind every Gate is a Gatekeeper.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cBehind every story is an author.", "color: #8B3A40; font-size:16px;");
    console.log("%cNext, try: reincarnate()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_reveal_called');
  };
  
  window.reincarnate = function() {
    console.log("%cThe coin never lands.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cYour story never ends.", "color: #8B3A40; font-size:16px;");
    console.log("%cType whois() to learn more", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_reincarnate_called');
  };
  
  window.whois = function() {
    console.log("%cJonah S.M. Phile.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cRearrange me, and you may find someone else hiding.", "color: #8B3A40; font-size:16px; font-style:italic;");
    console.log("%cOnce you understand, type: gate()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_whois_called');
  };

  window.gate = function() {
    console.log("%cThe Gate never opened. You walked through it anyway.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThe coin is still spinning. So are you.", "color: #8B3A40; font-size:16px;");
    console.log("%cNow try: philes()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_gate_called');
  };
  
  window.philes = function() {
    console.log("%cYou're deeper than most.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThe Monster is watching.", "color: #8B3A40; font-size:16px;");
    console.log("%cInvoke him at your own risk: monster()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_philes_called');
  };
  
  window.monster = function() {
    console.log("%cHe smiled with your voice. He walks in your skin.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThere was no rescue. Only transformation.", "color: #8B3A40; font-size:16px;");
    console.log("%cYou've earned the truth. Type: legacy()", "color: #475B74; font-size:16px; font-style:italic;");
    trackEvent('console_monster_called');
  };
  
  window.legacy = function() {
    console.log("%cYou saw through the cracks.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cYou decoded survival.", "color: #8B3A40; font-size:16px;");
    console.log("%cLegacy is not given. It is built. You are the Gatekeeper now.", "color: #8B3A40; font-size:16px;");
    console.log("%cPassword for final page: 'N0tFict10n'", "color: #475B74; font-size:16px; font-weight:bold;");
    trackEvent('console_legacy_called');
  };
  
  window.coinToss = function() {
    const side = Math.random() < 0.5 ? "HEADS" : "TAILS";
    if (side === "HEADS") {
      console.log("%cHeads: You chose to heal.", "color: #475B74; font-size:16px;");
    } else {
      console.log("%cTails: You chose to break.", "color: #8B3A40; font-size:16px;");
    }
  };
};

// Define a standardized window interface to be used across the application
declare global {
  interface Window {
    help: () => void;
    reveal: () => void;
    reincarnate: () => void;
    whois: () => void;
    gate: () => void;
    philes: () => void;
    monster: () => void;
    legacy: () => void;
    coinToss: () => void;
    showStatus: () => Promise<void>;
  }
}
