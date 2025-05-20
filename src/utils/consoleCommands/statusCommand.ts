
/**
 * Status display command for the console
 */
import { typewriterLog } from "../consoleEffects";
import { GetUserRankFunction, TrackCommandFunction, UserStateType } from "./types";

export const initializeStatusCommand = (
  trackCommandExecution: TrackCommandFunction,
  getUserRank: GetUserRankFunction,
  userState: UserStateType
) => {
  // Define showStatus() function to show user rank and progress
  window.showStatus = async function() {
    try {
      const { rank, score, position, userHash } = await getUserRank();
      await updateConsoleState(); // Refresh console state
      
      if (window.JonahConsole) {
        const formatSessionTime = () => {
          const elapsed = Math.floor((Date.now() - window.JonahConsole.sessionStartTime) / 1000);
          const hours = Math.floor(elapsed / 3600);
          const minutes = Math.floor((elapsed % 3600) / 60);
          const seconds = elapsed % 60;
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        
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
        if (userState.console?.helpCalled) commands.push("help()");
        if (userState.console?.whoisCalled) commands.push("whois()");
        if (userState.console?.gateCalled) commands.push("gate()");
        if (userState.console?.philesCalled) commands.push("philes()");
        if (userState.console?.monsterCalled) commands.push("monster()");
        if (userState.console?.legacyCalled) commands.push("legacy()");
        if (userState.console?.revealCalled) commands.push("reveal()");
        if (userState.console?.reincarnateCalled) commands.push("reincarnate()");
        
        setTimeout(() => {
          console.log("%cDiscovered commands: " + commands.join(", "), "color: #8B3A40; font-size:14px;");
        }, 2500);
      }
      
      trackCommandExecution('showStatus');
    } catch (error) {
      console.error("Error retrieving status:", error);
      console.log("%cUnable to retrieve status. The Gate is unstable.", "color: red; font-size:14px;");
    }
  };

  // Update score and rank from real user state
  const updateConsoleState = async () => {
    try {
      const { rank, score } = await getUserRank();
      if (window.JonahConsole) {
        window.JonahConsole.score = score;
        window.JonahConsole.rank = rank.toLowerCase();
        
        // Ensure localStorage is in sync
        localStorage.setItem('phileScore', score.toString());
        localStorage.setItem('phileRank', rank.toLowerCase());
      }
    } catch (error) {
      console.error("Failed to update console state:", error);
    }
  };
};
