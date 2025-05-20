
import { useState, useEffect } from 'react';

export const useMidnightCheck = () => {
  const [showMidnightMessage, setShowMidnightMessage] = useState(false);
  
  // Check if it's midnight
  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() < 30) {
      setShowMidnightMessage(true);
    }
  }, []);
  
  return { showMidnightMessage };
};
