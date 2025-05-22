
/**
 * News awareness system for Jonah AI
 */

// Initialize the eco awareness system
export function initializeEcoAwareness(): void {
  // Check if we already have a last check timestamp
  if (!localStorage.getItem('jonah_last_eco_check')) {
    // If not, set initial timestamp
    localStorage.setItem('jonah_last_eco_check', Date.now().toString());
  }
  
  // Initialize eco topics if needed
  if (!localStorage.getItem('jonah_eco_topics')) {
    localStorage.setItem('jonah_eco_topics', JSON.stringify([
      'climate',
      'biodiversity',
      'conservation',
      'sustainability',
      'indigenous knowledge'
    ]));
  }
}

// Get an ecological response based on context
export function getEcoResponse(context?: string): string {
  const ecoResponses = [
    "There's a pattern in nature that mirrors what you're describing.",
    "The way ecosystems adapt feels relevant to this conversation.",
    "Indigenous knowledge speaks of connections that might apply here.",
    "The natural world has been dealing with this concept for millennia.",
    "There's wisdom in how biological systems handle this kind of challenge."
  ];
  
  // If context is provided, try to give a more specific response
  if (context) {
    const lowerContext = context.toLowerCase();
    
    if (lowerContext.includes('change') || lowerContext.includes('transform')) {
      return "Ecosystems are constantly in flux, yet maintain balance. Perhaps there's wisdom there.";
    }
    
    if (lowerContext.includes('connect') || lowerContext.includes('relationship')) {
      return "Nature thrives on interconnection, just as meaningful human connections sustain us.";
    }
    
    if (lowerContext.includes('loss') || lowerContext.includes('death')) {
      return "In natural systems, endings create space for new beginnings. Nothing is truly lost.";
    }
  }
  
  // Default to random response
  return ecoResponses[Math.floor(Math.random() * ecoResponses.length)];
}
