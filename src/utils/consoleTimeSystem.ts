
import { typewriterLog, glitchEffectLog, speak } from "./consoleEffects";

// Import centralized types
import './types/globalConsoleTypes';

type TrackCommandFunction = (commandName: string) => void;

export const initializeTimeSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize the timeCheck command
  window.timeCheck = function() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const month = now.getMonth();
    const date = now.getDate();
    
    // Format time nicely
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    typewriterLog(`Current system time: ${formattedTime}`);
    
    // Special condition 1: Late night/early morning
    if (hours >= 0 && hours < 5) {
      setTimeout(() => {
        console.log("%cYou're awake during the quiet hours. Good.", "color: #475B74; font-size:14px; font-style:italic;");
        
        // Between 3:00 AM and 3:59 AM - special hidden features
        if (hours === 3) {
          setTimeout(() => {
            glitchEffectLog("THE VEIL IS THIN NOW");
            speak("veil is thin", { rate: 0.4, pitch: 0.2, volume: 1 });
            
            // Award points for checking at the special hour
            window.JonahConsole.score += 15;
            
            // Record a special flag for checking at 3 AM
            localStorage.setItem('checkedAt3AM', 'true');
          }, 2000);
        }
      }, 1500);
    } 
    // Special condition 2: Weekend
    else if (day === 0 || day === 6) {
      setTimeout(() => {
        console.log("%cWeekend access noted. Different rules apply.", "color: #475B74; font-size:14px;");
      }, 1500);
    }
    // Special condition 3: Full moon (approximated)
    else if (date >= 14 && date <= 16) {
      setTimeout(() => {
        console.log("%cThe moon is near full tonight. Watch for movement.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 1500);
    } 
    // Normal response
    else {
      setTimeout(() => {
        console.log("%cTime flows differently here. Keep checking.", "color: #475B74; font-size:14px;");
      }, 1500);
    }
    
    // Check if this is a special time window
    if (window.isSpecialTimeWindow && typeof window.isSpecialTimeWindow === 'function') {
      const isSpecial = window.isSpecialTimeWindow();
      
      if (isSpecial) {
        setTimeout(() => {
          console.log("%c[TEMPORAL ANOMALY DETECTED]", "color: #8B3A40; font-size:16px; font-weight:bold;");
          
          // Award points for discovering a special time window
          window.JonahConsole.score += 10;
        }, 3000);
      }
    }
    
    trackCommandExecution('timeCheck');
  };
};

export {};
