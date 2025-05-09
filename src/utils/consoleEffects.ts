
// Console effects for immersive text presentation

// Interface for the global JonahConsole object
declare global {
  interface Window {
    JonahConsole: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      lastCommand?: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed?: string[];
    };
  }
}

// FX Functions for console output

/**
 * Log text with a typewriter effect
 */
export function typewriterLog(text: string, speed = 40, callback: (() => void) | null = null): void {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      const chunk = text.slice(0, i + 1);
      console.clear();
      console.log(chunk);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

/**
 * Log text with a flickering effect
 */
export function flickerLog(text: string, delay = 50): void {
  let output = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      output += text[i];
      console.clear();
      console.log(output + ((i % 2 === 0) ? "|" : " "));
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => console.log(text), 100);
    }
  }, delay);
}

/**
 * Log multiple messages with delays between them
 */
export function delayedLog(messages: string[], initialDelay = 500, step = 1000): void {
  messages.forEach((msg, index) => {
    setTimeout(() => console.log(msg), initialDelay + index * step);
  });
}

/**
 * Create glitched text by replacing random characters with noise symbols
 */
export function glitchText(text: string, intensity = 0.1): string {
  const noise = ['#', '@', '*', '%', '&', '$', '!', '?', '/', '\\', '|'];
  return text.split("").map(c => 
    (Math.random() < intensity ? noise[Math.floor(Math.random() * noise.length)] : c)
  ).join("");
}

/**
 * Log text with a glitching effect
 */
export function glitchEffectLog(text: string, iterations = 5, intervalTime = 100): void {
  let i = 0;
  const interval = setInterval(() => {
    if (i < iterations) {
      console.clear();
      console.log(glitchText(text));
      i++;
    } else {
      clearInterval(interval);
      console.clear();
      console.log(text);
    }
  }, intervalTime);
}

/**
 * Speak text using browser's speech synthesis if available
 */
export function speak(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): void {
  // Check if speech synthesis is available in the browser
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = options.rate ?? 0.8;
      msg.pitch = options.pitch ?? 0.6;
      msg.volume = options.volume ?? 0.7;
      window.speechSynthesis.speak(msg);
    } catch (error) {
      console.error("Speech synthesis error:", error);
    }
  }
}

/**
 * Track used commands in the JonahConsole global object
 */
export function trackCommand(commandName: string): void {
  if (window.JonahConsole) {
    if (!window.JonahConsole.usedCommands.includes(commandName)) {
      window.JonahConsole.usedCommands.push(commandName);
    }
    window.JonahConsole.lastCommand = commandName;
  }
}

/**
 * Display random joke from the joke pool
 */
export function displayRandomJoke(): void {
  const jokes = [
    "Fun fact: There is no fun. Only facts.",
    "Still looking for meaning? Have you tried carbs?",
    "Your console commands are being monitored… by your past self.",
    "ToggleWrath() is not recommended. But you will anyway.",
    "Everything you type is remembered. Especially the weird stuff.",
    "Didn't know consoles could laugh, did you? Neither did we.",
    "The coin never lands. But you keep flipping it anyway.",
    "Memory leak detected. Good luck figuring out which one.",
    "Jonah says hi. He's wearing your smile today."
  ];
  
  // Initialize jokesDisplayed array if it doesn't exist
  if (!window.JonahConsole.jokesDisplayed) {
    window.JonahConsole.jokesDisplayed = [];
  }
  
  // Filter for jokes not yet displayed
  let availableJokes = jokes.filter(joke => 
    !window.JonahConsole.jokesDisplayed?.includes(joke)
  );
  
  // If all jokes have been shown, reset the tracking
  if (availableJokes.length === 0) {
    window.JonahConsole.jokesDisplayed = [];
    availableJokes = jokes;
  }
  
  // Select random joke and display
  const joke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
  window.JonahConsole.jokesDisplayed?.push(joke);
  
  console.log(`%c${joke}`, "color: #475B74; font-style: italic;");
}

/**
 * Play the Magnetic Tent story
 */
export function playMagneticTentStory(): void {
  console.log("Accessing... private logs.");
  
  setTimeout(() => { 
    console.log("%cMemory retrieved: MAGNETIC TENT INCIDENT — REDACTED", "color: #8B3A40; font-weight: bold;"); 
  }, 1000);
  
  setTimeout(() => { 
    console.log("%c\"You're sleeping on my toggles… you're tightening my trousers.\"", "color: #475B74;"); 
  }, 2500);
  
  setTimeout(() => { 
    console.log("%c\"If you're pissing on the side of the tent… you'll attract… straaaaayngeeeers…\"", "color: #475B74;"); 
  }, 4000);
  
  setTimeout(() => { 
    console.log("%c\"I've got blood in me mouth, gov'nor! Would you like to purchase some of my waaaares?\"", "color: #475B74;"); 
  }, 5500);
  
  setTimeout(() => { 
    console.log("%c*THUD*", "color: #8B3A40; font-weight: bold;"); 
  }, 6500);
  
  setTimeout(() => { 
    console.log("%c\"Owwwwl.\" (There was no owl.)", "color: #475B74; font-style: italic;"); 
  }, 7000);
  
  setTimeout(() => { 
    console.log("%c\"Which one of your wooden posts is to blame?\"", "color: #475B74;"); 
  }, 8000);
  
  setTimeout(() => { 
    console.log("%c…log closed. The glamping pod never forgets.", "color: #8B3A40;"); 
  }, 9000);
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

// Define WhisperMaster interface for TypeScript
declare global {
  interface Window {
    WhisperMaster?: {
      map: Record<number, string>;
      audioFiles: string[];
      unlock: (index: number, playerName?: string) => void;
      playSound: (index: number) => void;
      updateLeaderboard: (name: string) => void;
      showMap: () => void;
      showLeaderboard: () => void;
    };
  }
}
