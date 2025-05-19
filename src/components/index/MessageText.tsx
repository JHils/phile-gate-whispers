
import React from 'react';
import { useIsMobile } from "../../hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="my-8 md:my-12 space-y-6 md:space-y-8 w-full max-w-full px-4">
      <p className="text-lg md:text-2xl text-dust-orange font-typewriter text-reveal">
        {addSpans("Some things you don't find.")}
        <br />
        {addSpans("They find you.")}
      </p>
      
      <p className="text-lg md:text-2xl text-phile-light font-typewriter animate-subtle-flicker">
        The Gate is already open.
      </p>
      
      <p id="whisperText" className="text-base md:text-xl text-dust-blue font-typewriter mt-6 md:mt-8 transition-all duration-700">
        {whisperText}
      </p>
      
      {/* Display ChronoLayer message if user previously collapsed the site */}
      {collapseMessage && userIsPermanentlyCollapsed && (
        <div className="mt-4 md:mt-6">
          <p className="text-dust-red/60 text-sm font-typewriter animate-pulse">
            {collapseMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageText;
