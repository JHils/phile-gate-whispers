
import React, { useState } from 'react';
import PasswordPrompt from './PasswordPrompt';
import { useNavigate } from 'react-router-dom';

interface HiddenLinkProps {
  text: string;
  password: string;
  redirectPath: string;
  className?: string;
}

const HiddenLink: React.FC<HiddenLinkProps> = ({ 
  text, 
  password, 
  redirectPath,
  className = ""
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPrompt(true);
  };
  
  const handleSuccess = () => {
    setShowPrompt(false);
    navigate(redirectPath);
  };
  
  return (
    <>
      <span 
        onClick={handleClick}
        className={`cursor-pointer opacity-60 hover:opacity-100 hover:animate-text-glitch transition-opacity ${className}`}
      >
        {text}
      </span>
      
      {showPrompt && (
        <PasswordPrompt
          correctPassword={password}
          onSuccess={handleSuccess}
          onCancel={() => setShowPrompt(false)}
        />
      )}
    </>
  );
};

export default HiddenLink;
