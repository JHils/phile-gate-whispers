/**
 * Echo Chamber System for Jonah's Advanced Behavior
 * Stores, processes, and recalls user inputs as "echoes"
 */

// Define echo structure
interface Echo {
  originalText: string;
  timestamp: number;
  refractedText?: string; // Modified version of original
  emotionalContext?: string;
  decayStage: number; // 0 = clear, 1 = distorted, 2 = corrupted
  useCount: number; // How many times this echo has been used
}

// Get stored echoes from localStorage
const getEchoVault = (): Echo[] => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return behaviorData.echoVault || [];
  } catch (error) {
    console.error("Error retrieving echo vault:", error);
    return [];
  }
};

// Save echo to localStorage
const saveEcho = (echo: Echo): void => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    const echoVault = behaviorData.echoVault || [];
    
    // Add the new echo
    echoVault.push(echo);
    
    // Keep only the last 15 echoes
    if (echoVault.length > 15) {
      echoVault.shift();
    }
    
    // Save back to localStorage
    behaviorData.echoVault = echoVault;
    behaviorData.lastEchoTime = Date.now();
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error storing echo:", error);
  }
};

// Store a user input as an echo
export const storeEcho = (input: string, emotionalContext?: string): void => {
  // Check if the input is significant enough to store
  // (longer than 10 chars, contains certain emotional triggers, or is a question)
  if (input.length > 10 || 
      input.includes('?') ||
      /\b(help|afraid|scared|lost|remember|forget|trust|love|hate|why|please|sorry)\b/i.test(input)) {
    
    // Create echo with refracted version
    const echo: Echo = {
      originalText: input,
      timestamp: Date.now(),
      refractedText: createRefractedVersion(input),
      emotionalContext: emotionalContext || detectEmotionalContext(input),
      decayStage: 0,
      useCount: 0
    };
    
    saveEcho(echo);
  }
};

// Create a refracted (slightly modified) version of text
function createRefractedVersion(text: string): string {
  // Simple transformations
  const transformations = [
    // Replace "I" with "you"
    () => text.replace(/\bI\b/g, "you").replace(/\bmy\b/g, "your"),
    
    // Fragment the text
    () => {
      const words = text.split(' ');
      if (words.length <= 3) return text;
      const fragPoint = Math.floor(words.length / 2);
      return words.slice(0, fragPoint).join(' ') + "... " + words[words.length - 1];
    },
    
    // Ask a question based on the text
    () => {
      const lastChar = text.charAt(text.length - 1);
      if (lastChar === '?') return text; // Already a question
      return text.replace(/\.$/, '') + "?";
    },
    
    // Add a doubt or contradiction
    () => text + ". But did you mean it?",
    
    // Create a shortened version
    () => {
      const words = text.split(' ');
      if (words.length <= 2) return text;
      return words.slice(0, 2).join(' ') + "...";
    }
  ];
  
  // Pick a random transformation
  const transform = transformations[Math.floor(Math.random() * transformations.length)];
  return transform();
}

// Detect emotional context from text
function detectEmotionalContext(text: string): string {
  const textLower = text.toLowerCase();
  
  if (/\b(afraid|scared|fear|worry|worried|anxious|anxiety|terror|dread|panic)\b/i.test(textLower)) {
    return 'fear';
  } 
  else if (/\b(angry|anger|mad|furious|hate|rage|upset|frustrated)\b/i.test(textLower)) {
    return 'anger';
  }
  else if (/\b(sad|lonely|alone|depressed|miserable|unhappy|grief|sorrow)\b/i.test(textLower)) {
    return 'sadness';
  }
  else if (/\b(happy|joy|glad|excited|pleased|delighted|content)\b/i.test(textLower)) {
    return 'joy';
  }
  else if (/\b(trust|believe|faith|hope|confident|sure)\b/i.test(textLower)) {
    return 'trust';
  }
  else if (/\b(confused|lost|unsure|uncertain|don't understand)\b/i.test(textLower)) {
    return 'confusion';
  }
  
  return 'neutral';
}

// Get an echo based on various criteria
export const getEcho = (options: {
  emotionalMatch?: string; 
  random?: boolean;
  preferUnused?: boolean;
  preferRecent?: boolean;
} = {}): Echo | null => {
  const echoVault = getEchoVault();
  
  if (echoVault.length === 0) {
    return null;
  }
  
  // Filter by emotional context if provided
  let availableEchoes = echoVault;
  
  if (options.emotionalMatch) {
    availableEchoes = echoVault.filter(echo => 
      echo.emotionalContext === options.emotionalMatch
    );
    
    // If no matching echoes, fall back to all
    if (availableEchoes.length === 0) {
      availableEchoes = echoVault;
    }
  }
  
  // Sort by various criteria
  if (options.preferUnused) {
    availableEchoes.sort((a, b) => a.useCount - b.useCount);
  }
  
  if (options.preferRecent) {
    availableEchoes.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // Choose an echo
  let selectedEcho: Echo;
  if (options.random) {
    selectedEcho = availableEchoes[Math.floor(Math.random() * availableEchoes.length)];
  } else {
    // Pick the first one after sorting
    selectedEcho = availableEchoes[0];
  }
  
  // Update use count
  if (selectedEcho) {
    updateEchoUseCount(selectedEcho);
  }
  
  return selectedEcho;
};

// Update usage count for an echo
function updateEchoUseCount(usedEcho: Echo): void {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    const echoVault = behaviorData.echoVault || [];
    
    // Find and update the echo
    const updatedEchoVault = echoVault.map((echo: Echo) => {
      if (echo.originalText === usedEcho.originalText && 
          echo.timestamp === usedEcho.timestamp) {
        return {
          ...echo,
          useCount: (echo.useCount || 0) + 1
        };
      }
      return echo;
    });
    
    // Save back
    behaviorData.echoVault = updatedEchoVault;
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error updating echo use count:", error);
  }
}

// Get an echo phrase for insertion into a response
export const getEchoPhrase = (currentEmotion: string): string | null => {
  // Lower chance of echo if we've echoed recently
  const lastEchoTime = getLastEchoTime();
  const timeSinceLastEcho = Date.now() - lastEchoTime;
  
  // Minimum 30 seconds between echoes
  if (timeSinceLastEcho < 30000) {
    return null;
  }
  
  // Random chance based on emotion
  const echoChance = currentEmotion === 'paranoid' || currentEmotion === 'mirror' 
    ? 0.4 : 0.2;
    
  if (Math.random() > echoChance) {
    return null;
  }
  
  // Try to match emotional context
  const emotionalMapping: Record<string, string> = {
    'paranoid': 'fear',
    'hopeful': 'trust',
    'betrayed': 'anger',
    'mirror': 'confusion',
    'error': 'confusion',
    'static': 'sadness'
  };
  
  const targetEmotion = emotionalMapping[currentEmotion] || 'neutral';
  
  // Get an echo
  const echo = getEcho({
    emotionalMatch: targetEmotion,
    random: true,
    preferUnused: true
  });
  
  if (!echo) return null;
  
  // Format the echo based on type
  const echoFormats = [
    // Direct quote
    `You said: "${echo.originalText}"`,
    
    // Refracted version
    echo.refractedText || echo.originalText,
    
    // Question about it
    `Did you mean it when you said "${echo.originalText}"?`,
    
    // Partial reference
    `"${echo.originalText.split(' ').slice(0, 3).join(' ')}..." Why did you say that?`,
    
    // Distorted recall
    `I remember: "${glitchText(echo.originalText)}"`
  ];
  
  // Update last echo time
  updateLastEchoTime();
  
  return echoFormats[Math.floor(Math.random() * echoFormats.length)];
};

// Get the last time an echo was used
function getLastEchoTime(): number {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return behaviorData.lastEchoTime || 0;
  } catch (error) {
    return 0;
  }
}

// Update the last echo time
function updateLastEchoTime(): void {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    behaviorData.lastEchoTime = Date.now();
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error updating last echo time:", error);
  }
}

// Helper function to create glitchy text
function glitchText(text: string): string {
  return text.split('').map(char => {
    if (Math.random() > 0.8) {
      const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!', '|'];
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return char;
  }).join('');
}

// Get all echoes for display in the echo log
export const getAllEchoes = (): Echo[] => {
  return getEchoVault();
};

// Check if a user input matches any stored echo
export const checkForEchoMatch = (input: string): { matched: boolean; echo?: Echo } => {
  const echoVault = getEchoVault();
  
  // Simple exact matching for now
  const matchingEcho = echoVault.find(echo => 
    input.toLowerCase().includes(echo.originalText.toLowerCase())
  );
  
  if (matchingEcho) {
    return { matched: true, echo: matchingEcho };
  }
  
  return { matched: false };
};
