
import { useState, useEffect } from 'react';
import { TrustLevel } from './types';

export function useTrustSystem() {
  const [trustLevel, setTrustLevel] = useState<TrustLevel>('none');
  const [trustScore, setTrustScore] = useState(0);

  // Initialize trust values from localStorage
  useEffect(() => {
    const storedTrustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0', 10);
    const storedTrustLevel = localStorage.getItem('jonahTrustLevel') as TrustLevel || 'none';
    
    setTrustScore(storedTrustScore);
    setTrustLevel(storedTrustLevel);
  }, []);

  // Function to modify trust level
  const modifyTrust = (amount: number) => {
    const newScore = Math.max(0, trustScore + amount);
    setTrustScore(newScore);
    
    // Update localStorage
    localStorage.setItem('jonahTrustScore', newScore.toString());
    
    // Update trust level based on score
    let newTrustLevel: TrustLevel = 'none';
    
    if (newScore >= 150) {
      newTrustLevel = 'high';
    } else if (newScore >= 75) {
      newTrustLevel = 'medium';
    } else if (newScore >= 25) {
      newTrustLevel = 'low';
    }
    
    if (newTrustLevel !== trustLevel) {
      setTrustLevel(newTrustLevel);
      localStorage.setItem('jonahTrustLevel', newTrustLevel);
    }
  };

  return { trustLevel, trustScore, modifyTrust };
}
