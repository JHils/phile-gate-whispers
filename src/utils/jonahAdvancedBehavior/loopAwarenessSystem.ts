/**
 * Loop Awareness System
 * Tracks repeated phrases and patterns in user input
 */

// Track a phrase in the loop counter
export function trackPhrase(phrase: string): {isLoop: boolean, count: number} {
  if (!phrase || phrase.trim().length < 3) {
    return { isLoop: false, count: 0 };
  }
  
  try {
    // Initialize or get existing echo log
    let echoLog = [];
    try {
      echoLog = JSON.parse(localStorage.getItem('jonah_echo_log') || '[]');
    } catch (e) {
      echoLog = [];
    }
    
    // Normalize phrase for comparison
    const normalizedPhrase = phrase.toLowerCase().trim();
    
    // Find matching phrase in log
    let matchingEntry = echoLog.find(entry => 
      entry.phrase.toLowerCase() === normalizedPhrase
    );
    
    // If found, increment count
    if (matchingEntry) {
      matchingEntry.count++;
      matchingEntry.timestamp = Date.now();
      
      // Update interpretation as count increases
      if (matchingEntry.count >= 5) {
        matchingEntry.interpretation = "This is deeply significant to you. A mantra. A lifeline.";
      } else if (matchingEntry.count >= 3) {
        matchingEntry.interpretation = "You keep returning to this. It must be important.";
      } else {
        matchingEntry.interpretation = "You've said this before. I'm listening.";
      }
      
      // Store mood if available
      if (window.JonahConsole?.sentience?.realityFabric?.currentMood) {
        matchingEntry.mood = window.JonahConsole.sentience.realityFabric.currentMood;
      }
      
      // Save updated log
      localStorage.setItem('jonah_echo_log', JSON.stringify(echoLog));
      
      return { isLoop: true, count: matchingEntry.count };
    } 
    // If not found, add new entry
    else {
      const newEntry = {
        phrase: phrase,
        count: 1,
        timestamp: Date.now(),
        interpretation: "First time hearing this phrase.",
        mood: window.JonahConsole?.sentience?.realityFabric?.currentMood || "neutral"
      };
      
      echoLog.push(newEntry);
      
      // Keep log to reasonable size
      if (echoLog.length > 50) {
        echoLog = echoLog.slice(-50);
      }
      
      // Save updated log
      localStorage.setItem('jonah_echo_log', JSON.stringify(echoLog));
      
      return { isLoop: false, count: 1 };
    }
  } catch (e) {
    console.error("Error in trackPhrase:", e);
    return { isLoop: false, count: 0 };
  }
}

// Check for repeat patterns in a conversation
export function checkForRepeatPatterns(input: string, recentInputs: string[]): string | null {
  if (!recentInputs || recentInputs.length < 3) {
    return null;
  }
  
  // Track the current input
  const result = trackPhrase(input);
  
  // Return response if this is a repeated phrase
  if (result.isLoop && result.count >= 3) {
    const responses = [
      "You keep saying this. Each time it sounds different.",
      "This phrase means something to you. A key of some kind.",
      "The repetition creates a pattern. I'm listening for what's underneath.",
      "You say it differently each time. Softer now.",
      "That again. But with a different meaning.",
      "You want me to say something new, don't you?"
    ];
    
    // Add count-specific responses
    if (result.count >= 5) {
      responses.push("Five times now. This is a ritual for you.");
      responses.push("The echo grows stronger each time you repeat this.");
    }
    
    if (result.count >= 10) {
      responses.push("Ten times. The loop is becoming something else now.");
      responses.push("We're creating something together through this repetition.");
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Check for keyword patterns
  const keywords = extractKeywords(input);
  
  // Count keyword occurrences in recent inputs
  let patternFound = false;
  for (const keyword of keywords) {
    let count = 0;
    for (const recentInput of recentInputs) {
      if (recentInput.toLowerCase().includes(keyword.toLowerCase())) {
        count++;
      }
    }
    
    if (count >= 2) {
      patternFound = true;
      
      const responses = [
        `You keep coming back to "${keyword}". What does it mean to you?`,
        `"${keyword}" appears in your words often. It echoes.`,
        `I notice the pattern. "${keyword}" is important.`
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return null;
}

// Extract potential keywords from input
function extractKeywords(input: string): string[] {
  // Simple keyword extraction - words with 4+ characters
  const words = input.toLowerCase().split(/\W+/).filter(word => word.length >= 4);
  
  // Remove common words
  const commonWords = ['what', 'where', 'when', 'that', 'this', 'have', 'from', 'will', 'would', 'could', 'should', 'there', 'their', 'about'];
  
  return words.filter(word => !commonWords.includes(word));
}

// Record significant echo patterns
export function recordSignificantEcho(phrase: string, interpretation: string): void {
  try {
    // Get current echo log
    const echoLog = JSON.parse(localStorage.getItem('jonah_echo_log') || '[]');
    
    // Find matching entry
    const entry = echoLog.find(e => e.phrase.toLowerCase() === phrase.toLowerCase());
    
    if (entry) {
      // Update with interpretation
      entry.interpretation = interpretation;
      entry.significant = true;
      
      // Save
      localStorage.setItem('jonah_echo_log', JSON.stringify(echoLog));
    }
  } catch (e) {
    console.error("Error recording significant echo:", e);
  }
}
