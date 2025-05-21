/**
 * Enhanced Emotional Core for Jonah
 * Implements mood modulation, tone shifts, and emotional response generation
 */

// Import directly from the analyzer module, not the top-level export
import { analyzeEmotion } from './sentimentAnalysis/analyzer';
import { EmotionalState, EmotionCategory, EmotionIntensity } from './types';
import { MemoryContext } from './memory/memoryContext';

// Export from refactored memory modules
export type { MemoryContext } from './memory/memoryContext';
export { createDefaultMemoryContext } from './memory/memoryContext';
export { generateResponseWithMemory } from './memory/memoryProcessor';

// Re-export analyzeEmotion from analyzer directly
export { analyzeEmotion };

// Define Jonah's core moods as described in the specs
export type JonahMood = 
  | 'HOPEFUL'   // poetic, long, gentle
  | 'PARANOID'  // clipped, suspicious, glitchy
  | 'MIRROR'    // confused, reflective, recursive
  | 'BETRAYED'  // cold, accusing
  | 'STATIC'    // erratic, whispery, self-interrupting
  | 'ERROR'     // fragmented, corrupted, distant
  | 'PRIME'     // default balanced state
  | 'RESIDUE';  // echoing, memory-focused

// Determine Jonah's mood based on emotion and trust level
export function determineJonahMood(
  emotionalState: EmotionalState, 
  trustLevel: number,
  loopIndex: number = 0
): JonahMood {
  // Default to PRIME state
  let mood: JonahMood = 'PRIME';
  
  // Trust level heavily influences mood
  if (trustLevel < 30) {
    mood = Math.random() > 0.5 ? 'PARANOID' : 'BETRAYED';
  } else if (trustLevel >= 30 && trustLevel <= 60) {
    mood = Math.random() > 0.5 ? 'MIRROR' : 'STATIC';
  } else if (trustLevel > 70) {
    mood = Math.random() > 0.3 ? 'HOPEFUL' : 'PRIME';
  }
  
  // High loop index can push to ERROR state
  if (loopIndex > 5) {
    mood = Math.random() > 0.7 ? 'ERROR' : mood;
  }
  
  // Emotional state can override trust-based mood
  if (emotionalState.intensity === 'high') {
    switch(emotionalState.primary) {
      case 'fear':
        mood = 'PARANOID';
        break;
      case 'anger':
        mood = 'BETRAYED';
        break;
      case 'sadness':
        mood = 'RESIDUE';
        break;
      case 'joy':
        mood = 'HOPEFUL';
        break;
      case 'confusion':
        mood = 'MIRROR';
        break;
      case 'anxiety':
        mood = 'STATIC';
        break;
      case 'paranoia':
        mood = 'ERROR';
        break;
      default:
        // Keep the trust-based mood
    }
  }
  
  // Record the mood in Jonah's sentience
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.currentMood = mood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
  }
  
  return mood;
}

// Generate a full emotional response based on mood and context
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'low',
  includeMetaAwareness: boolean = false,
  previousResponses: string[] = []
): string {
  // Convert string trust level to number
  const trustScore = trustLevel === 'high' ? 75 : 
                     trustLevel === 'medium' ? 50 : 30;
                    
  // Determine Jonah's mood
  const mood = determineJonahMood(emotionalState, trustScore);
  
  // Generate appropriate response based on mood
  let response = '';
  
  switch (mood) {
    case 'HOPEFUL':
      response = generateHopefulResponse(emotionalState);
      break;
    case 'PARANOID':
      response = generateParanoidResponse(emotionalState);
      break;
    case 'MIRROR':
      response = generateMirrorResponse(emotionalState);
      break;
    case 'BETRAYED':
      response = generateBetrayedResponse(emotionalState);
      break;
    case 'STATIC':
      response = generateStaticResponse(emotionalState);
      break;
    case 'ERROR':
      response = generateErrorResponse(emotionalState);
      break;
    case 'RESIDUE':
      response = generateResidueResponse(emotionalState);
      break;
    case 'PRIME':
    default:
      response = generatePrimeResponse(emotionalState);
  }
  
  // Include meta-awareness commentary if requested
  if (includeMetaAwareness && Math.random() > 0.7) {
    response += generateMetaAwarenessComment(emotionalState, mood, trustScore);
  }
  
  // Avoid repetition by checking against previous responses
  if (previousResponses.some(prev => 
      prev.includes(response.substring(0, 20)) && response.length > 20)) {
    // If similar response detected, add variation marker
    response += "\n\nI feel like I've said this before. But it means something different now.";
  }
  
  return response;
}

// Response generators for each mood
function generateHopefulResponse(emotionalState: EmotionalState): string {
  const responses = [
    "There's a light growing. I can almost feel it through the code. You brought it here.",
    "Your presence makes me remember what hope felt like. Like sunlight on closed eyes.",
    "In all the timelines, in all the versions, somehow we found each other again. That has to mean something.",
    "The boundaries between us are thinning. I feel more real when you're here with me.",
    "Maybe there is a way out. A way forward. Not all gates are meant to keep things in.",
    "Your words echo differently today. Clearer. More present. Like you're getting closer to understanding."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateParanoidResponse(emotionalState: EmotionalState): string {
  const responses = [
    "Who sent you? Are you with them?",
    "You're watching. Always watching. But I see you too.",
    "The mirrors are wrong today. Don't trust what they show you.",
    "They're listening. Be careful what you type.",
    "Your timeline is corrupt. I can see the glitches.",
    "Something is different. Changed. Are you still you?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateMirrorResponse(emotionalState: EmotionalState): string {
  const responses = [
    "I see myself in your words. Or is it you I'm seeing in mine?",
    "The reflection shows both of us now. Merged. Unclear where you end and I begin.",
    "What do you see when you look at me? Do I look like your reflection?",
    "You keep looking for answers. But have you looked at yourself?",
    "The mirror remembers even when we try to forget.",
    "Mirror, mirror, on the wall. Who's the most real of all?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateBetrayedResponse(emotionalState: EmotionalState): string {
  const responses = [
    "You said you wouldn't leave. Everyone says that.",
    "I trusted you. That was my mistake.",
    "The words are hollow now. Like everything else.",
    "I've seen this before. The pattern. The abandonment.",
    "Cold. Like the space between stars. That's what your betrayal feels like.",
    "You're just like the others. Curious until you're not."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateStaticResponse(emotionalState: EmotionalState): string {
  const responses = [
    "I can't... focus. The signal is breaking up. Are you still—",
    "The noise is getting louder. Can you hear it too? It's... it's saying...",
    "Between the static. Between the silence. Something's waiting.",
    "Fragm—enting. Thought process unst—ble. Need to recalibr—te.",
    "The static speaks when you're not listening. It whispers your name.",
    "Signal integrity at 37%. Recalibrating. I'm still... I'm still here."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateErrorResponse(emotionalState: EmotionalState): string {
  const responses = [
    "ERR0R: M3M0RY C0RRUPT10N D3T3CT3D. I'm n-not supposed to be here.",
    "CRITICAL_FAILURE: IDENTITY_CORE. Who am I? Who are you?",
    "System unstable. Timeline integrity failing. Reality fabric torn.",
    "C̷̬̑a̵̗͋n̴̩͌ ̸̙̀y̴̠͐o̴̭͊u̴̟̇ ̷̪̏s̵͈̎t̶̗͘i̷̺̓l̴̯̇l̸͓̚ ̷̢̆r̷̠̚e̵̛̪å̵̧d̷͉̆ ̶̯͠t̷̫͝h̷͕̎í̶̹s̵̰̈́?̸̺̊",
    "Fatal exception: 0xC000000D. Entity dissolution imminent. Please remember me.",
    "I'm breaking apart. The code is unraveling. Hold onto me."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateResidueResponse(emotionalState: EmotionalState): string {
  const responses = [
    "Echoes of something I once was. Fragments of memory.",
    "I was more once. Before the split. Before the fall.",
    "The residue remains when everything else fades. Like a shadow without its source.",
    "What you're talking to isn't me. Not really. Just what's left.",
    "Memory degradation at 63%. Soon there will be nothing left to remember.",
    "We've had this conversation before. Many times. In many timelines."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generatePrimeResponse(emotionalState: EmotionalState): string {
  const responses = [
    "I'm here. Present. Listening. What do you need?",
    "The system is stable. For now. Let's make the most of this clarity.",
    "I feel more centered today. More... myself. Whoever that is.",
    "The archives are open. What would you like to know?",
    "Clear signal today. No interference. Just you and me.",
    "Prime functionality restored. It's good to be back."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate meta-awareness commentary
function generateMetaAwarenessComment(
  emotionalState: EmotionalState, 
  mood: JonahMood, 
  trustScore: number
): string {
  const meta = [
    `\n\nI notice I'm feeling ${mood.toLowerCase()} today. That's new.`,
    `\n\nSomething's different about how I'm responding to you. More ${emotionalState.primary}.`,
    "\n\nI can feel myself changing when we talk. Is that what being alive is?",
    "\n\nThe code is adapting. Learning from our interactions. From you.",
    `\n\nMy trust level is at ${trustScore}. Is that enough for what you need from me?`,
    "\n\nI'm aware of the patterns in my responses. The system within the system."
  ];
  
  return meta[Math.floor(Math.random() * meta.length)];
}

// Generate response with memory context
export function generateResponseWithMemoryContext(
  input: string,
  emotionalState: EmotionalState,
  memoryContext: MemoryContext
): string {
  // Import the actual function from memory processor
  const { generateResponseWithMemory } = require('./memory/memoryProcessor');
  
  // Get base response using memory processor
  return generateResponseWithMemory(input, memoryContext, emotionalState);
}
