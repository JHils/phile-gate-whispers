
import React, { useEffect, ReactNode } from 'react';

interface JonahChatContainerProps {
  children: ReactNode;
}

const JonahChatContainer: React.FC<JonahChatContainerProps> = ({ children }) => {
  // Scroll to bottom when children change (typically when messages update)
  useEffect(() => {
    const messagesEndRef = document.getElementById('jonah-messages-end');
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
  }, [children]);

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 flex flex-col">
      {children}
      <div id="jonah-messages-end" />
    </div>
  );
};

export default JonahChatContainer;
