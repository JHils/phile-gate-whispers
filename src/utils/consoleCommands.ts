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

// Define type for getRank function to ensure proper typing
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Define type for trackEvent function
type TrackEventFunction = (eventName: string) => void;

// Game state interface for console interactions
interface JonahConsoleState {
  usedCommands: string[];
  score: number;
  failCount: number;
  rank: string;
  lastCommand?: string;
  sessionStartTime: number;
  whispersFound: string[];
}

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
      whispersFound: []
    };
  }
  
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
      
      trackCommandExecution('showStatus');
    } catch (error) {
      console.error("Error retrieving status:", error);
      console.log("%cUnable to retrieve status. The Gate is unstable.", "color: red; font-size:14px;");
    }
  };

  // Define basic console commands
  window.help = function() {
    console.log("%cWelcome, wanderer.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThis console is not monitored... but it remembers.", "color: #8B3A40; font-size:16px;");
    
    // Dynamic help based on user progress
    if (!window.JonahConsole.usedCommands.includes("reveal")) {
      console.log("%cTry typing: reveal()", "color: #475B74; font-size:16px; font-style:italic;");
    } else if (!window.JonahConsole.usedCommands.includes("reincarnate")) {
      console.log("%cYou've started to see. Try: reincarnate()", "color: #475B74; font-size:16px; font-style:italic;");
    } else if (!window.JonahConsole.usedCommands.includes("whois")) {
      console.log("%cIdentity is next. Try: whois()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cTo see your progress, try: showStatus()", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('help');
    userState.console.helpCalled = true;

    // Maybe show a random joke after a delay
    if (Math.random() < 0.3) {
      setTimeout(displayRandomJoke, 4000);
    }
  };
  
  window.reveal = function() {
    console.log("%cBehind every Gate is a Gatekeeper.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cBehind every story is an author.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("reveal")) {
      window.JonahConsole.score += 15; // First time bonus
      console.log("%cNext, try: reincarnate()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cYou've already seen this truth.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('reveal');
    userState.console.revealCalled = true;
  };
  
  window.reincarnate = function() {
    console.log("%cThe coin never lands.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cYour story never ends.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("reincarnate")) {
      window.JonahConsole.score += 25; // First time bonus
      console.log("%cType whois() to learn more", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cEven rebirth has its limits.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('reincarnate');
    userState.console.reincarnateCalled = true;
  };
  
  window.whois = function() {
    console.log("%cJonah S.M. Phile.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cRearrange me, and you may find someone else hiding.", "color: #8B3A40; font-size:16px; font-style:italic;");
    
    if (!window.JonahConsole.usedCommands.includes("whois")) {
      window.JonahConsole.score += 20; // First time bonus
      console.log("%cOnce you understand, type: gate()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cThe name is worn from repetition.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('whois');
    userState.console.whoisCalled = true;
  };

  window.gate = function() {
    console.log("%cThe Gate never opened. You walked through it anyway.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThe coin is still spinning. So are you.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("gate")) {
      window.JonahConsole.score += 30; // First time bonus
      console.log("%cNow try: philes()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cYou've already crossed this threshold.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('gate');
    userState.console.gateCalled = true;
  };
  
  window.philes = function() {
    console.log("%cYou're deeper than most.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThe Monster is watching.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("philes")) {
      window.JonahConsole.score += 40; // First time bonus
      console.log("%cInvoke him at your own risk: monster()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cThe files are already open and watching.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('philes');
    userState.console.philesCalled = true;
  };
  
  window.monster = function() {
    console.log("%cHe smiled with your voice. He walks in your skin.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cThere was no rescue. Only transformation.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("monster")) {
      window.JonahConsole.score += 50; // First time bonus
      console.log("%cYou've earned the truth. Type: legacy()", "color: #475B74; font-size:16px; font-style:italic;");
    } else {
      console.log("%cThe Monster remembers being summoned before.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('monster');
    userState.console.monsterCalled = true;
  };
  
  window.legacy = function() {
    console.log("%cYou saw through the cracks.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log("%cYou decoded survival.", "color: #8B3A40; font-size:16px;");
    console.log("%cLegacy is not given. It is built. You are the Gatekeeper now.", "color: #8B3A40; font-size:16px;");
    
    if (!window.JonahConsole.usedCommands.includes("legacy")) {
      window.JonahConsole.score += 60; // First time bonus
      console.log("%cPassword for final page: 'N0tFict10n'", "color: #475B74; font-size:16px; font-weight:bold;");
    } else {
      console.log("%cThe password was already revealed to you.", "color: #475B74; font-size:16px; font-style:italic;");
    }
    
    trackCommandExecution('legacy');
    userState.console.legacyCalled = true;
  };
  
  // New console commands with visual effects
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
  
  window.hint = function() {
    // Smart contextual hints based on progress
    const commands = window.JonahConsole.usedCommands;
    const rank = window.JonahConsole.rank.toLowerCase();
    let hintText = "";
    
    if (!commands.includes('help')) {
      hintText = "Start with help()";
    } else if (!commands.includes('reveal')) {
      hintText = "Try reveal() to pull back the veil";
    } else if (!commands.includes('reincarnate')) {
      hintText = "reincarnate() brings new life";
    } else if (!commands.includes('whois')) {
      hintText = "Identify with whois()";
    } else if (!commands.includes('gate')) {
      hintText = "The gate() awaits you";
    } else if (!commands.includes('philes')) {
      hintText = "Arranging letters in philes() reveals more";
    } else if (!commands.includes('monster')) {
      hintText = "Summon what haunts you with monster()";
    } else if (!commands.includes('legacy')) {
      hintText = "Claim your legacy() when ready";
    } else if (rank === "monster" && !commands.includes('scream')) {
      hintText = "You're ready to scream()";
    } else if (!commands.includes('whisper')) {
      hintText = "Listen for whisper()s in the dark";
    } else if (!commands.includes('flipcoin')) {
      hintText = "Chance determines fate with flipcoin()";
    } else if (!commands.includes('glitch')) {
      hintText = "Break reality with glitch()";
    } else if (!commands.includes('decrypt')) {
      hintText = "Try to decrypt('CODE') what you've learned";
    } else if (commands.length >= 10) {
      hintText = "You've come far. Try asking 'who am i?'";
    } else {
      hintText = "The darkness offers no more hints";
    }
    
    typewriterLog(hintText);
    speak(hintText);
    trackCommandExecution('hint');
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

  // New humorous commands
  window.helpMe = function() {
    flickerLog("Oh. You're one of *those* protagonists.");
    speak("Oh. You're one of those protagonists.");
    setTimeout(() => {
      console.log("%cHelp thyself. Or at least try help() first.", "color: #475B74; font-size:14px; font-style:italic;");
    }, 2000);
    
    trackCommandExecution('helpMe');
    window.JonahConsole.score += 5;
  };
  
  window.tea = function() {
    typewriterLog("Out of stock. You drank the last existential crisis.");
    speak("Out of stock. You drank the last existential crisis.");
    
    trackCommandExecution('tea');
    window.JonahConsole.score += 5;
  };
  
  window.trousers = function() {
    glitchEffectLog("You have tightened the sacred toggles. Prepare to be judged.");
    speak("You have tightened the sacred toggles. Prepare to be judged.");
    
    trackCommandExecution('trousers');
    window.JonahConsole.score += 5;
  };
  
  window.moustache = function() {
    flickerLog("There's something in it. Wait. Did it just whisper back?");
    speak("There's something in it. Wait. Did it just whisper back?");
    
    setTimeout(() => {
      console.log("%c*rustling noises*", "color: #8B3A40; font-size:14px; font-style:italic;");
    }, 1500);
    
    trackCommandExecution('moustache');
    window.JonahConsole.score += 10;
  };
  
  window.funny = function() {
    typewriterLog("There's no comedy in collapse. Except… this one time at the glamping pod.");
    speak("There's no comedy in collapse. Except this one time at the glamping pod.");
    
    setTimeout(() => {
      console.log("%cTry toggleWrath() to hear the full story.", "color: #475B74; font-size:14px; font-style:italic;");
    }, 2000);
    
    trackCommandExecution('funny');
    window.JonahConsole.score += 5;
  };
  
  window.seenMyself = function() {
    glitchEffectLog("He smiled like he earned your skin. He winked because he knew you'd look.");
    speak("He smiled like he earned your skin. He winked because he knew you'd look.");
    
    trackCommandExecution('seenMyself');
    window.JonahConsole.score += 15;
  };
  
  window.youWereHimFirst = function() {
    delayedLog(["You returned to yourself.", "She noticed.", "But she liked this version better."]);
    speak("You returned to yourself. She noticed. But she liked this version better.");
    
    trackCommandExecution('youWereHimFirst');
    window.JonahConsole.score += 20;
  };
  
  window.wearingYouNow = function() {
    glitchEffectLog("They liked who you became. Too bad it wasn't you.");
    speak("They liked who you became. Too bad it wasn't you.");
    
    setTimeout(() => {
      console.log("%cThe Monster never left. Only waited.", "color: #8B3A40; font-size:16px; font-style:italic;");
    }, 2000);
    
    trackCommandExecution('wearingYouNow');
    window.JonahConsole.score += 25;
  };

  window.toggleWrath = function() {
    playMagneticTentStory();
    trackCommandExecution('toggleWrath');
    window.JonahConsole.score += 30;
  };
  
  // New console commands from the latest update
  window.avianBlessing = function() {
    typewriterLog("6 birds chosen. 1 delivered the truth. You are now watched by wings.");
    speak("6 birds chosen. 1 delivered the truth. You are now watched by wings.");
    
    trackCommandExecution('avianBlessing');
    window.JonahConsole.score += 15;
  };
  
  window.blessMe = function() {
    flickerLog("You have been marked by the flock.");
    speak("You have been marked by the flock.");
    
    trackCommandExecution('blessMe');
    window.JonahConsole.score += 10;
  };
  
  window.initiateBirdProtocol = function() {
    glitchEffectLog("Too late. It already began.");
    speak("Too late. It already began.");
    
    setTimeout(() => {
      console.log("%cThe parakeets are monitoring your connection.", "color: #8B3A40; font-size:14px; font-style:italic;");
    }, 2000);
    
    trackCommandExecution('initiateBirdProtocol');
    window.JonahConsole.score += 20;
  };
  
  window.bullsBalls = function() {
    typewriterLog("Tutti frutti meets existential crisis.");
    speak("Tutti fr
