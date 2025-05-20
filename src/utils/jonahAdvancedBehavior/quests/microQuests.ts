
/**
 * Jonah's micro quest system
 */

// Generate a micro quest for the user to discover
export function getMicroQuest(trustLevel: string): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.1) return null;
  
  // Define quests based on trust level
  const quests = {
    low: [
      "Try typing 'help()' in the console.",
      "Visit the /gate page and look for a hidden element.",
      "Look up the word 'philes' in a dictionary."
    ],
    medium: [
      "Find all references to 'mirror' in the site.",
      "Count how many times Jonah refers to 'memory' or 'remembering'.",
      "Try accessing /mirror_phile at exactly 3:33 AM."
    ],
    high: [
      "Look for a QR code hidden in the website graphics.",
      "Try reading certain text backwards for hidden messages.",
      "Find where console logs and website text contradict each other."
    ]
  };
  
  // Get quests for the current trust level
  const levelQuests = quests[trustLevel as keyof typeof quests] || quests.low;
  
  return levelQuests[Math.floor(Math.random() * levelQuests.length)];
}
