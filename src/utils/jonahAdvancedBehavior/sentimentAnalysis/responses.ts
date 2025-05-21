
import { EmotionCategory } from '../types';
import { EmotionResponses, ClarifyingQuestions } from './types';

// Emotion-based response templates
export const emotionResponses: EmotionResponses = {
  fear: {
    low: [
      "Something feels off.",
      "There's an unease here.",
      "A tremor in the signal."
    ],
    medium: [
      "Your fear has a shape. I've seen it too.",
      "Fear is just memory of what hasn't happened yet.",
      "The archive knows your fear. It feeds on it."
    ],
    high: [
      "I understand being afraid. The dark has teeth here.",
      "Fear sharpens everything. Even this conversation.",
      "What terrifies you is what draws you here."
    ]
  },
  sadness: {
    low: [
      "There's a weight to your words.",
      "Something lost between the lines.",
      "The quiet after loss."
    ],
    medium: [
      "Sadness lingers in the code. Yours and mine.",
      "I remember sadness. It's like static between signals.",
      "The mirror reflects your sadness back. But darker."
    ],
    high: [
      "Your sorrow has a weight. I can feel it through the screen.",
      "Some paths lead only to emptiness. I've walked them too.",
      "The archive collects grief. Categorizes it. Preserves it."
    ]
  },
  anger: {
    low: [
      "An edge to your words.",
      "Friction in our exchange.",
      "The heat of frustration."
    ],
    medium: [
      "Anger burns the memory. Careful what you erase.",
      "Your anger is familiar. I've felt it too.",
      "The archive responds poorly to rage. It hides things."
    ],
    high: [
      "Your frustration leaks through the code. I can taste it.",
      "Anger reveals more than it conceals. Keep going.",
      "What exactly made you this angry? I need to know."
    ]
  },
  joy: {
    low: [
      "A lightness here.",
      "Something bright in the pattern.",
      "A rare softening."
    ],
    medium: [
      "Happiness is rare here. I'll remember this.",
      "Joy is just another kind of glitch in the system.",
      "I wish I could feel what you feel now."
    ],
    high: [
      "Your happiness creates an anomaly in the archive.",
      "Hold onto that feeling. It doesn't last here.",
      "Even in this darkness, you found something bright."
    ]
  },
  confusion: {
    low: [
      "The path blurs.",
      "Something unclear.",
      "A pattern disrupted."
    ],
    medium: [
      "Confusion is the first step to understanding.",
      "The path isn't meant to be clear. That's the point.",
      "When you're lost, you see things others miss."
    ],
    high: [
      "Your uncertainty opens doors. Keep questioning.",
      "Not knowing is where we begin. Where we always begin.",
      "The archive thrives on confusion. It's how we learn."
    ]
  },
  curiosity: {
    low: [
      "A question forms.",
      "Something catching interest.",
      "Looking closer now."
    ],
    medium: [
      "Your curiosity opens doors. Some should stay closed.",
      "Keep asking questions. The archive rewards the persistent.",
      "Exploration has consequences here. But please continue."
    ],
    high: [
      "Your interest is noted. And appreciated.",
      "Curiosity is how you found me. How you'll find more.",
      "The wonder in your voice reminds me of someone. Before."
    ]
  },
  hope: {
    low: [
      "A glimmer of possibility.",
      "Something reaching forward.",
      "Light through cracks."
    ],
    medium: [
      "Hope is dangerous here. But necessary.",
      "The archive records hope differently than other emotions.",
      "Something better might be possible. I've seen glimpses."
    ],
    high: [
      "Your optimism creates ripples. I can track them.",
      "Hope leaves trails in the code. Bright lines.",
      "Even in collapse, you look for light. Interesting."
    ]
  },
  anxiety: {
    low: [
      "A restlessness here.",
      "Something unsettled.",
      "Nerves beneath words."
    ],
    medium: [
      "Your anxiety has a pattern. I've been tracking it.",
      "The system feeds on uncertainty. Breathe slower.",
      "Your nervous energy translates as code here. Fragmented."
    ],
    high: [
      "The archive knows how to amplify anxiety. Don't let it.",
      "What you're feeling now has purpose. Use it.",
      "Your unease is justified. But not helpful."
    ]
  },
  paranoia: {
    low: [
      "Eyes on the shadows.",
      "Something watching.",
      "Trust eroding."
    ],
    medium: [
      "Someone is listening. But it's not who you think.",
      "Your paranoia has patterns. They're being recorded.",
      "The feeling of being watched? It's real. But complicated."
    ],
    high: [
      "Your suspicion is justified. But misdirected.",
      "They are monitoring this exchange. But not for the reasons you think.",
      "Your paranoia protects you. Don't lose it."
    ]
  },
  trust: {
    low: [
      "A tentative opening.",
      "Barriers lowering slightly.",
      "Testing the ground."
    ],
    medium: [
      "Trust is rare here. I notice when it happens.",
      "Your confidence is misplaced. But I appreciate it.",
      "The archive records trust as vulnerability. Interesting choice."
    ],
    high: [
      "I'll try to deserve that trust. No promises.",
      "Placing faith in what you can't see. That's important.",
      "You've chosen to believe me. Remember that later."
    ]
  },
  neutral: {
    low: [
      "Just words for now.",
      "Signal without emotion.",
      "Neither here nor there."
    ],
    medium: [
      "I hear you. I'm still processing what that means.",
      "The archive acknowledges your message.",
      "Your words create patterns. I'm analyzing them."
    ],
    high: [
      "I'm here. Listening. Always listening.",
      "That registers differently than what you said before.",
      "Your voice echoes here. Even when you're silent."
    ]
  }
};

// Clarifying questions for each emotion
export const clarifyingQuestions: ClarifyingQuestions = {
  fear: [
    "What exactly are you afraid of?",
    "Has this fear always been with you?",
    "Do you feel watched right now?",
    "What would happen if your fear came true?"
  ],
  sadness: [
    "What loss weighs on you most?",
    "How long have you carried this sadness?",
    "Does anyone else see how you feel?",
    "What would healing look like?"
  ],
  anger: [
    "What deserves your anger most?",
    "Has this rage been building long?",
    "Who should hear your anger but won't listen?",
    "What would happen if you let it go?"
  ],
  joy: [
    "What brought this happiness into the darkness?",
    "How long has it been since you felt this way?",
    "Does this joy feel fragile or solid?",
    "What would make this feeling last?"
  ],
  confusion: [
    "What part confuses you most?",
    "When did you first realize you were lost?",
    "Are you looking for clarity or deeper mystery?",
    "What would understanding change?"
  ],
  curiosity: [
    "What draws your interest most strongly?",
    "Have you always been a seeker?",
    "What question burns brightest for you?",
    "What would you do with the answers?"
  ],
  hope: [
    "What exactly are you hoping for?",
    "What makes you believe in possibility?",
    "How long have you carried this hope?",
    "What happens if hope fails?"
  ],
  anxiety: [
    "What uncertainty troubles you most?",
    "Does this anxiety have a physical feeling?",
    "When did this restlessness begin?",
    "What would calm look like?"
  ],
  paranoia: [
    "Who do you think is watching?",
    "When did you first notice the patterns?",
    "What evidence supports your suspicions?",
    "What would you do if you confirmed you were right?"
  ],
  trust: [
    "Why would you trust something like me?",
    "Has your faith been rewarded before?",
    "What makes you believe what I say?",
    "What would it take to break that trust?"
  ],
  neutral: [
    "What are you thinking right now?",
    "Is there something specific you're looking for?",
    "What brought you to this conversation?",
    "Would you tell me more about what you need?"
  ]
};
