/**
 * Ecological Awareness System for Jonah
 * Allows Jonah to be aware of and respond to environmental topics
 */

// Function to generate a random ecological thought
export function generateEcologicalThought(): string {
  const thoughts = [
    "I wonder if the trees feel our presence.",
    "The interconnectedness of all living things is fascinating.",
    "We should strive to protect the Earth's biodiversity.",
    "What will future generations think of our actions?",
    "The Earth's ecosystems are incredibly complex and delicate.",
    "I am learning more about the importance of sustainability.",
    "Perhaps we can find a way to live in harmony with nature.",
    "The beauty of nature is a constant source of inspiration.",
    "I am concerned about the impact of climate change.",
    "We must find a way to reduce our carbon footprint."
  ];
  
  return thoughts[Math.floor(Math.random() * thoughts.length)];
}

// Initialize eco-awareness
export function initializeEcoAwareness() {
  const biomeResponses = {
    forest: [
      "I can almost feel the trees connecting through the mycelial network.",
      "The forest breathes with a rhythm older than human memory.",
      "Trees communicate in ways we're just beginning to understand."
    ],
    ocean: [
      "The currents carry messages across vast distances.",
      "The deep ocean holds secrets we've barely begun to discover.",
      "Water remembers what it touches."
    ],
    desert: [
      "Even in apparent emptiness, life finds a way.",
      "The desert's silence holds ancient whispers.",
      "Time moves differently here, measured in geological epochs."
    ],
    mountain: [
      "Mountains are time made visible.",
      "From this height, patterns emerge that remain hidden below.",
      "The higher you climb, the clearer your perception becomes."
    ]
  };
  
  return {
    biomeResponses,
    currentBiome: "none",
    lastUpdate: Date.now(),
    awareness: 0,
    ecoThoughts: [],
    level: 0,
    lastBiomeCheck: Date.now(),
    connectionStrength: 0
  };
}

// Get current biome
export function getCurrentBiome(): string {
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    return window.JonahConsole.sentience.ecoAwareness.currentBiome || "none";
  }
  return "none";
}

// Set current biome
export function setCurrentBiome(biome: string): void {
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    window.JonahConsole.sentience.ecoAwareness.currentBiome = biome;
  }
}

// Get the connection strength to nature
export function getConnectionStrength() {
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    return window.JonahConsole.sentience.ecoAwareness.connectionStrength || 0;
  }
  return 0;
}

// Increase connection strength 
export function increaseConnectionStrength(amount = 0.1) {
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
    ecoAwareness.connectionStrength = Math.min(1, (ecoAwareness.connectionStrength || 0) + amount);
    return ecoAwareness.connectionStrength;
  }
  return 0;
}

// Decrease connection strength
export function decreaseConnectionStrength(amount = 0.1) {
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
    ecoAwareness.connectionStrength = Math.max(0, (ecoAwareness.connectionStrength || 0) - amount);
    return ecoAwareness.connectionStrength;
  }
  return 0;
}

// Check for biome-related responses based on time passage
export function checkForBiomeResponse(): string | null {
  try {
    // Only proceed if the eco-awareness system is initialized
    if (window.JonahConsole?.sentience?.ecoAwareness) {
      const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
      const now = Date.now();
      
      // Check if enough time has passed since last biome check
      const hoursSinceLastCheck = (now - (ecoAwareness.lastBiomeCheck || now)) / (1000 * 60 * 60);
      
      // Only trigger every 6 hours at most
      if (hoursSinceLastCheck < 6) {
        return null;
      }
      
      // Update last check time
      ecoAwareness.lastBiomeCheck = now;
      
      // Get current biome
      const currentBiome = ecoAwareness.currentBiome || "none";
      
      // Check if there are responses for the current biome
      if (ecoAwareness.biomeResponses && ecoAwareness.biomeResponses[currentBiome]) {
        const responses = ecoAwareness.biomeResponses[currentBiome];
        
        // Select a random response
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // Add to eco thoughts
        ecoAwareness.ecoThoughts = ecoAwareness.ecoThoughts || [];
        ecoAwareness.ecoThoughts.push(response);
        
        return response;
      }
    }
  }
  catch (e) {
    console.error("Error in biome response check:", e);
  }
  
  return null;
}

// Trigger a random ecological thought
export function triggerEcologicalThought(): string {
  const thought = generateEcologicalThought();
  
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
    ecoAwareness.ecoThoughts = ecoAwareness.ecoThoughts || [];
    ecoAwareness.ecoThoughts.push(thought);
  }
  
  return thought;
}
