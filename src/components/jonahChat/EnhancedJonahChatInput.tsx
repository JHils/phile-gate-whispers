
import React, { useState, useRef, useEffect } from 'react';
import { jonahVoice } from '@/utils/jonahVoice';

interface EnhancedJonahChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isTyping: boolean;
}

const EnhancedJonahChatInput: React.FC<EnhancedJonahChatInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  isTyping
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Adjust textarea height based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);
  
  // Handle textarea resize on window resize
  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle Enter key (submit on Enter, newline on Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (input.trim()) {
        handleSendMessage(e);
      }
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-3">
      <div className="flex items-end">
        <div className="flex-grow">
          <textarea 
            ref={inputRef}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none min-h-[40px] max-h-[150px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={jonahVoice.placeholders.message}
            rows={1}
            disabled={isTyping}
          />
        </div>
        <button
          type="submit"
          title="Release into Static"
          className={`ml-2 px-4 py-2 ${
            input.trim() && !isTyping
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-700 cursor-not-allowed'
          } text-white rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-green-500`}
          disabled={!input.trim() || isTyping}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="mt-2 text-xs text-green-400/60 font-mono">
        Console integration active. Try whisperToJonah() in browser console.
      </div>
    </form>
  );
};

export default EnhancedJonahChatInput;
