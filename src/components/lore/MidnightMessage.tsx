
import React from 'react';

interface MidnightMessageProps {
  show: boolean;
}

const MidnightMessage: React.FC<MidnightMessageProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-10 left-10 text-amber-300/30 font-mono text-sm animate-pulse">
      <p>// The ancestors don't sleep. Why do you?</p>
    </div>
  );
};

export default MidnightMessage;
