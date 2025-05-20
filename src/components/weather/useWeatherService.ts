
import { useState, useEffect } from 'react';
import { getUserWeather, getWeatherDescription } from '@/utils/weatherService';

/**
 * Hook to access weather data for Jonah's ecological awareness
 */
export function useWeatherService(trustLevel: string = 'low') {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherDescription, setWeatherDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data on component mount for medium/high trust
  useEffect(() => {
    // Only fetch weather for medium or high trust levels
    if (trustLevel !== 'medium' && trustLevel !== 'high') {
      return;
    }

    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const data = await getUserWeather();
        setWeatherData(data);
        
        // Generate poetic weather description
        const description = getWeatherDescription(data);
        setWeatherDescription(description);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError("Could not connect to the atmosphere.");
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [trustLevel]);

  return {
    weatherData,
    weatherDescription,
    isLoading,
    error
  };
}

export default useWeatherService;
