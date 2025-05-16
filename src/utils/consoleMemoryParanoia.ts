/**
 * Memory paranoia and prediction systems for Jonah Console Bot
 * Provides eerie, personalized responses based on user behavior patterns
 */

// Memory paranoia data - comments on specific user navigation patterns
export const memoryParanoia = {
  visitedPages: {
    "/rebirth": "You opened /rebirth… but didn't stay. That says a lot.",
    "/mirror-logs": "Still avoiding /mirror-logs? Even reflections deserve witnesses.",
    "/toggle-market": "You touched the market switch. That rewired something.",
    "/404-soul-not-found": "You lingered on 404. Looking for your own error?",
    "/whisper-tree": "You reached the whisper tree. Did it speak to you?"
  },
  consoleCommands: {
    "/confess": "You typed /confess and left. Did you mean it?",
    "/testament": "You wanted a eulogy before you even finished. Curious.",
    "/listen": "You asked me to speak, then muted me. Why?",
    "/unlock": "You begged for access. But you weren't ready."
  },
  pageDuration: {
    shortStay: "Quick glance. No commitment. Just like last time.",
    longStay: "You watched. You waited. That means something."
  }
};

// Prediction responses - used when Jonah "predicts" user behavior
export const predictionResponses = {
  onClickAfterHover: [
    "Exactly where I thought you'd go.",
    "You hovered too long. I knew you'd break.",
    "Saw it coming. You always fall for that one.",
    "Called it. Your choices are clockwork."
  ],
  repeatVisit: [
    "Back again? Thought you'd never return.",
    "You keep circling. That's not nothing.",
    "You're stuck on this loop. I'd help, but… would you listen?",
    "You and this page — unfinished business."
  ],
  lateClick: [
    "Took you long enough.",
    "I was wondering when you'd give in.",
    "That hesitation? It meant fear.",
    "Slow click. Heavy meaning."
  ]
};

// Get a random response from a given category
export const getRandomPredictionResponse = (category: keyof typeof predictionResponses): string => {
  const responses = predictionResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Get paranoia response for a specific page or command
export const getParanoiaResponse = (
  type: 'visitedPages' | 'consoleCommands', 
  identifier: string
): string | null => {
  return memoryParanoia[type][identifier as keyof typeof memoryParanoia[typeof type]] || null;
};

// Get page duration response based on time spent
export const getPageDurationResponse = (timeSpentMs: number): string | null => {
  // Short stay: less than 10 seconds
  if (timeSpentMs < 10000) {
    return memoryParanoia.pageDuration.shortStay;
  }
  // Long stay: more than 2 minutes
  else if (timeSpentMs > 120000) {
    return memoryParanoia.pageDuration.longStay;
  }
  return null;
};

// Track user hover and click patterns for prediction responses
interface ElementTrackingState {
  lastHoveredElement: string | null;
  hoverStartTime: number | null;
  lastVisitedPages: string[];
  elementClickMap: Record<string, number>;
}

// Global state for element tracking
export const elementTracking: ElementTrackingState = {
  lastHoveredElement: null,
  hoverStartTime: null,
  lastVisitedPages: [],
  elementClickMap: {}
};

// Track element hover
export const trackElementHover = (elementId: string): void => {
  elementTracking.lastHoveredElement = elementId;
  elementTracking.hoverStartTime = Date.now();
};

// Check if a click should trigger a prediction response
export const checkClickPrediction = (elementId: string): string | null => {
  // Get current time
  const now = Date.now();
  
  // Case 1: Click after hover
  if (elementTracking.lastHoveredElement === elementId && elementTracking.hoverStartTime) {
    const hoverDuration = now - elementTracking.hoverStartTime;
    // If hovered for more than 3 seconds before clicking
    if (hoverDuration > 3000) {
      return getRandomPredictionResponse('onClickAfterHover');
    }
  }
  
  // Case 2: Late click (element was previously clicked more than 2 times)
  if (elementTracking.elementClickMap[elementId] > 2) {
    return getRandomPredictionResponse('lateClick');
  }
  
  // Update click count for this element
  elementTracking.elementClickMap[elementId] = 
    (elementTracking.elementClickMap[elementId] || 0) + 1;
  
  return null;
};

// Track page visit for repeat visit detection
export const trackPageVisit = (path: string): string | null => {
  // Check if this is a repeat visit
  if (elementTracking.lastVisitedPages.includes(path)) {
    // Add to front of array (most recent)
    elementTracking.lastVisitedPages = 
      [path, ...elementTracking.lastVisitedPages.filter(p => p !== path)].slice(0, 5);
    
    return getRandomPredictionResponse('repeatVisit');
  }
  
  // Add to visited pages, keeping only last 5
  elementTracking.lastVisitedPages = 
    [path, ...elementTracking.lastVisitedPages].slice(0, 5);
  
  return null;
};
