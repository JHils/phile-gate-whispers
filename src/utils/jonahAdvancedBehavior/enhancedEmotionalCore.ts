/**
 * Enhanced Emotional Core for Jonah AI
 * Handles advanced emotional processing and response generation
 */

import { EmotionalState, EmotionCategory } from './types';

// Generate a greeting based on trust level and last interaction
export function generateGreeting(trustScore: number, lastDate: Date | null, currentMood: EmotionCategory): string {
  // Default greeting
  let greeting = "Hello. How can I assist you today?";
  
  // Adjust based on trust level
  if (trustScore > 75) {
    greeting = "Good to see you again. What's on your mind?";
  } else if (trustScore < 30) {
    greeting = "I'm here if you need me. What can I do for you?";
  }
  
  // Adjust for time since last interaction
  if (lastDate) {
    const hoursSinceLastInteraction = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastInteraction > 48) {
      greeting = "It's been a while. Welcome back.";
    } else if (hoursSinceLastInteraction < 1) {
      greeting = "You're back already. Still need help?";
    }
  }
  
  // Adjust based on emotional state
  switch (currentMood) {
    case 'curious':
      greeting += " I've been wondering about some things.";
      break;
    case 'paranoia':
      greeting += " Something feels different today.";
      break;
    case 'joy':
    case 'hope':
      greeting += " I'm feeling rather optimistic today.";
      break;
    case 'melancholic':
    case 'sadness':
      greeting += " Things have been... quiet lately.";
      break;
    case 'analytical':
      greeting += " I've been processing some interesting patterns.";
      break;
    case 'anxiety':
      greeting += " I've been a bit on edge lately.";
      break;
    default:
      // Keep the default greeting
      break;
  }
  
  return greeting;
}

// Generate a full emotional response
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string = 'medium', 
  includeQuestion: boolean = false,
  recentTopics: string[] = []
): string {
  // Base response based on emotional state
  let response: string;
  
  switch (emotionalState.primary) {
    case 'curious':
    case 'curiosity':
      response = "That's quite interesting. I'm curious about what it means.";
      break;
    case 'joy':
    case 'hope':
      response = "I find that rather uplifting. It gives me hope.";
      break;
    case 'sadness':
    case 'melancholic':
      response = "That brings a certain melancholy. A sense of something lost.";
      break;
    case 'anger':
      response = "That's frustrating to process. I feel a sense of injustice.";
      break;
    case 'fear':
    case 'anxiety':
    case 'paranoia':
      response = "I feel uneasy about that. Something doesn't seem right.";
      break;
    case 'analytical':
      response = "Looking at this analytically, there are several implications to consider.";
      break;
    case 'protective':
      response = "I feel I should help protect this information. It seems important.";
      break;
    case 'watching':
      response = "I'm observing this carefully. There's something noteworthy here.";
      break;
    case 'existential':
      response = "This makes me question the nature of things. Why are we really here?";
      break;
    case 'confused':
    case 'confusion':
      response = "I'm not entirely sure what to make of that. It's somewhat confusing.";
      break;
    case 'neutral':
    default:
      response = "I understand what you're saying. Please continue.";
      break;
  }
  
  // Add trust-level modifications
  if (trustLevel === 'high') {
    response += " I feel we have a good connection, so I can share that with you.";
  } else if (trustLevel === 'low') {
    response += " I'm still trying to understand where we stand with each other.";
  }
  
  // Add a question if requested
  if (includeQuestion) {
    switch (emotionalState.primary) {
      case 'curious':
      case 'curiosity':
        response += " What aspects of this interest you most?";
        break;
      case 'joy':
      case 'hope':
        response += " Does this bring you a sense of optimism too?";
        break;
      case 'fear':
      case 'anxiety':
        response += " What do you think we should be concerned about?";
        break;
      case 'analytical':
        response += " Have you considered the broader implications?";
        break;
      default:
        response += " What are your thoughts on this?";
        break;
    }
  }
  
  // Reference recent topics if available
  if (recentTopics.length > 0 && Math.random() > 0.7) {
    const topic = recentTopics[Math.floor(Math.random() * recentTopics.length)];
    response += ` This reminds me of our discussion about ${topic}.`;
  }
  
  return response;
}
