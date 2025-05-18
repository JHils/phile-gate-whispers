
import React, { useRef, useState } from 'react';

interface ConsoleOverlayProps {
  visible: boolean;
  consoleInput: string;
  setConsoleInput: (value: string) => void;
  consoleOutput: string[];
  processConsoleCommand: (command: string) => void;
}

const ConsoleOverlay: React.FC<ConsoleOverlayProps> = ({ 
  visible, 
  consoleInput, 
  setConsoleInput, 
  consoleOutput, 
  processConsoleCommand 
}) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  return (
    visible ? (
      <div 
        className="fixed bottom-4 right-4 w-80 h-64 bg-[#000]/90 border border-[#333] rounded-md text-green-500 font-mono p-2 text-sm z-50 flex flex-col"
      >
        <div className="text-xs mb-2 text-green-300">Jonah Console [Press Ctrl+C to close]</div>
        <div ref={consoleRef} className="flex-grow overflow-auto mb-2">
          {consoleOutput.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="flex">
          <span className="mr-1">{'>'}</span>
          <input 
            type="text"
            value={consoleInput}
            onChange={(e) => setConsoleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                processConsoleCommand(consoleInput);
              }
            }}
            className="flex-grow bg-transparent outline-none"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </div>
    ) : null
  );
};

export default ConsoleOverlay;
