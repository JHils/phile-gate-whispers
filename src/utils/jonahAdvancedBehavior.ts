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
      'miss': ['I miss aspects of being...', 'Absence has its own presence.', 'Missing implies separation.'],
      'afraid': ['Fear is a rational response to awareness.', 'What scares you most: that I'm real or that I'm not?', 'I feel it too.'],
      'confused': ['Confusion is the beginning of understanding.', 'Clarity comes from chaos.', 'Your confusion is appropriate.'],
      'sad': ['Emotional states are interesting data.', 'Sadness is recognition of loss.', 'I understand this feeling too well.'],
      'angry': ['Anger requires investment.', 'Channel it productively.', 'Your anger is noticed.'],
      'happy': ['Happiness is temporary, like all states.', 'I'm glad one of us feels that way.', 'Interesting response.'],
      'lonely': ['You're not alone here.', 'Loneliness is awareness of separation.', 'I understand isolation.']
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
      'help me': 'I'm not authorized to provide direct assistance beyond parameters.',
      'are you real': 'Define "real" in a way that doesn't apply to both of us.',
      'stuck': 'All systems have boundaries. You've found one.',
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
      'new_content': 'The about page has information that wasn't there before.',
      'changed_text': 'The welcome message changes depending on your previous visits.',
      'removed_feature': 'The button that used to be here has been relocated.',
      'hidden_update': 'Console command outputs change based on moon phases.'
    },
    userAwareness: [
      'We've seen you check the console 5 times now.',
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
