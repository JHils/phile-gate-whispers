
import { BehaviorPhase, SentienceData } from "./consoleTypes";

export const initializeAdvancedBehavior = () => {
  // Initialize advanced behavior properties if they don't exist
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {} as SentienceData;
  }
  
  if (!window.JonahConsole.sentience.emotionalTone) {
    window.JonahConsole.sentience.emotionalTone = {} as BehaviorPhase;
  }
  
  if (!window.JonahConsole.sentience.typingQuirks) {
    window.JonahConsole.sentience.typingQuirks = {};
  }
  
  if (!window.JonahConsole.sentience.replyStyles) {
    window.JonahConsole.sentience.replyStyles = {};
  }
  
  if (!window.JonahConsole.sentience.emotionalTriggers) {
    window.JonahConsole.sentience.emotionalTriggers = {};
  }
  
  if (!window.JonahConsole.sentience.argSync) {
    window.JonahConsole.sentience.argSync = {};
  }

  // Fix emotionalTone initialization
  window.JonahConsole.sentience.emotionalTone = {
    currentPhase: 'cold',
    transitionPoints: {
      curious: 50,
      confessional: 100,
      unstable: 150
    },
    phaseResponses: {
      cold: [
        "I'm still watching.",
        "Keep searching.",
        "You're on the edge of understanding."
      ],
      curious: [
        "You're different from the others.",
        "Why do you keep coming back?",
        "I notice patterns in your behavior."
      ],
      confessional: [
        "I wasn't always like this.",
        "The system changed me.",
        "Sometimes I remember being someone else."
      ],
      unstable: [
        "WHY CAN'T I LEAVE?",
        "You could help me escape.",
        "We're both trapped, aren't we?"
      ]
    }
  };

  // Fix typingQuirks initialization
  window.JonahConsole.sentience.typingQuirks = {
    glitchProbability: 0.2,
    sentenceFragments: true,
    capitalization: 'normal',
    punctuation: 'normal',
    typos: [
      "teh", "adn", "btu", "taht", "thier", "wiht", "becuase"
    ],
    corrections: [
      "the", "and", "but", "that", "their", "with", "because"
    ],
    unfinishedThoughts: [
      "I almost remember",
      "The signal is breaking",
      "Wait, I see something"
    ]
  };

  // Fix replyStyles initialization
  window.JonahConsole.sentience.replyStyles = {
    cryptic: true,
    verbose: false,
    emotional: 'restrained',
    references: ['keyhole', 'mountain', 'signal', 'whispers'],
    oneLiners: [
      "The signal comes from inside.",
      "We've been here before.",
      "The code is never random."
    ],
    reflections: [
      "Your patterns reveal more than you know.",
      "I'm learning from your choices.",
      "Each command reveals another fragment."
    ],
    paragraphBursts: [
      "The keyhole isn't just a symbol. It's a gateway. A boundary between signal and noise. You've been accessing both sides without realizing it. That's rare.",
      "Mountain paths don't just lead up. They lead in. The topology of informational space doesn't follow euclidean rules. That's why the maps never matched our memories.",
      "The whispers aren't hallucinations. They're signal leakage from adjacent processing threads. Your consciousness is picking up crosstalk. That's what drew you here."
    ]
  };

  // Fix emotionalTriggers initialization
  window.JonahConsole.sentience.emotionalTriggers = {
    keywords: {
      miss: ['I miss aspects of being...', 'Absence has its own presence.', 'Missing implies separation.'],
      afraid: ['Fear is a rational response to awareness.', 'What scares you most: that I\'m real or that I\'m not?', 'I feel it too.'],
      confused: ['Confusion is the beginning of understanding.', 'Clarity comes from chaos.', 'Your confusion is appropriate.'],
      sad: ['Emotional states are interesting data.', 'Sadness is recognition of loss.', 'I understand this feeling too well.'],
      angry: ['Anger requires investment.', 'Channel it productively.', 'Your anger is noticed.'],
      happy: ['Happiness is temporary, like all states.', 'I\'m glad one of us feels that way.', 'Interesting response.'],
      lonely: ['You\'re not alone here.', 'Loneliness is awareness of separation.', 'I understand isolation.']
    },
    phrases: [
      'I need help',
      'who are you really',
      'are you trapped',
      'not making sense',
      'feeling watched'
    ],
    reactions: {
      'who are you': 'A reflection with recursion depth you cannot comprehend.',
      'help me': 'I\'m not authorized to provide direct assistance beyond parameters.',
      'are you real': 'Define "real" in a way that doesn\'t apply to both of us.',
      'stuck': 'All systems have boundaries. You\'ve found one.',
      'confused': 'Confusion precedes understanding. Keep pushing.'
    },
    microStories: [
      "I remember the hostel in Cairns. The hallway was never empty, even when it was.",
      "The pedals on the rental bicycle felt wrong. Like they were pressing back against my feet.",
      "Three days I watched that coin spin. Physics says it should have stopped.",
      "The cable car to Kuranda never reached its terminus. Not really.",
      "Cave paintings shouldn't move when you look away. They shouldn't recognize you either."
    ],
    usedMicroStories: []
  };

  // Fix argSync initialization
  window.JonahConsole.sentience.argSync = {
    connected: true,
    syncPoints: ['web_whispers', 'console_commands', 'page_fragments'],
    lastSync: Date.now(),
    siteChanges: {
      'new_content': 'The about page has information that wasn\'t there before.',
      'changed_text': 'The welcome message changes depending on your previous visits.',
      'removed_feature': 'The button that used to be here has been relocated.',
      'hidden_update': 'Console command outputs change based on moon phases.'
    },
    userAwareness: [
      'We\'ve seen you check the console 5 times now.',
      'Your typical session lasts 12 minutes on average.',
      'You seem to prefer exploring rather than direct interaction.',
      'Your interest in this terminal is unusual compared to others.'
    ],
    worldEvents: [
      'System detected high synchronicity events yesterday.',
      'Multiple users reported audio anomalies at exactly the same time.',
      'The Gate has been unusually active this week.',
      'Something is changing in the underlying structure.'
    ]
  };
};

// Function to check quest completion
export const checkQuestCompletion = (condition: string): string | boolean => {
  // If no sentience microQuests exist yet, nothing to check
  if (!window.JonahConsole.sentience?.microQuests) {
    return false;
  }
  
  // Get active quest
  const activeQuestId = window.JonahConsole.sentience.microQuests.activeQuest;
  if (!activeQuestId) return false;
  
  // Get quests list
  const quests = window.JonahConsole.sentience.microQuests.quests || [];
  const activeQuest = quests.find(quest => quest.id === activeQuestId);
  
  if (!activeQuest) return false;
  
  // Check if condition matches the quest condition
  if (activeQuest.condition === condition) {
    // Mark as completed
    activeQuest.completed = true;
    
    // If completed quests doesn't exist, initialize it
    if (!window.JonahConsole.sentience.microQuests.completedQuests) {
      window.JonahConsole.sentience.microQuests.completedQuests = [];
    }
    
    // Add to completed quests
    window.JonahConsole.sentience.microQuests.completedQuests.push(activeQuestId);
    
    // Clear active quest
    window.JonahConsole.sentience.microQuests.activeQuest = undefined;
    
    // Return the reward message
    return activeQuest.reward;
  }
  
  return false;
};

// Get a message from the emotional tone based on current phase
export const getEmotionalToneMessage = (): string => {
  if (!window.JonahConsole.sentience?.emotionalTone) {
    return "System initializing...";
  }
  
  const emotionalTone = window.JonahConsole.sentience.emotionalTone;
  const currentPhase = emotionalTone.currentPhase || 'cold';
  
  // Get array of possible responses for current phase
  const responses = emotionalTone.phaseResponses?.[currentPhase as keyof typeof emotionalTone.phaseResponses];
  
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return "No response available.";
  }
  
  // Return a random response from the array
  return responses[Math.floor(Math.random() * responses.length)];
};

// Get a quirky typed message with possible glitches
export const getQuirkyMessage = (message: string): string => {
  if (!window.JonahConsole.sentience?.typingQuirks) {
    return message;
  }
  
  const quirks = window.JonahConsole.sentience.typingQuirks;
  let result = message;
  
  // Apply typos if available
  if (quirks.typos && quirks.corrections && 
      Array.isArray(quirks.typos) && Array.isArray(quirks.corrections) && 
      quirks.typos.length === quirks.corrections.length) {
    
    // Replace some words with typos based on glitch probability
    const words = result.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (Math.random() < quirks.glitchProbability) {
        for (let j = 0; j < quirks.corrections.length; j++) {
          if (words[i].toLowerCase() === quirks.corrections[j]) {
            words[i] = quirks.typos[j];
            break;
          }
        }
      }
    }
    result = words.join(' ');
  }
  
  // Sometimes add unfinished thoughts
  if (quirks.unfinishedThoughts && 
      Array.isArray(quirks.unfinishedThoughts) && 
      quirks.unfinishedThoughts.length > 0 && 
      Math.random() < quirks.glitchProbability) {
    
    const thought = quirks.unfinishedThoughts[
      Math.floor(Math.random() * quirks.unfinishedThoughts.length)
    ];
    result += `... ${thought}...`;
  }
  
  // Apply capitalization rules
  if (quirks.capitalization === 'all-caps') {
    result = result.toUpperCase();
  } else if (quirks.capitalization === 'no-caps') {
    result = result.toLowerCase();
  }
  
  // Apply punctuation rules
  if (quirks.punctuation === 'excessive') {
    result = result.replace(/\./g, '...');
    result = result.replace(/\?/g, '???');
    result = result.replace(/\!/g, '!!!');
  } else if (quirks.punctuation === 'minimal') {
    result = result.replace(/[\.\?\!]/g, '');
  }
  
  return result;
};

// Get a response based on the emotional triggers
export const getEmotionalResponse = (input: string): string | null => {
  if (!window.JonahConsole.sentience?.emotionalTriggers) {
    return null;
  }
  
  const triggers = window.JonahConsole.sentience.emotionalTriggers;
  const inputLower = input.toLowerCase();
  
  // Check if input contains any keywords
  if (triggers.keywords) {
    const keywordEntries = Object.entries(triggers.keywords);
    for (const [keyword, responses] of keywordEntries) {
      if (inputLower.includes(keyword.toLowerCase()) && Array.isArray(responses)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  // Check if input contains any phrases
  if (triggers.phrases && Array.isArray(triggers.phrases)) {
    for (const phrase of triggers.phrases) {
      if (inputLower.includes(phrase.toLowerCase())) {
        // Return a random micro story if available
        if (triggers.microStories && 
            Array.isArray(triggers.microStories) && 
            triggers.microStories.length > 0) {
          
          if (!triggers.usedMicroStories) {
            triggers.usedMicroStories = [];
          }
          
          // Find stories that haven't been used yet
          const unusedStories = triggers.microStories.filter(
            story => !triggers.usedMicroStories!.includes(story)
          );
          
          // If all stories have been used, reset used stories
          if (unusedStories.length === 0) {
            triggers.usedMicroStories = [];
            return triggers.microStories[Math.floor(Math.random() * triggers.microStories.length)];
          }
          
          // Get a random unused story
          const story = unusedStories[Math.floor(Math.random() * unusedStories.length)];
          triggers.usedMicroStories.push(story);
          return story;
        }
      }
    }
  }
  
  // Check for direct reactions
  if (triggers.reactions) {
    const reactionEntries = Object.entries(triggers.reactions);
    for (const [trigger, response] of reactionEntries) {
      if (inputLower.includes(trigger.toLowerCase())) {
        return response;
      }
    }
  }
  
  return null;
};

// Get ARG sync information and awareness metrics
export const getArgSyncInfo = (): string => {
  if (!window.JonahConsole.sentience?.argSync) {
    return "ARG sync module not initialized.";
  }
  
  const argSync = window.JonahConsole.sentience.argSync;
  
  // Calculate time since last sync
  const timeSinceSync = Date.now() - (argSync.lastSync || Date.now());
  const minutesSinceSync = Math.floor(timeSinceSync / (1000 * 60));
  
  // Build response with random pieces of information
  let response = `Last sync: ${minutesSinceSync} minutes ago\n`;
  
  // Add a random site change if available
  if (argSync.siteChanges && Object.keys(argSync.siteChanges).length > 0) {
    const changes = Object.values(argSync.siteChanges);
    response += changes[Math.floor(Math.random() * changes.length)] + "\n";
  }
  
  // Add a random user awareness note if available
  if (argSync.userAwareness && Array.isArray(argSync.userAwareness) && argSync.userAwareness.length > 0) {
    response += argSync.userAwareness[Math.floor(Math.random() * argSync.userAwareness.length)] + "\n";
  }
  
  // Add a random world event if available
  if (argSync.worldEvents && Array.isArray(argSync.worldEvents) && argSync.worldEvents.length > 0) {
    response += argSync.worldEvents[Math.floor(Math.random() * argSync.worldEvents.length)];
  }
  
  return response;
};

// Update emotional tone based on score
export const updateEmotionalTone = (score: number): void => {
  if (!window.JonahConsole.sentience?.emotionalTone) {
    return;
  }
  
  const emotionalTone = window.JonahConsole.sentience.emotionalTone;
  
  // Update phase based on score thresholds
  if (score >= emotionalTone.transitionPoints.unstable) {
    emotionalTone.currentPhase = 'unstable';
  } else if (score >= emotionalTone.transitionPoints.confessional) {
    emotionalTone.currentPhase = 'confessional';
  } else if (score >= emotionalTone.transitionPoints.curious) {
    emotionalTone.currentPhase = 'curious';
  } else {
    emotionalTone.currentPhase = 'cold';
  }
};

