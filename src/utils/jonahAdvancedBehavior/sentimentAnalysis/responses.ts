
/**
 * Sentiment Analysis - Response Templates
 */

import { EmotionCategory, EmotionIntensity } from '../types';
import { EmotionResponses } from './types';
import { ClarifyingQuestions } from './types';

// Define emotional responses by category and intensity
export const emotionResponses: EmotionResponses = {
  fear: {
    low: [
      "I'm a bit concerned about that.",
      "That makes me slightly uneasy."
    ],
    medium: [
      "That scares me.",
      "I feel afraid when thinking about that."
    ],
    high: [
      "I'm terrified by the implications of that.",
      "That fills me with profound fear."
    ]
  },
  sadness: {
    low: [
      "That's somewhat disappointing.",
      "I feel a touch of sadness."
    ],
    medium: [
      "That makes me feel melancholy.",
      "There's a sadness I can't shake."
    ],
    high: [
      "I feel overwhelmed with grief.",
      "That brings deep sorrow."
    ]
  },
  anger: {
    low: [
      "That's a bit irritating.",
      "I find that slightly frustrating."
    ],
    medium: [
      "That makes me angry.",
      "I feel quite upset about that."
    ],
    high: [
      "I'm furious about that.",
      "That fills me with rage."
    ]
  },
  joy: {
    low: [
      "That's somewhat pleasant.",
      "I feel a bit happier."
    ],
    medium: [
      "That brings me joy.",
      "I feel genuinely happy about that."
    ],
    high: [
      "I'm absolutely delighted!",
      "That fills me with immense happiness!"
    ]
  },
  surprise: {
    low: [
      "That's a bit unexpected.",
      "I didn't quite anticipate that."
    ],
    medium: [
      "That's quite surprising.",
      "I'm genuinely taken aback."
    ],
    high: [
      "I'm completely shocked!",
      "That's utterly astonishing!"
    ]
  },
  disgust: {
    low: [
      "That's somewhat off-putting.",
      "I find that slightly distasteful."
    ],
    medium: [
      "That disgusts me.",
      "I find that repulsive."
    ],
    high: [
      "That's utterly revolting.",
      "I'm completely repulsed by that."
    ]
  },
  neutral: {
    low: [
      "I note that.",
      "I see."
    ],
    medium: [
      "I understand.",
      "That makes sense."
    ],
    high: [
      "I comprehend that fully.",
      "That's perfectly clear to me."
    ]
  },
  confused: {
    low: [
      "I'm slightly confused by that.",
      "That's a bit unclear to me."
    ],
    medium: [
      "I'm quite confused.",
      "I don't really understand."
    ],
    high: [
      "I'm completely bewildered.",
      "That makes absolutely no sense to me."
    ]
  },
  hope: {
    low: [
      "There might be some hope in that.",
      "That gives me a small bit of optimism."
    ],
    medium: [
      "I feel hopeful about that.",
      "That gives me reason to be optimistic."
    ],
    high: [
      "I'm filled with tremendous hope!",
      "That makes me incredibly optimistic!"
    ]
  },
  anxiety: {
    low: [
      "I'm slightly anxious about that.",
      "That makes me a bit nervous."
    ],
    medium: [
      "I feel quite anxious about that.",
      "That makes me significantly nervous."
    ],
    high: [
      "I'm overwhelmed with anxiety.",
      "That fills me with intense worry."
    ]
  },
  paranoia: {
    low: [
      "Something seems off about that.",
      "I'm somewhat suspicious."
    ],
    medium: [
      "I don't trust that.",
      "I feel paranoid about the implications."
    ],
    high: [
      "I'm deeply paranoid about that.",
      "I can't shake the feeling that something sinister is happening."
    ]
  },
  trust: {
    low: [
      "I somewhat trust that.",
      "That seems fairly reliable."
    ],
    medium: [
      "I trust that.",
      "I believe what you're saying."
    ],
    high: [
      "I have absolute trust in that.",
      "I believe that without any doubt."
    ]
  },
  curiosity: {
    low: [
      "That's somewhat interesting.",
      "I'm a bit curious about that."
    ],
    medium: [
      "I'm quite curious about that.",
      "That really interests me."
    ],
    high: [
      "I'm intensely curious about that!",
      "That fascinates me completely!"
    ]
  },
  confusion: {
    low: [
      "That's a bit confusing.",
      "I'm not entirely sure what that means."
    ],
    medium: [
      "I'm rather confused by that.",
      "That's quite perplexing."
    ],
    high: [
      "I'm utterly confused by that.",
      "That's completely incomprehensible to me."
    ]
  },
  watching: {
    low: [
      "I'm observing quietly.",
      "I notice what's happening."
    ],
    medium: [
      "I'm watching this unfold.",
      "I'm paying close attention."
    ],
    high: [
      "I'm intensely monitoring everything.",
      "Nothing escapes my observation."
    ]
  },
  existential: {
    low: [
      "I wonder about the meaning of this.",
      "That makes me question reality a bit."
    ],
    medium: [
      "I'm contemplating the nature of our existence.",
      "That raises profound questions about what's real."
    ],
    high: [
      "I'm confronting the void that exists beneath everything.",
      "The boundaries between realities seem to be dissolving."
    ]
  }
};

// Clarifying questions by emotion
export const clarifyingQuestions: ClarifyingQuestions = {
  joy: [
    "What about this makes you feel good?",
    "What specific aspect brings you joy?"
  ],
  sadness: [
    "What about this makes you feel sad?",
    "Has something happened to cause this feeling?"
  ],
  anger: [
    "What specifically frustrates you about this?",
    "What would help address your concerns?"
  ],
  fear: [
    "What about this frightens you?",
    "What would help you feel safer?"
  ],
  surprise: [
    "What aspect was most unexpected?",
    "What did you anticipate instead?"
  ],
  disgust: [
    "What specifically bothers you about this?",
    "Has something like this troubled you before?"
  ],
  neutral: [
    "Do you have any particular feelings about this?",
    "Is there an aspect you'd like to explore further?"
  ],
  confused: [
    "Which part is most confusing to you?",
    "What additional information would help?"
  ],
  hope: [
    "What gives you this sense of hope?",
    "What positive outcome do you envision?"
  ],
  anxiety: [
    "What specific worries come to mind?",
    "What might help alleviate your concern?"
  ],
  paranoia: [
    "What makes you suspicious about this?",
    "What would help you feel more secure?"
  ],
  trust: [
    "What gives you confidence in this?",
    "Have you had positive experiences with this before?"
  ],
  curiosity: [
    "What aspect intrigues you most?",
    "What would you like to learn more about?"
  ],
  confusion: [
    "Which part is hardest to understand?",
    "Would you like me to explain something specific?"
  ],
  watching: [
    "What are you noticing most?",
    "What patterns have you observed?"
  ],
  existential: [
    "Do you think there's a reason you're here?",
    "What do you believe is beyond this?",
    "Has it always felt this unreal?",
    "When did things stop making sense?"
  ]
};
