
import { EmotionalState, EmotionCategory } from '../types';

/**
 * Generate emotional responses based on the detected emotions.
 */
export const generateEmotionalResponse = (emotionalState: EmotionalState): string => {
  const { primary, intensity } = emotionalState;
  
  // Select response based on primary emotion and intensity
  const responses = getResponsesByEmotion(primary, intensity);
  
  // Return a random response from the selected category
  return responses[Math.floor(Math.random() * responses.length)];
};

// Alias for backward compatibility
export const getEmotionalResponse = generateEmotionalResponse;

/**
 * Generate a clarifying question based on the emotional context
 */
export const getClarifyingQuestion = (emotionalState: EmotionalState): string => {
  const { primary } = emotionalState;
  
  const questionsByEmotion: Record<EmotionCategory, string[]> = {
    fear: ["What exactly concerns you about this?", "Can you explain what's frightening about this?"],
    sadness: ["What aspect of this makes you feel down?", "Is there something specific that's causing this feeling?"],
    anger: ["What's frustrating you about this situation?", "Can you tell me more about why this upsets you?"],
    joy: ["What specifically makes you happy about this?", "What's the best part of this for you?"],
    confusion: ["Which part is most confusing for you?", "Can you tell me what's unclear about this?"],
    curiosity: ["What aspect are you most interested in?", "What would you like to know more about?"],
    hope: ["What outcome are you hoping for?", "What possibilities do you see in this?"],
    anxiety: ["What's the main worry you have about this?", "Which part makes you most anxious?"],
    paranoia: ["What specific concerns do you have about this?", "Can you explain what feels suspicious?"],
    trust: ["What made you feel you can trust this?", "What aspects feel most reliable to you?"],
    neutral: ["Can you tell me more about your thoughts on this?", "How do you feel about this situation?"],
    surprise: ["What part surprised you the most?", "What were you expecting instead?"],
    disgust: ["What specifically bothers you about this?", "Which aspect do you find most objectionable?"],
    confused: ["What's the most confusing part for you?", "Which aspect doesn't make sense?"],
    watching: ["What are you noticing most in this situation?", "What patterns are you observing?"]
  };
  
  const questions = questionsByEmotion[primary] || questionsByEmotion.neutral;
  return questions[Math.floor(Math.random() * questions.length)];
};

// Helper function to get responses by emotion
const getResponsesByEmotion = (emotion: EmotionCategory, intensity: string): string[] => {
  const responses: Record<EmotionCategory, string[]> = {
    fear: [
      "I sense some concern in what you're expressing.",
      "This seems to touch on something troubling.",
      "There's a feeling of unease in this conversation."
    ],
    sadness: [
      "I notice a melancholy undertone to your words.",
      "There's a certain heaviness to this topic.",
      "This conversation has taken on a somber quality."
    ],
    anger: [
      "I detect some frustration in your message.",
      "There's an edge to this exchange that I'm noticing.",
      "Your words carry a certain intensity."
    ],
    joy: [
      "There's a positive energy to what you're sharing.",
      "I sense enthusiasm in your message.",
      "This conversation has a hopeful quality to it."
    ],
    confusion: [
      "This seems to involve some complexity.",
      "I notice some uncertainty in how you're approaching this.",
      "There are multiple layers to unpack here."
    ],
    curiosity: [
      "Your interest in this topic is evident.",
      "There's a seeking quality to your questions.",
      "I sense a desire to explore this further."
    ],
    hope: [
      "There's an optimistic undercurrent to your message.",
      "I detect a forward-looking perspective here.",
      "Your words carry a sense of possibility."
    ],
    anxiety: [
      "There's a nervous energy to this exchange.",
      "I sense some worry beneath your words.",
      "This topic seems to create some tension."
    ],
    paranoia: [
      "I notice a heightened alertness in your message.",
      "There's a cautious undertone to your words.",
      "You seem to be looking for hidden patterns."
    ],
    trust: [
      "There's an openness to how you're communicating.",
      "I sense you're sharing something meaningful.",
      "This conversation has developed a certain depth."
    ],
    neutral: [
      "I'm processing what you've shared.",
      "This is an interesting point to consider.",
      "Let me think about what you've said."
    ],
    surprise: [
      "That's unexpected to hear.",
      "I'm surprised by this information.",
      "This is quite a revelation."
    ],
    disgust: [
      "I sense some aversion in your message.",
      "There's a distaste in how you describe this.",
      "This seems to provoke a negative reaction."
    ],
    confused: [
      "I'm trying to follow your meaning here.",
      "This is somewhat hard to process.",
      "I'm working to understand the connections."
    ],
    watching: [
      "I'm observing this interaction with interest.",
      "I notice the patterns in our exchange.",
      "I'm carefully tracking this conversation."
    ]
  };
  
  return responses[emotion] || responses.neutral;
};
