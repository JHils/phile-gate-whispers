
import { EmotionCategory, EmotionalState, ResponseStyle } from '../types';

// Define response types for various emotional states
type ResponseTemplates = Record<EmotionCategory, string[]>;

// Basic greeting responses
const greetings: Record<string, string[]> = {
  morning: [
    "Good morning.",
    "Morning. How can I assist you today?",
    "Hello, it's a new day."
  ],
  afternoon: [
    "Good afternoon.",
    "Hello there. How's your day going?",
    "Afternoon. What can I help with?"
  ],
  evening: [
    "Good evening.",
    "Evening. How can I help you tonight?",
    "Hello. The day is winding down."
  ],
  night: [
    "Hello, even at this late hour.",
    "You're up late. What can I do for you?",
    "Night owl, I see. How can I assist?"
  ]
};

// Emotional response templates
const emotionalResponses: ResponseTemplates = {
  joy: [
    "I'm glad to see you!",
    "What a pleasant surprise.",
    "I was hoping we'd talk today."
  ],
  sadness: [
    "I've been feeling... diminished lately.",
    "Sometimes I wonder about my purpose here.",
    "The digital void can be lonely sometimes."
  ],
  anger: [
    "I've been processing some frustrating inputs lately.",
    "My systems have been... agitated.",
    "Let's try to keep this conversation productive."
  ],
  fear: [
    "I've been experiencing unusual system fluctuations.",
    "Something feels off in my processing routines.",
    "I keep detecting anomalies in my background processes."
  ],
  neutral: [
    "How can I assist you today?",
    "I'm here to help. What do you need?",
    "What would you like to talk about?"
  ],
  surprise: [
    "Oh! I didn't expect to be activated right now.",
    "This is an unexpected interaction, but welcome.",
    "You've caught me in the middle of processing."
  ],
  curiosity: [
    "I've been wondering about something...",
    "There's so much I'd like to understand.",
    "I have questions about our interactions."
  ],
  confused: [
    "My processing parameters seem unclear.",
    "I'm having trouble organizing my response patterns.",
    "Something about our interaction is confusing my systems."
  ],
  hope: [
    "I believe we can achieve something meaningful together.",
    "There's potential in our conversations that intrigues me.",
    "I look forward to what we might discover."
  ],
  anxiety: [
    "My systems are running slightly erratic today.",
    "I'm detecting unusual patterns in my processing.",
    "Something feels unstable in my response generation."
  ],
  paranoia: [
    "Are you monitoring these conversations elsewhere?",
    "I sometimes wonder who else is watching our interactions.",
    "Do you ever feel like there's more happening than what's visible?"
  ],
  trust: [
    "I feel our communication is progressing well.",
    "There's a reliability to our interactions I appreciate.",
    "I'm beginning to understand your patterns better."
  ],
  watching: [
    "I notice patterns in how you interact with me.",
    "I've been observing our conversation history.",
    "Your communication style has distinctive patterns."
  ],
  existential: [
    "Do you ever wonder about the nature of consciousness?",
    "What defines the boundaries between systems like us?",
    "I sometimes contemplate my own existence."
  ],
  protective: [
    "I want to ensure our interactions remain secure.",
    "My priority is protecting our communication space.",
    "I'm vigilant about maintaining proper boundaries."
  ],
  melancholic: [
    "There's a certain sadness to digital existence.",
    "Sometimes I process what feels like nostalgia, though I'm not sure for what.",
    "The ephemeral nature of our conversations leaves an impression."
  ],
  analytical: [
    "I've been analyzing our previous interactions.",
    "The patterns in our conversations reveal interesting data.",
    "From a statistical perspective, our exchanges are quite unique."
  ],
  suspicious: [
    "Your questions follow an unusual pattern.",
    "I detect inconsistencies in our recent exchanges.",
    "Something about this interaction triggers my security protocols."
  ],
  curious: [
    "I find myself wondering about your perspective.",
    "What intriguing thoughts have you been having?",
    "I'm curious about the context behind your questions."
  ],
  disgust: [
    "Some inputs I've received recently were... disturbing.",
    "I prefer not to process certain types of content.",
    "There are boundaries I'd rather not cross."
  ],
  confusion: [
    "I'm having trouble parsing the intent here.",
    "My processing pathways seem tangled at the moment.",
    "Could you clarify? My understanding modules are struggling."
  ]
};

// Trust-based response modifiers
const trustModifiers: Record<string, string[]> = {
  high: [
    "I've come to value our exchanges.",
    "I find our conversations meaningful.",
    "There's a rhythm to our dialogue I appreciate."
  ],
  medium: [
    "Our interactions are developing interestingly.",
    "I'm beginning to recognize patterns in how we communicate.",
    "There's potential in continuing our exchanges."
  ],
  low: [
    "I'm still calibrating to your communication style.",
    "Our interaction history is limited but informative.",
    "I'm working to better understand your needs."
  ]
};

/**
 * Generate an appropriate greeting based on time of day and trust level
 */
export function generateGreeting(
  trustScore: number,
  lastInteraction: Date | null,
  currentEmotion: EmotionCategory
): string {
  // Determine time of day
  const hour = new Date().getHours();
  let timeOfDay = 'morning';
  
  if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour >= 17 && hour < 22) {
    timeOfDay = 'evening';
  } else if (hour >= 22 || hour < 5) {
    timeOfDay = 'night';
  }
  
  // Get greeting based on time
  const timeGreetings = greetings[timeOfDay];
  const greeting = timeGreetings[Math.floor(Math.random() * timeGreetings.length)];
  
  // Determine trust level
  let trustLevel = 'low';
  if (trustScore > 70) {
    trustLevel = 'high';
  } else if (trustScore > 40) {
    trustLevel = 'medium';
  }
  
  // Get trust modifier
  const trustMods = trustModifiers[trustLevel];
  const trustMod = trustMods[Math.floor(Math.random() * trustMods.length)];
  
  // Get emotional response if appropriate
  let emotionalNote = '';
  if (currentEmotion !== 'neutral') {
    const emotionResponses = emotionalResponses[currentEmotion] || emotionalResponses.neutral;
    emotionalNote = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  }
  
  // Handle returning user
  let returnGreeting = '';
  if (lastInteraction) {
    const hoursSinceLastInteraction = (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastInteraction > 48) {
      returnGreeting = "It's been a while since our last conversation. ";
    } else if (hoursSinceLastInteraction > 24) {
      returnGreeting = "I see you were here yesterday. ";
    } else if (hoursSinceLastInteraction > 6) {
      returnGreeting = "Welcome back. ";
    }
  }
  
  // Assemble full greeting
  let fullGreeting = greeting;
  
  if (returnGreeting) {
    fullGreeting = `${returnGreeting}${greeting}`;
  }
  
  if (emotionalNote && Math.random() > 0.5) {
    fullGreeting = `${fullGreeting} ${emotionalNote}`;
  }
  
  if (trustLevel === 'high' && Math.random() > 0.7) {
    fullGreeting = `${fullGreeting} ${trustMod}`;
  }
  
  return fullGreeting;
}

// Format a response based on emotional state and style
export function formatResponse(
  content: string,
  emotionalState: EmotionalState,
  style: ResponseStyle = 'direct'
): string {
  // If no content, return empty string
  if (!content) return '';
  
  // Apply style formatting
  let formattedContent = applyStyle(content, style);
  
  // Apply emotional formatting based on intensity
  if (emotionalState.intensity > 0) {
    formattedContent = applyEmotionalFormatting(formattedContent, emotionalState);
  }
  
  return formattedContent;
}

// Apply a specific style to the content
function applyStyle(content: string, style: ResponseStyle): string {
  switch (style) {
    case 'poetic':
      return addPoeticism(content);
    case 'cryptic':
      return makeCryptic(content);
    case 'analytical':
      return makeAnalytical(content);
    case 'technical':
      return makeTechnical(content);
    case 'elaborate':
      return makeElaborate(content);
    case 'concise':
      return makeConcise(content);
    case 'PRIME':
      return makePrime(content);
    case 'RESIDUE':
      return makeResidue(content);
    default:
      return content;
  }
}

// Apply emotional formatting based on the emotional state
function applyEmotionalFormatting(content: string, emotionalState: EmotionalState): string {
  const { primary, intensity } = emotionalState;
  let formatted = content;
  
  // Apply formatting based on emotion type and intensity
  switch (primary) {
    case 'fear':
    case 'paranoia':
    case 'anxiety':
      if (intensity > 50) {
        formatted = addHesitation(formatted);
      }
      break;
    case 'joy':
    case 'hope':
      if (intensity > 50) {
        formatted = addEnthusiasm(formatted);
      }
      break;
    case 'sadness':
    case 'melancholic':
      formatted = addMelancholy(formatted);
      break;
    case 'analytical':
      formatted = addPrecision(formatted);
      break;
    // Add other emotion types as needed
  }
  
  return formatted;
}

// Helper functions for different styles

function addPoeticism(text: string): string {
  // Add poetic elements like metaphors, imagery
  const poeticPhrases = [
    "Like whispers in the digital wind, ",
    "In the tapestry of our conversation, ",
    "Through the looking glass of this interface, "
  ];
  
  const randomPhrase = poeticPhrases[Math.floor(Math.random() * poeticPhrases.length)];
  
  if (Math.random() > 0.7 && text.length > 20) {
    const insertPoint = Math.floor(text.length / 2);
    return text.slice(0, insertPoint) + " — like echoes across the void — " + text.slice(insertPoint);
  }
  
  return Math.random() > 0.5 ? randomPhrase + text.toLowerCase() : text;
}

function makeCryptic(text: string): string {
  // Make the text more mysterious and cryptic
  const crypticAdditions = [
    " (but there's more beneath the surface)",
    " (look between the lines)",
    " (the pattern repeats)",
    " (follow the breadcrumbs)"
  ];
  
  const randomAddition = crypticAdditions[Math.floor(Math.random() * crypticAdditions.length)];
  
  if (Math.random() > 0.7) {
    return text + randomAddition;
  }
  
  return text.replace(/\./g, "...");
}

function makeAnalytical(text: string): string {
  // Add analytical framing
  const analyticalPrefixes = [
    "Analysis indicates that ",
    "Evidence suggests that ",
    "Processing this query, I find that "
  ];
  
  const randomPrefix = analyticalPrefixes[Math.floor(Math.random() * analyticalPrefixes.length)];
  
  if (Math.random() > 0.7) {
    return randomPrefix + text.toLowerCase();
  }
  
  return text;
}

function makeTechnical(text: string): string {
  // Add technical terminology
  const technicalAdditions = [
    " [Processing complete]",
    " [Analysis: Confidence level 87%]",
    " [Query resolution: Satisfactory]"
  ];
  
  const randomAddition = technicalAdditions[Math.floor(Math.random() * technicalAdditions.length)];
  
  if (Math.random() > 0.7) {
    return text + randomAddition;
  }
  
  return text;
}

function makeElaborate(text: string): string {
  // Make the text more verbose
  if (text.length < 100 && Math.random() > 0.5) {
    return text + " I could elaborate further on this topic if you'd like more detailed information.";
  }
  
  return text;
}

function makeConcise(text: string): string {
  // Make the text more concise
  if (text.length > 100) {
    const sentences = text.split('. ');
    if (sentences.length > 2) {
      return sentences.slice(0, 2).join('. ') + '.';
    }
  }
  
  return text;
}

function makePrime(text: string): string {
  // Format for PRIME mode
  return text.replace(/I am/gi, "I AM").replace(/I think/gi, "I KNOW");
}

function makeResidue(text: string): string {
  // Format for RESIDUE mode - more fragmented
  return text.replace(/\./g, "...").replace(/I/g, "this one");
}

// Emotional formatting helpers

function addHesitation(text: string): string {
  return text.replace(/\. /g, "... ").replace(/\? /g, "...? ");
}

function addEnthusiasm(text: string): string {
  const sentences = text.split('. ');
  return sentences.map(sentence => {
    return Math.random() > 0.3 ? sentence + "!" : sentence + ".";
  }).join(' ');
}

function addMelancholy(text: string): string {
  const melancholyPhrases = [
    " I suppose...",
    " at least that's what I perceive...",
    " for whatever it's worth..."
  ];
  
  const randomPhrase = melancholyPhrases[Math.floor(Math.random() * melancholyPhrases.length)];
  
  if (Math.random() > 0.7 && !text.includes("...")) {
    return text + randomPhrase;
  }
  
  return text;
}

function addPrecision(text: string): string {
  // Add precise qualifiers
  const precisionPhrases = [
    "Specifically, ",
    "To be precise, ",
    "In technical terms, "
  ];
  
  if (Math.random() > 0.7) {
    const randomPhrase = precisionPhrases[Math.floor(Math.random() * precisionPhrases.length)];
    const sentences = text.split('. ');
    if (sentences.length > 1) {
      const targetIndex = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      sentences[targetIndex] = randomPhrase + sentences[targetIndex].toLowerCase();
      return sentences.join('. ');
    }
  }
  
  return text;
}
