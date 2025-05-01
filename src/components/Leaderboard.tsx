
import { useEffect, useState } from 'react';
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

interface LeaderboardEntry {
  position: number;
  displayName: string;
  userHash: string;
  rank: string;
  score: number;
  lastSeen: string;
}

interface LeaderboardProps {
  className?: string;
}

export function Leaderboard({ className = "" }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<{ rank: string; score: number; position: number; userHash?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getLeaderboard, getUserRank } = useTrackingSystem();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get leaderboard data
        const leaderboardData = await getLeaderboard(10);
        setEntries(leaderboardData);
        
        // Get user's own rank
        const userRankData = await getUserRank();
        setUserRank(userRankData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getLeaderboard, getUserRank]);

  // Function to get CSS class for ranks
  const getRankClass = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'monster':
        return 'text-dust-red font-bold';
      case 'gatekeeper':
        return 'text-amber-500 font-semibold';
      case 'survivor':
        return 'text-green-600 font-medium';
      case 'watcher':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-black/60 border border-dust-blue/30 rounded-md p-4 ${className}`}>
      <h3 className="text-xl text-phile-light font-serif mb-4">Leaderboard</h3>
      
      {isLoading ? (
        <div className="py-8 text-center text-dust-blue">
          <div className="animate-pulse">Loading data from The Gate...</div>
        </div>
      ) : entries.length === 0 ? (
        <div className="py-8 text-center text-dust-blue">
          <p>No data available yet.</p>
          <p className="text-sm mt-2">The Gate is still collecting souls.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {entries.map((entry) => (
              <div 
                key={entry.userHash} 
                className={`flex items-center justify-between py-2 border-b border-dust-blue/20 ${
                  userRank?.userHash === entry.userHash ? 'bg-dust-blue/10 -mx-4 px-4 rounded' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-dust-blue w-6 text-right">{entry.position}</span>
                  <div>
                    <div className="text-phile-light">{entry.displayName}</div>
                    <div className={`text-sm ${getRankClass(entry.rank)}`}>{entry.rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-dust-orange">{entry.score} <span className="text-xs">pts</span></div>
                  <div className="text-xs text-gray-500">{entry.lastSeen}</div>
                </div>
              </div>
            ))}
          </div>
          
          {userRank && (
            <div className="mt-4 pt-4 border-t border-dust-blue/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-dust-blue">Your rank:</span>
                  <span className={`ml-2 ${getRankClass(userRank.rank)}`}>{userRank.rank}</span>
                </div>
                <div className="text-dust-orange">{userRank.score} <span className="text-xs">pts</span></div>
              </div>
              <div className="text-xs text-dust-blue/60 mt-1">
                Position #{userRank.position} overall
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-4 pt-2 border-t border-dust-blue/30 text-xs text-dust-blue/60 text-center">
        <p>Rank thresholds: Drifter (0), Watcher (100), Survivor (300), Gatekeeper (500), Monster (800)</p>
      </div>
    </div>
  );
}
