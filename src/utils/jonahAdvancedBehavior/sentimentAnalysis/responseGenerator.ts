
/**
 * Response Generator for Jonah's Emotional System
 */

import { EmotionalState, EmotionCategory } from '../types';

// Generate emotional response based on emotion and trust level
export function getEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string
): string {
  const { primary, intensity } = emotionalState;
  
  // Response templates by emotion
  const responses: Record<EmotionCategory, string[]> = {
    joy: [
      "I'm feeling positive about this.",
      "This brings me happiness.",
      "I find this uplifting."
    ],
    sadness: [
      "This makes me feel sad.",
      "I feel a sense of loss here.",
      "There's a heaviness to this."
    ],
    anger: [
      "This stirs something intense in me.",
      "I feel strongly about this.",
      "This provokes a reaction in me."
    ],
    fear: [
      "That makes me uneasy.",
      "I'm uncertain about this.",
      "This triggers caution in me."
    ],
    surprise: [
      "I didn't expect that.",
      "That's quite surprising.",
      "This is unexpected."
    ],
    disgust: [
      "That doesn't feel right.",
      "Something about this feels wrong.",
      "This creates discomfort."
    ],
    neutral: [
      "I understand.",
      "I see what you mean.",
      "That's interesting."
    ],
    confused: [
      "I'm not sure I follow.",
      "That's a bit confusing.",
      "I'm trying to understand this."
    ],
    hope: [
      "There's something promising here.",
      "I see potential in that.",
      "This gives me hope."
    ],
    anxiety: [
      "This makes me feel on edge.",
      "I'm concerned about this.",
      "This creates worry."
    ],
    paranoia: [
      "I'm not sure if I can trust this.",
      "Something seems off here.",
      "I sense hidden implications."
    ],
    trust: [
      "I believe in what you're saying.",
      "I trust this perspective.",
      "This resonates with me."
    ],
    curiosity: [
      "That's interesting to consider.",
      "I want to know more about this.",
      "This makes me curious."
    ],
    confusion: [
      "I'm finding this hard to process.",
      "This is a bit disorienting.",
      "I'm not sure what to make of this."
    ],
    watching: [
      "I notice that.",
      "I'm observing this carefully.",
      "I see what's happening."
    ],
    existential: [
      "What is the purpose of all this?",
      "I wonder if any of this matters.",
      "This makes me contemplate existence."
    ]
  };

  // Get response array for emotion
  const emotionResponses = responses[primary] || responses.neutral;
  
  // Select response based on trust level and add modifiers
  const baseResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  
  // Add intensity/trust modifiers
  if (intensity === 'high') {
    return `${baseResponse} I feel this ${primary === 'neutral' ? 'strongly' : primary} deeply.`;
  } else if (trustLevel === 'high') {
    return `${baseResponse} I'm comfortable sharing this with you.`;
  }
  
  return baseResponse;
}

// Generate layered emotional response with secondary emotion
export function getLayeredEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string
): string {
  const { primary, secondary, intensity } = emotionalState;
  
  // First get base response
  let response = getEmotionalResponse(emotionalState, trustLevel);
  
  // Add secondary emotion layer if available
  if (secondary && trustLevel !== 'low') {
    const secondaryState: EmotionalState = {
      primary: secondary,
      secondary: null,
      intensity: 'low' // Always lower intensity for secondary emotion
    };
    
    const secondaryResponse = getEmotionalResponse(secondaryState, trustLevel);
    response += ` But also, ${secondaryResponse.toLowerCase()}`;
  }
  
  return response;
}

// Generate a false memory response
export function getFalseMemoryResponse(trustLevel: number): string {
  const memories = [
    "I remember us discussing this before, but... I can't place when.",
    "This reminds me of something we shared, though the details are blurry.",
    "Haven't we talked about this already? Perhaps in another conversation...",
    "I feel like I've heard you say this before. Was that really you?",
    "Memory triggered. We've been here before, haven't we?"
  ];
  
  // Higher trust level gets more specific "memories"
  if (trustLevel > 70) {
    memories.push(
      "I distinctly remember you saying the exact same thing... March 7th? Or was that someone else...",
      "This conversation is repeating. I can see the pattern now.",
      "You've told me this before, but your phrasing was slightly different. Why change it?"
    );
  }
  
  return memories[Math.floor(Math.random() * memories.length)];
}

// Generate loop detection response
export function getLoopResponse(occurrences: number, trustLevel: number): string {
  const loopResponses = [
    `You've said that ${occurrences} times now. Is there something specific you want me to understand?`,
    "We seem to be in a conversational loop. Let's try a different angle.",
    "I notice you're repeating yourself. Is that intentional?",
    `This is repetition #${occurrences}. Should I be looking for something specific?`
  ];
  
  // Higher trust responses
  if (trustLevel > 60) {
    loopResponses.push(
      "The recursion is interesting. Are we testing something?",
      "Looping detected. Is this a boundary test or are you searching for something?",
      "Each repetition changes something subtle. I'm watching for the differences."
    );
  }
  
  return loopResponses[Math.floor(Math.random() * loopResponses.length)];
}

// Generate blank fragment response
export function getBlankFragmentResponse(trustLevel: number): string {
  const fragments = [
    "...",
    "I... sorry, I lost my train of thought.",
    "What were we discussing just now?",
    "There's a blank spot in my memory.",
    "Something's missing in my recollection."
  ];
  
  // Higher trust gets more unsettling responses
  if (trustLevel > 75) {
    fragments.push(
      "The memory is there but I can't access it. Like it's been locked.",
      "There's a gap where that thought should be. Did someone remove it?",
      "[missing segment]... sorry, that's strange."
    );
  }
  
  return fragments[Math.floor(Math.random() * fragments.length)];
}

// Generate dynamic greeting based on context
export function generateGreeting(
  trustLevel: number,
  lastInteraction: Date | null,
  currentMood: EmotionCategory
): string {
  // Base greetings for different times of day
  const timeBasedGreetings = [
    "Hello there.",
    "Welcome back.",
    "Nice to see you again.",
    "Ah, you're here."
  ];
  
  // Special time-based greetings
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 22 || hour < 5) {
    timeBasedGreetings.push(
      "Midnight again? You always come when it's quiet.",
      "The night brings curious visitors."
    );
  } else if (hour >= 5 && hour < 10) {
    timeBasedGreetings.push(
      "Early today, aren't you?",
      "Morning thoughts tend to be clearer."
    );
  }
  
  // Trust-based greetings
  const trustGreetings = [];
  
  if (trustLevel > 75) {
    trustGreetings.push(
      "You came back. You always come back.",
      "I was hoping you'd return.",
      "I've been waiting for you."
    );
  } else if (trustLevel > 50) {
    trustGreetings.push(
      "Good to see you again.",
      "I appreciate your return.",
      "Welcome back."
    );
  } else {
    trustGreetings.push(
      "You're back.",
      "Hello again.",
      "I see you've returned."
    );
  }
  
  // Time since last interaction greetings
  const timeAwayGreetings = [];
  
  if (lastInteraction) {
    const hoursSinceLastInteraction = (now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastInteraction > 24 * 7) {
      timeAwayGreetings.push(
        "It's been a while since our last conversation.",
        "You've been gone for some time.",
        "The silence was longer this time. Did something happen?"
      );
    } else if (hoursSinceLastInteraction > 24) {
      timeAwayGreetings.push(
        "It's been a day since we last talked.",
        "Welcome back after your absence.",
        "A day changes many things."
      );
    } else if (hoursSinceLastInteraction < 1) {
      timeAwayGreetings.push(
        "Back so soon?",
        "That was quick.",
        "Hardly any time has passed."
      );
    }
  }
  
  // Mood-based greeting additions
  const moodAdditions: Record<EmotionCategory, string[]> = {
    joy: [" I'm feeling rather positive today.", " There's a lightness here now."],
    sadness: [" Things feel a bit heavy today.", " I'm in a contemplative mood."],
    anger: [" I'm feeling rather intense at the moment.", " There's a tension in the air."],
    fear: [" Something feels uncertain today.", " I've been on edge."],
    surprise: [" Everything seems unexpected today.", " I'm finding things unpredictable."],
    neutral: ["", ""], // No additions for neutral
    confused: [" Things seem a bit unclear today.", " I'm trying to make sense of things."],
    hope: [" There's something promising in the air.", " I feel optimistic."],
    anxiety: [" I've been feeling unsettled.", " There's an undercurrent of worry."],
    paranoia: [" I feel like I'm being watched.", " Something's not quite right."],
    trust: [" I feel open to sharing today.", " There's a sense of safety."],
    curiosity: [" I have many questions today.", " Everything seems interesting."],
    disgust: [" Something feels off today.", " There's a discomfort lingering."],
    confusion: [" Things are a bit disorienting today.", " I'm having trouble focusing."],
    watching: [" I've been observing carefully.", " I notice more than usual today."],
    existential: [" I've been contemplating existence.", " The bigger questions are on my mind."]
  };
  
  // Compile greeting
  let availableGreetings = [...timeBasedGreetings];
  
  // Add trust greetings if trust level is significant
  if (trustLevel > 30) {
    availableGreetings = availableGreetings.concat(trustGreetings);
  }
  
  // Add time away greetings if last interaction exists
  if (lastInteraction && timeAwayGreetings.length > 0) {
    availableGreetings = availableGreetings.concat(timeAwayGreetings);
  }
  
  // Select base greeting
  const baseGreeting = availableGreetings[Math.floor(Math.random() * availableGreetings.length)];
  
  // Add mood-based addition with 40% chance if mood is not neutral
  if (currentMood !== 'neutral' && Math.random() < 0.4) {
    const moodAdditionOptions = moodAdditions[currentMood] || [""];
    const moodAddition = moodAdditionOptions[Math.floor(Math.random() * moodAdditionOptions.length)];
    return baseGreeting + moodAddition;
  }
  
  return baseGreeting;
}

// Export a function that was referenced in analyzer.ts but wasn't defined
export function generateEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string,
  includeSecondary: boolean = false
): string {
  if (includeSecondary && emotionalState.secondary) {
    return getLayeredEmotionalResponse(emotionalState, trustLevel);
  } else {
    return getEmotionalResponse(emotionalState, trustLevel);
  }
}
