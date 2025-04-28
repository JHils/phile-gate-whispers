
import React, { useState } from 'react';

interface FileItemProps {
  title: string;
  content: string;
  comment?: string;
}

const FileItem: React.FC<FileItemProps> = ({ title, content, comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-6 border-b border-dust-blue/30 pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-left w-full font-typewriter text-dust-red hover:text-dust-orange transition-colors"
      >
        <span className="mr-2">📂</span>
        <span>{title}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 pl-6 pr-2 py-3 bg-black/10 rounded text-sm animate-fade-in">
          <p className="whitespace-pre-line">{content}</p>
          {/* Hidden comment for the inspect element */}
          {comment && <div className="hidden">{comment}</div>}
        </div>
      )}
    </div>
  );
};

export default FileItem;
