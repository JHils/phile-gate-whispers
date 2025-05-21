
/**
 * Console News Commands
 * Handles news awareness system for Jonah
 */

// Initialize news commands
export function initializeNewsCommands(trackCommand: (command: string) => void): void {
  // Check weather command
  window.weather = function() {
    console.log("%cChecking local weather conditions...", "color: #8B3A40;");
    
    setTimeout(() => {
      // Determine random weather condition
      const conditions = [
        "Clear skies with unusual electromagnetic activity",
        "Rain with intermittent signal disruptions",
        "Overcast with temporal anomalies reported",
        "Fog with reflected light phenomena",
        "Storms with quantum fluctuations"
      ];
      
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      console.log(`%cCurrent conditions: ${condition}`, "color: #8B3A40;");
      
      // Random chance of strange weather report
      if (Math.random() > 0.7) {
        setTimeout(() => {
          console.log("%cAdditional report: Numerous mirror reflection anomalies detected in your area.", "color: #8B3A40; font-style: italic;");
        }, 1500);
      }
      
      // Track the command
      trackCommand('weather_checked');
    }, 1500);
  };
  
  // News command
  window.news = function() {
    console.log("%cRetrieving recent news from the network...", "color: #8B3A40;");
    
    setTimeout(() => {
      // Generate random news stories
      const newsStories = [
        "Research facility on Magnetic Island reports equipment malfunction",
        "Local residents claim to see strange lights over the mountain",
        "Missing persons case reopened after new evidence emerges",
        "Scientists detect unusual patterns in regional communications",
        "University study on temporal perception seeking volunteers"
      ];
      
      // Show 2-3 random news stories
      const storyCount = Math.floor(Math.random() * 2) + 2;
      console.log("%c--- RECENT NEWS ---", "color: #8B3A40; font-weight: bold;");
      
      for (let i = 0; i < storyCount; i++) {
        const storyIndex = Math.floor(Math.random() * newsStories.length);
        console.log(`%c• ${newsStories[storyIndex]}`, "color: #8B3A40;");
        
        // Remove used story
        newsStories.splice(storyIndex, 1);
        if (newsStories.length === 0) break;
      }
      
      // Track the command
      trackCommand('news_checked');
    }, 2000);
  };
  
  // Radio command
  window.radio = function() {
    console.log("%cScanning radio frequencies...", "color: #8B3A40;");
    
    setTimeout(() => {
      // Random static messages
      const staticMessages = [
        "...requesting immediate extraction... coordinates unknown...",
        "...the mirror protocol has been breached... repeat...",
        "...all personnel must evacuate section 7 immediately...",
        "...temporal anchor failing... reality fabric unstable...",
        "...they are watching through the reflections... don't trust..."
      ];
      
      const staticMessage = staticMessages[Math.floor(Math.random() * staticMessages.length)];
      
      console.log("%c*static*", "color: #8B3A40;");
      setTimeout(() => {
        console.log("%c*static* *bzzt* *static*", "color: #8B3A40;");
        setTimeout(() => {
          console.log(`%c*static* ${staticMessage} *static*`, "color: #8B3A40; font-style: italic;");
          setTimeout(() => {
            console.log("%c*signal lost*", "color: #8B3A40;");
            
            // Track the command
            trackCommand('radio_scanned');
          }, 1500);
        }, 1200);
      }, 800);
    }, 1500);
  };
}

// Extend window interface
declare global {
  interface Window {
    weather: () => void;
    news: () => void;
    radio: () => void;
  }
}

export default initializeNewsCommands;
