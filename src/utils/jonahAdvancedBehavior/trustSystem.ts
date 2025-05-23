
/**
 * Trust System - Handles user trust level calculations
 */

import { TrustLevel } from './types';

// Get numeric trust level from localStorage
export function getTrustLevel(): number {
  try {
    const storedTrust = localStorage.getItem('jonahTrustScore');
    if (storedTrust) {
      return parseInt(storedTrust, 10);
    }
    return 50; // Default medium trust
  } catch (e) {
    console.error('Error getting trust level:', e);
    return 50;
  }
}

// Get trust level category based on numeric value
export function getTrustLevelCategory(trustValue: number = getTrustLevel()): TrustLevel {
  if (trustValue >= 75) {
    return 'high';
  } else if (trustValue >= 40) {
    return 'medium';
  } else if (trustValue > 0) {
    return 'low';
  }
  return 'none';
}

// Get descriptive text for trust level
export function getTrustLevelText(trustValue: number = getTrustLevel()): TrustLevel {
  // This is just an alias for getTrustLevelCategory for compatibility
  return getTrustLevelCategory(trustValue);
}

// Modify trust level by specified amount
export function modifyTrustLevel(change: number): number {
  if (change === 0) return getTrustLevel();
  
  try {
    // Get current trust
    const currentTrust = getTrustLevel();
    
    // Calculate new trust value
    let newTrust = currentTrust + change;
    
    // Ensure trust stays within bounds
    newTrust = Math.max(0, Math.min(100, newTrust));
    
    // Store updated value
    localStorage.setItem('jonahTrustScore', newTrust.toString());
    
    // Maybe log to console for debugging
    console.log(`Trust modified: ${currentTrust} → ${newTrust} (${change > 0 ? '+' : ''}${change})`);
    
    // Trigger trust-related events if significant change
    if (Math.abs(change) >= 10) {
      handleSignificantTrustChange(newTrust, currentTrust);
    }
    
    return newTrust;
  } catch (e) {
    console.error('Error modifying trust level:', e);
    return getTrustLevel();
  }
}

// Handle significant trust level changes
function handleSignificantTrustChange(newTrust: number, oldTrust: number): void {
  // If trust crosses threshold boundaries
  const oldCategory = getTrustLevelCategory(oldTrust);
  const newCategory = getTrustLevelCategory(newTrust);
  
  if (oldCategory !== newCategory) {
    // Log trust category change
    console.log(`Trust category changed: ${oldCategory} → ${newCategory}`);
    
    // Store the event
    try {
      const trustEvents = JSON.parse(localStorage.getItem('jonah_trust_events') || '[]');
      trustEvents.push({
        timestamp: Date.now(),
        from: oldCategory,
        to: newCategory,
        value: newTrust
      });
      localStorage.setItem('jonah_trust_events', JSON.stringify(trustEvents));
    } catch (e) {
      console.error('Error storing trust event:', e);
    }
  }
}
