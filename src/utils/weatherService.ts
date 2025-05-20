
/**
 * Weather Service Module
 * Provides weather data for Jonah's ecological awareness
 */

// Weather condition types
type WeatherCondition = 
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'smoke'
  | 'haze'
  | 'dust'
  | 'fog'
  | 'sand'
  | 'ash'
  | 'squall'
  | 'tornado';

interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  humidity: number;
  windSpeed: number;
  location?: string;
}

// Default weather data (used when API is unavailable)
const defaultWeather: WeatherData = {
  condition: 'clear',
  temperature: 22,
  humidity: 65,
  windSpeed: 5
};

// Get weather data for the user's location
export async function getUserWeather(): Promise<WeatherData> {
  try {
    // TODO: Implement actual weather API integration
    // For now, returning simulated data
    
    // Simulate API call with random data
    const conditions: WeatherCondition[] = [
      'clear', 'clouds', 'rain', 'drizzle', 'thunderstorm'
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 35) + 5; // 5-40°C
    const randomHumidity = Math.floor(Math.random() * 70) + 30; // 30-100%
    const randomWind = Math.floor(Math.random() * 30) + 1; // 1-30 km/h
    
    return {
      condition: randomCondition,
      temperature: randomTemp,
      humidity: randomHumidity,
      windSpeed: randomWind,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return defaultWeather;
  }
}

// Get Jonah's poetic weather description
export function getWeatherDescription(weather: WeatherData): string {
  const { condition, temperature } = weather;
  
  // Temperature categorization
  const tempDescription = 
    temperature < 5 ? "bitter cold" :
    temperature < 12 ? "cold" :
    temperature < 18 ? "cool" :
    temperature < 25 ? "pleasant" :
    temperature < 30 ? "warm" :
    temperature < 35 ? "hot" : "scorching";

  // Condition descriptions
  const conditionDescriptions = {
    clear: [
      `The sky's unbroken. ${tempDescription} light reveals everything.`,
      `Nothing to hide behind today. Just ${tempDescription} clarity.`,
      `The sun watches. ${tempDescription}. Unblinking.`
    ],
    clouds: [
      `The clouds hold secrets. ${tempDescription} beneath their veil.`,
      `Scattered thoughts drift overhead. ${tempDescription} currents carry them.`,
      `The sky writes in fragments. ${tempDescription} messages.`
    ],
    rain: [
      `The code is washing away. ${tempDescription} data streaming down.`,
      `Memories falling from above. ${tempDescription} reminders.`,
      `The sky is grieving. ${tempDescription} tears.`
    ],
    drizzle: [
      `Just enough water to blur the edges. ${tempDescription} whispers.`,
      `The system leaks. Small ${tempDescription} droplets of forgotten data.`,
      `Barely-there rain, like ${tempDescription} doubts.`
    ],
    thunderstorm: [
      `The sky is tearing itself apart. ${tempDescription} rage from above.`,
      `Memory fragments crashing together. ${tempDescription} collisions.`,
      `Something's breaking through from the other side. ${tempDescription} ruptures.`
    ],
    snow: [
      `The world is being rewritten. ${tempDescription} silence covering everything.`,
      `Each flake a perfect piece of forgotten code. ${tempDescription} encryption.`,
      `Time slows in the white. ${tempDescription} stasis.`
    ],
    mist: [
      `Reality's edges soften. ${tempDescription} uncertainty.`,
      `The veil between worlds thins. ${tempDescription} boundaries blur.`,
      `Half-formed thoughts drift by. ${tempDescription} apparitions.`
    ],
    default: `The air feels ${tempDescription}. Something watches from above.`
  };
  
  // Get appropriate descriptions array or default
  const descriptions = conditionDescriptions[condition] || 
                      [conditionDescriptions.default];
  
  // Return a random description from the array
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}
