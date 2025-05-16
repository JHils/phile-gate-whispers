
/**
 * WhisperMaster functionality for side quests
 */

// Define the WhisperMaster interface for TypeScript
interface WhisperMaster {
  map: {[key: number]: string};
  audioFiles: string[];
  unlock: (index: number, playerName?: string) => void;
  playSound: (index: number) => void;
  updateLeaderboard: (name: string) => void;
  showMap: () => void;
  showLeaderboard: () => void;
}

// Declare WhisperMaster on Window object
declare global {
  interface Window {
    WhisperMaster?: WhisperMaster;
  }
}

/**
 * Initialize the WhisperMaster for side quests
 */
export function initializeWhisperMaster(): void {
  if (typeof window !== 'undefined' && !window.WhisperMaster) {
    window.WhisperMaster = {
      map: {
        0: "The Coin Room",
        1: "The Mirror Trail",
        2: "The Soundwell",
        3: "The Bedside Fire"
      },
    
      audioFiles: [
        "whisper1.mp3",
        "whisper2.mp3",
        "whisper3.mp3",
        "whisper4.mp3"
      ],
    
      unlock: function(index: number, playerName = "Unknown") {
        const whispers = JSON.parse(localStorage.getItem("whispersUnlocked") || "[]");
        if (!whispers.includes(index)) {
          whispers.push(index);
          localStorage.setItem("whispersUnlocked", JSON.stringify(whispers));
          this.playSound(index);
          this.updateLeaderboard(playerName);
          console.log("%c🔓 Whisper unlocked: " + (this.map[index] || `Unknown ${index}`), "color: #8B3A40;");
        } else {
          console.log("%cWhisper already unlocked: " + this.map[index], "color: #475B74;");
        }
      },
    
      playSound: function(index: number) {
        try {
          const audio = new Audio("/audio/" + this.audioFiles[index % this.audioFiles.length]);
          audio.volume = 0.3;
          audio.play().catch(err => console.error("Audio play failed:", err));
        } catch (e) {
          console.error("Audio failed to load:", e);
        }
      },
    
      updateLeaderboard: function(name: string) {
        const board = JSON.parse(localStorage.getItem("whisperBoard") || "{}");
        board[name] = (board[name] || 0) + 1;
        localStorage.setItem("whisperBoard", JSON.stringify(board));
      },
    
      showMap: function() {
        const whispers = JSON.parse(localStorage.getItem("whispersUnlocked") || "[]");
        console.log("%c🗺️ Whisper Map:", "color: #8B3A40; font-size: 14px;");
        if (whispers.length === 0) {
          console.log("%cYou haven't found any whisper realms yet.", "color: #475B74;");
        } else {
          whispers.forEach((index: number) => console.log("%c✅ " + this.map[index], "color: #8B3A40;"));
          if (whispers.length === Object.keys(this.map).length) {
            console.log("%c✨ You've unlocked the full whisper map.", "color: #8B3A40; font-weight: bold;");
          }
        }
      },
    
      showLeaderboard: function() {
        const board = JSON.parse(localStorage.getItem("whisperBoard") || "{}");
        const sorted = Object.entries(board).sort((a: [string, any], b: [string, any]) => b[1] - a[1]);
        console.log("%c🏆 Whisper Leaderboard:", "color: #8B3A40; font-size: 14px;");
        sorted.forEach(([user, count], i) => {
          console.log(`%c#${i + 1}: ${user} — ${count} whispers`, "color: #475B74;");
        });
      }
    };
  }
}
