
/**
 * Console News Commands
 * Provides interactive console commands for Jonah's news awareness system
 */

import { trackCommand } from './consoleTrackingUtils';
import { getNewsResponse, getWeatherResponse } from './jonahNewsAwareness';
import { typewriterLog } from './consoleEffects';

type TrackCommandFunction = (commandName: string) => void;

// Initialize news command system
export function initializeNewsCommands(trackCommandExecution?: TrackCommandFunction): void {
  if (typeof window !== 'undefined') {
    // News flash command
    window.newsFlash = function() {
      // Use provided trackCommandExecution if available, otherwise fall back to trackCommand
      if (trackCommandExecution) {
        trackCommandExecution('newsFlash');
      } else {
        trackCommand('newsFlash');
      }
      
      // Get a news response
      const newsResponse = getNewsResponse();
      
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
    window.weatherReport = function() {
      // Use provided trackCommandExecution if available, otherwise fall back to trackCommand
      if (trackCommandExecution) {
        trackCommandExecution('weatherReport');
      } else {
        trackCommand('weatherReport');
      }
      
      // Get a weather response
      const weatherResponse = getWeatherResponse();
      
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
