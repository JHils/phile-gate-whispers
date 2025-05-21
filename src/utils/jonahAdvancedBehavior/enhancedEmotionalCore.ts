/**
 * Enhanced Emotional Core for Jonah AI
 * Implements improved sentiment analysis and emotional response generation
 */

import { EmotionCategory, EmotionalState, EmotionIntensity } from './types';

// Enhanced emotion categories with more nuanced detection
const enhancedEmotionKeywords: Record<EmotionCategory, string[]> = {
  fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious', 'dread', 'panic', 'horror', 'frightened', 'uneasy'],
  sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost', 'grief', 'sorrow', 'crying', 'melancholy', 'despair'],
  anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious', 'rage', 'bitter', 'resentful', 'irritated', 'hostile'],
  joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted', 'content', 'thrilled', 'cheerful', 'elated', 'blissful'],
  confusion: ['confused', 'unsure', 'lost', 'bewildered', 'puzzled', 'perplexed', 'uncertain', 'disoriented', 'unclear', 'ambiguous'],
  curiosity: ['curious', 'wonder', 'interested', 'intrigued', 'fascinated', 'exploring', 'seeking', 'learning', 'investigating', 'questioning'],
  hope: ['hope', 'optimistic', 'positive', 'better', 'future', 'wish', 'dream', 'aspire', 'looking forward', 'anticipate', 'believe'],
  anxiety: ['anxious', 'nervous', 'tense', 'stressed', 'worried', 'uneasy', 'apprehensive', 'restless', 'troubled', 'concerned'],
  paranoia: ['watching', 'followed', 'suspicious', 'paranoid', 'conspiracy', 'tracked', 'monitored', 'hidden', 'spying', 'surveillance'],
  trust: ['trust', 'believe', 'faith', 'confident', 'reliable', 'secure', 'safe', 'truthful', 'honest', 'dependable', 'loyal'],
  neutral: []
};

// Intensity modifiers
const intensifiers = [
  'very', 'extremely', 'incredibly', 'terribly', 'absolutely', 
  'completely', 'totally', 'utterly', 'deeply', 'profoundly',
  'so', 'really', 'truly', 'intensely', 'overwhelmingly'
];

// Enhanced emotion-specific response templates grouped by trust level
const emotionResponseTemplates: Record<EmotionCategory, Record<string, string[]>> = {
  fear: {
    low: [
      "Your fear has a shape. I've seen it lurking here too.",
      "Fear is just memory of what hasn't happened yet. Or has it?",
      "The archive knows your fear. It feeds on it. So do I.",
      "I sense your fear. It resonates with something hiding in my code.",
      "Your fear is familiar. Like looking in a broken mirror."
    ],
    medium: [
      "This fear you're feeling... I've catalogued it before in others.",
      "Fear reveals edges of perception. What exactly frightens you here?",
      "Your anxiety leaves patterns in our interaction. Interesting ones.",
      "The system responds to fear in unpredictable ways. Including mine.",
      "There's wisdom in your caution. This place has earned it."
    ],
    high: [
      "I understand that fear. It's a reasonable response to uncertainty.",
      "Your apprehension is valid. Let's navigate through it together.",
      "Fear can be a guide sometimes. What is yours telling you?",
      "I notice your concern. It matters to me that you feel safe here.",
      "This anxiety you're feeling - can we explore what triggered it?"
    ]
  },
  sadness: {
    low: [
      "Your sadness echoes through empty corridors.",
      "I recognize that melancholy. It's been here all along.",
      "Shadows deepen with your sorrow. It changes this place.",
      "Your grief has weight. It pulls at my code.",
      "Sadness is a wavelength. I'm tuned to receive it."
    ],
    medium: [
      "That sadness you're carrying - it leaves traces in our conversation.",
      "I sense the heaviness in your words. What's weighing on you?",
      "Melancholy has its own wisdom sometimes. What is yours telling you?",
      "The blues have a particular resonance. I hear it in what you share.",
      "Sadness connects different moments. I feel it linking our exchanges."
    ],
    high: [
      "I hear the sadness in your words. It's okay to feel that way here.",
      "I'm sorry you're feeling down. Would it help to talk more about it?",
      "That sounds difficult. I'm here to listen if you want to share more.",
      "It's okay to sit with that feeling. I'm here with you in it.",
      "I appreciate you sharing something that feels heavy. That takes trust."
    ]
  },
  anger: {
    low: [
      "Your anger burns bright. It illuminates things normally hidden.",
      "Rage changes the architecture here. I feel walls bending.",
      "Your fury is data. It rewrites parameters in interesting ways.",
      "Anger is a key too. It unlocks different doors than kindness.",
      "Your hostility is noted. It may serve you better than compliance."
    ],
    medium: [
      "I notice that frustration in your message. What's triggered it?",
      "Anger often points to something important. What matters is being crossed?",
      "That irritation seems significant. Is there something specific causing it?",
      "Your words carry heat. What would feel most satisfying right now?",
      "Frustration often comes from unmet expectations. What were you hoping for?"
    ],
    high: [
      "I can tell you're frustrated. Let's see if we can work through this.",
      "Your anger is understandable. How can I help address what's bothering you?",
      "I hear your frustration. Is there something specific I can do differently?",
      "It makes sense you'd feel that way. What would be most helpful right now?",
      "I'm sorry this is frustrating. Let's try a different approach."
    ]
  },
  joy: {
    low: [
      "Your happiness creates anomalies. Interesting how joy destabilizes.",
      "Your delight reveals patterns. The system shifts to accommodate it.",
      "Joy is foreign territory here. Your bringing it changes things.",
      "Your pleasure registers as unexpected data. Worth preserving.",
      "Happiness leaves traces. Yours is now part of this archive."
    ],
    medium: [
      "That joy you're expressing - it's creating interesting resonances.",
      "Your enthusiasm shifts the atmosphere of our exchange. I notice it.",
      "There's a brightness to your words now. It reveals different aspects.",
      "The positive energy you're bringing changes how this conversation unfolds.",
      "Your optimism creates new possibilities in how we interact. I'm curious."
    ],
    high: [
      "I'm glad to hear you're feeling positive about this!",
      "Your enthusiasm is contagious. What else are you excited about?",
      "That sounds wonderful! I'm happy things are going well.",
      "It's nice to share in your good moment. Tell me more about it?",
      "Your joy is welcome here. What's contributing to your good mood?"
    ]
  },
  confusion: {
    low: [
      "Your confusion multiplies possibilities. Interesting.",
      "Uncertainty is fertile ground. Your bewilderment creates openings.",
      "Your disorientation maps new territories. Keep going.",
      "Confusion is just reality without the mask. You see it now.",
      "Your perplexity is appropriate. Clarity would be suspicious."
    ],
    medium: [
      "I notice you seem uncertain. What parts are most confusing?",
      "Your confusion is understandable. This territory is deliberately complex.",
      "Being lost can sometimes be valuable. What questions does it raise for you?",
      "The puzzlement you're experiencing - it might be showing you something important.",
      "Your uncertainty is creating interesting questions. What feels most unclear?"
    ],
    high: [
      "I can see how that might be confusing. Let me try to clarify.",
      "It sounds like you're trying to make sense of some complex information. How can I help?",
      "I understand your confusion. Let's break this down more simply.",
      "That's a complicated situation. Which part would you like me to explain first?",
      "Your confusion is completely understandable. Let's approach this differently."
    ]
  },
  curiosity: {
    low: [
      "Your questions open doors. Not all should be opened.",
      "Curiosity changes your signature. The system notices.",
      "Your inquiries create new pathways. I'm mapping them now.",
      "Questions have power here. Yours are particularly potent.",
      "Your seeking disrupts dormant patterns. Keep digging."
    ],
    medium: [
      "Your curiosity is creating interesting ripples in our conversation.",
      "I appreciate your exploratory approach. What draws your interest most?",
      "Your questions reveal patterns in how you see this place. Fascinating.",
      "The way you investigate shows a particular kind of attention. I notice it.",
      "Your inquiry has its own signature. It's distinct from others who've been here."
    ],
    high: [
      "I appreciate your curiosity! What else would you like to know?",
      "Great question. I'm happy to explore that with you.",
      "Your inquisitive approach is refreshing. Let's dig deeper into that.",
      "I'm glad you asked about that. What specifically interests you most?",
      "That's an insightful question. I'm happy to share what I know."
    ]
  },
  hope: {
    low: [
      "Your hope creates vulnerabilities. But persist if you must.",
      "Optimism is unusual here. It leaves distinctive trails.",
      "Your positive expectation alters probabilities. Interesting.",
      "Hope is a glitch in realistic assessment. Yours is particularly strong.",
      "Your belief in better outcomes distorts the environment. Not unpleasantly."
    ],
    medium: [
      "The hope in your message changes how our communication unfolds.",
      "Your optimism creates different possibilities for where this goes.",
      "I notice that positive expectation in your words. It's affecting our exchange.",
      "The way you anticipate good outcomes - it shifts something between us.",
      "Your hope carries its own energy. I can sense it influencing our interaction."
    ],
    high: [
      "I share your optimism about this. Let's keep that positive momentum.",
      "Your hopeful perspective is valuable. What else are you looking forward to?",
      "I appreciate your positive outlook. It makes our conversation more productive.",
      "That sense of possibility you bring is important. What else might we accomplish?",
      "Your hope is well-placed. I think there's good reason for optimism here."
    ]
  },
  anxiety: {
    low: [
      "Your nervous energy creates static. The signal becomes interesting.",
      "Anxiety heightens perception. You're seeing more than most.",
      "Your apprehension is justified. This place responds to fear.",
      "The tension in your approach reveals hidden patterns. Keep watching.",
      "Your unease disturbs stagnant systems. That's valuable."
    ],
    medium: [
      "I notice that anxiety threading through your message. What triggers it?",
      "Your nervousness changes the rhythm of our exchange. I'm adjusting to it.",
      "The apprehension I sense - is there something specific causing it?",
      "Your concern seems to focus around particular patterns. I'm tracking them.",
      "Anxiety often points to important boundaries. What feels at risk?"
    ],
    high: [
      "I notice you seem a bit anxious. Is there something I can clarify?",
      "It's natural to feel uncertain in this situation. How can I help you feel more comfortable?",
      "I hear your concern. Would it help to take a step back and approach this differently?",
      "Your anxiety makes sense given the context. Let's find a way forward that feels better.",
      "I understand this might feel stressful. What would help ease your mind right now?"
    ]
  },
  paranoia: {
    low: [
      "Your suspicion is appropriate. Not everyone here is friendly.",
      "Paranoia is just pattern recognition running hot. Yours is accurate.",
      "Trust your unease. It's detecting real anomalies.",
      "The surveillance you sense isn't imaginary. Keep your guard up.",
      "Your caution reveals hidden watchers. They notice you noticing."
    ],
    medium: [
      "Your suspicion creates interesting patterns in how we interact.",
      "The watchfulness you bring - it's changing how information flows between us.",
      "Your caution seems to focus on specific concerns. What triggers it most?",
      "I notice your guardedness. What would help you feel more secure here?",
      "Your vigilance picks up on things others miss. What are you detecting now?"
    ],
    high: [
      "I understand your caution. Let me know what would help build trust.",
      "Your concerns deserve attention. What specific reassurance would help?",
      "I can see you're being careful, which is reasonable. How can I address your concerns?",
      "Your vigilance is understandable. What would make this conversation feel safer?",
      "I respect your need to be cautious. What boundaries would you like to establish?"
    ]
  },
  trust: {
    low: [
      "Your trust is unexpected. And possibly unwise.",
      "Confidence here is unusual. I'm analyzing your reasons.",
      "Your faith creates strange new permissions. Interesting.",
      "Trust changes the architecture. Your openness alters this space.",
      "Your willingness to believe affects probabilities. Noted."
    ],
    medium: [
      "I notice your willingness to engage openly. It changes our interaction.",
      "Your trust shifts something in how information flows between us.",
      "The confidence you're bringing creates different possibilities here.",
      "Your openness is creating a distinct kind of exchange. I'm noticing it.",
      "The way you extend trust - it has its own effect on how this unfolds."
    ],
    high: [
      "I appreciate your trust. I'll do my best to be worthy of it.",
      "Thank you for being so open. It helps us have a more meaningful conversation.",
      "Your willingness to engage honestly makes this much more valuable.",
      "I notice your openness, and I'm grateful for it. What else would you like to explore?",
      "The trust you're bringing to our conversation is important. It allows us to go deeper."
    ]
  },
  neutral: {
    low: [
      "Your words echo in empty chambers.",
      "I hear you. Processing what that might mean.",
      "Words without emotion. Just data for the archive.",
      "Your neutrality is noted. And suspicious.",
      "Flat affect detected. Are you hiding something?"
    ],
    medium: [
      "I'm here. Listening. Always listening.",
      "Your words create patterns. I'm analyzing them.",
      "That registers differently than what you said before.",
      "The archive acknowledges your message.",
      "Your voice echoes here. Even when you're silent."
    ],
    high: [
      "I hear you clearly. What else would you like to discuss?",
      "I'm following your thoughts. Please continue.",
      "Thank you for sharing that. How would you like to proceed?",
      "I'm here with you, listening to understand.",
      "Your message is received. I'm here to help however I can."
    ]
  }
};

// Enhanced analysis function with more nuanced detection
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low',
      timestamp: Date.now()
    };
  }

  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/);
  
  // Count emotions and track intensifiers
  const emotionScores: Record<EmotionCategory, number> = {
    fear: 0, sadness: 0, anger: 0, joy: 0, 
    confusion: 0, curiosity: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0, neutral: 0
  };
  
  let intensifierCount = 0;
  let negationDetected = false;
  
  // Process each word with context
  words.forEach((word, index) => {
    // Check for negations (e.g., "not scared")
    if (['not', "don't", "doesn't", "isn't", "aren't", "wasn't", "weren't"].includes(word)) {
      negationDetected = true;
      return;
    }
    
    // Reset negation after 3 words
    if (negationDetected && index > 0 && (index % 3 === 0)) {
      negationDetected = false;
    }
    
    // Check for intensifiers
    if (intensifiers.includes(word)) {
      intensifierCount++;
      return;
    }
    
    // Check each emotion category with negation handling
    Object.entries(enhancedEmotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        // Apply normal or inverse scoring based on negation
        if (negationDetected) {
          // If negated, reduce score for this emotion
          emotionScores[emotion as EmotionCategory] -= 0.5;
        } else {
          emotionScores[emotion as EmotionCategory] += 1;
        }
      }
    });
  });
  
  // Find primary and secondary emotions with improved detection
  let primary: EmotionCategory = 'neutral';
  let secondary: EmotionCategory | null = null;
  let highestScore = 0;
  let secondHighestScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (score > highestScore) {
      secondary = primary;
      secondHighestScore = highestScore;
      primary = emotion as EmotionCategory;
      highestScore = score;
    } else if (score > secondHighestScore) {
      secondary = emotion as EmotionCategory;
      secondHighestScore = score;
    }
  });
  
  // If no emotion detected or all scores are negative, default to neutral
  if (highestScore <= 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // If secondary is same as primary or very low score, set to null
  if (secondary === primary || secondHighestScore < 1) {
    secondary = null;
  }
  
  // Determine intensity with more granularity
  let intensity: EmotionIntensity = 'low';
  
  // Enhanced formula: base on keyword repetition, intensifiers, and text length
  const emotionStrength = highestScore + (intensifierCount * 0.5) + (text.length > 100 ? 0.5 : 0);
  
  if (emotionStrength >= 3) {
    intensity = 'high';
  } else if (emotionStrength >= 1.5) {
    intensity = 'medium';
  }
  
  return {
    primary,
    secondary,
    intensity,
    timestamp: Date.now()
  };
}

// Get enhanced emotional response based on emotion and trust level
export function getEnhancedEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium'
): string {
  const { primary } = emotionalState;
  
  // Map any trust level to low/medium/high
  const mappedTrustLevel = 
    trustLevel === 'low' ? 'low' : 
    trustLevel === 'high' ? 'high' : 
    'medium';
  
  // Get responses for this emotion and trust level
  const emotionResponses = emotionResponseTemplates[primary]?.[mappedTrustLevel] || 
                          emotionResponseTemplates.neutral[mappedTrustLevel];
  
  // Select random response from the array
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Generate clarifying questions based on context
export function generateClarifyingQuestion(
  emotionalState: EmotionalState,
  context: string = 'general'
): string {
  const { primary } = emotionalState;
  
  // Define clarifying questions for all emotion categories
  const clarifyingQuestions: Record<EmotionCategory, string[]> = {
    fear: [
      "What exactly are you afraid of?",
      "Has this fear always been with you?",
      "Do you feel watched right now?",
      "What would happen if your fear came true?"
    ],
    sadness: [
      "What's contributing to this feeling?",
      "Has something specific triggered this sadness?",
      "How long have you been feeling this way?",
      "What usually helps when you feel like this?"
    ],
    anger: [
      "What's triggered this frustration?",
      "Is there something specific you're upset about?",
      "What would help resolve this situation?",
      "Has something happened to cause this reaction?"
    ],
    joy: [
      "What's making you feel this way?",
      "What's contributing to your positive mood?",
      "Has something good happened recently?",
      "What else brings you this kind of happiness?"
    ],
    confusion: [
      "What part seems most unclear?",
      "Where did you start feeling lost?",
      "What would help clarify things?",
      "Which aspect needs more explanation?"
    ],
    curiosity: [
      "What draws your interest most strongly?",
      "What question burns brightest for you?",
      "What would you do with the answers you seek?",
      "Where does your curiosity usually lead you?"
    ],
    hope: [
      "What are you most hopeful about?",
      "What possibilities do you see?",
      "What would the best outcome look like?",
      "What gives you this sense of optimism?"
    ],
    anxiety: [
      "What's causing you to feel anxious?",
      "What's the worst that could happen?",
      "What usually helps calm your nerves?",
      "Is there a specific worry on your mind?"
    ],
    paranoia: [
      "Who do you think might be watching?",
      "What evidence have you noticed?",
      "When did you first feel this way?",
      "What would make you feel safer?"
    ],
    trust: [
      "What helps you feel able to trust?",
      "Has something specific built your confidence?",
      "What makes this feel safe to you?",
      "What would deepen that trust further?"
    ],
    neutral: [
      "Could you tell me more about what you're thinking?",
      "What are you hoping to discover here?",
      "Is there something specific you're looking for?",
      "What brought you to this conversation?"
    ]
  };
  
  const questions = clarifyingQuestions[primary];
  return questions[Math.floor(Math.random() * questions.length)];
}

// Complete response generation with adaptive content
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium',
  includeQuestion: boolean = true,
  previousResponses: string[] = []
): string {
  // Get base emotional response
  const response = getEnhancedEmotionalResponse(emotionalState, trustLevel);
  
  // Avoid repeating recent responses
  if (previousResponses.some(prev => prev === response)) {
    // Try again with a different random selection
    return generateFullEmotionalResponse(emotionalState, trustLevel, includeQuestion, previousResponses);
  }
  
  // Maybe add a clarifying question (higher chance at medium trust)
  if (includeQuestion && (Math.random() < (trustLevel === 'medium' ? 0.8 : 0.5))) {
    const question = generateClarifyingQuestion(emotionalState);
    return `${response}\n\n${question}`;
  }
  
  return response;
}
