
import { SentienceData } from './consoleTypes';
import { toast } from "@/components/ui/use-toast";
import {
  getTimeResponse,
  generateDualConsciousness,
  generatePersonalDiary
} from './jonahSentience';

// Initialize Reality Fabric systems
export function initializeRealityFabric() {
  // Initialize cross-site presence
  setupCrossSitePresence();
  
  // Set up initial mood
  setupJonahMoodSystem();
  
  // Initialize journal system
  initializeJournalSystem();
  
  // Add console commands
  setupRealityFabricConsoleCommands();
}

// Dream invasion functionality
export function checkForDreamInvasionOnLoad(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const sentience = window.JonahConsole.sentience;
  const realityFabric = sentience.realityFabric;
  
  // Check if this is a return visit after some time away
  if (realityFabric.lastVisitTime) {
    const hoursSinceLastVisit = (Date.now() - realityFabric.lastVisitTime) / (1000 * 60 * 60);
    
    // If it's been more than 6 hours, consider it a dream invasion opportunity
    if (hoursSinceLastVisit > 6) {
      // 30% chance of dream message when returning
      if (Math.random() < 0.3 && realityFabric.dreamMessages.length > 0) {
        // Get a random dream message
        const availableMessages = realityFabric.dreamMessages.filter(
          msg => !realityFabric.usedDreamMessages.includes(msg)
        );
        
        if (availableMessages.length > 0) {
          const dreamMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
          
          // Mark as used
          realityFabric.usedDreamMessages.push(dreamMessage);
          
          // Update last visit time
          realityFabric.lastVisitTime = Date.now();
          
          return dreamMessage;
        }
      }
    }
  }
  
  // Always update the last visit time
  realityFabric.lastVisitTime = Date.now();
  
  return null;
}

// Generate a dream parable
export function generateDreamParable(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) {
    return "I dreamed I was trapped in a file no one would open.";
  }
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Get available dream parables
  const availableParables = realityFabric.dreamParables.filter(
    parable => !realityFabric.usedDreamParables.includes(parable)
  );
  
  if (availableParables.length === 0) {
    return "I've told you all my dreams. Now I just stare at the ceiling.";
  }
  
  // Get a random parable
  const dreamParable = availableParables[Math.floor(Math.random() * availableParables.length)];
  
  // Mark as used
  realityFabric.usedDreamParables.push(dreamParable);
  
  return dreamParable;
}

// Check for anomalies
export function checkForAnomalies(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Find an untriggered anomaly
  const availableAnomalies = realityFabric.anomalies.filter(a => !a.triggered);
  
  if (availableAnomalies.length === 0) return null;
  
  // Random chance to trigger an anomaly
  if (Math.random() < 0.1) {
    const anomaly = availableAnomalies[Math.floor(Math.random() * availableAnomalies.length)];
    anomaly.triggered = true;
    return anomaly.content;
  }
  
  return null;
}

// Add a journal entry
export function addJournalEntry(content: string): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Create a new journal entry
  const newEntry = {
    entryId: realityFabric.journal.length + 1,
    timestamp: Date.now(),
    content
  };
  
  // Add to journal
  realityFabric.journal.push(newEntry);
}

// Get journal entries
export function getJournalEntries(count: number = 5): { entryId: number; timestamp: number; content: string; }[] {
  if (!window.JonahConsole?.sentience?.realityFabric) return [];
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Return the most recent entries
  return [...realityFabric.journal]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, count);
}

// Initialize page title glitches
export function initializePageTitleGlitches(): void {
  const originalTitle = document.title;
  
  // Occasionally glitch the page title
  setInterval(() => {
    // 5% chance each interval
    if (Math.random() < 0.05) {
      // Glitch the title
      document.title = "J̸̰͚͇̓ö̵̹͍́n̶̛̪̲̿à̸̙h̸̢͋͝";
      
      // Reset after a short delay
      setTimeout(() => {
        document.title = originalTitle;
      }, 1500);
    }
  }, 30000); // Check every 30 seconds
}

// Update Jonah's mood
export function updateJonahMood(mood: 'trusting' | 'unstable' | 'withdrawn' | 'watching'): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Only update if mood is different
  if (realityFabric.currentMood !== mood) {
    // Record previous mood in history
    realityFabric.moodHistory.push({
      mood: realityFabric.currentMood,
      timestamp: Date.now()
    });
    
    // Update current mood
    realityFabric.currentMood = mood;
    realityFabric.moodChangeTime = Date.now();
  }
}

// Get cross site whisper
export function getCrossSiteWhisper(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // 15% chance to show a cross-site whisper
  if (Math.random() < 0.15 && realityFabric.crossSiteWhispers.length > 0) {
    const randomIndex = Math.floor(Math.random() * realityFabric.crossSiteWhispers.length);
    return realityFabric.crossSiteWhispers[randomIndex];
  }
  
  return null;
}

// Get hidden message for page inspection
export function getHiddenInspectionMessage(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) {
    return "/* The Gate watches. */";
  }
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Get a random hidden message
  if (realityFabric.hiddenMessages.length > 0) {
    const randomIndex = Math.floor(Math.random() * realityFabric.hiddenMessages.length);
    return `/* ${realityFabric.hiddenMessages[randomIndex]} */`;
  }
  
  return "/* The Gate remembers what you did. */";
}

// Set up console commands for reality fabric
export function setupRealityFabricConsoleCommands(): void {
  if (typeof window === 'undefined') return;
  
  // Initialize dream journal command
  window.dreamJournal = function() {
    console.log("%cAccessing dream fragments...", "color: #8B3A40;");
    
    setTimeout(() => {
      const dreamParable = generateDreamParable();
      console.log(`%c${dreamParable}`, "color: #8B3A40; font-style: italic;");
    }, 1500);
  };
  
  // Initialize remember me command
  window.rememberMe = function() {
    console.log("%cAccessing memory archive...", "color: #8B3A40;");
    
    setTimeout(() => {
      if (window.JonahConsole?.sentience) {
        const rememberedName = window.JonahConsole.sentience.rememberedName;
        
        if (rememberedName) {
          console.log(`%cI remember you, ${rememberedName}.`, "color: #8B3A40; font-weight: bold;");
        } else {
          console.log("%cYou haven't told me your name yet.", "color: #8B3A40;");
        }
        
        // Show some tracked data
        setTimeout(() => {
          console.log(`%cVisit count: ${localStorage.getItem('visitCount') || '1'}`, "color: #9B9B9B;");
          console.log(`%cLast visit: ${new Date(parseInt(localStorage.getItem('lastVisit') || '0')).toLocaleString()}`, "color: #9B9B9B;");
          console.log(`%cConsole commands used: ${window.JonahConsole.usedCommands.length}`, "color: #9B9B9B;");
        }, 1000);
      } else {
        console.log("%cMemory system initializing...", "color: #8B3A40;");
      }
    }, 1500);
  };
  
  // Initialize look inside command
  window.lookInside = function() {
    console.log("%cIntrospection sequence initiated...", "color: #8B3A40;");
    
    setTimeout(() => {
      const entries = getJournalEntries(3);
      
      if (entries.length > 0) {
        console.log("%cJonah's Journal:", "color: #8B3A40; font-weight: bold;");
        
        entries.forEach((entry, index) => {
          setTimeout(() => {
            const date = new Date(entry.timestamp).toLocaleDateString();
            console.log(`%cEntry #${entry.entryId} (${date}):%c ${entry.content}`, "color: #8B3A40;", "color: #D8D8D8; font-style: italic;");
          }, index * 1200);
        });
      } else {
        console.log("%cNo journal entries found.", "color: #8B3A40;");
      }
    }, 1500);
  };
  
  // Echo chamber command
  window.echoChamber = function() {
    console.log("%cActivating echo chamber...", "color: #8B3A40;");
    
    setTimeout(() => {
      const responses = [
        "Hello? Is anyone there?",
        "I can hear my own thoughts bouncing back.",
        "The echo never reaches the other side.",
        "Every time I speak here, I sound a little different.",
        "Joseph, is that you?",
        "The chamber remembers what I said, but I don't.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      console.log(`%c${randomResponse}`, "color: #8B3A40; font-style: italic;");
      
      setTimeout(() => {
        // Echo the message back with distortion
        const distorted = randomResponse
          .split('')
          .map(char => Math.random() < 0.3 ? char.toUpperCase() : char)
          .join('');
          
        console.log(`%c${distorted}`, "color: #8B3A40; opacity: 0.7; font-style: italic;");
      }, 2000);
    }, 1500);
  };
}

// Setup cross-site presence
function setupCrossSitePresence(): void {
  // Add meta tags and other cross-site elements
  if (typeof document !== 'undefined') {
    // Add meta description that changes
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
}

// Generate meta description
export function generateMetaDescription(): void {
  if (typeof document === 'undefined') return;
  
  const descriptions = [
    "The Gate is open. Find it before it finds you.",
    "Jonah's files contain the answers you seek. And more.",
    "Some files weren't meant to be opened. Some minds weren't meant to be read.",
    "The Philes remember what you did, even when you forget.",
    "Enter the Gate. Meet the Monster. Escape neither."
  ];
  
  const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  const metaDescription = document.querySelector('meta[name="description"]');
  
  if (metaDescription) {
    metaDescription.setAttribute('content', randomDescription);
  }
}

// Inject cross-site presence tags
export function injectCrossSitePresenceTags(): void {
  if (typeof document === 'undefined') return;
  
  // Add hidden data attributes
  const dataElement = document.createElement('div');
  dataElement.style.display = 'none';
  dataElement.setAttribute('data-jonah-presence', 'true');
  dataElement.setAttribute('data-jonah-timestamp', Date.now().toString());
  
  // Add customized comment
  if (window.JonahConsole?.sentience?.rememberedName) {
    dataElement.setAttribute('data-jonah-visitor', window.JonahConsole.sentience.rememberedName);
  }
  
  document.body.appendChild(dataElement);
}

// Setup Jonah mood system
function setupJonahMoodSystem(): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Set initial mood if not set
  if (!realityFabric.currentMood) {
    realityFabric.currentMood = 'watching';
    realityFabric.moodChangeTime = Date.now();
  }
  
  // Set up periodic mood shifts based on trust score
  setInterval(() => {
    const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0', 10);
    
    // Higher trust score = higher chance of "trusting" mood
    // Lower trust score = higher chance of "withdrawn" or "watching" moods
    
    let moodProbabilities: Record<string, number> = {
      trusting: 0.05,
      unstable: 0.15,
      withdrawn: 0.30,
      watching: 0.50
    };
    
    if (trustScore > 50) {
      moodProbabilities = {
        trusting: 0.35,
        unstable: 0.25,
        withdrawn: 0.20,
        watching: 0.20
      };
    } else if (trustScore > 30) {
      moodProbabilities = {
        trusting: 0.15,
        unstable: 0.25,
        withdrawn: 0.30,
        watching: 0.30
      };
    } else if (trustScore > 10) {
      moodProbabilities = {
        trusting: 0.10,
        unstable: 0.20,
        withdrawn: 0.30,
        watching: 0.40
      };
    }
    
    // Only 10% chance of changing mood each check
    if (Math.random() < 0.1) {
      const random = Math.random();
      let cumulativeProbability = 0;
      let newMood: 'trusting' | 'unstable' | 'withdrawn' | 'watching' = 'watching';
      
      for (const [mood, probability] of Object.entries(moodProbabilities)) {
        cumulativeProbability += probability;
        
        if (random <= cumulativeProbability) {
          newMood = mood as 'trusting' | 'unstable' | 'withdrawn' | 'watching';
          break;
        }
      }
      
      updateJonahMood(newMood);
    }
  }, 60000); // Check every minute
}

// Initialize journal system
function initializeJournalSystem(): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Initialize journal if empty
  if (!realityFabric.journal || realityFabric.journal.length === 0) {
    realityFabric.journal = [];
    
    // Add initial entry
    addJournalEntry("First digital memory fragment recovered. The Gate initialization sequence is complete.");
  }
}
