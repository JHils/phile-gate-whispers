
import React from 'react';

interface MessageTextProps {
  addSpans: (text: string) => JSX.Element[];
  whisperText: string;
  collapseMessage: string | null;
  userIsPermanentlyCollapsed: boolean;
}

const MessageText: React.FC<MessageTextProps> = ({ 
  addSpans, 
  whisperText, 
  collapseMessage, 
  userIsPermanentlyCollapsed 
}) => {
  return (
    <div className="mt-12 space-y-8">
      <p className="text-xl md:text-2xl text-dust-orange font-typewriter text-reveal">
        {addSpans("Some things you don't find.")}
        <br />
        {addSpans("They find you.")}
      </p>
      
      <p className="text-xl md:text-2xl text-phile-light font-typewriter animate-subtle-flicker">
        The Gate is already open.
      </p>
      
      <p id="whisperText" className="text-lg md:text-xl text-dust-blue font-typewriter mt-8 transition-all duration-700">
        {whisperText}
      </p>
      
      {/* Display ChronoLayer message if user previously collapsed the site */}
      {collapseMessage && userIsPermanentlyCollapsed && (
        <div className="mt-6">
          <p className="text-dust-red/60 text-sm font-typewriter animate-pulse">
            {collapseMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageText;
