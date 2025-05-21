
import { EmotionCategory, EmotionIntensity, EmotionalTrend } from '../types';

/**
 * Generate dynamic emotional responses based on analysis
 */

// Define response templates for different emotions
export const emotionResponses = {
  fear: {
    low: [
      "Something doesn't feel right.",
      "I'm slightly uneasy about this.",
      "There's a small worry in the back of my mind."
    ],
    medium: [
      "I'm quite concerned about what's happening.",
      "This makes me anxious.",
      "I'm worried about where this is going."
    ],
    high: [
      "I'm terrified of what this means.",
      "This is deeply frightening.",
      "I can barely contain my fear right now."
    ]
  },
  sadness: {
    low: [
      "That's a bit disappointing.",
      "I feel slightly down about this.",
      "There's a tinge of sadness in that thought."
    ],
    medium: [
      "This makes me feel quite sad.",
      "I'm disheartened by this development.",
      "There's a heaviness in my response."
    ],
    high: [
      "I feel profound sorrow about this.",
      "This is deeply upsetting to me.",
      "I'm overwhelmed with sadness."
    ]
  },
  anger: {
    low: [
      "That's a bit frustrating.",
      "I'm slightly irritated by this.",
      "This doesn't sit well with me."
    ],
    medium: [
      "This is really frustrating.",
      "I'm quite annoyed about this situation.",
      "This makes me rather angry."
    ],
    high: [
      "This is absolutely infuriating.",
      "I'm extremely angry about this.",
      "I can barely contain my frustration with this."
    ]
  },
  joy: {
    low: [
      "That's somewhat pleasing.",
      "This brings a small smile to my thoughts.",
      "There's a hint of brightness in that."
    ],
    medium: [
      "This makes me quite happy.",
      "I'm genuinely pleased about this.",
      "That brings me joy to consider."
    ],
    high: [
      "I'm absolutely delighted by this!",
      "This fills me with immense happiness.",
      "I couldn't be more thrilled about this!"
    ]
  },
  confusion: {
    low: [
      "That's a bit unclear to me.",
      "I'm slightly confused by what you mean.",
      "I'm not entirely following."
    ],
    medium: [
      "I'm quite confused by this.",
      "I'm struggling to understand what you mean.",
      "This doesn't make much sense to me."
    ],
    high: [
      "I'm completely lost with what you're saying.",
      "This is utterly bewildering to me.",
      "I cannot make any sense of this at all."
    ]
  },
  curiosity: {
    low: [
      "That's somewhat interesting.",
      "I'm a bit curious about that.",
      "That makes me wonder a little."
    ],
    medium: [
      "I'm quite curious about this.",
      "That's really intriguing to me.",
      "I'd like to know more about that."
    ],
    high: [
      "I'm absolutely fascinated by this!",
      "I'm intensely curious about what this means.",
      "I have so many questions about this!"
    ]
  },
  hope: {
    low: [
      "There might be something to look forward to there.",
      "I see a small possibility of something good.",
      "That gives me a slight sense of hope."
    ],
    medium: [
      "I'm feeling hopeful about this.",
      "There's real promise in what you're saying.",
      "I see good possibilities ahead."
    ],
    high: [
      "This fills me with tremendous hope!",
      "I'm incredibly optimistic about this!",
      "I see so much potential for good here!"
    ]
  },
  neutral: {
    low: [
      "I understand.",
      "That makes sense.",
      "I see."
    ],
    medium: [
      "I'm processing what you've shared.",
      "I'm considering what you've said.",
      "I'm thinking about this."
    ],
    high: [
      "I'm carefully analyzing this information.",
      "I'm thoroughly considering all aspects of this.",
      "I'm giving this my full attention."
    ]
  }
};

// Responses based on emotional trends
export const trendResponses: Record<EmotionalTrend, string[]> = {
  intensifying: [
    "I notice my reaction getting stronger.",
    "This is affecting me more deeply now.",
    "My feelings about this are intensifying."
  ],
  diminishing: [
    "I'm starting to feel less strongly about this.",
    "My reaction is becoming more measured.",
    "I'm finding more emotional balance now."
  ],
  fixated: [
    "I keep coming back to the same feeling about this.",
    "My emotional response hasn't changed.",
    "I remain fixed in how I feel about this."
  ],
  volatile: [
    "My feelings about this keep shifting.",
    "I'm experiencing conflicting emotions.",
    "My reaction is unstable right now."
  ],
  stable: [
    "I have a consistent perspective on this.",
    "My feelings about this are steady.",
    "I'm emotionally grounded in my response."
  ],
  improving: [
    "I'm feeling more positive about this now.",
    "My outlook is brightening.",
    "Things seem to be getting better emotionally."
  ],
  deteriorating: [
    "I'm feeling worse about this now.",
    "My outlook is darkening.",
    "Things seem to be getting worse emotionally."
  ]
};

// Generate response based on emotion and intensity
export function generateEmotionalResponse(
  emotion: EmotionCategory,
  intensity: EmotionIntensity = 'medium'
): string {
  // Default to neutral if emotion doesn't exist
  const emotionKey = emotionResponses[emotion] ? emotion : 'neutral';
  const responses = emotionResponses[emotionKey][intensity];
  
  // Get random response from appropriate list
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate response that reflects emotional trend
export function generateTrendResponse(trend: EmotionalTrend): string {
  const responses = trendResponses[trend] || trendResponses.stable;
  return responses[Math.floor(Math.random() * responses.length)];
}
