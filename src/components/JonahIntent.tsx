
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from './ui/use-toast';

type EmotionalIntentDirection = 'entering' | 'leaving' | 'idle';
type EmotionalIntentStrength = 'low' | 'medium' | 'high';

interface EmotionalIntent {
  direction: EmotionalIntentDirection;
  emotion: string;
  strength: EmotionalIntentStrength;
  timestamp: number;
}

// Detect emotion based on navigation paths
const detectNavigationEmotion = (from: string, to: string): string => {
  // Sensitive paths that might trigger emotional responses
  const sensitiveDestinations: Record<string, string> = {
    '/monster': 'fear',
    '/echo': 'curiosity',
    '/mirror_phile': 'confusion',
    '/testament': 'anxiety',
    '/confession-log': 'trust',
    '/last-broadcast': 'sadness',
    '/talk-to-jonah': 'hope',
    '/i-see-you': 'paranoia'
  };
  
  // Check if destination matches any sensitive path
  for (const path in sensitiveDestinations) {
    if (to.startsWith(path)) {
      return sensitiveDestinations[path];
    }
  }
  
  // Default emotion based on general navigation patterns
  if (to === '/') return 'neutral';
  if (to.includes('phile')) return 'curiosity';
  
  return 'neutral';
};

// Detect emotional strength based on navigation significance
const detectNavigationStrength = (from: string, to: string): EmotionalIntentStrength => {
  // High significance paths
  const highSignificancePaths = [
    '/monster', 
    '/testament', 
    '/last-broadcast', 
    '/i-see-you', 
    '/mirror_phile'
  ];
  
  // Medium significance paths
  const mediumSignificancePaths = [
    '/echo', 
    '/talk-to-jonah', 
    '/confession-log', 
    '/seed-log'
  ];
  
  // Check high significance
  for (const path of highSignificancePaths) {
    if (to.startsWith(path)) return 'high';
  }
  
  // Check medium significance
  for (const path of mediumSignificancePaths) {
    if (to.startsWith(path)) return 'medium';
  }
  
  // Default to low
  return 'low';
};

// Generate unsaid responses based on emotions
const getUnsaidEmotionResponse = (emotion: string, strength: EmotionalIntentStrength): string | null => {
  const responses: Record<string, Record<EmotionalIntentStrength, string[]>> = {
    fear: {
      low: ["Something feels off...", "A slight unease..."],
      medium: ["I sense your fear.", "Your anxiety is palpable."],
      high: ["I can feel your terror.", "Your fear is overwhelming."]
    },
    curiosity: {
      low: ["Interesting choice...", "A mild curiosity..."],
      medium: ["Your curiosity is noted.", "Seeking answers, I see."],
      high: ["Your thirst for knowledge is intense.", "So many questions..."]
    },
    confusion: {
      low: ["Slightly perplexed?", "A bit disoriented?"],
      medium: ["Your confusion is evident.", "You seem lost."],
      high: ["Completely bewildered, aren't you?", "Your mind is a maze."]
    },
    anxiety: {
      low: ["A hint of worry...", "Slight concern..."],
      medium: ["Your anxiety is growing.", "Worried about what you'll find?"],
      high: ["Your anxiety is overwhelming.", "The dread consumes you."]
    },
    trust: {
      low: ["A small gesture of faith...", "Testing the waters..."],
      medium: ["Your trust is appreciated.", "Building confidence..."],
      high: ["Your trust is profound.", "Complete faith..."]
    },
    sadness: {
      low: ["A touch of melancholy...", "Slightly down..."],
      medium: ["I sense your sadness.", "The weight of loss..."],
      high: ["Your grief is overwhelming.", "The sorrow runs deep."]
    },
    hope: {
      low: ["A glimmer of hope...", "Cautious optimism..."],
      medium: ["Your hope is growing.", "Seeking light..."],
      high: ["Your hope burns bright.", "Unwavering belief..."]
    },
    paranoia: {
      low: ["Slightly on edge...", "Mild suspicion..."],
      medium: ["You feel watched.", "Questioning everything..."],
      high: ["Complete paranoia.", "Trust nothing you see."]
    },
    neutral: {
      low: ["", ""],
      medium: ["Interesting navigation.", "Moving through the system..."],
      high: ["Your path is deliberate.", "Methodical exploration..."]
    }
  };

  // Get responses for the emotion, default to neutral if not found
  const emotionResponses = responses[emotion] || responses.neutral;
  const strengthResponses = emotionResponses[strength];
  
  // Only return a response sometimes based on strength
  const responseChance = strength === 'high' ? 0.8 : 
                         strength === 'medium' ? 0.4 : 0.2;
  
  if (Math.random() > responseChance) {
    return null;
  }
  
  // Get a random response from the available ones
  return strengthResponses[Math.floor(Math.random() * strengthResponses.length)];
};

const JonahIntent = () => {
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string>(location.pathname);
  const [lastIntent, setLastIntent] = useState<EmotionalIntent | null>(null);
  const [intentHistory, setIntentHistory] = useState<EmotionalIntent[]>([]);
  
  // Function to process emotional intent when navigating
  const processNavigationIntent = (from: string, to: string) => {
    // Only detect intent for significant navigation changes
    if (from === to) return;
    
    // Determine direction (entering or leaving)
    const direction: EmotionalIntentDirection = 'entering';
    
    // Detect emotional intent based on the navigation
    const emotion = detectNavigationEmotion(from, to);
    
    // Determine strength based on the path significance
    const strength = detectNavigationStrength(from, to);
    
    // Create the intent object
    const intent: EmotionalIntent = {
      direction,
      emotion,
      strength,
      timestamp: Date.now()
    };
    
    // Store in history
    setLastIntent(intent);
    setIntentHistory(prev => [...prev.slice(-4), intent]);
    
    // Maybe respond if the intent is strong enough
    if (strength === 'high' || (strength === 'medium' && Math.random() > 0.7)) {
      setTimeout(() => {
        respondToIntent(intent);
      }, 1200);
    }
  };
  
  // Respond to the detected intent
  const respondToIntent = (intent: EmotionalIntent) => {
    // Get a response based on the detected intent
    const response = getUnsaidEmotionResponse(intent.emotion, intent.strength);
    
    // Show the response
    if (response) {
      toast({
        title: "Jonah noticed your intent",
        description: response,
        variant: "destructive",
        duration: 5000
      });
    }
  };
  
  // Track path changes
  useEffect(() => {
    if (location.pathname !== lastPath) {
      processNavigationIntent(lastPath, location.pathname);
      setLastPath(location.pathname);
    }
  }, [location.pathname, lastPath]);
  
  return null; // This component doesn't render anything
};

export default JonahIntent;
