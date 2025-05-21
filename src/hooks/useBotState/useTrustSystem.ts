
import { useState, useEffect } from 'react';
import { TrustLevel } from './types';
import { modifyTrustLevel, getTrustLevelText } from '@/utils/jonahAdvancedBehavior/trustSystem';

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
    const newScore = modifyTrustLevel(amount);
    setTrustScore(newScore);
    
    // Update trust level based on score
    const newTrustLevel = getTrustLevelText(newScore) as TrustLevel;
    
    if (newTrustLevel !== trustLevel) {
      setTrustLevel(newTrustLevel);
    }
  };

  return { trustLevel, trustScore, modifyTrust };
}
