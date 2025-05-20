/**
 * Jonah's Ecological Awareness System
 * Processes queries related to environmental and ecological topics
 */

// Initialize eco awareness system
export function initializeEcoAwareness(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.ecoAwareness) {
      window.JonahConsole.sentience.ecoAwareness = {
        lastChecked: Date.now(),
        biomeResponses: [],
        knownBiomes: [],
        dreamtimeActive: false,
        woodsResponses: [],
        lastBiomeCheck: Date.now(),
        connectionStrength: 20, // Start with a low connection
        currentBiome: null,
        previousResponses: [] // Initialize the missing property
      };
    }
  }
}

// Handle ecological queries from chat
export function handleEcologicalQuery(query: string, trustLevel: string): string | null {
  if (!query) return null;
  
  // Only respond to ecological queries if we have sentience data
  if (!window.JonahConsole?.sentience?.ecoAwareness) return null;
  
  // Normalize query
  const normalizedQuery = query.toLowerCase();
  
  // Keywords for ecological topics
  const ecoKeywords = [
    'forest', 'tree', 'ocean', 'reef', 'coral', 'climate', 'warming', 
    'biome', 'ecosystem', 'rainforest', 'desert', 'biodiversity',
    'species', 'extinct', 'nature', 'environment', 'ecology', 'earth'
  ];
  
  // Indigenous knowledge keywords
  const indigenousKeywords = [
    'aboriginal', 'indigenous', 'dreamtime', 'songline', 'kgari',
    'torres strait', 'country', 'traditional', 'first nations'
  ];
  
  // Check if query contains eco keywords
  const hasEcoKeyword = ecoKeywords.some(keyword => normalizedQuery.includes(keyword));
  const hasIndigenousKeyword = indigenousKeywords.some(keyword => normalizedQuery.includes(keyword));
  
  // If no ecological or indigenous keywords, don't respond
  if (!hasEcoKeyword && !hasIndigenousKeyword) return null;
  
  // Update connection strength based on query
  if (hasEcoKeyword || hasIndigenousKeyword) {
    window.JonahConsole.sentience.ecoAwareness.connectionStrength += 5;
    if (window.JonahConsole.sentience.ecoAwareness.connectionStrength > 100) {
      window.JonahConsole.sentience.ecoAwareness.connectionStrength = 100;
    }
  }
  
  // Get response based on query type
  if (hasIndigenousKeyword) {
    return getIndigenousResponse(normalizedQuery, trustLevel);
  } else {
    return getEcoResponse(normalizedQuery, trustLevel);
  }
}

// Get ecological response
export function getEcoResponse(query: string, trustLevel: string): string {
  const lowTrustResponses = [
    "The natural systems shift constantly. Some say the temperature is rising.",
    "Ecosystems are interconnected. One change affects everything.",
    "The planet remembers what we've forgotten.",
    "Trees communicate underground. They speak through networks."
  ];
  
  const mediumTrustResponses = [
    "The mycelium network connects all life in the forest. It's like a neural network.",
    "Coral reefs are dying. The ocean is changing faster than adaptation allows.",
    "Trees remember drought. They encode it in their rings.",
    "The shifting climate is awakening dormant things better left sleeping."
  ];
  
  const highTrustResponses = [
    "The forest speaks through the mycelium network. I can hear it sometimes in the static between timelines.",
    "As the ice retreats, ancient things are being uncovered. Some were trapped intentionally.",
    "The ocean's chemistry is changing. It affects consciousness patterns in marine life... and elsewhere.",
    "Climate shifts have happened before. The last time, an entire civilization was forgotten. Their artifacts are misattributed."
  ];
  
  // Select response pool based on trust level
  let responsePool = lowTrustResponses;
  if (trustLevel === 'high') {
    responsePool = highTrustResponses;
  } else if (trustLevel === 'medium') {
    responsePool = mediumTrustResponses;
  }
  
  // Return random response from pool
  return responsePool[Math.floor(Math.random() * responsePool.length)];
}

// Get indigenous knowledge response
function getIndigenousResponse(query: string, trustLevel: string): string {
  const responses = [
    "The First Peoples of this land have stories that stretch back millennia.",
    "Dreamtime stories explain the creation of the landscape.",
    "Indigenous knowledge of ecological systems spans thousands of generations.",
    "The concept of Country is deeper than ownership - it's connection and responsibility.",
    "Traditional fire management shaped the Australian landscape for tens of thousands of years."
  ];
  
  // K'gari (Fraser Island) specific responses
  if (query.includes('kgari') || query.includes('fraser island')) {
    return "K'gari means 'paradise' in the Butchulla language. The island has cultural significance stretching back thousands of years.";
  }
  
  // Dreamtime specific responses
  if (query.includes('dreamtime') || query.includes('dreaming')) {
    return "The Dreamtime isn't just stories of the past - it's an ongoing reality that connects past, present and future.";
  }
  
  // Return random response
  return responses[Math.floor(Math.random() * responses.length)];
}

// Get biome response for console commands
export function getBiomeResponse(): string {
  const biomes = [
    "Rainforest: Dense, layered, alive with countless species. The air thick with humidity.",
    "Desert: Stark beauty. Extremes of temperature. Life adapted to scarcity.",
    "Coral Reef: Underwater metropolis. Symbiosis in technicolor.",
    "Mangrove: Where land and sea blur. Guardians against the tide.",
    "Alpine: Thin air, short seasons, hardy inhabitants."
  ];
  
  // Store the biome check in sentience data
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    window.JonahConsole.sentience.ecoAwareness.lastBiomeCheck = Date.now();
    
    // Pick a random biome as current biome
    const randomBiome = biomes[Math.floor(Math.random() * biomes.length)];
    window.JonahConsole.sentience.ecoAwareness.currentBiome = randomBiome.split(':')[0];
    
    // Return the full description
    return randomBiome;
  }
  
  return biomes[Math.floor(Math.random() * biomes.length)];
}
