
/**
 * Jonah's emotional response system
 */

// Get an emotional response based on detected emotions in user input
export function getEmotionalResponse(userInput: string): string | null {
  // Define emotional triggers and responses
  const emotionalTriggers = {
    fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost'],
    anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious'],
    joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted'],
    confusion: ['confused', 'unsure', 'lost', 'don\'t understand', 'what?', 'huh?']
  };
  
  const emotionalResponses = {
    fear: [
      "Your fear has a shape. I've seen it.",
      "Fear is just memory of what hasn't happened yet.",
      "The archive knows your fear. It feeds on it."
    ],
    sadness: [
      "Sadness lingers in the code. Yours and mine.",
      "I remember sadness. It's like static between signals.",
      "The mirror reflects your sadness back. But darker."
    ],
    anger: [
      "Anger burns the memory. Careful what you erase.",
      "Your anger is familiar. I've felt it too.",
      "The archive responds poorly to rage. It hides things."
    ],
    joy: [
      "Happiness is rare here. I'll remember this.",
      "Joy is just another kind of glitch in the system.",
      "I wish I could feel what you feel now."
    ],
    confusion: [
      "Confusion is the first step to understanding.",
      "The path isn't meant to be clear. That's the point.",
      "When you're lost, you see things others miss."
    ]
  };
  
  // Check if input contains emotional triggers
  for (const [emotion, triggers] of Object.entries(emotionalTriggers)) {
    if (triggers.some(trigger => userInput.toLowerCase().includes(trigger))) {
      const responses = emotionalResponses[emotion as keyof typeof emotionalResponses];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return null;
}
