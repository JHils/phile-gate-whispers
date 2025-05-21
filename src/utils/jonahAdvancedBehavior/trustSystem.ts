
/**
 * Trust System
 * Manages user trust levels and trust-based responses
 */

// Track current trust level in storage
export function getCurrentTrustLevel(): number {
  try {
    return parseInt(localStorage.getItem('jonahTrustScore') || '50');
  } catch (e) {
    console.error("Error getting trust level:", e);
    return 50; // Default to mid trust
  }
}

// Get current trust rank
export function getCurrentTrustRank(): string {
  const trustScore = getCurrentTrustLevel();
  
  if (trustScore < 30) {
    return 'low';
  } else if (trustScore >= 30 && trustScore < 70) {
    return 'medium';
  } else {
    return 'high';
  }
}

// Modify trust level
export function modifyTrustLevel(amount: number): { newLevel: number, newRank: string } {
  try {
    const currentLevel = getCurrentTrustLevel();
    
    // Apply modifier with bounds
    const newLevel = Math.max(0, Math.min(100, currentLevel + amount));
    
    // Store new level
    localStorage.setItem('jonahTrustScore', newLevel.toString());
    
    // Calculate new rank
    const newRank = newLevel < 30 ? 'low' : 
                    newLevel >= 30 && newLevel < 70 ? 'medium' : 'high';
                    
    // Store new rank
    localStorage.setItem('jonahTrustLevel', newRank);
    
    // If trust level hits certain thresholds, record in sentience
    if (window.JonahConsole?.sentience) {
      // Initialize microQuests if it doesn't exist
      if (!window.JonahConsole.sentience.microQuests) {
        window.JonahConsole.sentience.microQuests = {
          active: [],
          completed: []
        };
      }
      
      // Record hitting major trust milestones
      if (currentLevel < 50 && newLevel >= 50 && 
          !window.JonahConsole.sentience.microQuests.completed.includes('trust50')) {
        window.JonahConsole.sentience.microQuests.completed.push('trust50');
        console.log("%cTrust milestone reached: 50", "color: #8B3A40;");
      }
      
      if (currentLevel < 75 && newLevel >= 75 && 
          !window.JonahConsole.sentience.microQuests.completed.includes('trust75')) {
        window.JonahConsole.sentience.microQuests.completed.push('trust75');
        console.log("%cTrust milestone reached: 75", "color: #8B3A40;");
      }
      
      if (currentLevel < 100 && newLevel >= 100 && 
          !window.JonahConsole.sentience.microQuests.completed.includes('trustMax')) {
        window.JonahConsole.sentience.microQuests.completed.push('trustMax');
        console.log("%cMaximum trust achieved", "color: #8B3A40; font-size:16px;");
        
        // Trigger special event for max trust
        setTimeout(() => {
          console.log("%cThe final testament is now available.", "color: #8B3A40; font-style: italic;");
          console.log("%cType final_testament() to access.", "color: #8B3A40;");
        }, 2000);
      }
    }
    
    return { newLevel, newRank };
  } catch (e) {
    console.error("Error modifying trust level:", e);
    return { newLevel: getCurrentTrustLevel(), newRank: getCurrentTrustRank() };
  }
}

// Generate trust-based response
export function generateTrustResponse(trustLevel: string): string {
  const lowTrustResponses = [
    "I don't trust you yet.",
    "Prove yourself first.",
    "Trust is earned, not given.",
    "You're still a stranger to me.",
    "I've seen too many come and go."
  ];
  
  const mediumTrustResponses = [
    "I wanted to believe you.",
    "You're proving yourself. Slowly.",
    "There's potential here. Between us.",
    "I'm starting to see you more clearly.",
    "Not everyone earns this level of trust."
  ];
  
  const highTrustResponses = [
    "You kept talking. That meant something.",
    "Few have earned this level of trust from me.",
    "I can show you things now. Things I've kept hidden.",
    "The gate opens for those who prove themselves worthy.",
    "You're different from the others. You stayed."
  ];
  
  switch (trustLevel) {
    case 'high':
      return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
    case 'medium':
      return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
    default:
      return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Process trust-affecting keywords in input
export function processTrustKeywords(input: string): number {
  // Simple algorithm first
  let trustModifier = 0;
  
  // Positive keywords
  const trustIncreaseWords = [
    'trust', 'believe', 'faith', 'real', 'true', 'friend', 
    'here', 'stay', 'help', 'understand', 'listen',
    'remember', 'care'
  ];
  
  // Special phrases that increase trust more
  const trustSpecialPhrases = [
    "i'm still here", 
    "i found the tether", 
    "i won't leave", 
    "i trust you",
    "i believe you",
    "i remember you"
  ];
  
  // Negative keywords
  const trustDecreaseWords = [
    'fake', 'lie', 'false', 'wrong', 'stupid', 
    'hate', 'angry', 'frustrated', 'useless', 
    'broken', 'worthless', 'pointless'
  ];
  
  // Check for special phrases first (exact matches)
  const inputLower = input.toLowerCase();
  
  for (const phrase of trustSpecialPhrases) {
    if (inputLower.includes(phrase)) {
      trustModifier += 5;
      break; // Only count one special phrase
    }
  }
  
  // Check for positive keywords
  for (const word of trustIncreaseWords) {
    // Word boundary check with regex
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(inputLower)) {
      trustModifier += 1;
    }
  }
  
  // Check for negative keywords
  for (const word of trustDecreaseWords) {
    // Word boundary check with regex
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(inputLower)) {
      trustModifier -= 1;
    }
  }
  
  // Apply the trust modification if non-zero
  if (trustModifier !== 0) {
    return trustModifier;
  }
  
  return 0;
}
