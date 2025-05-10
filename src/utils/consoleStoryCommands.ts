
import { 
  flickerLog, 
  glitchEffectLog, 
  speak, 
  typewriterLog, 
  delayedLog 
} from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;
type RecordFailAttemptFunction = () => void;

// Initialize story-related commands
export const initializeStoryCommands = (
  trackCommandExecution: TrackCommandFunction,
  recordFailAttempt: RecordFailAttemptFunction
) => {
  // Story interaction commands
  window.flipcoin = function() {
    const rand = Math.random();
    const coinFlips = parseInt(localStorage.getItem('coinFlips') || '0');
    localStorage.setItem('coinFlips', (coinFlips + 1).toString());
    
    // After enough flips, the coin lands on edge more often
    const edgeChance = coinFlips > 10 ? 0.15 : 0.1;
    
    if (rand < 0.45) {
      flickerLog("Heads: You chose to heal.");
      speak("Heads: You chose to heal.");
    } else if (rand < (1 - edgeChance)) {
      flickerLog("Tails: You chose to break.");
      speak("Tails: You chose to break.");
    } else {
      glitchEffectLog("The coin lands on its edge. Again.");
      speak("The coin lands on its edge. Again.");
      window.JonahConsole.score += 20;
      
      // Easter egg for repeated edge landings
      if ((coinFlips % 5) === 0) {
        setTimeout(() => {
          console.log("%cThe coin whispers: 'Just like 2019.'", "color: #8B3A40; font-size:14px; font-style:italic;");
        }, 2000);
      }
    }
    
    trackCommandExecution('flipcoin');
  };
  
  window.glitch = function() {
    const glitches = [
      "Your reflection blinks before you do.",
      "Time folds. Memory bleeds.",
      "He said your name before you were born.",
      "The coin lands, but not here.",
      "The Gate was inside you all along.",
      "You are the thing you seek."
    ];
    
    const rand = Math.random();
    
    // Chance of glitch increases with session time
    const sessionMinutes = (Date.now() - window.JonahConsole.sessionStartTime) / 60000;
    const glitchChance = Math.min(0.8, 0.2 + (sessionMinutes / 60) * 0.3);
    
    if (rand > glitchChance) {
      typewriterLog("Static crackles... but nothing happens.");
      speak("Static crackles");
    } else {
      const msg = glitches[Math.floor(Math.random() * glitches.length)];
      glitchEffectLog(msg);
      speak(msg);
      window.JonahConsole.score += 15;
      
      // Easter egg for repeated glitches
      if (!window.JonahConsole.usedCommands.includes("glitch")) {
        setTimeout(() => {
          console.log("%cYou've pulled at the seam. The stitching unravels.", "color: #475B74; font-size:14px; font-style:italic;");
        }, 2000);
      }
    }
    
    trackCommandExecution('glitch');
  };
  
  window.whisper = function() {
    const memories = [
      "Samantha said not to go. He went anyway.",
      "There was a man under the pedals, remember?",
      "The mirror lied. The voice didn't.",
      "You were never alone in that hostel hallway.",
      "The coin spun for three days before stopping.",
      "Joseph James Hilson never existed. But you did.",
      "The Gate opened when you weren't looking.",
      "Jonah is just one letter away from Jonas."
    ];
    
    // Filter for memories not yet found
    const newMemories = memories.filter(m => !window.JonahConsole.whispersFound.includes(m));
    
    if (newMemories.length > 0) {
      // Prefer new memories if available
      const memory = newMemories[Math.floor(Math.random() * newMemories.length)];
      window.JonahConsole.whispersFound.push(memory);
      typewriterLog(`WhisperLog > ${memory}`);
      speak(memory, { rate: 0.7, pitch: 0.5 });
      window.JonahConsole.score += 10;
    } else {
      // If all memories found, use any random one
      const memory = memories[Math.floor(Math.random() * memories.length)];
      typewriterLog(`WhisperLog > ${memory}`);
      speak(memory, { rate: 0.7, pitch: 0.5 });
      setTimeout(() => {
        console.log("%cYou've heard all the whispers before.", "color: #475B74; font-size:14px;");
      }, 2000);
    }
    
    trackCommandExecution('whisper');
  };
  
  window.scream = function() {
    // Dynamic response based on rank
    const rank = window.JonahConsole.rank.toLowerCase();
    
    if (rank === "monster") {
      glitchEffectLog("The void screams back.");
      speak("The void screams back", { pitch: 0.3, rate: 0.6 });
      setTimeout(() => {
        console.log("%cA chorus of voices joins yours.", "color: #8B3A40; font-size:16px;");
      }, 1500);
      window.JonahConsole.score += 25;
    } else if (rank === "gatekeeper") {
      flickerLog("The Gate trembles at your voice.");
      speak("The Gate trembles at your voice");
      window.JonahConsole.score += 15;
    } else if (rank === "survivor") {
      typewriterLog("Echoes. But no answer.");
      speak("Echoes. But no answer.");
      window.JonahConsole.score += 5;
    } else {
      flickerLog("No one heard you.");
      speak("No one heard you");
    }
    
    trackCommandExecution('scream');
  };
  
  window.burn = function(command) {
    if (!command) {
      console.log("%cWhat would you like to burn? Try burn('command').", "color: #475B74; font-size:14px;");
      return;
    }
    
    const i = window.JonahConsole.usedCommands.indexOf(command);
    if (i >= 0) {
      // Can't burn core commands
      const coreCommands = ['help', 'reveal', 'reincarnate', 'whois', 'gate', 'philes', 'monster', 'legacy', 'showStatus'];
      if (coreCommands.includes(command)) {
        glitchEffectLog("Core memories cannot be burned.");
        speak("Core memories cannot be burned");
        return;
      }
      
      window.JonahConsole.usedCommands.splice(i, 1);
      delayedLog([`You burned ${command}.`, "The flame took it."]);
      speak(`You burned ${command}`);
      window.JonahConsole.score += 10;
    } else {
      typewriterLog("There's nothing left to burn.");
      speak("There's nothing left to burn");
    }
    
    trackCommandExecution('burn');
  };
  
  window.decrypt = function(code) {
    if (!code) {
      console.log("%cWhat would you like to decrypt? Try decrypt('code').", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanCode = String(code).toUpperCase().trim();
    
    // Different codes with different responses and rewards
    if (cleanCode === "S.M.PHILE") {
      delayedLog(["You found it.", "The truth is archived."]);
      speak("You found it. The truth is archived.");
      setTimeout(() => {
        console.log("%c'S.M.' stands for 'Shadow Monster'.", "color: #8B3A40; font-size:16px;");
      }, 3000);
      window.JonahConsole.score += 50;
    } else if (cleanCode === "JONAS") {
      glitchEffectLog("Reborn, rearranged, remembered.");
      speak("Reborn, rearranged, remembered");
      window.JonahConsole.score += 30;
    } else if (cleanCode === "THE GATE") {
      typewriterLog("...is a metaphor. And a warning.");
      speak("is a metaphor. And a warning");
      window.JonahConsole.score += 20;
    } else if (cleanCode === "N0TFICT10N") {
      flickerLog("The password was already given. But yes, this isn't fiction.");
      speak("This isn't fiction");
      window.JonahConsole.score += 25;
    } else {
      glitchEffectLog("Invalid input. The algorithm spits static.");
      speak("Invalid input");
      recordFailAttempt();
    }
    
    trackCommandExecution('decrypt');
  };
  
  window.echo = function() {
    if (!window.JonahConsole.lastCommand) {
      typewriterLog("Nothing to echo. You must speak first.");
      speak("Nothing to echo");
      return;
    }
    
    const lastCmd = window.JonahConsole.lastCommand;
    flickerLog(`Echoing "${lastCmd}", but the words twist...`);
    
    // Twisted echo responses
    const responses = {
      'help': "No help comes. Only observation.",
      'reveal': "Revelation is never free.",
      'reincarnate': "Death was just another door.",
      'whois': "Hilson. Joseph James. Phile. Jonah S.M. Two sides.",
      'gate': "You never crossed. You were always inside.",
      'philes': "Records. Eyes. Witnesses. All the same.",
      'monster': "Monster. Mirror. Reflection. Circle complete.",
      'legacy': "Nothing remains after the collapse. Except you.",
      'flipcoin': "The coin never stops spinning.",
      'glitch': "The glitch is not in the system. It's in you.",
      'whisper': "You were the whisper all along.",
      'scream': "The Monster finally speaks.",
      'burn': "What burns never truly disappears.",
      'decrypt': "Some codes are better left encrypted.",
      'showStatus': "Status: Observed. Rank: Marked."
    };
    
    setTimeout(() => {
      const response = responses[lastCmd] || "The echo distorts beyond comprehension.";
      glitchEffectLog(response);
      speak(response, { pitch: 0.4, rate: 0.7 });
      window.JonahConsole.score += 15;
    }, 1500);
    
    trackCommandExecution('echo');
  };
  
  window.coinToss = function() {
    const side = Math.random() < 0.5 ? "HEADS" : "TAILS";
    if (side === "HEADS") {
      typewriterLog("Heads: You chose to heal.");
      speak("Heads: You chose to heal");
    } else {
      flickerLog("Tails: You chose to break.");
      speak("Tails: You chose to break");
    }
    
    trackCommandExecution('coinToss');
  };
};

// Add story commands to the global interface
declare global {
  interface Window {
    flipcoin: () => void;
    glitch: () => void;
    whisper: () => void;
    scream: () => void;
    burn: (command?: string) => void;
    decrypt: (code?: string) => void;
    echo: () => void;
    coinToss: () => void;
  }
}
