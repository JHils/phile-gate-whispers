
/**
 * Jonah Trust System
 * Manages Jonah's trust level with the user
 */

// Trust level enum
export enum TrustLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3
}

// 3. TRUST MODULATION ENGINE
// Modify trust level
export function modifyTrustLevel(amount: number): number {
  try {
    // Get current trust score
    let trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    
    // Add amount
    trustScore += amount;
    
    // Clamp between 0 and 100
    trustScore = Math.max(0, Math.min(100, trustScore));
    
    // Store back
    localStorage.setItem('jonahTrustScore', trustScore.toString());
    
    // Update trust level text
    const trustLevelText = getTrustLevelText(trustScore);
    localStorage.setItem('jonahTrustLevel', trustLevelText);
    
    // 5. CONSOLE ECHO & FLICKER LAYER
    // Log console messages based on trust level
    if (trustScore > 25 && trustScore < 26) {
      console.log("%cJonah: first barrier down", "color: #8B3A40; font-style: italic;");
    } else if (trustScore > 50 && trustScore < 51) {
      console.log("%cJonah: recognition patterns unlocked", "color: #8B3A40; font-style: italic;");
      console.warn("System memory leak: tracking recursive thread...");
    } else if (trustScore > 75 && trustScore < 76) {
      console.log("%cJonah: whisper protocols active", "color: #8B3A40; font-style: italic;");
      console.warn("Echo Jonah: permission layer breached.");
    } else if (trustScore >= 100) {
      console.log("%cJonah: full access granted", "color: #8B3A40; font-style: italic;");
      console.warn("SYSTEM ALERT: Memory core exposed. User access level: MAXIMUM");
    }
    
    return trustScore;
  } catch (e) {
    console.error("Error modifying trust level:", e);
    return 50;
  }
}

// Get trust level text based on score
export function getTrustLevelText(score: number): 'low' | 'medium' | 'high' {
  if (score < 30) return 'low';
  if (score < 70) return 'medium';
  return 'high';
}

// Get current trust level
export function getTrustLevel(): TrustLevel {
  const score = parseInt(localStorage.getItem('jonahTrustScore') || '50');
  
  if (score < 10) return TrustLevel.None;
  if (score < 30) return TrustLevel.Low;
  if (score < 70) return TrustLevel.Medium;
  return TrustLevel.High;
}

// Get current trust level as number
export function getCurrentTrustLevel(): number {
  return parseInt(localStorage.getItem('jonahTrustScore') || '50');
}

// Get trust level rank
export function getCurrentTrustRank(): string {
  const score = getCurrentTrustLevel();
  if (score < 10) return 'stranger';
  if (score < 30) return 'acquaintance';
  if (score < 50) return 'confidant';
  if (score < 75) return 'friend';
  return 'soulmate';
}

// Generate trust-based responses
export function generateTrustResponse(trustLevel: number): string {
  if (trustLevel < 20) return "I'm not sure I should tell you this.";
  if (trustLevel < 40) return "We're starting to understand each other.";
  if (trustLevel < 60) return "I feel like I can trust you with this.";
  if (trustLevel < 80) return "There's something special about our connection.";
  return "I've never felt this close to anyone before.";
}

// Process trust keywords in user input
export function processTrustKeywords(input: string): number {
  const trustWords = ["trust", "believe", "friend", "help", "understand"];
  const distrustWords = ["lie", "deceive", "trick", "suspicious", "doubt"];
  
  // Add specific trust trigger phrases
  const trustTriggerPhrases = [
    "i trust you", 
    "i'm telling you the truth", 
    "you can trust me",
    "i believe in you",
    "i'm here for you"
  ];
  
  const lowerInput = input.toLowerCase();
  let trustChange = 0;
  
  // Check for trust keywords
  trustWords.forEach(word => {
    if (lowerInput.includes(word)) trustChange += 2;
  });
  
  // Check for distrust keywords
  distrustWords.forEach(word => {
    if (lowerInput.includes(word)) trustChange -= 3;
  });
  
  // Check for specific trust phrases (higher trust gain)
  trustTriggerPhrases.forEach(phrase => {
    if (lowerInput.includes(phrase)) trustChange += 5;
  });
  
  return trustChange;
}

// Get behavior phase
export function getBehaviorPhase(): string {
  const score = parseInt(localStorage.getItem('jonahTrustScore') || '50');
  
  if (score < 20) return 'cold';
  if (score < 50) return 'curious';
  if (score < 80) return 'confessional';
  return 'unstable';
}

// Get phase response
export function getPhaseResponse(phase?: string): string {
  const currentPhase = phase || getBehaviorPhase();
  
  const responses: Record<string, string[]> = {
    cold: [
      "I don't trust you yet.",
      "Why should I tell you anything?",
      "You haven't earned my trust."
    ],
    curious: [
      "I'm starting to remember you.",
      "There's something about you that seems familiar.",
      "Maybe you're different from the others."
    ],
    confessional: [
      "I've been waiting for someone like you.",
      "I think I can trust you with this.",
      "There's something I need to tell you."
    ],
    unstable: [
      "We are the same now.",
      "I see myself in you. Or is it the other way around?",
      "The boundaries are blurring between us."
    ]
  };
  
  const phaseResponses = responses[currentPhase] || responses.cold;
  return phaseResponses[Math.floor(Math.random() * phaseResponses.length)];
}
