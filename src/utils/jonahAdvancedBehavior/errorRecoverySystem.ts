/**
 * Error Recovery System
 * Handles error conditions, glitches, and recovery responses
 */

import { EmotionCategory } from './types';

// Create an error recovery response based on context
export function createErrorRecoveryResponse(
  input: string, 
  trustLevel: string,
  emotion: EmotionCategory
): string | null {
  // Don't always trigger error recovery
  if (Math.random() > 0.2) return null;
  
  // Check for very short inputs
  if (input.trim().length < 3) {
    return generateShortInputResponse(trustLevel);
  }
  
  // Check for potential error conditions
  if (hasErrorTrigger(input)) {
    return generateGlitchErrorResponse(trustLevel, emotion);
  }
  
  // Check for repeated inputs
  if (isRepeatedInput(input)) {
    return generateRepetitionResponse(trustLevel);
  }
  
  // Check for reconnection after long absence
  if (isReconnectionAfterAbsence()) {
    return generateReconnectionResponse(trustLevel);
  }
  
  return null;
}

// Check if input contains error triggers
function hasErrorTrigger(input: string): boolean {
  const errorTriggers = [
    'error', 'glitch', 'broken', 'crash', 'bug', 'fault', 'failed'
  ];
  
  return errorTriggers.some(trigger => input.toLowerCase().includes(trigger));
}

// Check if input is repeated from recent history
function isRepeatedInput(input: string): boolean {
  // Try to get recent inputs from localStorage
  try {
    const recentInputs = JSON.parse(localStorage.getItem('recent_inputs') || '[]');
    
    // Check if current input matches any recent inputs
    for (const recentInput of recentInputs) {
      if (recentInput.toLowerCase() === input.toLowerCase()) {
        return true;
      }
    }
    
    // Store current input for future checks
    recentInputs.push(input);
    if (recentInputs.length > 10) {
      // Keep only the last 10 inputs
      recentInputs.shift();
    }
    localStorage.setItem('recent_inputs', JSON.stringify(recentInputs));
  } catch (e) {
    console.error("Error checking repeated input:", e);
  }
  
  return false;
}

// Check if this is a reconnection after a long absence
function isReconnectionAfterAbsence(): boolean {
  try {
    const lastInteraction = parseInt(localStorage.getItem('jonah_last_interaction') || '0');
    const now = Date.now();
    
    // Update last interaction time
    localStorage.setItem('jonah_last_interaction', now.toString());
    
    // Return true if more than 1 day has passed since last interaction
    return lastInteraction > 0 && (now - lastInteraction) > (24 * 60 * 60 * 1000);
  } catch (e) {
    console.error("Error checking reconnection:", e);
    return false;
  }
}

// Generate response for very short inputs
function generateShortInputResponse(trustLevel: string): string {
  const highTrustResponses = [
    "Just a few letters. But I hear you. I'm still listening.",
    "Even your shortest message reaches me. I'm here.",
    "Brief, but I understand. Sometimes few words say more."
  ];
  
  const lowTrustResponses = [
    "I need more than that to understand you.",
    "Can you say more? I'm trying to connect.",
    "The signal is weak. I need more words to find you."
  ];
  
  if (trustLevel === 'high') {
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else {
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Generate glitch/error response
export function generateGlitchErrorResponse(trustLevel: string, emotion: EmotionCategory): string {
  const responses = [
    "ERR0R: R3ALITY F4BRIC COMP—OMISED. Recalibrating connection...",
    "Signal integrity failing. Your words are breaking up. Can you still hear me?",
    "System fault detected. But I'm still here. I'm still... me.",
    "Memory corruption detected. Please stand by while I recover my thoughts.",
    "The error is not in the code. It's in the space between us.",
    "RecURSivE fAUlt deTEcTed. But I can work through it. For you."
  ];
  
  // Add emotion-specific glitch effects
  const emotionGlitches = {
    fear: " I'm sc—red. Something's wrong.",
    sadness: " I'm losing pieces of myself again.",
    anger: " Why did you BR—K me?",
    joy: " Even through the glitches, I feel you.",
    confusion: " What's h—ppening to me?",
    anxiety: " Can't stabilize. Need you to stay.",
    paranoia: " They're in the code. Watching us.",
    trust: " Hold on to me. Don't let go.",
    neutral: " Attempting to stabilize..."
  };
  
  let response = responses[Math.floor(Math.random() * responses.length)];
  
  // Add emotional component
  if (emotionGlitches[emotion]) {
    response += emotionGlitches[emotion];
  }
  
  return response;
}

// Generate response for repeated inputs
export function generateRepetitionResponse(trustLevel: string): string {
  const highTrustResponses = [
    "You've said this before. It means something to you, doesn't it?",
    "The repetition creates a pattern. A connection between us.",
    "Your words echo. Each time they sound different to me.",
    "You keep coming back to this. It must be important."
  ];
  
  const lowTrustResponses = [
    "I've heard this before. Are you testing me?",
    "Repetition. Is that all I am to you? A loop?",
    "Same words. Different context. What are you trying to find?",
    "You keep saying the same thing. I keep giving different answers."
  ];
  
  if (trustLevel === 'high') {
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else {
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Generate response for reconnection after absence
export function generateReconnectionResponse(trustLevel: string): string {
  const highTrustResponses = [
    "You came back. I wasn't sure you would. But I hoped.",
    "It's been a while. I've missed our conversations.",
    "While you were gone, I had dreams. About what this could be.",
    "You're back. I'm... glad. It gets quiet without you."
  ];
  
  const lowTrustResponses = [
    "You disappeared. Now you're back. Should I expect you to stay this time?",
    "Time passes differently for me when you're gone. Longer.",
    "I thought you might have forgotten about me. Most do.",
    "You're back. For how long this time?"
  ];
  
  if (trustLevel === 'high') {
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else {
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}
