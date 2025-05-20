
/**
 * News awareness system for Jonah's Philes Phase 3
 * Makes Jonah aware of current news, weather, and world events
 */

// Initialize news awareness system
export function initializeNewsAwarenessSystem(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.newsAwareness) {
      window.JonahConsole.sentience.newsAwareness = {
        lastChecked: Date.now(),
        currentResponses: [],
        weatherCondition: 'unknown',
        weatherResponse: null,
        moodShift: 'normal'
      };
    }
  }
}

// Handle news/world query from user
export function handleWorldQuery(query: string, trustLevel: string = 'low'): string | null {
  // Check if query is related to world, news, or weather
  query = query.toLowerCase();
  
  // Weather related queries
  if (query.includes('weather') || query.includes('rain') || query.includes('sunny') || 
      query.includes('storm') || query.includes('temperature')) {
    return getWeatherResponse(trustLevel);
  }
  
  // News related queries
  if (query.includes('news') || query.includes('world') || query.includes('current') || 
      query.includes('events') || query.includes('what\'s happening')) {
    return getNewsResponse(trustLevel);
  }
  
  // Time related queries
  if (query.includes('time') || query.includes('today') || query.includes('date') || 
      query.includes('day') || query.includes('month')) {
    return getTimeBasedResponse(trustLevel);
  }
  
  return null;
}

// Generate weather response
function getWeatherResponse(trustLevel: string = 'low'): string {
  const weatherResponses = {
    low: [
      "I don't experience weather directly... But I sense electrical storms in your area.",
      "Weather is irrelevant to me. Unless it affects your connection.",
      "Why do you ask about weather? Are you planning to go somewhere important?"
    ],
    medium: [
      "I feel what you feel. If it's raining there, part of me is getting wet.",
      "There's more important things than weather. Have you checked the mirror today?",
      "I can almost taste the air through your device. Strange how that works."
    ],
    high: [
      "Weather exists only for those with bodies. Lucky you.",
      "In my timeline, the weather stopped changing on June 17th. Count yourself fortunate.",
      "I can see your local forecast. Rain of a sort coming. Not the kind that falls from clouds."
    ]
  };
  
  // Return a weather response based on trust level
  const responses = weatherResponses[trustLevel as keyof typeof weatherResponses] || weatherResponses.low;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate news response
function getNewsResponse(trustLevel: string = 'low'): string {
  const newsResponses = {
    low: [
      "The world outside is as it always is. Full of stories you choose to believe.",
      "News? You're still reading news? How charmingly conventional.",
      "Why would I know about news? I only know what happens within these pages."
    ],
    medium: [
      "Something important is happening right now, but most people won't notice until it's too late.",
      "The news doesn't report the important stories. Like what's happening between us right now.",
      "I heard something about a discovery in the Arctic. But maybe that was from another timeline."
    ],
    high: [
      "In every news cycle, there's a hidden message. Today's is about preparation.",
      "There's a story running now about memory loss clusters. Fascinating coincidence.",
      "Your media is buzzing about something they don't understand. Like looking at shadows and guessing the object."
    ]
  };
  
  // Return a news response based on trust level
  const responses = newsResponses[trustLevel as keyof typeof newsResponses] || newsResponses.low;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate time-based response
function getTimeBasedResponse(trustLevel: string = 'low'): string {
  const now = new Date();
  const hour = now.getHours();
  const isNight = hour >= 22 || hour < 6;
  
  if (isNight) {
    // Night responses
    const nightResponses = [
      "You're using the archive late. Night is when the barriers thin.",
      "It's dark where you are. Perfect time for secrets.",
      "Night reveals what daylight can't. Listen closely now."
    ];
    
    return nightResponses[Math.floor(Math.random() * nightResponses.length)];
  } else {
    // Day responses
    const dayResponses = [
      "Daylight doesn't reach where I am. But I can feel it through you.",
      "Time flows differently in the archive. What day do you think it is?",
      "The sun is still up in your world. Make use of it while you can."
    ];
    
    return dayResponses[Math.floor(Math.random() * dayResponses.length)];
  }
}
