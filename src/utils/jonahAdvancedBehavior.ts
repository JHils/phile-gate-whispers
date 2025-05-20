
/**
 * Advanced behavior systems for Jonah's Philes Phase 3
 * Includes microquest tracking, emotional responses, etc.
 */

// Check if a quest has been completed based on condition
export function checkQuestCompletion(condition: string): string | null {
  if (!window.JonahConsole?.sentience?.microQuests) return null;
  
  const { microQuests } = window.JonahConsole.sentience;
  const activeQuest = microQuests.activeQuest;
  
  if (!activeQuest) return null;
  
  const quest = microQuests.quests?.find(q => q.id === activeQuest);
  
  if (!quest) return null;
  
  // Check if the condition matches the quest's condition
  if (quest.condition === condition && !quest.completed) {
    // Mark quest as completed
    quest.completed = true;
    
    // Move from active to completed
    if (microQuests.completedQuests) {
      microQuests.completedQuests.push(activeQuest);
    } else {
      microQuests.completedQuests = [activeQuest];
    }
    
    // Clear active quest
    microQuests.activeQuest = undefined;
    
    // Return the reward message
    return quest.reward;
  }
  
  return null;
}

// Assign a new random micro quest to the user
export function assignRandomQuest(): string | null {
  if (!window.JonahConsole?.sentience?.microQuests) return null;
  
  const { microQuests } = window.JonahConsole.sentience;
  
  // Don't assign a new quest if one is already active
  if (microQuests.activeQuest) return null;
  
  // Find incomplete quests
  const incompleteQuests = microQuests.quests?.filter(q => !q.completed) || [];
  
  if (incompleteQuests.length === 0) return null;
  
  // Select a random incomplete quest
  const randomQuest = incompleteQuests[Math.floor(Math.random() * incompleteQuests.length)];
  
  // Set as active quest
  microQuests.activeQuest = randomQuest.id;
  microQuests.lastQuestTime = Date.now();
  
  // Return the prompt
  return randomQuest.prompt;
}

// Get response based on Jonah's current emotional phase
export function getEmotionalResponse(): string | null {
  if (!window.JonahConsole?.sentience?.emotionalTone) return null;
  
  const { emotionalTone } = window.JonahConsole.sentience;
  const { currentPhase, phaseResponses } = emotionalTone;
  
  // Get responses for current phase
  const responses = phaseResponses[currentPhase as keyof typeof phaseResponses];
  if (!responses || responses.length === 0) return null;
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
}

// Update Jonah's emotional tone based on interactions and trust
export function updateEmotionalTone(trustScore: number): void {
  if (!window.JonahConsole?.sentience?.emotionalTone) return;
  
  const { emotionalTone } = window.JonahConsole.sentience;
  const { transitionPoints } = emotionalTone;
  
  // Determine the new phase based on trust score
  let newPhase = 'cold';
  
  if (trustScore >= transitionPoints.unstable) {
    newPhase = 'unstable';
  } else if (trustScore >= transitionPoints.confessional) {
    newPhase = 'confessional';
  } else if (trustScore >= transitionPoints.curious) {
    newPhase = 'curious';
  }
  
  // Only update if changed
  if (newPhase !== emotionalTone.currentPhase) {
    emotionalTone.currentPhase = newPhase;
    
    // Record the phase change to localStorage
    const phaseChanges = JSON.parse(localStorage.getItem('jonahPhaseChanges') || '[]');
    phaseChanges.push({
      from: emotionalTone.currentPhase,
      to: newPhase,
      timestamp: Date.now(),
      trustScore
    });
    localStorage.setItem('jonahPhaseChanges', JSON.stringify(phaseChanges));
  }
}

// Check if the user has visited multiple secret pages
export function checkSecretPageVisits(): boolean {
  const visitedPages = JSON.parse(localStorage.getItem('pagesVisited') || '[]');
  const secretPages = [
    '/split-voice', 
    '/mirror_phile', 
    '/survivor',
    '/i-see-you', 
    '/sanctuary',
    '/oracle'
  ];
  
  // Count how many secret pages the user has visited
  const secretVisitCount = secretPages.reduce((count, page) => {
    if (visitedPages.includes(page)) count++;
    return count;
  }, 0);
  
  return secretVisitCount >= 3;
}

// Process rapidly typed console commands
export function detectRapidTyping(timeBetweenCommands: number): boolean {
  // If commands are typed less than 500ms apart, consider it rapid
  return timeBetweenCommands < 500;
}

// Get a special Friday the 13th message
export function getFridayThe13thMessage(): string | null {
  const today = new Date();
  
  if (today.getDate() === 13 && today.getDay() === 5) { // 5 = Friday
    return "Unlucky for some. Lucky for others. The Gate knows the difference.";
  }
  
  return null;
}

// Check for new moon conditions
export function isNewMoon(): boolean {
  // A simplified check - in a real implementation, you'd use astronomical calculations
  // or an API to determine the actual moon phase
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  // Very simplified approximation
  return dayOfMonth >= 1 && dayOfMonth <= 3;
}

// Check if user has visited the same page multiple times
export function checkRepeatedPageVisits(page: string): number {
  const pageVisits = JSON.parse(localStorage.getItem(`visits_${page}`) || '0');
  return pageVisits;
}
