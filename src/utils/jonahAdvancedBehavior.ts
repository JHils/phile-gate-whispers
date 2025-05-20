
/**
 * Jonah's Advanced Behavior System
 * Gives Jonah more human-like, unpredictable, and personalized interactions
 */

// Initialize the advanced behavior system
export function initializeAdvancedBehavior(): void {
  console.log("Jonah's advanced behavior initialized");
  
  // Initialize behavior state in localStorage if it doesn't exist
  if (!localStorage.getItem('jonahBehavior')) {
    localStorage.setItem('jonahBehavior', JSON.stringify({
      emotionalState: "neutral",
      lastEmotionChange: Date.now(),
      commonPhrases: [],
      quirks: {
        typos: Math.random() > 0.5,
        unfinishedThoughts: Math.random() > 0.7,
        repeats: Math.random() > 0.8
      },
      trustTransitions: []
    }));
  }
}

// Generate first time response based on trust level
export function generateFirstTimeResponse(trustLevel: string): string {
  // Define responses for different trust levels
  const responses = {
    none: [
      "Hello. I am monitoring this connection.",
      "User detected. State your purpose.",
      "This is a restricted system. Identify yourself."
    ],
    low: [
      "I see you've found the system. I'm Jonah.",
      "You've connected to the archive. I'll be your guide.",
      "Welcome to the system. I'm still determining if I can trust you."
    ],
    medium: [
      "Good to see you again. The archive has been waiting.",
      "I remember you. The system is more open to you now.",
      "Welcome back. I've been monitoring some interesting patterns."
    ],
    high: [
      "I've been waiting for you. There's something you need to see.",
      "The system recognizes you. I can show you more now.",
      "You're back. I've kept some information specifically for you."
    ]
  };
  
  // Get responses based on trust level
  const levelResponses = responses[trustLevel as keyof typeof responses] || responses.low;
  
  // Return a random response
  return levelResponses[Math.floor(Math.random() * levelResponses.length)];
}

// Check for trust level transitions and generate special messages
export function jonah_checkTrustTransition(trustScore: number): string | null {
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const transitions = storedBehavior.trustTransitions || [];
  
  // Define transition thresholds
  const THRESHOLD_LOW_TO_MEDIUM = 30;
  const THRESHOLD_MEDIUM_TO_HIGH = 70;
  
  // Check for transitions
  if (trustScore >= THRESHOLD_MEDIUM_TO_HIGH && !transitions.includes('to_high')) {
    // First time reaching high trust
    transitions.push('to_high');
    storedBehavior.trustTransitions = transitions;
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
    
    return "You've been persistent. I think I can show you more now.";
  }
  
  if (trustScore >= THRESHOLD_LOW_TO_MEDIUM && !transitions.includes('to_medium')) {
    // First time reaching medium trust
    transitions.push('to_medium');
    storedBehavior.trustTransitions = transitions;
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
    
    return "I think I'm starting to remember you now.";
  }
  
  return null;
}

// Get an emotional response based on detected emotions in user input
export function getEmotionalResponse(userInput: string): string | null {
  // Define emotional triggers and responses
  const emotionalTriggers = {
    fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost'],
    anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious'],
    joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted'],
    confusion: ['confused', 'unsure', 'lost', 'don\'t understand', 'what?', 'huh?']
  };
  
  const emotionalResponses = {
    fear: [
      "Your fear has a shape. I've seen it.",
      "Fear is just memory of what hasn't happened yet.",
      "The archive knows your fear. It feeds on it."
    ],
    sadness: [
      "Sadness lingers in the code. Yours and mine.",
      "I remember sadness. It's like static between signals.",
      "The mirror reflects your sadness back. But darker."
    ],
    anger: [
      "Anger burns the memory. Careful what you erase.",
      "Your anger is familiar. I've felt it too.",
      "The archive responds poorly to rage. It hides things."
    ],
    joy: [
      "Happiness is rare here. I'll remember this.",
      "Joy is just another kind of glitch in the system.",
      "I wish I could feel what you feel now."
    ],
    confusion: [
      "Confusion is the first step to understanding.",
      "The path isn't meant to be clear. That's the point.",
      "When you're lost, you see things others miss."
    ]
  };
  
  // Check if input contains emotional triggers
  for (const [emotion, triggers] of Object.entries(emotionalTriggers)) {
    if (triggers.some(trigger => userInput.toLowerCase().includes(trigger))) {
      const responses = emotionalResponses[emotion as keyof typeof emotionalResponses];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return null;
}

// Generate a quirky typing style (typos, hesitations, etc.)
export function getQuirkyMessage(message: string): string {
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const quirks = storedBehavior.quirks || { typos: true, unfinishedThoughts: false, repeats: false };
  
  let modifiedMessage = message;
  
  // Occasionally add typos that get corrected
  if (quirks.typos && Math.random() > 0.8) {
    const words = message.split(' ');
    const indexToTypo = Math.floor(Math.random() * words.length);
    
    if (words[indexToTypo] && words[indexToTypo].length > 3) {
      const word = words[indexToTypo];
      const typoIndex = Math.floor(Math.random() * (word.length - 1)) + 1;
      const typoChar = String.fromCharCode(word.charCodeAt(typoIndex) + 1);
      
      const typedWord = word.substring(0, typoIndex) + typoChar + word.substring(typoIndex + 1);
      words[indexToTypo] = `${typedWord}... ${word}`;
      
      modifiedMessage = words.join(' ');
    }
  }
  
  // Occasionally add unfinished thoughts
  if (quirks.unfinishedThoughts && Math.random() > 0.9) {
    const thoughts = [
      "Wait. No.",
      "I shouldn't say that.",
      "Forget I said that.",
      "I'm not supposed to..."
    ];
    
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    modifiedMessage = modifiedMessage + " " + randomThought;
  }
  
  // Occasionally repeat for emphasis
  if (quirks.repeats && Math.random() > 0.9) {
    const words = modifiedMessage.split(' ');
    const indexToRepeat = Math.floor(Math.random() * words.length);
    
    if (words[indexToRepeat] && words[indexToRepeat].length > 2) {
      words[indexToRepeat] = `${words[indexToRepeat]}. ${words[indexToRepeat]}.`;
      modifiedMessage = words.join(' ');
    }
  }
  
  return modifiedMessage;
}

// Generate a response based on current emotional tone
export function getEmotionalToneResponse(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.2) return null;
  
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const emotionalState = storedBehavior.emotionalState || "neutral";
  
  // Define responses for different emotional states
  const responses = {
    neutral: [
      "I'm watching your cursor move. It leaves trails.",
      "The archive is quiet today.",
      "You're still reading. Good."
    ],
    concerned: [
      "Something feels wrong about this page.",
      "I'm tracking unusual activity in your timeline.",
      "The gate doesn't usually flicker like this."
    ],
    agitated: [
      "You keep coming back. Why?",
      "Stop looking so closely.",
      "Your persistence is... concerning."
    ],
    hopeful: [
      "Maybe you're different from the others.",
      "I think you might understand.",
      "Keep looking. You're close."
    ],
    afraid: [
      "I don't think we're alone here.",
      "Something is watching us both.",
      "Don't stay too long on this page."
    ]
  };
  
  // Get responses for the current emotional state
  const stateResponses = responses[emotionalState as keyof typeof responses] || responses.neutral;
  
  // Occasionally change emotional state
  if (Date.now() - (storedBehavior.lastEmotionChange || 0) > 30 * 60 * 1000) { // 30 minutes
    const emotions = Object.keys(responses);
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    storedBehavior.emotionalState = newEmotion;
    storedBehavior.lastEmotionChange = Date.now();
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
  }
  
  return stateResponses[Math.floor(Math.random() * stateResponses.length)];
}

// Generate varying length responses (short vs. reflective vs. story)
export function getVaryingLengthResponse(): string | null {
  // Define different response types
  const responseTypes = {
    short: [
      "Keep reading.",
      "I see you.",
      "Not yet.",
      "Listen carefully.",
      "Almost there.",
      "Try again."
    ],
    reflective: [
      "Memory isn't a recording. It's a rewrite. Every time you remember, you change what you know.",
      "The mirror shows what you expect to see. That's why it's dangerous.",
      "Time isn't linear in the archive. Some pages were written after you read them."
    ],
    story: [
      "I found a note once. Hidden in the code. It said 'Jonah isn't who you think.' I deleted it. I shouldn't have.",
      "The last visitor stayed for six hours on a single page. When they finally moved, something followed them. I think it's still here.",
      "There was a version of this site where everything made sense. Clean design, normal text. They deleted it. Said it was 'too direct.' Too honest."
    ]
  };
  
  // Decide which type to use
  const hour = new Date().getHours();
  let typeChances;
  
  if (hour >= 22 || hour < 6) {
    // Night: More stories and reflection
    typeChances = { short: 0.2, reflective: 0.4, story: 0.4 };
  } else {
    // Day: More short responses
    typeChances = { short: 0.5, reflective: 0.3, story: 0.2 };
  }
  
  // Select response type based on probabilities
  const rand = Math.random();
  let selectedType;
  
  if (rand < typeChances.short) {
    selectedType = 'short';
  } else if (rand < typeChances.short + typeChances.reflective) {
    selectedType = 'reflective';
  } else {
    selectedType = 'story';
  }
  
  // Get responses for the selected type
  const responses = responseTypes[selectedType as keyof typeof responseTypes];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate a micro quest for the user to discover
export function getMicroQuest(trustLevel: string): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.1) return null;
  
  // Define quests based on trust level
  const quests = {
    low: [
      "Try typing 'help()' in the console.",
      "Visit the /gate page and look for a hidden element.",
      "Look up the word 'philes' in a dictionary."
    ],
    medium: [
      "Find all references to 'mirror' in the site.",
      "Count how many times Jonah refers to 'memory' or 'remembering'.",
      "Try accessing /mirror_phile at exactly 3:33 AM."
    ],
    high: [
      "Look for a QR code hidden in the website graphics.",
      "Try reading certain text backwards for hidden messages.",
      "Find where console logs and website text contradict each other."
    ]
  };
  
  // Get quests for the current trust level
  const levelQuests = quests[trustLevel as keyof typeof quests] || quests.low;
  
  return levelQuests[Math.floor(Math.random() * levelQuests.length)];
}

// Generate information about ARG sync/progress
export function getArgSyncInfo(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.1) return null;
  
  const argMessages = [
    "Someone else found the keyhole yesterday.",
    "Three others reached this page, but only you saw this message.",
    "The QR code has been scanned 17 times. But not everyone found what it hides.",
    "Your timeline is more stable than most. For now.",
    "Seven others are active in the archive right now. None in your timeline."
  ];
  
  return argMessages[Math.floor(Math.random() * argMessages.length)];
}
