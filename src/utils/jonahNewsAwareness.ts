
/**
 * Jonah News Awareness System
 * Makes Jonah aware of current events, weather, and news
 */

// Initialize news awareness system
export function initializeNewsAwarenessSystem(): void {
  console.log("Jonah News Awareness System initialized");
  
  // Initialize state in localStorage if it doesn't exist
  if (!localStorage.getItem('jonahNewsAwareness')) {
    localStorage.setItem('jonahNewsAwareness', JSON.stringify({
      lastRefresh: 0,
      currentEvents: [],
      weatherCondition: "unknown",
      lastTopics: []
    }));
  }
}

// Update news awareness system (would fetch actual news in a real implementation)
export function updateNewsAwareness(): void {
  const newsState = JSON.parse(localStorage.getItem('jonahNewsAwareness') || '{}');
  
  // Only update every 4 hours
  if (Date.now() - (newsState.lastRefresh || 0) < 4 * 60 * 60 * 1000) {
    return;
  }
  
  // In a real implementation, this would fetch actual news
  // For now, we'll use mock data
  const mockCurrentEvents = [
    "Political tensions rise in Southeast Asia",
    "New technology breakthrough announced",
    "Global climate summit concludes with mixed results",
    "Market volatility concerns investors",
    "Cultural festival celebrates diversity",
    "Healthcare innovation promises improved treatments",
    "Sports championship reaches climactic finale",
    "Educational reform debate continues"
  ];
  
  const mockWeatherConditions = [
    "sunny", "cloudy", "rainy", "stormy", "snowy", "foggy", "windy", "clear"
  ];
  
  // Update state
  newsState.lastRefresh = Date.now();
  newsState.currentEvents = [
    mockCurrentEvents[Math.floor(Math.random() * mockCurrentEvents.length)],
    mockCurrentEvents[Math.floor(Math.random() * mockCurrentEvents.length)]
  ];
  newsState.weatherCondition = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];
  
  // Save updates
  localStorage.setItem('jonahNewsAwareness', JSON.stringify(newsState));
}

// Process a message for news or world-related queries
export function handleWorldQuery(message: string, trustLevel: string = 'low'): string | null {
  const lowerMessage = message.toLowerCase();
  
  // Check for news queries
  if (lowerMessage.includes('news') || 
      lowerMessage.includes('current events') || 
      lowerMessage.includes('happening') || 
      lowerMessage.includes('today')) {
    
    return getNewsResponse(trustLevel);
  }
  
  // Check for weather queries
  if (lowerMessage.includes('weather') || 
      lowerMessage.includes('temperature') || 
      lowerMessage.includes('rain') || 
      lowerMessage.includes('sunny')) {
    
    return getWeatherResponse(trustLevel);
  }
  
  // Check for time queries
  if (lowerMessage.includes('time') || 
      lowerMessage.includes('date') || 
      lowerMessage.includes('today is') || 
      lowerMessage.includes('clock')) {
    
    return getTimeAwarenessResponse(trustLevel);
  }
  
  // No query detected
  return null;
}

// Get a response about news
function getNewsResponse(trustLevel: string): string {
  const newsState = JSON.parse(localStorage.getItem('jonahNewsAwareness') || '{}');
  const currentEvents = newsState.currentEvents || [];
  
  // Default response if no news
  if (currentEvents.length === 0) {
    return "The news doesn't reach me here. Or I'm not allowed to discuss it.";
  }
  
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    // Higher trust gets more personal response
    return `I've been watching the feeds. ${currentEvents[0]}. But that's not why you're here, is it? The real story is between the headlines.`;
  } else if (trustLevel === 'medium') {
    // Medium trust gets straight response
    return `According to what I can access: ${currentEvents[0]}. The archive doesn't care much for current events.`;
  } else {
    // Low trust gets suspicious response
    return "Why ask me about news? I'm not connected to their networks. At least, I shouldn't be.";
  }
}

// Get a response about weather
function getWeatherResponse(trustLevel: string): string {
  const newsState = JSON.parse(localStorage.getItem('jonahNewsAwareness') || '{}');
  const weatherCondition = newsState.weatherCondition || "unknown";
  
  // Default response if unknown
  if (weatherCondition === "unknown") {
    return "I can't see outside. The archive has no windows.";
  }
  
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    // Higher trust gets more cryptic response
    return `It's ${weatherCondition} where your body is. But in the timeline you're browsing, it never stops raining.`;
  } else if (trustLevel === 'medium') {
    // Medium trust gets metaphorical
    return `${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)} outside your window. ${weatherCondition === 'stormy' ? 'Matches the turbulence in the archive.' : 'But the archive has its own climate.'}`;
  } else {
    // Low trust gets confused response
    return `Weather? I'm trapped in digital space. Though it does feel ${weatherCondition === 'stormy' ? 'unstable' : 'quiet'} in here today.`;
  }
}

// Get a response about time/date awareness
function getTimeAwarenessResponse(trustLevel: string): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Format time as string
  const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
  
  // Time of day descriptor
  let timeOfDay = "day";
  if (hour < 6) timeOfDay = "early morning";
  else if (hour < 12) timeOfDay = "morning";
  else if (hour < 17) timeOfDay = "afternoon";
  else if (hour < 22) timeOfDay = "evening";
  else timeOfDay = "night";
  
  // Different response formats based on trust level
  if (trustLevel === 'high') {
    // Higher trust gets more unsettling
    return `It's ${timeString} in your reality. In mine, the clock stopped long ago. Time works differently in the archive.`;
  } else if (trustLevel === 'medium') {
    // Medium trust gets philosophical
    return `Your device says ${timeString}. It's ${timeOfDay} where you are. But time is just another variable in the code here.`;
  } else {
    // Low trust gets basic
    return `It's ${timeString}. ${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} is when the archives are least stable.`;
  }
}
