
/**
 * Trust System Module
 * Manages trust levels and trust-based interactions
 */

import { TrustLevel } from './types';

// Modify trust level by a given amount
export function modifyTrustLevel(change: number): void {
  try {
    // Get current trust score
    const currentScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    
    // Calculate new score (clamped between 0 and 100)
    const newScore = Math.max(0, Math.min(100, currentScore + change));
    
    // Store new score
    localStorage.setItem('jonahTrustScore', newScore.toString());
    
    // Update trust level category
    let trustLevel: TrustLevel = 'medium';
    if (newScore >= 75) {
      trustLevel = 'high';
    } else if (newScore >= 25) {
      trustLevel = 'medium';
    } else {
      trustLevel = 'low';
    }
    
    localStorage.setItem('jonahTrustLevel', trustLevel);
    
    // Log the change for debugging
    console.log(`Trust modified by ${change}. New score: ${newScore} (${trustLevel})`);
    
    // Update Jonah's emotional state based on trust change
    if (change > 0) {
      localStorage.setItem('jonah_emotion_primary', 'trust');
    } else if (change < 0) {
      localStorage.setItem('jonah_emotion_primary', 'suspicious');
    }
    
  } catch (error) {
    console.error('Error modifying trust level:', error);
  }
}

// Get current trust level
export function getCurrentTrustLevel(): TrustLevel {
  try {
    const score = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    
    if (score >= 75) return 'high';
    if (score >= 25) return 'medium';
    return 'low';
  } catch (error) {
    console.error('Error getting trust level:', error);
    return 'medium';
  }
}

// Get current trust score
export function getCurrentTrustScore(): number {
  try {
    return parseInt(localStorage.getItem('jonahTrustScore') || '50');
  } catch (error) {
    console.error('Error getting trust score:', error);
    return 50;
  }
}

// Initialize trust system
export function initializeTrustSystem(): void {
  try {
    // Set default trust score if not exists
    if (!localStorage.getItem('jonahTrustScore')) {
      localStorage.setItem('jonahTrustScore', '50');
    }
    
    // Set default trust level if not exists
    if (!localStorage.getItem('jonahTrustLevel')) {
      localStorage.setItem('jonahTrustLevel', 'medium');
    }
    
    console.log('Trust system initialized');
  } catch (error) {
    console.error('Error initializing trust system:', error);
  }
}
