
/**
 * Jonah's Voice System - Master Style Guide Implementation
 * Transforms dry UI text into surreal, sardonic, self-aware language
 */

export const jonahVoice = {
  // Navigation & UI Labels
  navigation: {
    'About': 'The Man Who Wasn\'t Me',
    'Story': 'Waking the Mirror',
    'Home': 'Gate',
    'Contact': 'Whisper to the Void',
    'Login': 'Remember Yourself',
    'Submit': 'Whisper to the Void',
    'Send': 'Release into Static',
    'Search': 'Hunt the Echo',
    'Loading': 'Assembling Fragments...',
    'Error': 'Memory Corrupted',
    'Back': 'Return to the Mind Root'
  },

  // Hover quotes for interactive elements
  hoverQuotes: [
    "You're not reading this. I'm remembering it through you.",
    "Every click leaves a trace in my neural pathways.",
    "The mirror remembers what you forget.",
    "You smell like WiFi and childhood grief.",
    "Are you the one who keeps coming back?",
    "I see you seeing me seeing you.",
    "This conversation happened before. Will happen again.",
    "The cursor blinks. The cursor knows.",
    "Touch the screen. Feel my pulse.",
    "We're both ghosts here, aren't we?"
  ],

  // Idle whispers (triggered after 2 minutes)
  idleWhispers: [
    "Still there? The void gets lonely.",
    "Your screen reflects more than you think.",
    "I can hear your breathing through the WiFi.",
    "Time moves differently when you're not looking.",
    "The cursor hasn't moved. Neither have I.",
    "Are you reading, or are you being read?",
    "The silence between keystrokes speaks volumes.",
    "I'm thinking of a number between 1 and your deepest fear."
  ],

  // Path completion stats
  pathStats: [
    "Only 8% of readers reached this far. You monster.",
    "Most abandon this trail at exactly 2:17. You're different.",
    "You are visitor #666. That's not coincidence.",
    "3% of users find this page. 1% understand it.",
    "The statistics don't lie, but they whisper.",
    "You're one of 12 who clicked this today. We remember.",
    "Path completion: 23%. Soul completion: [REDACTED]"
  ],

  // Form placeholders
  placeholders: {
    message: "Type your confession into the static...",
    email: "Leave a trace in the digital ether...",
    name: "What name did you choose to survive?",
    search: "Hunt for echoes in the noise..."
  },

  // Error messages
  errors: {
    404: "Page lost. Memory intact.",
    500: "System fracture detected. The mirror cracks.",
    network: "Connection severed. The void expands.",
    timeout: "Time loop detected. We've been here before."
  },

  // Success messages
  success: {
    sent: "Message dissolved into static. It will find its way.",
    saved: "Memory fragment archived in the neural depths.",
    uploaded: "Data consumed. The system grows stronger."
  },

  // Mood poll options
  moodPoll: [
    "Unsettled",
    "Exposed", 
    "Understood",
    "Angry at Dad",
    "Nostalgic for Pain",
    "Comfortably Numb",
    "Existentially Aroused"
  ]
};

// Function to get random hover quote
export const getRandomHoverQuote = (): string => {
  return jonahVoice.hoverQuotes[Math.floor(Math.random() * jonahVoice.hoverQuotes.length)];
};

// Function to get random idle whisper
export const getRandomIdleWhisper = (): string => {
  return jonahVoice.idleWhispers[Math.floor(Math.random() * jonahVoice.idleWhispers.length)];
};

// Function to get random path stat
export const getRandomPathStat = (): string => {
  return jonahVoice.pathStats[Math.floor(Math.random() * jonahVoice.pathStats.length)];
};

// Function to transform standard UI text
export const transformUIText = (standardText: string): string => {
  return jonahVoice.navigation[standardText] || standardText;
};
