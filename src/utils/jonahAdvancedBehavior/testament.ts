
/**
 * Testament System
 * Jonah's final testament and personal records
 */

// Initialize testament system
export function initializeTestament(): boolean {
  console.log("Testament system initialized");
  
  // Set default testament if not exists
  if (!localStorage.getItem('jonah_testament')) {
    localStorage.setItem('jonah_testament', JSON.stringify({
      lastUpdated: Date.now(),
      entries: [],
      finalMessage: null,
      unlocked: false
    }));
  }
  
  return true;
}

// Add testament entry
export function addTestamentEntry(content: string): boolean {
  try {
    // Get existing testament
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    // Add entry
    if (!testament.entries) testament.entries = [];
    
    testament.entries.push({
      content,
      timestamp: Date.now()
    });
    
    // Update last updated
    testament.lastUpdated = Date.now();
    
    // Save back
    localStorage.setItem('jonah_testament', JSON.stringify(testament));
    
    return true;
  } catch (e) {
    console.error("Error adding testament entry:", e);
    return false;
  }
}

// Set final testament message
export function setFinalTestamentMessage(message: string): boolean {
  try {
    // Get existing testament
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    // Set final message
    testament.finalMessage = message;
    
    // Update last updated
    testament.lastUpdated = Date.now();
    
    // Save back
    localStorage.setItem('jonah_testament', JSON.stringify(testament));
    
    return true;
  } catch (e) {
    console.error("Error setting final testament message:", e);
    return false;
  }
}

// Unlock testament
export function unlockTestament(): boolean {
  try {
    // Get existing testament
    const testament = JSON.parse(localStorage.getItem('jonah_testament') || '{}');
    
    // Set unlocked
    testament.unlocked = true;
    
    // Update last updated
    testament.lastUpdated = Date.now();
    
    // Save back
    localStorage.setItem('jonah_testament', JSON.stringify(testament));
    
    return true;
  } catch (e) {
    console.error("Error unlocking testament:", e);
    return false;
  }
}

// Get testament
export function getTestament(): any {
  try {
    // Get from localStorage
    return JSON.parse(localStorage.getItem('jonah_testament') || '{}');
  } catch (e) {
    console.error("Error getting testament:", e);
    return {
      lastUpdated: Date.now(),
      entries: [],
      finalMessage: null,
      unlocked: false
    };
  }
}
