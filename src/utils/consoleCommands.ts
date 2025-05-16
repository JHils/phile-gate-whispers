import { UserState } from "@/hooks/useTrackingSystem";
import { 
  typewriterLog, 
  flickerLog, 
  delayedLog, 
  glitchEffectLog, 
  speak, 
  trackCommand,
  initializeWhisperMaster,
  displayRandomJoke,
  playMagneticTentStory
} from "./consoleEffects";
import { initializeBasicCommands } from "./consoleBasicCommands";
import { initializeStoryCommands } from "./consoleStoryCommands";
import { initializeHumorCommands } from "./consoleHumorCommands";
import { initializeNewCommands } from "./consoleNewCommands";
import { initializeBookCommands } from "./consoleBookCommands";
import { initializeClueSystem } from "./consoleClueSystem";
import { initializeSimbaSystem } from "./consoleSimbaSystem";
import { initializeTimeSystem } from "./consoleTimeSystem";
import { 
  initializeARGCommands, 
  generateTestament 
} from "./argTracking";
import { 
  initializeSentience, 
  generatePersonalDiary 
} from "./jonahSentience";

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
  // Initialize the JonahConsole state
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || "drifter",
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  }

  // Initialize sentience system
  initializeSentience();
  
  // Initialize WhisperMaster for side quests
  initializeWhisperMaster();
  
  // Update score and rank from real user state
  const updateConsoleState = async () => {
    try {
      const { rank, score } = await getUserRank();
      window.JonahConsole.score = score;
      window.JonahConsole.rank = rank.toLowerCase();
      
      // Ensure localStorage is in sync
      localStorage.setItem('phileScore', score.toString());
      localStorage.setItem('phileRank', rank.toLowerCase());
    } catch (error) {
      console.error("Failed to update console state:", error);
    }
  };
  
  // Run this once on initialization
  updateConsoleState();
  
  // Track a command execution and add to used commands
  const trackCommandExecution = (commandName: string) => {
    trackCommand(commandName);
    trackEvent(`console_${commandName}_called`);
  };
  
  // Record a fail attempt
  const recordFailAttempt = () => {
    window.JonahConsole.failCount++;
    
    if (window.JonahConsole.failCount >= 3 && !window.JonahConsole.usedCommands.includes("reveal")) {
      console.log("%cYou're circling. Try reveal().", "color: #475B74; font-size:14px; font-style:italic;");
    }
  };
  
  // Format session time for display
  const formatSessionTime = () => {
    const elapsed = Math.floor((Date.now() - window.JonahConsole.sessionStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Define showStatus() function to show user rank and progress
  window.showStatus = async function() {
    try {
      const { rank, score, position, userHash } = await getUserRank();
      await updateConsoleState(); // Refresh console state
      
      const statusText = `=== STATUS REPORT ===
Rank: ${rank}
Score: ${score}
Position: #${position}
User ID: ${userHash}
Commands unlocked: ${window.JonahConsole.usedCommands.length} / 20
Time in session: ${formatSessionTime()}`;
      
      typewriterLog(statusText);
      
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
        setTimeout(() => {
          console.log("%cYou've reached the highest rank.", "color: #475B74; font-size:14px; font-style:italic;");
        }, 2000);
      }
      
      if (nextRank) {
        setTimeout(() => {
          console.log(`%c${pointsNeeded} points until ${nextRank}`, "color: #475B74; font-size:14px; font-style:italic;");
        }, 1500);
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
      
      setTimeout(() => {
        console.log("%cDiscovered commands: " + commands.join(", "), "color: #8B3A40; font-size:14px;");
      }, 2500);
      
      // Special response for keyholder rank (high trust)
      if (rank.toLowerCase() === 'gatekeeper' || rank.toLowerCase() === 'monster') {
        setTimeout(() => {
          console.log("%cAlright. I'll give you coordinates. Don't come alone.", "color: #8B3A40; font-size:16px; font-style:italic;");
        }, 4000);
      }
      
      // If user has high trust, sometimes add a personal diary entry
      if ((window.JonahConsole.rank === 'gatekeeper' || window.JonahConsole.rank === 'monster') && 
          Math.random() > 0.7) {
        setTimeout(() => {
          console.log("%c" + generatePersonalDiary("high"), "color: #8B3A40; font-size:16px; font-style:italic;");
        }, 4500);
      }
      
      trackCommandExecution('showStatus');
    } catch (error) {
      console.error("Error retrieving status:", error);
      console.log("%cUnable to retrieve status. The Gate is unstable.", "color: red; font-size:14px;");
    }
  };

  // Initialize all command groups
  initializeBasicCommands(trackCommandExecution, userState);
  initializeStoryCommands(trackCommandExecution, recordFailAttempt);
  initializeHumorCommands(trackCommandExecution);
  initializeNewCommands(trackCommandExecution);
  
  // Initialize the new book-locked content system
  initializeBookCommands(trackCommandExecution);
  
  // Initialize the layered clue system
  initializeClueSystem(trackCommandExecution);
  
  // Initialize Simba presence
  initializeSimbaSystem(trackCommandExecution);
  
  // Initialize time-sensitive features
  initializeTimeSystem(trackCommandExecution);
  
  // Initialize ARG commands
  initializeARGCommands(trackCommandExecution);
};

// Add additional command types to the global window interface
declare global {
  interface Window {
    displayRandomJoke: () => void;
    showStatus: () => Promise<void>;
    mirrorLogs: () => void;
    whisperTree: () => void;
    plea: () => void;
    testament: () => void;
  }
}
