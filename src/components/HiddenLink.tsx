
import React, { useState } from 'react';
import PasswordPrompt from './PasswordPrompt';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface HiddenLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const HiddenLink: React.FC<HiddenLinkProps> = ({ 
  to, 
  className = "",
  children
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <span 
      onClick={handleClick}
      className={`cursor-pointer opacity-60 hover:opacity-100 hover:animate-text-glitch transition-opacity ${className}`}
    >
      {children}
    </span>
  );
};

export default HiddenLink;
