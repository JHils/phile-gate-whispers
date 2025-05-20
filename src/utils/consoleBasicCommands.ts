
import { UserState } from "@/hooks/useTrackingSystem";
import { typewriterLog, speak, displayRandomJoke } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

// Initialize basic console commands
export const initializeBasicCommands = (
  trackCommandExecution: TrackCommandFunction,
  userState: UserState
) => {
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
};
