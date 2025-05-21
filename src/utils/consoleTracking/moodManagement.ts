/**
 * Mood Management System
 * Tracks and adjusts Jonah's mood based on user interactions
 */

import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

// Function to adjust Jonah's mood based on user input
export const adjustMood = (input: string) => {
  // Placeholder logic for mood adjustment
  // In a real implementation, this would analyze the input
  // and adjust Jonah's mood accordingly

  // Example: If the input contains positive words, increase joy
  if (input.includes("happy") || input.includes("good")) {
    // Adjust mood towards joy
    console.log("Mood adjusted towards joy");
  }

  // Log the mood adjustment
  console.log("Mood adjusted based on user input:", input);
};

// Function to react to significant events
export const reactToEvent = (event: string) => {
  // Placeholder logic for event reactions
  // In a real implementation, this would react to specific events
  // and adjust Jonah's mood accordingly

  // Example: If a key story flag is discovered, increase curiosity
  if (event === "storyFlagDiscovered") {
    // Adjust mood towards curiosity
    console.log("Mood adjusted towards curiosity");
  }

  // Log the event reaction
  console.log("Reacted to significant event:", event);
};

// Function to handle mood swings
export const handleMoodSwing = () => {
  // Placeholder logic for mood swings
  // In a real implementation, this would simulate random mood swings
  // and adjust Jonah's mood accordingly

  // Example: Randomly switch to a different mood
  if (Math.random() < 0.1) {
    // Switch to a random mood
    const moods = ["joy", "sadness", "anger", "fear", "neutral"];
    const newMood = moods[Math.floor(Math.random() * moods.length)] as EmotionCategory;
    console.log(`Mood swing to ${newMood}`);
  }

  // Log the mood swing
  console.log("Handling mood swing");
};
