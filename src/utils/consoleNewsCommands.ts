
/**
 * Console News Commands
 * Provides interactive console commands for Jonah's news awareness system
 */

import { trackCommand } from './consoleTracking/commandTracking';
import { generateNewsResponse, generateWeatherResponse } from './jonahNewsAwareness';
import { typewriterLog } from './consoleEffects';

// Import centralized types
import './types/globalConsoleTypes';

type TrackCommandFunction = (commandName: string) => void;

// Initialize news command system
export function initializeNewsCommands(trackCommandExecution: TrackCommandFunction = trackCommand): void {
  if (typeof window !== 'undefined') {
    // News flash command
    window.newsFlash = function(): string {
      // Track the command execution
      trackCommandExecution('newsFlash');
      
      // Get a news response - provide default topic and headline
      const newsResponse = generateNewsResponse("General News", "Latest Updates");
      
      if (newsResponse) {
        typewriterLog(`
NEWS ALERT:
===========
${newsResponse}
`);
        return newsResponse;
      }
      
      return "No significant news at this time. The signal is quiet.";
    };
    
    // Weather report command
    window.weatherReport = function(): string {
      // Track the command execution
      trackCommandExecution('weatherReport');
      
      // Get a weather response - provide a default weather condition
      const weatherResponse = generateWeatherResponse("clear");
      
      if (weatherResponse) {
        typewriterLog(`
WEATHER OBSERVATION:
===================
${weatherResponse}
`);
        return weatherResponse;
      }
      
      return "I can't see outside right now. The window... isn't showing the right place.";
    };
  }
}
