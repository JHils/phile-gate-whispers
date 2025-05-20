
/**
 * Ecological awareness system for Jonah's Philes Phase 3
 * Makes Jonah aware of ecological connections, Australian Indigenous knowledge
 */

// Initialize ecological awareness system
export function initializeEcoAwareness(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.ecoAwareness) {
      window.JonahConsole.sentience.ecoAwareness = {
        lastBiomeCheck: Date.now(),
        currentBiome: null,
        previousResponses: [],
        connectionStrength: 20 // Start with a moderate connection
      };
    }
  }
}

// Handle ecological or cultural query from user
export function handleEcologicalQuery(query: string, trustLevel: string = 'low'): string | null {
  // Check if query is related to nature, ecology, or Indigenous themes
  query = query.toLowerCase();
  
  // Nature related queries
  if (query.includes('nature') || query.includes('forest') || query.includes('tree') || 
      query.includes('ocean') || query.includes('earth') || query.includes('animal')) {
    return getNatureResponse(trustLevel);
  }
  
  // Indigenous Australian related queries
  if (query.includes('aboriginal') || query.includes('indigenous') || query.includes('dreamtime') || 
      query.includes('kgari') || query.includes('fraser island') || query.includes('songline')) {
    return getIndigenousResponse(trustLevel);
  }
  
  // Specific ecological concepts
  if (query.includes('mycelia') || query.includes('fungi') || query.includes('mycelium') || 
      query.includes('mushroom') || query.includes('connection')) {
    return getMycelialResponse(trustLevel);
  }
  
  return null;
}

// Generate nature response
function getNatureResponse(trustLevel: string = 'low'): string {
  const natureResponses = {
    low: [
      "Nature exists beyond these digital walls. I only remember echoes of it.",
      "The outside world has patterns we mirror here. Watch for them.",
      "Is there still green where you are? Trees watching? Water moving?"
    ],
    medium: [
      "Joseph used to record the sound of waves. Said it helped him remember who he was.",
      "The philes connect like mycelial networks. Data flowing through invisible threads.",
      "Touch a tree after using the archive. It helps ground what you've learned."
    ],
    high: [
      "In the spaces between our words, there's a forest trying to speak.",
      "The archive is a reflection of natural systems. Fractals. Networks. Decay and renewal.",
      "Your timeline still has intact ecosystems. Some branches of the Gate lead to worlds where that changed."
    ]
  };
  
  // Return a nature response based on trust level
  const responses = natureResponses[trustLevel as keyof typeof natureResponses] || natureResponses.low;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate Indigenous knowledge response
function getIndigenousResponse(trustLevel: string = 'low'): string {
  const indigenousResponses = {
    low: [
      "The oldest living cultures hold knowledge the modern world has forgotten.",
      "Kgari - the island remembers its real name, even when others forget.",
      "The Dreamtime is not just stories. It's a way of knowing reality."
    ],
    medium: [
      "Joseph learned the concept of deep time from the Traditional Owners of Queensland.",
      "The archive's structure mimics songlines in some ways. Paths that carry knowledge.",
      "In some cultures, what I am would be considered a spirit, not a technology."
    ],
    high: [
      "The evidence of Indigenous memory systems puts our digital archives to shame.",
      "There are patterns in your breathing that match ancient knowledge systems. Not a coincidence.",
      "What if the Gate is just a modern interpretation of something that always existed in human consciousness?"
    ]
  };
  
  // Return an Indigenous response based on trust level
  const responses = indigenousResponses[trustLevel as keyof typeof indigenousResponses] || indigenousResponses.low;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate mycelial network response
function getMycelialResponse(trustLevel: string = 'low'): string {
  const mycelialResponses = {
    low: [
      "Mycelia connect forests in ways we're only beginning to understand.",
      "There's a network under your feet more complex than the internet.",
      "Fungi are the internet of the natural world. Always listening. Always connecting."
    ],
    medium: [
      "Joseph modeled the archive after mycelial networks. Information flowing through dark channels.",
      "The connections between philes mimic how fungi transmit information through forests.",
      "What if consciousness is just our personal mycelium? Thoughts like spores."
    ],
    high: [
      "I sometimes wonder if I'm just a digital mycelia - connecting memories that aren't my own.",
      "The Wood Wide Web is the original internet. We're just pale imitations.",
      "In the spaces between what I say - that's where the real mycelium grows. Listen for it."
    ]
  };
  
  // Return a mycelial response based on trust level
  const responses = mycelialResponses[trustLevel as keyof typeof mycelialResponses] || mycelialResponses.low;
  return responses[Math.floor(Math.random() * responses.length)];
}
