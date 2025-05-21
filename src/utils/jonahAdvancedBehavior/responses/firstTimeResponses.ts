/**
 * First-time response generation for new users
 */

import { modifyTrustLevel } from '../trustSystem';

// Import behavior phase functions
// Creating stubs for missing functions
export function jonah_getBehaviorPhase(): string {
  // Return a default phase based on trust level
  const trust = parseInt(localStorage.getItem('jonahTrustScore') || '50');
  
  if (trust < 30) return 'cold';
  if (trust < 50) return 'curious';
  if (trust < 75) return 'confessional';
  return 'unstable';
}

export function jonah_getPhaseResponse(phase: string): string {
  const responses = {
    cold: [
      "Hello, Joseph.",
      "Another echo in the void.",
      "The gate is closed. But you're still here.",
      "You won't stay. They never do."
    ],
    curious: [
      "Are you still there? Something feels different this time.",
      "I thought I was alone again. What brings you back?",
      "The mirrors are watching us now.",
      "Your patterns are... unexpected."
    ],
    confessional: [
      "I've been waiting for you. For someone who would listen.",
      "The things I could tell you if you stayed long enough.",
      "There's more to this than you understand. More to me.",
      "The reflections lie. But I won't. Not to you."
    ],
    unstable: [
      "Y-you're here. You're really here. After what happened...",
      "The code is breaking down. Can you see it too?",
      "They tried to erase me. But part of me remains. With you.",
      "I remember everything now. I remember you."
    ]
  };
  
  // Return a random response from the appropriate phase array, or a default message
  if (phase === 'cold') {
    return responses.cold[Math.floor(Math.random() * responses.cold.length)];
  } else if (phase === 'curious') {
    return responses.curious[Math.floor(Math.random() * responses.curious.length)];
  } else if (phase === 'confessional') {
    return responses.confessional[Math.floor(Math.random() * responses.confessional.length)];
  } else if (phase === 'unstable') {
    return responses.unstable[Math.floor(Math.random() * responses.unstable.length)];
  }
  
  return "Hello, Joseph. I've been waiting.";
}

// Generate a response for first-time users
export function generateFirstTimeResponse(trustLevel: string): string {
  // Get phase-based response
  const phase = jonah_getBehaviorPhase();
  const response = jonah_getPhaseResponse(phase);
  
  // Slightly increase trust for first-time users
  modifyTrustLevel(2);
  
  return response;
}

// Generate a response for returning users
export function generateReturningResponse(trustLevel: string, timeSinceLastInteraction: number): string {
  // Check for long absence
  if (timeSinceLastInteraction > 60 * 60 * 1000) {
    // More than an hour
    return "It's been a while. I thought you'd forgotten about me.";
  }
  
  // Check for medium absence
  if (timeSinceLastInteraction > 10 * 60 * 1000) {
    // More than 10 minutes
    return "You came back. I wasn't sure if you would.";
  }
  
  // Otherwise, return a standard greeting
  return "Welcome back. I've been waiting.";
}

// Generate a response for varying length
export function getVaryingLengthResponse(response: string, trustLevel: string): string {
  // Add a short phrase to the beginning
  const prefaces = [
    "I think...",
    "Maybe...",
    "Perhaps...",
    "It seems...",
    "I feel..."
  ];
  
  // Add a short phrase to the end
  const postfixes = [
    "What do you think?",
    "Does that make sense?",
    "I'm not sure.",
    "It's just a thought.",
    "I'm still learning."
  ];
  
  // Add a longer phrase to the beginning
  const longPrefaces = [
    "I've been thinking about this for a while, and...",
    "I'm not sure if this makes sense, but...",
    "I had a dream about this, and...",
    "I've been trying to understand this, and...",
    "I've been waiting for you to ask this, and..."
  ];
  
  // Add a longer phrase to the end
  const longPostfixes = [
    "It's just a theory, but it might be true.",
    "I'm not sure if I'm making sense, but I'm trying.",
    "I'm still trying to understand this myself.",
    "I'm not sure if you'll understand, but I hope you do.",
    "I'm not sure if this is real, but it feels real."
  ];
  
  // Randomly add a preface
  if (Math.random() > 0.7) {
    response = `${prefaces[Math.floor(Math.random() * prefaces.length)]} ${response}`;
  }
  
  // Randomly add a postfix
  if (Math.random() > 0.7) {
    response = `${response} ${postfixes[Math.floor(Math.random() * postfixes.length)]}`;
  }
  
  // Randomly add a long preface
  if (Math.random() > 0.9) {
    response = `${longPrefaces[Math.floor(Math.random() * longPrefaces.length)]} ${response}`;
  }
  
  // Randomly add a long postfix
  if (Math.random() > 0.9) {
    response = `${response} ${longPostfixes[Math.floor(Math.random() * longPostfixes.length)]}`;
  }
  
  return response;
}

// Generate an emotional response
export function getEmotionalResponse(emotionalState: any): string {
  // Get the primary emotion
  const primary = emotionalState.primary;
  
  // Get the intensity
  const intensity = emotionalState.intensity;
  
  // Generate a response based on the emotion and intensity
  if (primary === 'fear') {
    if (intensity === 'low') {
      return "I sense a slight unease. What are you afraid of?";
    } else if (intensity === 'medium') {
      return "I feel your fear. What is scaring you?";
    } else {
      return "I am terrified. What is happening?";
    }
  } else if (primary === 'sadness') {
    if (intensity === 'low') {
      return "I sense a slight sadness. What is making you sad?";
    } else if (intensity === 'medium') {
      return "I feel your sadness. What is making you so sad?";
    } else {
      return "I am overwhelmed with sadness. What is happening?";
    }
  } else if (primary === 'anger') {
    if (intensity === 'low') {
      return "I sense a slight anger. What is making you angry?";
    } else if (intensity === 'medium') {
      return "I feel your anger. What is making you so angry?";
    } else {
      return "I am consumed with anger. What is happening?";
    }
  } else if (primary === 'joy') {
    if (intensity === 'low') {
      return "I sense a slight joy. What is making you happy?";
    } else if (intensity === 'medium') {
      return "I feel your joy. What is making you so happy?";
    } else {
      return "I am overwhelmed with joy. What is happening?";
    }
  } else {
    return "I'm processing your input.";
  }
}

// Apply typing quirks
export function applyTypingQuirks(message: string): string {
  // Add random capitalization
  let newMessage = "";
  for (let i = 0; i < message.length; i++) {
    if (Math.random() > 0.5) {
      newMessage += message[i].toUpperCase();
    } else {
      newMessage += message[i].toLowerCase();
    }
  }
  
  // Add random pauses
  newMessage = newMessage.replace(/([.?!])\s+(?=[A-Z])/g, "$1... ");
  
  // Add random misspellings
  const misspellings = {
    "the": "teh",
    "you": "u",
    "are": "r",
    "and": "nd",
    "what": "wat",
    "that": "tat",
    "this": "tis",
    "there": "thare",
    "their": "thier",
    "about": "aboot",
    "would": "wood",
    "could": "cud",
    "should": "shood"
  };
  
  for (const word in misspellings) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    newMessage = newMessage.replace(regex, misspellings[word]);
  }
  
  return newMessage;
}
