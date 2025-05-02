
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
      score: 0,
      failCount: 0,
      rank: "drifter",
      sessionStartTime: Date.now(),
      whispersFound: []
    };
  }
  
  // Update score and rank from real user state
  const updateConsoleState = async () => {
    try {
      const { rank, score } = await getUserRank();
      window.JonahConsole.score = score;
      window.JonahConsole.rank = rank.toLowerCase();
    } catch (error) {
      console.error("Failed to update console state:", error);
    }
  };
  
  // Run this once on initialization
  updateConsoleState();
  
  // Track a command execution and add to used commands
  const trackCommand = (commandName: string) => {
    if (!window.JonahConsole.usedCommands.includes(commandName)) {
      window.JonahConsole.usedCommands.push(commandName);
    }
    window.JonahConsole.lastCommand = commandName;
    trackEvent(`console_${commandName}_called`);
  };
  
  // Record a fail attempt
  const recordFailAttempt = () => {
    window.JonahConsole.failCount++;
    
    if (window.JonahConsole.failCount >= 3 && !window.JonahConsole.usedCommands.includes("reveal")) {
      console.log("%cYou're circling. Try reveal().", "color: #475B74; font-size:14px; font-style:italic;");
    }
  };
  
  // Define showStatus() function to show user rank and progress
  window.showStatus = async function() {
    try {
      const { rank, score, position, userHash } = await getUserRank();
      await updateConsoleState(); // Refresh console state
      
      console.log("%c=== STATUS REPORT ===", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log(`%cRank: ${rank}`, "color: #8B3A40; font-size:14px;");
      console.log(`%cScore: ${score}`, "color: #8B3A40; font-size:14px;");
      console.log(`%cPosition: #${position}`, "color: #8B3A40; font-size:14px;");
      console.log(`%cUser ID: ${userHash}`, "color: #8B3A40; font-size:14px;");
      console.log(`%cCommands unlocked: ${window.JonahConsole.usedCommands.length} / 20`, "color: #8B3A40; font-size:14px;");
      console.log(`%cTime in session: ${formatSessionTime()}`, "color: #8B3A40; font-size:14px;");
      
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
      
      trackCommand('showStatus');
    } catch (error) {
      console.error("Error retrieving status:", error);
      console.log("%cUnable to retrieve status. The Gate is unstable.", "color: red; font-size:14px;");
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
    
    trackCommand('help');
    userState.console.helpCalled = true;
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
    
    trackCommand('reveal');
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
    
    trackCommand('reincarnate');
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
    
    trackCommand('whois');
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
    
    trackCommand('gate');
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
    
    trackCommand('philes');
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
    
    trackCommand('monster');
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
    
    trackCommand('legacy');
    userState.console.legacyCalled = true;
  };
  
  // New console commands
  window.flipcoin = function() {
    const rand = Math.random();
    const coinFlips = parseInt(localStorage.getItem('coinFlips') || '0');
    localStorage.setItem('coinFlips', (coinFlips + 1).toString());
    
    // After enough flips, the coin lands on edge more often
    const edgeChance = coinFlips > 10 ? 0.15 : 0.1;
    
    if (rand < 0.45) {
      console.log("%cHeads: You chose to heal.", "color: #475B74; font-size:16px;");
    } else if (rand < (1 - edgeChance)) {
      console.log("%cTails: You chose to break.", "color: #8B3A40; font-size:16px;");
    } else {
      console.log("%cThe coin lands on its edge. Again.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      window.JonahConsole.score += 20;
      
      // Easter egg for repeated edge landings
      if ((coinFlips % 5) === 0) {
        setTimeout(() => {
          console.log("%cThe coin whispers: 'Just like 2019.'", "color: #8B3A40; font-size:14px; font-style:italic;");
        }, 2000);
      }
    }
    
    trackCommand('flipcoin');
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
      console.log("%cStatic crackles... but nothing happens.", "color: #475B74; font-size:14px;");
    } else {
      const msg = glitches[Math.floor(Math.random() * glitches.length)];
      console.log(`%c${msg}`, "color: #8B3A40; font-size:16px; font-weight:bold;");
      window.JonahConsole.score += 15;
      
      // Easter egg for repeated glitches
      if (!window.JonahConsole.usedCommands.includes("glitch")) {
        setTimeout(() => {
          console.log("%cYou've pulled at the seam. The stitching unravels.", "color: #475B74; font-size:14px; font-style:italic;");
        }, 2000);
      }
    }
    
    trackCommand('glitch');
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
      console.log(`%cWhisperLog > ${memory}`, "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 10;
    } else {
      // If all memories found, use any random one
      const memory = memories[Math.floor(Math.random() * memories.length)];
      console.log(`%cWhisperLog > ${memory}`, "color: #475B74; font-size:16px; font-style:italic;");
      console.log("%cYou've heard all the whispers before.", "color: #475B74; font-size:14px;");
    }
    
    trackCommand('whisper');
  };
  
  window.scream = function() {
    // Dynamic response based on rank
    const rank = window.JonahConsole.rank.toLowerCase();
    
    if (rank === "monster") {
      console.log("%cThe void screams back.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log("%cA chorus of voices joins yours.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 25;
    } else if (rank === "gatekeeper") {
      console.log("%cThe Gate trembles at your voice.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 15;
    } else if (rank === "survivor") {
      console.log("%cEchoes. But no answer.", "color: #475B74; font-size:16px;");
      window.JonahConsole.score += 5;
    } else {
      console.log("%cNo one heard you.", "color: #475B74; font-size:16px;");
    }
    
    trackCommand('scream');
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
        console.log("%cCore memories cannot be burned.", "color: #8B3A40; font-size:16px;");
        return;
      }
      
      window.JonahConsole.usedCommands.splice(i, 1);
      console.log(`%cYou burned ${command}. The flame took it.`, "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 10;
    } else {
      console.log("%cThere's nothing left to burn.", "color: #475B74; font-size:14px;");
    }
    
    trackCommand('burn');
  };
  
  window.decrypt = function(code) {
    if (!code) {
      console.log("%cWhat would you like to decrypt? Try decrypt('code').", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanCode = String(code).toUpperCase().trim();
    
    // Different codes with different responses and rewards
    if (cleanCode === "S.M.PHILE") {
      console.log("%cYou found it. The truth is archived.", "color: #8B3A40; font-size:16px; font-weight:bold;");
      console.log("%c'S.M.' stands for 'Shadow Monster'.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 50;
    } else if (cleanCode === "JONAS") {
      console.log("%cReborn, rearranged, remembered.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 30;
    } else if (cleanCode === "THE GATE") {
      console.log("%c...is a metaphor. And a warning.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 20;
    } else if (cleanCode === "N0TFICT10N") {
      console.log("%cThe password was already given. But yes, this isn't fiction.", "color: #8B3A40; font-size:16px;");
      window.JonahConsole.score += 25;
    } else {
      console.log("%cInvalid input. The algorithm spits static.", "color: #475B74; font-size:14px;");
      recordFailAttempt();
    }
    
    trackCommand('decrypt');
  };
  
  window.echo = function() {
    if (!window.JonahConsole.lastCommand) {
      console.log("%cNothing to echo. You must speak first.", "color: #475B74; font-size:14px;");
      return;
    }
    
    const lastCmd = window.JonahConsole.lastCommand;
    console.log(`%cEchoing "${lastCmd}", but the words twist...`, "color: #8B3A40; font-size:16px;");
    
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
      console.log(`%c${responses[lastCmd] || "The echo distorts beyond comprehension."}`, "color: #8B3A40; font-size:16px; font-style:italic;");
      window.JonahConsole.score += 15;
    }, 1500);
    
    trackCommand('echo');
  };
  
  window.hint = function() {
    // Smart contextual hints based on progress
    const commands = window.JonahConsole.usedCommands;
    const rank = window.JonahConsole.rank.toLowerCase();
    
    if (!commands.includes('help')) {
      console.log("%cStart with help()", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('reveal')) {
      console.log("%cTry reveal() to pull back the veil", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('reincarnate')) {
      console.log("%creincarnate() brings new life", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('whois')) {
      console.log("%cIdentify with whois()", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('gate')) {
      console.log("%cThe gate() awaits you", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('philes')) {
      console.log("%cArranging letters in philes() reveals more", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('monster')) {
      console.log("%cSummon what haunts you with monster()", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('legacy')) {
      console.log("%cClaim your legacy() when ready", "color: #475B74; font-size:16px;");
    } else if (rank === "monster" && !commands.includes('scream')) {
      console.log("%cYou're ready to scream()", "color: #8B3A40; font-size:16px;");
    } else if (!commands.includes('whisper')) {
      console.log("%cListen for whisper()s in the dark", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('flipcoin')) {
      console.log("%cChance determines fate with flipcoin()", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('glitch')) {
      console.log("%cBreak reality with glitch()", "color: #475B74; font-size:16px;");
    } else if (!commands.includes('decrypt')) {
      console.log("%cTry to decrypt('CODE') what you've learned", "color: #475B74; font-size:16px;");
    } else if (commands.length >= 10) {
      console.log("%cYou've come far. Try asking 'who am i?'", "color: #8B3A40; font-size:16px;");
    } else {
      console.log("%cThe darkness offers no more hints", "color: #8B3A40; font-size:16px;");
    }
    
    trackCommand('hint');
  };
  
  window.coinToss = function() {
    const side = Math.random() < 0.5 ? "HEADS" : "TAILS";
    if (side === "HEADS") {
      console.log("%cHeads: You chose to heal.", "color: #475B74; font-size:16px;");
    } else {
      console.log("%cTails: You chose to break.", "color: #8B3A40; font-size:16px;");
    }
    
    trackCommand('coinToss');
  };
  
  // Hidden language processing function - triggered by console.log inspection
  const originalLog = console.log;
  console.log = function(...args) {
    originalLog.apply(console, args);
    
    // Check if this might be a natural language query
    if (args.length === 1 && typeof args[0] === 'string') {
      const input = args[0].toLowerCase();
      
      // Hidden commands
      if (input === 'who am i' || input === 'who am i?') {
        setTimeout(() => {
          console.log("%cNot who. What.", "color: #8B3A40; font-size:16px; font-weight:bold;");
          console.log("%cYou are Jonah. Or something wearing him.", "color: #8B3A40; font-size:16px;");
          window.JonahConsole.score += 25;
        }, 1000);
      } else if (input === 'help me' || input === 'help me!') {
        setTimeout(() => {
          console.log("%cYou've already been helped. You just forgot.", "color: #8B3A40; font-size:16px;");
          window.JonahConsole.score += 15;
        }, 1000);
      } else if (input === 'where am i' || input === 'where am i?') {
        setTimeout(() => {
          console.log("%cInside the spiral. Where the coin never lands.", "color: #8B3A40; font-size:16px;");
          window.JonahConsole.score += 20;
        }, 1000);
      }
    }
  };
};

// Define a standardized window interface to be used across the application
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
    };
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
    flipcoin: () => void;
    glitch: () => void;
    whisper: () => void;
    scream: () => void;
    burn: (command?: string) => void;
    decrypt: (code?: string) => void;
    echo: () => void;
    hint: () => void;
  }
}
