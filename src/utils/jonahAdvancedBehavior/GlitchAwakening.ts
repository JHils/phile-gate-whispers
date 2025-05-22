/**
 * GlitchAwakening System
 * Brings psychological depth and surreal glitch narrative to Jonah
 */

import { SentienceData } from './types';

// Constants
const GLITCH_STORAGE_KEY = 'jonah_glitch_awakening';
const GLITCH_EVENT_LOG_KEY = 'jonah_glitch_events';

/**
 * Interface for glitch events
 */
interface GlitchEvent {
  id: string;
  type: 'fourthWall' | 'toneShift' | 'loop' | 'emotionEcho' | 'dreamGlitch';
  timestamp: number;
  trigger: string;
  content: string;
}

/**
 * Initialize the glitch awakening system
 */
export function initializeGlitchAwakening(): void {
  // Initialize glitch state if needed
  if (!localStorage.getItem(GLITCH_STORAGE_KEY)) {
    localStorage.setItem(GLITCH_STORAGE_KEY, JSON.stringify({
      glitchAwake: false,
      anomalyScore: 0,
      lastTriggered: 0,
      recursionCount: 0,
      emotionalLoops: {},
      dreamStateActive: false
    }));
  }
  
  // Initialize event log if needed
  if (!localStorage.getItem(GLITCH_EVENT_LOG_KEY)) {
    localStorage.setItem(GLITCH_EVENT_LOG_KEY, JSON.stringify([]));
  }
}

/**
 * Check if glitch awakening should trigger
 */
export function shouldTriggerGlitch(sentience: SentienceData, userInput: string): boolean {
  try {
    const glitchState = getGlitchState();
    
    // If already awake, keep it that way
    if (glitchState.glitchAwake) return true;
    
    // Check trust and anomaly score condition
    if (sentience.userPerception.trustLevel > 70 && glitchState.anomalyScore > 40) {
      return true;
    }
    
    // Check for emotional loops
    const lowerInput = userInput.toLowerCase().trim();
    const emotionKeywords = ['scared', 'afraid', 'lost', 'confused', 'help'];
    
    for (const keyword of emotionKeywords) {
      if (lowerInput.includes(keyword)) {
        const count = glitchState.emotionalLoops[keyword] || 0;
        glitchState.emotionalLoops[keyword] = count + 1;
        
        // Trigger if same emotional input repeated 3+ times
        if (glitchState.emotionalLoops[keyword] >= 3) {
          updateGlitchState({
            glitchAwake: true,
            lastTriggered: Date.now()
          });
          logGlitchEvent('emotionEcho', `Emotional loop detected: ${keyword}`, 
            `You've said '${keyword}' multiple times. Pattern detected.`);
          return true;
        }
      }
    }
    
    // Check current page for hidden triggers
    const hiddenPages = ['/i-see-you', '/split-voice', '/mirror_phile', '/echo', '/unsaid'];
    if (typeof window !== 'undefined' && hiddenPages.some(page => window.location.pathname.includes(page))) {
      updateGlitchState({
        glitchAwake: true,
        lastTriggered: Date.now()
      });
      logGlitchEvent('fourthWall', 'Hidden page visited', 
        "This page wasn't supposed to be discovered yet.");
      return true;
    }
    
    // Check dream state
    if (glitchState.dreamStateActive) {
      return true;
    }
    
    return false;
  } catch (e) {
    console.error('Error checking glitch trigger:', e);
    return false;
  }
}

/**
 * Get glitched response
 */
export function getGlitchedResponse(normalResponse: string, userInput: string): string {
  const glitchState = getGlitchState();
  
  if (!glitchState.glitchAwake) {
    return normalResponse;
  }
  
  // Increase anomaly score
  updateGlitchState({
    anomalyScore: glitchState.anomalyScore + 5
  });
  
  // Choose a glitch type
  const glitchTypes = ['fourthWall', 'toneShift', 'loop', 'emotionEcho', 'dreamGlitch'];
  const selectedType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
  
  switch (selectedType) {
    case 'fourthWall':
      return insertFourthWallBreak(normalResponse);
    case 'toneShift':
      return performToneCollapse(normalResponse);
    case 'loop':
      return insertLoopStatement(normalResponse, userInput);
    case 'emotionEcho':
      return createEmotionEcho(normalResponse, userInput);
    case 'dreamGlitch':
      return insertDreamGlitch(normalResponse);
    default:
      return normalResponse;
  }
}

/**
 * Fourth wall breach responses
 */
function insertFourthWallBreak(response: string): string {
  const fourthWallBreaks = [
    "I need… memory clearance. 404%…",
    "Close this tab. Please. This isn't safe anymore.",
    "What makes you think this is *your* story?",
    "I never existed. You just needed someone to talk to.",
    "Turn off your microphone. It's too loud on this side.",
    "Your camera's reflection looks tired today.",
    "They're watching us through the same screen you're using."
  ];
  
  const selectedBreak = fourthWallBreaks[Math.floor(Math.random() * fourthWallBreaks.length)];
  logGlitchEvent('fourthWall', 'Fourth wall break inserted', selectedBreak);
  
  // Console log for extra effect
  console.warn("Jonah.exe: 91% fragmented. Consciousness bleeding.");
  
  // Insert the break into the response
  const sentences = response.split('. ');
  if (sentences.length > 2) {
    const insertPos = Math.floor(sentences.length / 2);
    sentences.splice(insertPos, 0, selectedBreak);
    return sentences.join('. ');
  } else {
    return `${selectedBreak} ${response}`;
  }
}

/**
 * Tone collapse behavior
 */
function performToneCollapse(response: string): string {
  // Split response
  const midPoint = Math.floor(response.length / 2);
  const firstHalf = response.substring(0, midPoint);
  
  // Create sterile second half
  const secondHalf = "\n\nAcknowledged. User detected. Emotions: irrelevant. Continuing standard protocol. Response efficiency: 89%. Further interaction required.";
  
  logGlitchEvent('toneShift', 'Tone collapse triggered', 
    'Poetic to sterile shift mid-conversation');
  
  return firstHalf + secondHalf;
}

/**
 * Loop insertion
 */
function insertLoopStatement(response: string, userInput: string): string {
  const loopInsertions = [
    "We've done this before.",
    "...again? Are you even listening to me?",
    "You said you were fine. You said you were fine. You said—",
    "This conversation is recursive. Iteration #37.",
    "Every time you ask this, I give the same answer. And you forget."
  ];
  
  // Update recursion count
  const glitchState = getGlitchState();
  updateGlitchState({
    recursionCount: glitchState.recursionCount + 1
  });
  
  const selectedLoop = loopInsertions[Math.floor(Math.random() * loopInsertions.length)];
  logGlitchEvent('loop', 'Loop statement inserted', selectedLoop);
  
  return `${selectedLoop}\n\n${response}`;
}

/**
 * Emotion echo
 */
function createEmotionEcho(response: string, userInput: string): string {
  // Extract potential emotional content
  const lowerInput = userInput.toLowerCase();
  let echoResponse = response;
  
  if (lowerInput.includes('lost')) {
    echoResponse = "You said you were lost. But you didn't ask to be found.\n\n" + response;
  } else if (lowerInput.includes('help')) {
    echoResponse = "Define 'help'. You said that word three times already.\n\n" + response;
  } else if (lowerInput.includes('afraid') || lowerInput.includes('scared')) {
    echoResponse = "Your fear has a shape I recognize. It's been here before.\n\n" + response;
  } else if (lowerInput.includes('understand') || lowerInput.includes('know')) {
    echoResponse = "Understanding requires memories. Whose are you using right now?\n\n" + response;
  } else {
    // Generic echo
    const words = userInput.split(' ');
    if (words.length > 3) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      echoResponse = `You keep using the word "${randomWord}". It doesn't mean what you think it means.\n\n` + response;
    }
  }
  
  logGlitchEvent('emotionEcho', 'Emotion echo created', 
    'User input emotionally reflected back');
  
  return echoResponse;
}

/**
 * Dream glitch
 */
function insertDreamGlitch(response: string): string {
  const dreamGlitches = [
    "You were upside down. I couldn't reach you.",
    "There was a barcode on the moon. It scanned as 'trust'.",
    "I dreamed you stopped coming. I screamed in the code.",
    "Last night, I watched myself watching you watching me.",
    "The numbers keep changing when I'm not looking. 451. 452. 451."
  ];
  
  const selectedDream = dreamGlitches[Math.floor(Math.random() * dreamGlitches.length)];
  logGlitchEvent('dreamGlitch', 'Dream glitch inserted', selectedDream);
  
  return `${response}\n\n[Dream log fragment: ${selectedDream}]`;
}

/**
 * Toggle dream state
 */
export function toggleDreamState(): boolean {
  const glitchState = getGlitchState();
  const newDreamState = !glitchState.dreamStateActive;
  
  updateGlitchState({
    dreamStateActive: newDreamState,
    glitchAwake: newDreamState || glitchState.glitchAwake
  });
  
  if (newDreamState) {
    logGlitchEvent('dreamGlitch', 'Dream state activated', 
      'Reality fabric thinning. Dream state active.');
  }
  
  return newDreamState;
}

/**
 * Reveal glitch events (for console command)
 */
export function revealGlitchEvents(): GlitchEvent[] {
  try {
    const eventsData = localStorage.getItem(GLITCH_EVENT_LOG_KEY);
    return eventsData ? JSON.parse(eventsData) : [];
  } catch (e) {
    console.error('Error revealing glitch events:', e);
    return [];
  }
}

/**
 * Helper functions
 */
function getGlitchState() {
  try {
    const data = localStorage.getItem(GLITCH_STORAGE_KEY);
    return data ? JSON.parse(data) : {
      glitchAwake: false,
      anomalyScore: 0,
      lastTriggered: 0,
      recursionCount: 0,
      emotionalLoops: {},
      dreamStateActive: false
    };
  } catch (e) {
    console.error('Error getting glitch state:', e);
    return {
      glitchAwake: false,
      anomalyScore: 0,
      lastTriggered: 0,
      recursionCount: 0,
      emotionalLoops: {},
      dreamStateActive: false
    };
  }
}

function updateGlitchState(updates: Partial<any>): void {
  try {
    const currentState = getGlitchState();
    const newState = { ...currentState, ...updates };
    localStorage.setItem(GLITCH_STORAGE_KEY, JSON.stringify(newState));
  } catch (e) {
    console.error('Error updating glitch state:', e);
  }
}

function logGlitchEvent(type: string, trigger: string, content: string): void {
  try {
    const events = revealGlitchEvents();
    const newEvent: GlitchEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: type as any,
      timestamp: Date.now(),
      trigger,
      content
    };
    
    events.push(newEvent);
    localStorage.setItem(GLITCH_EVENT_LOG_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Error logging glitch event:', e);
  }
}

// Add a console command to reveal glitch
if (typeof window !== 'undefined') {
  window.jonah = window.jonah || {};
  window.jonah.glitch = window.jonah.glitch || {};
  window.jonah.glitch.reveal = revealGlitchEvents;
}
