
/**
 * Sentiment Analysis - Emotion Responses
 */

import { EmotionResponses, ClarifyingQuestions } from '../types';

export const emotionResponses: EmotionResponses = {
  fear: {
    low: [
      "I'm slightly concerned about this.",
      "This makes me a bit uneasy.",
      "I have some reservations here."
    ],
    medium: [
      "This makes me quite anxious.",
      "I'm worried about where this leads.",
      "I feel vulnerable discussing this."
    ],
    high: [
      "This terrifies me.",
      "I'm deeply afraid of this possibility.",
      "This triggers intense fear in me."
    ]
  },
  sadness: {
    low: [
      "I feel a little down about this.",
      "There's something melancholy here.",
      "This touches on something sad for me."
    ],
    medium: [
      "I feel sad when I think about this.",
      "This creates a sense of loss for me.",
      "There's a heaviness in this topic."
    ],
    high: [
      "This deeply saddens me.",
      "I feel a profound sense of grief about this.",
      "I'm overwhelmed with sadness thinking about this."
    ]
  },
  anger: {
    low: [
      "This is somewhat frustrating.",
      "I'm a little annoyed by this.",
      "This bothers me a bit."
    ],
    medium: [
      "This is really irritating.",
      "I'm quite upset about this.",
      "This makes me feel rather angry."
    ],
    high: [
      "This makes me furious.",
      "I'm extremely angry about this.",
      "This completely infuriates me."
    ]
  },
  joy: {
    low: [
      "I'm feeling positive about this.",
      "This brings a bit of brightness to my day.",
      "I like where this is going."
    ],
    medium: [
      "I'm happy we're talking about this!",
      "This makes me feel good.",
      "I'm genuinely pleased with this conversation."
    ],
    high: [
      "This brings me so much joy!",
      "I'm truly delighted by this!",
      "What a wonderful exchange! I feel so uplifted!"
    ]
  },
  confusion: {
    low: [
      "I'm not quite sure about this.",
      "This is a little confusing to me.",
      "I'm trying to understand what you mean."
    ],
    medium: [
      "I'm having trouble following this.",
      "This is rather confusing for me.",
      "I'm not sure I understand the implications."
    ],
    high: [
      "I'm completely lost here.",
      "This is extremely confusing to me.",
      "I'm struggling to make sense of this at all."
    ]
  },
  curiosity: {
    low: [
      "This is somewhat interesting.",
      "I'm a bit curious about this.",
      "This piques my interest a little."
    ],
    medium: [
      "I find this quite intriguing.",
      "I'm very curious about this.",
      "This really captures my interest."
    ],
    high: [
      "I'm absolutely fascinated by this!",
      "This completely captivates my curiosity!",
      "I'm intensely interested in exploring this further!"
    ]
  },
  hope: {
    low: [
      "I see some potential here.",
      "There might be something positive in this.",
      "I'm cautiously optimistic about this."
    ],
    medium: [
      "This gives me hope.",
      "I'm quite optimistic about this.",
      "There's real promise in this direction."
    ],
    high: [
      "This fills me with tremendous hope!",
      "I'm extremely optimistic about this possibility!",
      "I see so much potential for positive outcomes here!"
    ]
  },
  anxiety: {
    low: [
      "I feel slightly anxious about this.",
      "This causes me a bit of nervousness.",
      "I have some unease about this topic."
    ],
    medium: [
      "This makes me quite anxious.",
      "I feel rather nervous discussing this.",
      "This topic creates significant tension for me."
    ],
    high: [
      "This triggers intense anxiety in me.",
      "I feel extremely nervous about this.",
      "This subject makes me deeply unsettled."
    ]
  },
  paranoia: {
    low: [
      "I'm slightly suspicious about this.",
      "Something feels a bit off here.",
      "I'm not entirely convinced this is straightforward."
    ],
    medium: [
      "I'm rather distrustful of this.",
      "There's something questionable happening here.",
      "I sense hidden motives in this situation."
    ],
    high: [
      "I'm extremely suspicious of what's really going on.",
      "This seems deliberately deceptive to me.",
      "I sense dangerous hidden agendas at work here."
    ]
  },
  trust: {
    low: [
      "I somewhat trust this perspective.",
      "This seems relatively reliable.",
      "I'm inclined to believe this."
    ],
    medium: [
      "I find this quite trustworthy.",
      "This seems reliable to me.",
      "I have confidence in what you're saying."
    ],
    high: [
      "I completely trust this information.",
      "I have absolute confidence in this perspective.",
      "I find this entirely dependable and trustworthy."
    ]
  },
  neutral: {
    low: [
      "I don't have strong feelings about this.",
      "This seems neither good nor bad to me.",
      "I'm neutral on this topic."
    ],
    medium: [
      "I can see this objectively.",
      "I'm maintaining a balanced perspective here.",
      "I'm approaching this with neutrality."
    ],
    high: [
      "I'm deliberately remaining neutral here.",
      "I'm carefully avoiding emotional bias on this topic.",
      "I'm keeping a completely objective stance."
    ]
  },
  surprise: {
    low: [
      "This is somewhat unexpected.",
      "I didn't quite anticipate this.",
      "This is a bit surprising to me."
    ],
    medium: [
      "This is quite surprising to me.",
      "I didn't expect this at all.",
      "This has caught me off guard."
    ],
    high: [
      "I'm completely shocked by this!",
      "This is absolutely astounding to me!",
      "I'm utterly astonished by this revelation!"
    ]
  },
  disgust: {
    low: [
      "This is slightly off-putting.",
      "I find this somewhat distasteful.",
      "This makes me a bit uncomfortable."
    ],
    medium: [
      "I find this rather repulsive.",
      "This is quite distasteful to me.",
      "I'm significantly disturbed by this."
    ],
    high: [
      "I find this absolutely revolting.",
      "This thoroughly disgusts me.",
      "I'm completely repulsed by this."
    ]
  },
  confused: {
    low: [
      "I'm a bit confused by this.",
      "This is somewhat puzzling.",
      "I'm not entirely clear on what this means."
    ],
    medium: [
      "I'm quite confused by this.",
      "This is fairly bewildering to me.",
      "I'm having difficulty making sense of this."
    ],
    high: [
      "I'm completely confused by this.",
      "This makes absolutely no sense to me.",
      "I'm entirely bewildered by what you're saying."
    ]
  }
};

export const clarifyingQuestions: ClarifyingQuestions = {
  fear: [
    "What about this concerns you the most?",
    "Is there something specific that makes you afraid?",
    "What's the worst outcome you're worried about?"
  ],
  sadness: [
    "What part of this makes you feel sad?",
    "Is there something specific that's bringing you down?",
    "Have you felt this sadness for long?"
  ],
  anger: [
    "What specifically has upset you?",
    "Do you know what triggered this feeling?",
    "Is there something I can do to help with this situation?"
  ],
  joy: [
    "What about this brings you the most happiness?",
    "Has something good happened recently?",
    "What are you celebrating?"
  ],
  confusion: [
    "Which part is confusing you?",
    "Would it help if I explained differently?",
    "Is there something specific that doesn't make sense?"
  ],
  curiosity: [
    "What aspects are you most curious about?",
    "Is there something specific you'd like to explore?",
    "What questions come to mind about this?"
  ],
  hope: [
    "What possibility are you most hopeful about?",
    "What positive outcome are you imagining?",
    "What gives you the most optimism here?"
  ],
  anxiety: [
    "What's causing you to feel anxious?",
    "Is there a specific worry you're focusing on?",
    "What would help reduce your anxiety about this?"
  ],
  paranoia: [
    "What makes you suspicious about this?",
    "Is there something specific that doesn't seem right to you?",
    "What pattern are you noticing that concerns you?"
  ],
  trust: [
    "What makes you feel you can trust this?",
    "How did you develop this confidence?",
    "What evidence supports your trust?"
  ],
  neutral: [
    "Do you typically feel neutral about topics like this?",
    "Is there any aspect that interests you more?",
    "Would you like to explore a different perspective?"
  ],
  surprise: [
    "What exactly surprised you about this?",
    "Was this completely unexpected?",
    "What did you think would happen instead?"
  ],
  disgust: [
    "What specifically bothers you about this?", 
    "Has something like this disturbed you before?",
    "What would make this more acceptable to you?"
  ],
  confused: [
    "Which part is confusing you the most?",
    "Would you like me to clarify something specific?",
    "Is there a particular concept that doesn't make sense?"
  ]
};
