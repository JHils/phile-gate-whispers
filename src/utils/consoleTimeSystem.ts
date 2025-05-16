
import { glitchEffectLog, typewriterLog, speak } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

export const initializeTimeSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Time-based command that only works during certain hours
  window.timeCheck = function() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Special time checks
    const isMidnight = (hour === 0 && minute < 15);
    const isEarlyMorning = (hour >= 3 && hour < 5);
    const isSpecificTime = (hour === 3 && minute === 36);
    const isSixEleven = (hour === 6 && minute === 11) || (hour === 18 && minute === 11);
    
    console.log(`%cCurrent time: ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`, "color: #475B74; font-size:14px;");
    
    // Different responses based on time
    if (isSpecificTime) {
      glitchEffectLog("3:36 AM. The Gateway Hour is active.");
      speak("The Gateway Hour is active");
      
      setTimeout(() => {
        console.log("%cCertain pages will reveal their true nature now.", "color: #8B3A40; font-size:14px; font-weight:bold;");
        
        // Award significant points for checking at exactly the right time
        window.JonahConsole.score += 50;
      }, 2000);
    } else if (isSixEleven) {
      glitchEffectLog("Six Eleven. The prophecy time is now.");
      speak("Six Eleven. The prophecy time is now");
      
      setTimeout(() => {
        console.log("%cThe Gateway shifts. New paths emerge.", "color: #8B3A40; font-size:14px;");
        
        // Award points for checking at 6:11
        window.JonahConsole.score += 40;
      }, 2000);
    } else if (isMidnight) {
      typewriterLog("Midnight. The Gate records reset.");
      speak("Midnight. The Gate records reset");
      
      // Award points for checking at midnight
      window.JonahConsole.score += 30;
    } else if (isEarlyMorning) {
      typewriterLog("The small hours. When the Monster is most active.");
      speak("The small hours. When the Monster is most active");
      
      // Award points for checking during early morning
      window.JonahConsole.score += 20;
    } else {
      typewriterLog("Standard temporal conditions. Nothing unusual detected.");
      speak("Standard temporal conditions");
      
      // Hint at special times
      setTimeout(() => {
        console.log("%cCertain hours hold special significance: 12:00 AM, 3:36 AM, 6:11 AM/PM", "color: #475B74; font-size:14px; font-style:italic;");
      }, 2000);
    }
    
    trackCommandExecution('timeCheck');
  };

  // Check if content should be time-sensitive
  window.isSpecialTimeWindow = function() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Define special time windows
    const specialTimes = [
      { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 15 } }, // Midnight (12:00 AM - 12:15 AM)
      { start: { hour: 3, minute: 30 }, end: { hour: 3, minute: 45 } }, // Gateway Hour (3:30 AM - 3:45 AM)
      { start: { hour: 6, minute: 5 }, end: { hour: 6, minute: 15 } },  // Morning Six Eleven (6:05 AM - 6:15 AM)
      { start: { hour: 18, minute: 5 }, end: { hour: 18, minute: 15 } } // Evening Six Eleven (6:05 PM - 6:15 PM)
    ];
    
    // Check if current time is within any special window
    return specialTimes.some(timeWindow => {
      const startMinutes = timeWindow.start.hour * 60 + timeWindow.start.minute;
      const endMinutes = timeWindow.end.hour * 60 + timeWindow.end.minute;
      const currentMinutes = hour * 60 + minute;
      
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    });
  };
};
