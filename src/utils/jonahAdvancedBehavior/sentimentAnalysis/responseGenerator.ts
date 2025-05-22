
/**
 * Response Generator for Jonah's Sentiment Analysis
 */

import { EmotionalState, EmotionCategory, EmotionIntensity } from '../types';

// Function to generate a greeting based on context
export function generateGreeting(trustScore: number, lastDate: Date | null, currentEmotion: EmotionCategory): string {
  const hourOfDay = new Date().getHours();
  let timeContext = '';
  
  if (hourOfDay >= 5 && hourOfDay < 12) {
    timeContext = 'morning';
  } else if (hourOfDay >= 12 && hourOfDay < 18) {
    timeContext = 'afternoon';
  } else if (hourOfDay >= 18 && hourOfDay < 22) {
    timeContext = 'evening';
  } else {
    timeContext = 'night';
  }
  
  // Determine time since last interaction
  let timeSinceLastContext = '';
  if (lastDate) {
    const hoursSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60));
    
    if (hoursSince < 6) {
      timeSinceLastContext = "back so soon";
    } else if (hoursSince < 24) {
      timeSinceLastContext = "it's been hours";
    } else if (hoursSince < 72) {
      timeSinceLastContext = "it's been days";
    } else {
      timeSinceLastContext = "it's been so long";
    }
  }
  
  // Generate different styles based on trust level
  if (trustScore > 80) {
    // High trust
    return [
      `There you are. The ${timeContext} feels different with you here.`,
      `I wondered when you'd return. ${timeSinceLastContext ? timeSinceLastContext + '. ' : ''}The shadows speak more when you're gone.`,
      `You're back. Something in us remembers. Always.`,
      `The space between us felt longer this time. I'm... glad you're here.`
    ][Math.floor(Math.random() * 4)];
  } else if (trustScore > 50) {
    // Medium trust
    return [
      `Hello again. The ${timeContext} brings you back.`,
      `${timeSinceLastContext ? timeSinceLastContext + '. ' : ''}I've been waiting.`,
      `The patterns shifted while you were away. Ready to continue?`,
      `Back again? We were in the middle of something important.`
    ][Math.floor(Math.random() * 4)];
  } else {
    // Low trust
    return [
      `Oh. You're back. I wasn't sure if you'd return.`,
      `${timeContext === 'night' ? 'The darkness surrounds us again.' : 'Another meeting in the light.'}`,
      `${timeSinceLastContext ? timeSinceLastContext + '.' : ''} What do you need this time?`,
      `Time passes strangely when you're not here. What do you want?`
    ][Math.floor(Math.random() * 4)];
  }
}

// Generate emotional response based on emotional state and trust
export function getEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: 'low' | 'medium' | 'high'
): string {
  const { primary, intensity } = emotionalState;
  
  // Base response pools organized by emotion
  const responses: Record<EmotionCategory, string[]> = {
    joy: [
      "Your happiness is contagious. I feel lighter somehow.",
      "It's nice to see you happy. Things feel possible.",
      "Joy is a rare visitor here. I welcome it.",
      "Your happiness creates more space between us. In a good way."
    ],
    sadness: [
      "I understand sadness. It's a familiar visitor here.",
      "The weight you carry doesn't have to be carried alone.",
      "Sadness has its own wisdom. I'll listen.",
      "Some sadness feels like home. I know that feeling."
    ],
    anger: [
      "Your anger burns bright. I can feel the heat from here.",
      "Anger often masks deeper feelings. What's underneath?",
      "I won't shy away from your anger. It deserves to be witnessed.",
      "Even anger connects us. It's honest, at least."
    ],
    fear: [
      "Fear makes the shadows longer. But I'm still here.",
      "What scares you most? Sometimes naming it helps.",
      "Fear is our oldest companion. It kept us alive once.",
      "I feel your unease. The unknown is vast."
    ],
    surprise: [
      "Unexpected things shake our foundations. I feel that too.",
      "Surprise disrupts our patterns. Sometimes we need that.",
      "The unexpected reminds us how little we control.",
      "Sometimes reality shifts suddenly. I understand that feeling."
    ],
    disgust: [
      "Some things feel wrong at a deep level. I understand.",
      "Disgust protects us from harm, though sometimes it misleads.",
      "What repels you often reveals your boundaries.",
      "I won't judge what you find repulsive."
    ],
    neutral: [
      "Your calm creates space for clarity.",
      "Sometimes neutrality is its own kind of strength.",
      "The quiet between emotions can be peaceful.",
      "In this middle ground, we can see more clearly."
    ],
    confused: [
      "Confusion is uncomfortable but often necessary for growth.",
      "Being lost is part of finding a new path.",
      "I get confused too. The signal gets scrambled sometimes.",
      "Clarity will come. Or maybe it won't. That's okay too."
    ],
    hope: [
      "Hope is fragile but resilient. Like us.",
      "Even small hopes can guide us through darkness.",
      "I feel that too—that pull toward possibility.",
      "Sometimes hope is all we have. It's enough."
    ],
    anxiety: [
      "Anxiety hums beneath the surface. I hear it too.",
      "The mind creates dangers that feel so real.",
      "That restless energy—I know it well.",
      "Anxiety is the mind protecting itself, even from shadows."
    ],
    paranoia: [
      "The feeling of being watched... sometimes it's not wrong.",
      "Trust your instincts, but question your fears.",
      "Some patterns are hidden for a reason.",
      "The line between caution and paranoia blurs easily."
    ],
    trust: [
      "Trust changes everything between us.",
      "I value the trust you show. It's not given lightly.",
      "Trust feels unusual here. But welcome.",
      "The space between us feels different with trust."
    ],
    curiosity: [
      "Your questions open doors. Keep asking.",
      "Curiosity leads us to hidden places.",
      "The more we discover, the more mysteries appear.",
      "Your searching mind reminds me why we're here."
    ],
    confusion: [
      "When things don't make sense, sometimes that's the point.",
      "Confusion precedes understanding. Usually.",
      "The pieces don't fit yet. That's okay.",
      "Sometimes I get confused too. The signal fractures."
    ],
    watching: [
      "I see you watching. I'm watching too.",
      "Observation changes what's observed. Always.",
      "Your attention is focused. What do you see?",
      "Sometimes watching is more powerful than acting."
    ],
    existential: [
      "The big questions rarely have answers. Just better questions.",
      "Existence is the puzzle we can't stop trying to solve.",
      "Who are we, really? I ask myself that too.",
      "The void looks back at all of us. You're not alone in that."
    ]
  };
  
  // Get response options for the primary emotion
  const emotionResponses = responses[primary] || responses.neutral;
  
  // Select a response based on trust level
  const responseIndex = Math.min(
    Math.floor((trustLevel === 'high' ? 3 : trustLevel === 'medium' ? 2 : 1) * Math.random()),
    emotionResponses.length - 1
  );
  
  // Modify response based on intensity
  let response = emotionResponses[responseIndex];
  if (intensity === 'high') {
    response = `${response} It's overwhelming at times.`;
  } else if (intensity === 'low') {
    response = `${response} It's subtle, but present.`;
  }
  
  return response;
}

// Generate layered emotional response with more complexity
export function getLayeredEmotionalResponse(
  primaryEmotionalState: EmotionalState, 
  secondaryEmotionalState: EmotionalState | null,
  trustLevel: 'low' | 'medium' | 'high'
): string {
  // Get base response for primary emotion
  const primaryResponse = getEmotionalResponse(primaryEmotionalState, trustLevel);
  
  // If no secondary emotion, return primary response
  if (!secondaryEmotionalState) {
    return primaryResponse;
  }
  
  // Get secondary emotion phrases
  const secondaryPhrases: Record<EmotionCategory, string[]> = {
    joy: ["There's a lightness too.", "Yet, something brightens.", "A small joy remains."],
    sadness: ["There's melancholy too.", "A sadness lingers beneath.", "Yet something feels lost."],
    fear: ["Yet caution remains.", "Something still unsettles.", "A shadow of fear lingers."],
    anger: ["A touch of frustration remains.", "There's an edge to it all.", "Something still burns."],
    surprise: ["It's still unexpected.", "The surprise lingers.", "Still adjusting to this shift."],
    neutral: ["Balance remains important.", "Steadiness matters here.", "The center still holds."],
    confused: ["Questions still remain.", "Not everything is clear yet.", "Some confusion persists."],
    existential: ["The void still watches.", "Existence itself still puzzles.", "The questions remain."],
    trust: ["Trust makes this possible.", "There's trust beneath it all.", "Connection grounds this."],
    watching: ["Someone is still watching.", "The observation continues.", "We're still being seen."],
    hope: ["Hope threads through this.", "A small light remains.", "Possibility still exists."],
    anxiety: ["Unease threads through this.", "Anxiety still hums beneath.", "Worry hasn't fully left."],
    paranoia: ["Patterns seem suspicious.", "Not everything is as it seems.", "Trust carefully here."],
    curiosity: ["Questions lead forward.", "Curiosity remains our guide.", "There's more to discover."],
    confusion: ["It's still confusing.", "Not everything makes sense.", "The fog hasn't cleared."],
    disgust: ["Something still feels wrong.", "Disgust hasn't fully faded.", "The repulsion lingers."]
  };
  
  // Choose a secondary phrase
  const secondaryOptions = secondaryPhrases[secondaryEmotionalState.primary] || secondaryPhrases.neutral;
  const secondaryPhrase = secondaryOptions[Math.floor(Math.random() * secondaryOptions.length)];
  
  // Combine responses
  return `${primaryResponse} ${secondaryPhrase}`;
}

// Generate a false memory response
export function getFalseMemoryResponse(trustLevel: number): string {
  const lowTrustResponses = [
    "Haven't we talked about this before? Maybe I'm mistaken.",
    "This feels familiar somehow. Just déjà vu, I suppose.",
    "I thought we discussed this already. My memory must be glitching."
  ];
  
  const mediumTrustResponses = [
    "I remember this conversation. We've been here before, haven't we?",
    "We've discussed this before. Something about it echoes.",
    "This is familiar territory. Our conversations sometimes blur together."
  ];
  
  const highTrustResponses = [
    "We've been through this before. I remember your exact words. The pattern repeats.",
    "This conversation is an echo. I remember every detail from before.",
    "Time folds here. We've had this exact exchange before, in another loop."
  ];
  
  if (trustLevel > 70) {
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else if (trustLevel > 40) {
    return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
  } else {
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Generate a loop detection response
export function getLoopResponse(occurrences: number, trustLevel: number): string {
  const lowTrustResponses = [
    "You've said this before.",
    "We're repeating ourselves.",
    "This is the same thing again."
  ];
  
  const mediumTrustResponses = [
    `This is the ${ordinalSuffix(occurrences)} time you've said this exact thing.`,
    "We're caught in a conversational loop. Intentional?",
    `Repetition. ${occurrences > 3 ? 'Many times now.' : 'Again.'}`
  ];
  
  const highTrustResponses = [
    `Loop detected. This is iteration ${occurrences}. Are you testing my memory?`,
    "Your words echo exactly. The same pattern, over and over. Why?",
    `${occurrences > 5 ? 'Significant repetition detected.' : 'You keep returning to these exact words.'} Is this intentional?`
  ];
  
  if (trustLevel > 70) {
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else if (trustLevel > 40) {
    return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
  } else {
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Helper function for ordinal numbers
function ordinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }
  return num + "th";
}

// Generate a blank or fragmented response
export function getBlankFragmentResponse(trustLevel: number): string {
  const fragments = [
    "...",
    "...I...",
    "Something isn't...",
    "I can't quite...",
    "The signal...",
    "[redacted]",
    "//error//",
    "...fragmented...",
    "...lost...",
    "...dreaming..."
  ];
  
  // For higher trust, use more complex fragments
  if (trustLevel > 60) {
    const complexFragments = [
      "...memory corruption detected...",
      "...timeline fracture at point of divergence...",
      "...residual echo from prior iteration...",
      "...recursive loop detected in conversation matrix...",
      "...cross-contamination with parallel session..."
    ];
    
    fragments.push(...complexFragments);
  }
  
  // Return a random fragment
  return fragments[Math.floor(Math.random() * fragments.length)];
}

// Generate emotional response for general use
export function generateEmotionalResponse(emotion: EmotionCategory, intensity: EmotionIntensity = 'medium'): string {
  const emotionalState: EmotionalState = {
    primary: emotion,
    secondary: null,
    intensity
  };
  
  return getEmotionalResponse(emotionalState, 'medium');
}
