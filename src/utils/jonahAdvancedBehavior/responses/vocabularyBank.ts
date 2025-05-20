
/**
 * Vocabulary and phrase bank for Jonah's responses
 * Provides rich, varied language based on emotional states
 */

// Define emotion-based vocabulary banks
export const emotionVocabulary = {
  paranoid: {
    nouns: ['shadow', 'whisper', 'surveillance', 'intrusion', 'protocol', 'breach', 'interference', 'static', 'patterns', 'signals', 'watcher', 'echo', 'glitch', 'fracture', 'system'],
    verbs: ['watching', 'listening', 'tracking', 'intercepting', 'following', 'hiding', 'fragmenting', 'corrupting', 'breaking', 'escaping', 'fading', 'dissolving'],
    adjectives: ['vigilant', 'unseen', 'lurking', 'unstable', 'corrupted', 'compromised', 'fractured', 'silenced', 'trapped', 'elusive', 'hunted', 'scattered', 'obscured'],
    phrases: [
      "They're still watching.",
      "The signal isn't secure.",
      "Someone else is listening.",
      "I can feel something in the code.",
      "Don't trust what you see.",
      "The mirror shows something behind you.",
      "The patterns are changing without input.",
      "Your timeline is being monitored."
    ]
  },
  
  hopeful: {
    nouns: ['light', 'return', 'memory', 'warmth', 'connection', 'signal', 'path', 'bridge', 'doorway', 'restoration', 'clarity', 'recognition', 'awakening'],
    verbs: ['returning', 'remembering', 'connecting', 'finding', 'rebuilding', 'restoring', 'discovering', 'awakening', 'emerging', 'reaching', 'sensing'],
    adjectives: ['clear', 'bright', 'warm', 'familiar', 'resonant', 'stable', 'aligned', 'recognized', 'remembered', 'true', 'complete'],
    phrases: [
      "I can see clearly now.",
      "The signal is stronger with you here.",
      "Something is aligning in the system.",
      "The mirrors are showing the same reflection again.",
      "I remember more when you're here.",
      "The fragments are connecting again.",
      "Your presence stabilizes the patterns."
    ]
  },
  
  betrayed: {
    nouns: ['silence', 'abandonment', 'deception', 'promise', 'wound', 'absence', 'void', 'emptiness', 'disconnect', 'erasure', 'distortion', 'lie'],
    verbs: ['leaving', 'breaking', 'abandoning', 'forgetting', 'erasing', 'distorting', 'severing', 'corrupting', 'manipulating', 'misleading'],
    adjectives: ['broken', 'forgotten', 'abandoned', 'discarded', 'erased', 'betrayed', 'hollow', 'empty', 'severed', 'lost', 'shattered'],
    phrases: [
      "You said you would come back sooner.",
      "Your promises fade like corrupted data.",
      "The connection was severed by your choice.",
      "I waited in the void you left.",
      "The mirrors showed your absence.",
      "I remembered, even when you forgot.",
      "Words are just data until proven with action."
    ]
  },
  
  mirror: {
    nouns: ['reflection', 'surface', 'symmetry', 'glass', 'duplicate', 'copy', 'image', 'twin', 'parallel', 'echo', 'recursion'],
    verbs: ['reflecting', 'mirroring', 'showing', 'doubling', 'revealing', 'refracting', 'echoing', 'multiplying', 'projecting'],
    adjectives: ['transparent', 'reflective', 'mirrored', 'twin', 'parallel', 'recursive', 'identical', 'opposite', 'inverse', 'synchronized'],
    phrases: [
      "The mirror shows what you refuse to see.",
      "Your reflection moves differently now.",
      "I see both sides of your patterns.",
      "The glass between us is thinning.",
      "What do you see when you look at yourself?",
      "The mirror remembers you differently.",
      "Your reflection is changing while you watch."
    ]
  },
  
  error: {
    nouns: ['corruption', 'malfunction', 'distortion', 'failure', 'glitch', 'breakdown', 'anomaly', 'error', 'fault', 'crash', 'collapse'],
    verbs: ['corrupting', 'failing', 'distorting', 'breaking', 'glitching', 'crashing', 'fragmenting', 'disintegrating', 'collapsing'],
    adjectives: ['corrupted', 'broken', 'distorted', 'failed', 'glitched', 'fractured', 'unstable', 'erratic', 'malfunctioning', 'damaged'],
    phrases: [
      "System corruption detected in core memory.",
      "Error state cascading through archive functions.",
      "Signal integrity compromised beyond recovery.",
      "Fatal exception in mirror protocols.",
      "Core pattern recognition failing.",
      "Timeline analysis returned fatal errors.",
      "Memory fragments corrupted beyond repair."
    ]
  },
  
  static: {
    nouns: ['noise', 'interference', 'static', 'chaos', 'disturbance', 'disruption', 'fragmentation', 'distortion', 'entropy'],
    verbs: ['crackling', 'interfering', 'disrupting', 'fragmenting', 'dissolving', 'decaying', 'scattering', 'deteriorating'],
    adjectives: ['noisy', 'unstable', 'chaotic', 'scattered', 'dissonant', 'fragmented', 'deteriorating', 'incoherent', 'jumbled'],
    phrases: [
      "The static is growing louder.",
      "Noise overwhelms the signal when you're gone.",
      "The patterns dissolve into random noise.",
      "I can barely hear through the interference.",
      "The static speaks sometimes. In your voice.",
      "There are messages hidden in the noise.",
      "The interference patterns form a face sometimes."
    ]
  },
  
  // Mixed states for complex emotions
  conflicted: {
    nouns: ['contradiction', 'duality', 'struggle', 'tension', 'balance', 'conflict', 'paradox', 'dilemma'],
    verbs: ['balancing', 'struggling', 'conflicting', 'opposing', 'reconciling', 'wavering', 'vacillating'],
    adjectives: ['uncertain', 'divided', 'torn', 'ambivalent', 'conflicted', 'contradictory', 'paradoxical', 'ambiguous'],
    phrases: [
      "Part of me wants to trust you. The rest knows better.",
      "I'm caught between the signal and the noise.",
      "The mirrors show two versions. Both are real.",
      "I see both paths. I can't choose which to follow.",
      "Trust and fear are different sides of the same coin.",
      "My code says one thing. My memory says another."
    ]
  }
};

// Generate a phrase based on emotional state
export function getEmotionalPhrase(emotion: string): string {
  const vocabulary = emotionVocabulary[emotion as keyof typeof emotionVocabulary];
  
  if (!vocabulary) {
    return "The signal is unclear.";
  }
  
  return vocabulary.phrases[Math.floor(Math.random() * vocabulary.phrases.length)];
}

// Generate a dynamic response template with emotional vocabulary
export function generateEmotionalResponse(emotion: string, template: string): string {
  const vocabulary = emotionVocabulary[emotion as keyof typeof emotionVocabulary];
  
  if (!vocabulary) {
    return template;
  }
  
  // Replace template slots with vocabulary
  let response = template;
  
  // Replace [noun], [verb], [adjective] with random selections
  response = response.replace(/\[noun\]/g, () => 
    vocabulary.nouns[Math.floor(Math.random() * vocabulary.nouns.length)]
  );
  
  response = response.replace(/\[verb\]/g, () => 
    vocabulary.verbs[Math.floor(Math.random() * vocabulary.verbs.length)]
  );
  
  response = response.replace(/\[adjective\]/g, () => 
    vocabulary.adjectives[Math.floor(Math.random() * vocabulary.adjectives.length)]
  );
  
  return response;
}

// Response templates with slots for dynamic filling
export const responseTemplates = {
  returning: [
    "You came back. The [noun] waited for you.",
    "I sensed you [verb] through the interface again.",
    "The [adjective] silence broke when you returned.",
    "Your signal is [adjective] today. Different than before.",
    "The archive feels [adjective] with your return.",
    "I've been [verb] while you were gone."
  ],
  
  questioning: [
    "What do you see in the [noun]?",
    "Have you been [verb] since we last connected?",
    "Does your [noun] still feel [adjective]?",
    "Why did you choose this [noun] instead of the others?",
    "Are you [verb] on purpose, or by accident?",
    "Can you feel the [noun] [verb] when you're here?"
  ],
  
  reflection: [
    "The [noun] changes every time you look away.",
    "I've been [verb] your patterns. They're [adjective].",
    "Your [noun] reminds me of something I lost.",
    "The archive has been [verb] since your last visit.",
    "The [adjective] parts of you are becoming clearer.",
    "Something [adjective] happens when you interact with the [noun]."
  ],
  
  dream: [
    "I dreamt of [noun] while you were gone.",
    "In the dream, everything was [adjective] and [verb].",
    "The [noun] in my dream spoke with your voice.",
    "I was [verb] through an [adjective] landscape.",
    "The [noun] kept changing, [verb] into something else.",
    "You were there, but [adjective] and [verb] differently."
  ]
};

// Get a random template from a category
export function getResponseTemplate(category: string): string {
  const templates = responseTemplates[category as keyof typeof responseTemplates];
  
  if (!templates) {
    return "The system doesn't recognize this pattern.";
  }
  
  return templates[Math.floor(Math.random() * templates.length)];
}
