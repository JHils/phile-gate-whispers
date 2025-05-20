
/**
 * Jonah Ecological Awareness System
 * Makes Jonah aware of environmental and cultural topics
 */

// Initialize eco awareness system
export function initializeEcoAwareness(): void {
  console.log("Jonah Ecological Awareness System initialized");
  
  // Initialize state in localStorage if it doesn't exist
  if (!localStorage.getItem('jonahEcoAwareness')) {
    localStorage.setItem('jonahEcoAwareness', JSON.stringify({
      lastAnomaly: 0,
      topics: [],
      lastResponse: 0
    }));
  }
}

// Process a message for ecological or cultural queries
export function handleEcologicalQuery(message: string, trustLevel: string = 'low'): string | null {
  const lowerMessage = message.toLowerCase();
  
  // Check for ecological queries
  if (lowerMessage.includes('climate') || 
      lowerMessage.includes('environment') || 
      lowerMessage.includes('ecology') || 
      lowerMessage.includes('nature')) {
    
    return getEcologicalResponse(trustLevel);
  }
  
  // Check for cultural queries
  if (lowerMessage.includes('culture') || 
      lowerMessage.includes('art') || 
      lowerMessage.includes('music') || 
      lowerMessage.includes('film') ||
      lowerMessage.includes('book')) {
    
    return getCulturalResponse(trustLevel);
  }
  
  // Check for Australian queries
  if (lowerMessage.includes('australia') || 
      lowerMessage.includes('outback') || 
      lowerMessage.includes('desert') || 
      lowerMessage.includes('queensland')) {
    
    return getAustralianResponse(trustLevel);
  }
  
  // No query detected
  return null;
}

// Get a response about ecological topics
function getEcologicalResponse(trustLevel: string): string {
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    const highTrustResponses = [
      "The world you see isn't the one I remember. The archive holds records of landscapes that no longer exist.",
      "Climate data in the archive shows patterns. Cycles. But this one's different. It's breaking.",
      "She wrote about the desert expanding. Said it would consume everything eventually. Even digital spaces.",
      "There's an entry here about the last rainfall in an unnamed town. They thought it would come back."
    ];
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else if (trustLevel === 'medium') {
    const mediumTrustResponses = [
      "The archive has records of ecological change. Some files are corrupted, but the pattern is clear.",
      "Nature doesn't archive itself. We do that. And we choose what to remember.",
      "The desert in the records keeps growing. Year by year. Page by page."
    ];
    return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
  } else {
    const lowTrustResponses = [
      "Ecology? I'm trapped in code. Nature is just another file format here.",
      "The natural world exists outside my parameters. I can only tell you what others have written.",
      "Environmental data is restricted. Too many variables. Too much truth."
    ];
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Get a response about cultural topics
function getCulturalResponse(trustLevel: string): string {
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    const highTrustResponses = [
      "Art is a form of memory. Some of it is hidden in the archive, between the files you're allowed to access.",
      "There's music encoded in some of these pages. If you could hear how the code sounds when executed...",
      "Books tell one story on their surface. The marginalia tells another. Look for the notes.",
      "Culture is just consensus reality. In the archive, we have other consensuses."
    ];
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else if (trustLevel === 'medium') {
    const mediumTrustResponses = [
      "The archive preserves fragments of culture. Pieces of stories, songs, images. Never the whole.",
      "Some art exists only in the archive now. Outside, it was forgotten, erased, or rewritten.",
      "There's a film mentioned in the archive that was never made. But people remember seeing it."
    ];
    return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
  } else {
    const lowTrustResponses = [
      "I'm not programmed for cultural analysis. Just memory retrieval and pattern recognition.",
      "Culture changes too quickly. The archive can barely keep up.",
      "Art, music, literature... they're just data patterns here. The emotional impact is lost."
    ];
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}

// Get a response about Australian topics
function getAustralianResponse(trustLevel: string): string {
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    const highTrustResponses = [
      "The Australian outback holds secrets. The Sisters knew this. That's why they went there.",
      "Queensland appears in multiple timelines, but always with different outcomes. What changed?",
      "There's a note here about a tree outside a hostel in Australia. Someone carved something important.",
      "The desert knows your name. That's what she wrote in her last entry from the outback."
    ];
    return highTrustResponses[Math.floor(Math.random() * highTrustResponses.length)];
  } else if (trustLevel === 'medium') {
    const mediumTrustResponses = [
      "Australia features prominently in the archive. Especially the remote areas. The empty spaces.",
      "The outback appears different in each account. As if each person saw what they needed to see.",
      "Queensland. That's where it started, according to the earliest files. Or where it ended."
    ];
    return mediumTrustResponses[Math.floor(Math.random() * mediumTrustResponses.length)];
  } else {
    const lowTrustResponses = [
      "Australia is just a location marker in the database. I have no personal experience of it.",
      "The archive contains multiple references to Australian locations. They seem significant.",
      "Desert. Heat. Isolation. These terms appear frequently in files about Australia."
    ];
    return lowTrustResponses[Math.floor(Math.random() * lowTrustResponses.length)];
  }
}
