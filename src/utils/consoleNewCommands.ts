
import { 
  typewriterLog, 
  flickerLog, 
  glitchEffectLog, 
  speak 
} from "./consoleEffects";

// Import centralized types
import './types/globalConsoleTypes';

// Import from new refactored location
import { trackCommand } from './consoleTracking/commandTracking';

type TrackCommandFunction = (commandName: string) => void;

// Initialize new commands (recently added)
export const initializeNewCommands = (
  trackCommandExecution: TrackCommandFunction
) => {
  // Bird-related commands
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
  
  // Fleet-related command
  window.fleetSeenYou = function() {
    typewriterLog("Incoming transmission… Photo received. You are not alone on this beach.");
    speak("Incoming transmission. Photo received. You are not alone on this beach.");
    
    trackCommandExecution('fleetSeenYou');
    window.JonahConsole.score += 15;
    
    setTimeout(() => {
      console.log("%cCoordinates logged. The Fleet will make contact.", "color: #8B3A40; font-size:14px; font-style:italic;");
    }, 3000);
  };
  
  // Don't redefine mirrorCheck as it's already defined elsewhere
  window.messageYourself = function() {
    flickerLog("Reply: We've been waiting.");
    speak("Reply: We've been waiting.");
    
    trackCommandExecution('messageYourself');
    window.JonahConsole.score += 15;
  };
  
  // Food and treat commands
  window.bullsBalls = function() {
    typewriterLog("Tutti frutti meets existential crisis.");
    speak("Tutti frutti meets existential crisis.");
    
    trackCommandExecution('bullsBalls');
    window.JonahConsole.score += 5;
  };
  
  // Australian Easter eggs
  window.gav007 = function() {
    typewriterLog("License plate logged. Surveillance active. Smile for the ute.");
    speak("License plate logged. Surveillance active. Smile for the ute.");
    
    trackCommandExecution('gav007');
    window.JonahConsole.score += 10;
  };
  
  window.louisBarton = function() {
    flickerLog("Louis Batton equipped. Bushes cleared. Ego stabilised.");
    speak("Louis Batton equipped. Bushes cleared. Ego stabilised.");
    
    trackCommandExecution('louisBarton');
    window.JonahConsole.score += 10;
  };
  
  window.bridgeWhisperer = function() {
    glitchEffectLog("Impact registered. 'Yeah that works.' Direction confirmed. Existence continues.");
    speak("Impact registered. 'Yeah that works.' Direction confirmed. Existence continues.");
    
    trackCommandExecution('bridgeWhisperer');
    window.JonahConsole.score += 15;
  };
};

export {};
