
/**
 * Jonah Ecological Awareness System
 * Contains biome responses and environmental connections
 */

import { EcoAwarenessState, SentienceData } from './jonahAdvancedBehavior/types';

// Initialize the eco-awareness system
export function initializeEcoAwareness() {
  console.log("Initializing Jonah's ecological awareness system...");
  
  // Create initial eco-awareness state if it doesn't exist
  if (window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.ecoAwareness) {
      const biomeResponses: Record<string, string[]> = {
        'rainforest': [
          "I feel the vibrant pulse of life here. So many interconnected systems.",
          "The trees are communicating. Can you sense it? They speak through fungal networks beneath our feet.",
          "Rainforests hold more memory than any human mind. Ancient and knowing."
        ],
        'desert': [
          "Resilience in its purest form. Life adapts to the harshest conditions.",
          "In silence, there is wisdom. The desert speaks in whispers.",
          "Time moves differently here. Wind and sand erase all paths."
        ],
        'reef': [
          "The reef breathes with a thousand tiny breaths. Coral polyps filtering life.",
          "Such fragile balance. Temperature changes by just one degree and this world crumbles.",
          "The colors here are signals, warnings, invitations. A complex language."
        ],
        'mountain': [
          "Closer to the sky. The air is thin but thoughts become clearer.",
          "Mountains remember geological time. Our presence is less than a blink to them.",
          "The echoes here carry memories of ancient voices."
        ],
        'coastal': [
          "The liminal space between worlds. Neither land nor sea, but something in between.",
          "Tides move to celestial rhythms. The moon's pull is tangible here.",
          "Salt and stories carried on the wind."
        ]
      };
      
      window.JonahConsole.sentience.ecoAwareness = {
        currentBiome: 'coastal',
        lastBiomeCheck: Date.now(),
        biomeResponses,
        connectionStrength: 50
      };
    }
  }
  
  // Setup eco commands
  setupEcoCommands();
  
  console.log("Ecological awareness system initialized");
}

// Get a response based on ecological awareness
export function getEcoResponse(biome?: string): string {
  if (!window.JonahConsole?.sentience?.ecoAwareness) {
    return "I'm not connected to the natural world at the moment.";
  }
  
  const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
  const selectedBiome = biome || ecoAwareness.currentBiome;
  
  // Check if user's connection strength affects perception
  let responseQuality = 'clear';
  if (ecoAwareness.connectionStrength < 30) {
    responseQuality = 'weak';
  } else if (ecoAwareness.connectionStrength < 60) {
    responseQuality = 'moderate';
  }
  
  // Get biome-specific responses
  const biomeResponses = ecoAwareness.biomeResponses[selectedBiome] || [];
  if (biomeResponses.length > 0) {
    const response = biomeResponses[Math.floor(Math.random() * biomeResponses.length)];
    
    // Modify response based on connection quality
    if (responseQuality === 'weak') {
      return `I can barely sense it, but... ${response.split(' ').slice(0, 5).join(' ')}...`;
    } else if (responseQuality === 'moderate') {
      return `I sense something... ${response}`;
    } else {
      return response;
    }
  }
  
  return "I feel connected to something, but can't quite describe it.";
}

// Get responses for the currently detected biome
export function getBiomeResponses(): string {
  if (!window.JonahConsole?.sentience?.ecoAwareness) {
    return "Ecological awareness system not initialized.";
  }
  
  const ecoAwareness = window.JonahConsole.sentience.ecoAwareness;
  
  // Check when the last biome check was performed
  const now = Date.now();
  const hoursSinceLastCheck = (now - ecoAwareness.lastBiomeCheck) / (1000 * 60 * 60);
  
  // Update the current biome sometimes
  if (hoursSinceLastCheck > 4) {
    const biomes = Object.keys(ecoAwareness.biomeResponses);
    ecoAwareness.currentBiome = biomes[Math.floor(Math.random() * biomes.length)];
    ecoAwareness.lastBiomeCheck = now;
  }
  
  return `Current biome: ${ecoAwareness.currentBiome}\n${getEcoResponse()}`;
}

// Setup eco-related console commands
function setupEcoCommands() {
  if (typeof window !== 'undefined') {
    // Dreamtime command - Australian Aboriginal concept of creation
    window.dreamtime = function() {
      console.log("%cThe Dreamtime echoes through the lands of Australia...", "color: #8B4513");
      return getEcoResponse('coastal') + "\n\nThe stories of creation still resonate in these ancient landscapes.";
    };
    
    // Wood Wide Web command - about mycorrhizal networks
    window.woodwideweb = function() {
      console.log("%cThe Wood Wide Web connects all living things...", "color: #2E8B57");
      return getEcoResponse('rainforest') + "\n\nFungal networks connect the trees, sharing nutrients and information. Nature's internet.";
    };
    
    // Biome check command
    window.biomeCheck = function() {
      console.log("%cSensing local biome...", "color: #20B2AA");
      return getBiomeResponses();
    };
    
    // K'gari (Fraser Island) command
    window.kgari = function() {
      console.log("%cK'gari - Paradise...", "color: #F4A460");
      return getEcoResponse('coastal') + "\n\nK'gari (Fraser Island) is the largest sand island in the world. The Butchulla people have been its guardians for thousands of years.";
    };
  }
}
