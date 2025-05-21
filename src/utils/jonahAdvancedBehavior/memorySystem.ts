
/**
 * Memory System
 * Manages Jonah's memory storage and retrieval
 */

import { jonah_storeMemoryFragment } from './initializeBehavior';
import { createDefaultMemoryContext, MemoryContext } from './memory/memoryContext';

// Initialize memory system
export function initializeMemorySystem() {
  console.log("Dream system initialized");
  
  // Create initial memory context if not exists
  if (!localStorage.getItem('jonah_memory_context')) {
    const defaultContext = createDefaultMemoryContext();
    localStorage.setItem('jonah_memory_context', JSON.stringify(defaultContext));
  }
  
  return true;
}

// Store a memory in the system
export function storeMemory(content: string, category: string = 'general'): boolean {
  try {
    // Get existing memories
    const memories = JSON.parse(localStorage.getItem('jonah_memories') || '[]');
    
    // Add new memory
    memories.push({
      content,
      category,
      timestamp: Date.now()
    });
    
    // Store back to localStorage
    localStorage.setItem('jonah_memories', JSON.stringify(memories.slice(-50)));
    
    // Also store as memory fragment for compatibility
    jonah_storeMemoryFragment(content);
    
    return true;
  } catch (e) {
    console.error("Error storing memory:", e);
    return false;
  }
}

// Retrieve memories by category
export function getMemoriesByCategory(category: string): any[] {
  try {
    const memories = JSON.parse(localStorage.getItem('jonah_memories') || '[]');
    return memories.filter((mem: any) => mem.category === category);
  } catch (e) {
    console.error("Error retrieving memories:", e);
    return [];
  }
}

// Get memory context
export function getMemoryContext(): MemoryContext {
  try {
    const context = JSON.parse(localStorage.getItem('jonah_memory_context') || '{}');
    if (!Object.keys(context).length) {
      return createDefaultMemoryContext();
    }
    return context;
  } catch (e) {
    console.error("Error getting memory context:", e);
    return createDefaultMemoryContext();
  }
}

// Update memory context
export function updateMemoryContext(updates: Partial<MemoryContext>): MemoryContext {
  try {
    const context = getMemoryContext();
    const updatedContext = { ...context, ...updates };
    localStorage.setItem('jonah_memory_context', JSON.stringify(updatedContext));
    return updatedContext;
  } catch (e) {
    console.error("Error updating memory context:", e);
    return getMemoryContext();
  }
}
