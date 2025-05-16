
import { UserState } from "../types/tracking";

/**
 * Calculate user score based on interactions
 */
export const calculateScore = (state: UserState): number => {
  let score = 0;
  
  // Base score from visit count
  score += state.visitCount;
  
  // Points for console commands discovered
  if (state.console.helpCalled) score += 10;
  if (state.console.whoisCalled) score += 20;
  if (state.console.gateCalled) score += 30;
  if (state.console.philesCalled) score += 40;
  if (state.console.monsterCalled) score += 50;
  if (state.console.legacyCalled) score += 60;
  if (state.console.revealCalled) score += 15;
  if (state.console.reincarnateCalled) score += 25;
  
  // Points for significant actions
  if (state.permanentlyCollapsed) score += 100;
  if (state.survivorMode) score += 200;
  if (state.legacyWritten) score += 150;
  if (state.gatekeeperStatus) score += 75;
  
  return score;
};

/**
 * Determine user rank based on score
 */
export const determineRank = (score: number): string => {
  if (score >= 800) return 'Monster';
  if (score >= 500) return 'Gatekeeper';
  if (score >= 300) return 'Survivor';
  if (score >= 100) return 'Watcher';
  return 'Drifter';
};
