
import { 
  typewriterLog, 
  flickerLog, 
  glitchEffectLog, 
  speak, 
  delayedLog, 
  playMagneticTentStory 
} from "./consoleEffects";

// Import centralized types
import './types/globalConsoleTypes';

type TrackCommandFunction = (commandName: string) => void;

// Initialize humor-related commands
export const initializeHumorCommands = (
  trackCommandExecution: TrackCommandFunction
) => {
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
};

export {};
