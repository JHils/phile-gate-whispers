
import { supabase } from '@/integrations/supabase/client';
import { generateUserHash } from '@/utils/userFingerprint';
import { calculateScore, determineRank } from '@/utils/userRankUtils';
import { UserState, UserRank, LeaderboardEntry } from '@/types/tracking';

// Track last sync time to avoid excessive updates
const SYNC_COOLDOWN = 60000; // 1 minute cooldown between syncs
let lastSyncTime = 0;

/**
 * Sync user state with Supabase
 */
export const syncUserStateWithSupabase = async (state: UserState): Promise<void> => {
  try {
    // Don't sync too frequently
    if (Date.now() - lastSyncTime <= SYNC_COOLDOWN) {
      return;
    }
    
    // Generate user hash from browser fingerprint if not exists
    const userHash = localStorage.getItem('user_hash') || generateUserHash();
    localStorage.setItem('user_hash', userHash);

    // Calculate score based on user progress
    const score = calculateScore(state);
    
    // Update local phileScore for console use
    localStorage.setItem('phileScore', score.toString());
    
    // Update local phileRank for console use
    const rank = determineRank(score);
    localStorage.setItem('phileRank', rank.toLowerCase());
    
    // Count pages visited
    const pagesVisitedCount = Object.keys(state.events).filter(key => 
      key.startsWith('visited_')).length;
    
    // Count console commands found
    const consoleCommandsFound = Object.values(state.console).filter(Boolean).length;
    
    try {
      // Insert or update user tracking record in Supabase
      const { error } = await supabase
        .from('user_tracking')
        .upsert({
          user_hash: userHash,
          score: score,
          last_visit: new Date().toISOString(),
          first_visit: new Date(state.firstVisit).toISOString(),
          legacy_written: state.legacyWritten,
          console_commands_found: consoleCommandsFound,
          pages_visited: pagesVisitedCount
        }, {
          onConflict: 'user_hash'
        });
      
      if (error) {
        console.error('Error syncing with Supabase:', error);
      }
    } catch (error) {
      console.error('Error in Supabase sync:', error);
    }
    
    // Update last sync time
    lastSyncTime = Date.now();
  } catch (error) {
    console.error('Error in Supabase sync:', error);
  }
};

/**
 * Get user rank based on score
 */
export const getUserRank = async (): Promise<UserRank> => {
  try {
    const userHash = localStorage.getItem('user_hash');
    if (!userHash) return { rank: 'Drifter', score: 0, position: 0, userHash: '' };

    // Get user's current data
    const { data: userData, error: userError } = await supabase
      .from('user_tracking')
      .select('score, title, user_hash')
      .eq('user_hash', userHash)
      .single();

    if (userError || !userData) {
      return { rank: 'Drifter', score: 0, position: 0, userHash: '' };
    }

    // Get user's leaderboard position
    const { count: higherRanked, error: countError } = await supabase
      .from('user_tracking')
      .select('*', { count: 'exact', head: true })
      .gt('score', userData.score);

    if (countError) {
      console.error('Error getting leaderboard position:', countError);
    }

    const position = (higherRanked || 0) + 1;
    return {
      rank: userData.title || 'Drifter',
      score: userData.score || 0,
      position,
      userHash: userData.user_hash
    };
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return { rank: 'Drifter', score: 0, position: 0, userHash: '' };
  }
};

/**
 * Get leaderboard data
 */
export const getLeaderboard = async (limit = 10): Promise<LeaderboardEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('user_tracking')
      .select('user_hash, score, title, last_visit')
      .order('score', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    // Format the data
    return data.map((entry, index) => ({
      position: index + 1,
      userHash: entry.user_hash,
      displayName: `AshWalker #${entry.user_hash}`,
      rank: entry.title || 'Drifter',
      score: entry.score,
      lastSeen: new Date(entry.last_visit).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    return [];
  }
};
