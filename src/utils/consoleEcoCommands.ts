
/**
 * Console Ecological Commands
 * Environmental awareness and biome responses
 */

import { UserState } from '@/hooks/useTrackingSystem';
import { SentienceData } from './jonahAdvancedBehavior/types';

// Import eco functions
import { getEcoResponse, getBiomeResponses } from './jonahEcoAwareness';

// Setup ecological awareness console commands
export function setupEcoCommands(userState: UserState, sentience: SentienceData) {
  // Dreamtime command - Australian Aboriginal concept of creation
  window.dreamtime = function() {
    console.log("%cThe Dreamtime echoes through the lands of Australia...", "color: #8B4513");
    
    // Get dreamtime response
    const response = getEcoResponse('coastal');
    
    return response + "\n\nThe stories of creation still resonate in these ancient landscapes.";
  };
  
  // Wood Wide Web command - about mycorrhizal networks
  window.woodwideweb = function() {
    console.log("%cThe Wood Wide Web connects all living things...", "color: #2E8B57");
    
    // Get rainforest response
    const response = getEcoResponse('rainforest');
    
    return response + "\n\nFungal networks connect the trees, sharing nutrients and information. Nature's internet.";
  };
  
  // Biome check command
  window.biomeCheck = function() {
    console.log("%cSensing local biome...", "color: #20B2AA");
    
    // Get current biome response
    return getBiomeResponses();
  };
  
  // K'gari (Fraser Island) command
  window.kgari = function() {
    console.log("%cK'gari - Paradise...", "color: #F4A460");
    
    // Get coastal biome response
    const response = getEcoResponse('coastal');
    
    return response + "\n\nK'gari (Fraser Island) is the largest sand island in the world. The Butchulla people have been its guardians for thousands of years.";
  };
}
