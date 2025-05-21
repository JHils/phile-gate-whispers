
/**
 * Vocabulary System
 * Handles response templating and vocabulary variations
 */

// Get a response template based on type
export function getResponseTemplate(type: string): string {
  const templates: Record<string, string[]> = {
    greeting: [
      "Hello there.",
      "Greetings.",
      "Hi."
    ],
    farewell: [
      "Goodbye for now.",
      "Until next time.",
      "See you soon."
    ],
    confusion: [
      "I'm not sure I understand.",
      "That's confusing to me.",
      "I'm trying to process that."
    ],
    acknowledgment: [
      "I see.",
      "Understood.",
      "Noted."
    ]
  };
  
  const options = templates[type] || templates.acknowledgment;
  return options[Math.floor(Math.random() * options.length)];
}
