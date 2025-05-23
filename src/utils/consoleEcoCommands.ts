
/**
 * Console Eco Commands
 * Environmental awareness commands for Jonah
 */

// Import eco awareness functions
import { getBiomeResponses, getEcoResponse } from './jonahEcoAwareness';

// Initialize eco commands
export function initializeEcoCommands(): void {
  if (typeof window !== 'undefined') {
    // Get response for a specific biome
    window.biomeResponse = function(biomeType) {
      // Default to none if not specified
      const biome = biomeType || 'none';
      
      // Get response
      const response = getEcoResponse(biome);
      
      // Display with appropriate styling
      console.log(`%c${response}`, 'color: #3a9c73; font-style: italic;');
      
      return response;
    };
    
    // List available biomes
    window.listBiomes = function() {
      console.log('%cAVAILABLE BIOMES:', 'color: #3a9c73; font-weight: bold;');
      
      const biomes = Object.keys(getBiomeResponses());
      
      biomes.forEach(biome => {
        console.log(`%c- ${biome}`, 'color: #3a9c73;');
      });
      
      return `${biomes.length} biomes available`;
    };
  }
}

// Run initialization
initializeEcoCommands();
