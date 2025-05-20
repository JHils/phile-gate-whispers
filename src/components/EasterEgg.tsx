
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { speak } from '@/utils/consoleEffects'; 

interface EasterEggProps {
  children: React.ReactNode;
  type?: 'click' | 'hover' | 'konami' | 'secret';
  element?: React.ReactNode;
  secretContent?: React.ReactNode;
  useSpeak?: boolean;
  speakText?: string;
  addPoints?: number;
}

// Konami code sequence: up, up, down, down, left, right, left, right, b, a
const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

const EasterEgg: React.FC<EasterEggProps> = ({ 
  children,
  type = 'click', 
  element, 
  secretContent, 
  useSpeak = false,
  speakText,
  addPoints = 0
}) => {
  const [revealed, setRevealed] = useState(false);
  const [keySequence, setKeySequence] = useState<number[]>([]);
  const { toast } = useToast();
  
  // For konami code easter egg
  useEffect(() => {
    if (type === 'konami') {
      const handleKeyDown = (event: KeyboardEvent) => {
        const newSequence = [...keySequence, event.keyCode];
        // Only keep the last KONAMI_CODE.length keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        setKeySequence(newSequence);
        
        // Check if sequence matches Konami code
        const isKonami = newSequence.length === KONAMI_CODE.length && 
          newSequence.every((key, i) => key === KONAMI_CODE[i]);
          
        if (isKonami && !revealed) {
          revealEasterEgg();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [keySequence, type, revealed]);
  
  // Reveal the easter egg content
  const revealEasterEgg = () => {
    setRevealed(true);
    
    // Add points to user's score if specified
    if (addPoints > 0 && window.JonahConsole) {
      window.JonahConsole.score += addPoints;
      localStorage.setItem('phileScore', window.JonahConsole.score.toString());
    }
    
    // Optional text-to-speech
    if (useSpeak && speakText) {
      speak(speakText);
    }
    
    // Show toast notification
    toast({
      title: "Easter Egg Found!",
      description: addPoints > 0 ? `You earned ${addPoints} points!` : "You discovered a hidden secret.",
    });
  };
  
  // Handle click for click-type easter eggs
  const handleClick = () => {
    if (type === 'click' && !revealed) {
      revealEasterEgg();
    }
  };
  
  // Handle hover for hover-type easter eggs
  const handleHover = () => {
    if (type === 'hover' && !revealed) {
      revealEasterEgg();
    }
  };
  
  // Simple mode - just render children when no special interactions needed
  if (type === 'secret' || element === undefined) {
    return <>{children}</>;
  }
  
  return (
    <>
      {type === 'konami' ? (
        // For Konami code, we just need to render the secret content when revealed
        revealed ? secretContent : null
      ) : (
        // For click/hover types, wrap the element with the appropriate handlers
        <div 
          onClick={type === 'click' ? handleClick : undefined}
          onMouseOver={type === 'hover' ? handleHover : undefined}
          className={type === 'hover' ? 'cursor-default' : type === 'click' ? 'cursor-pointer' : ''}
        >
          {revealed ? (secretContent || children) : (element || children)}
        </div>
      )}
    </>
  );
};

export default EasterEgg;
