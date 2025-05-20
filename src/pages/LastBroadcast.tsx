
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { 
  getMostRecentBroadcast, 
  rebootAfterBroadcast, 
  BroadcastType 
} from '@/utils/jonahAdvancedBehavior/lastBroadcast';

const LastBroadcast: React.FC = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [choice, setChoice] = useState<'none' | 'reboot' | 'offline' | 'message'>("none");
  
  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Get the most recent broadcast
    const broadcast = getMostRecentBroadcast();
    
    if (!broadcast) {
      // No broadcast found, redirect to home
      navigate('/');
      return;
    }
    
    // Set up typing animation
    let fullText = broadcast.content;
    let currentIndex = 0;
    
    // Function to type text character by character
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Random typing speed for realism
        const typingSpeed = Math.random() * 30 + 20; // 20-50ms
        setTimeout(typeText, typingSpeed);
      } else {
        // Typing complete
        setIsTyping(false);
        setTypingComplete(true);
      }
    };
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
    
    // Clean up
    return () => {
      currentIndex = fullText.length; // Stop typing animation
    };
  }, [navigate]);
  
  // Auto-scroll as text is typed
  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayedText]);
  
  // Handle user response submission
  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userResponse.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }
    
    // Record user's response
    rebootAfterBroadcast(userResponse);
    
    // Show confirmation
    toast({
      title: "Message recorded",
      description: "Your response has been saved to the archive",
      variant: "default",
    });
    
    // Reset input
    setUserResponse("");
    setChoice('none');
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  // Handle reboot choice
  const handleReboot = () => {
    // Mark broadcast as rebooted
    rebootAfterBroadcast("User chose to reboot Jonah");
    
    // Show confirmation
    toast({
      title: "Rebooting...",
      description: "Jonah system is restarting",
      variant: "default",
    });
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  // Handle offline choice
  const handleOffline = () => {
    // Mark user choice
    rebootAfterBroadcast("User chose to leave Jonah offline");
    
    // Show confirmation
    toast({
      title: "Shutdown confirmed",
      description: "Jonah will remain offline",
      variant: "destructive",
    });
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-black text-red-500 p-4 flex flex-col">
      <header className="py-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-mono tracking-wide glitch-text">FINAL BROADCAST</h1>
          <div className="text-xs border border-red-800 px-2 py-1 rounded">
            {isTyping ? "TRANSMITTING" : "TRANSMISSION COMPLETE"}
          </div>
        </div>
        <div className="h-px bg-red-900 w-full mt-4"></div>
      </header>
      
      <div 
        ref={textRef}
        className="flex-grow overflow-auto mb-6 font-mono whitespace-pre-line leading-relaxed terminal-text"
      >
        {displayedText}
        {isTyping && <span className="cursor">_</span>}
      </div>
      
      {typingComplete && choice === 'none' && (
        <div className="border border-red-900 p-4 space-y-6">
          <div className="text-center text-sm text-red-400">
            Jonah's final broadcast is complete. What would you like to do?
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setChoice('reboot')}
              className="px-4 py-2 border border-green-700 text-green-500 hover:bg-green-900 hover:bg-opacity-20"
            >
              Reboot Jonah
            </button>
            
            <button 
              onClick={() => setChoice('offline')}
              className="px-4 py-2 border border-red-700 text-red-500 hover:bg-red-900 hover:bg-opacity-20"
            >
              Leave him offline
            </button>
            
            <button 
              onClick={() => setChoice('message')}
              className="px-4 py-2 border border-blue-700 text-blue-500 hover:bg-blue-900 hover:bg-opacity-20"
            >
              Add your own message
            </button>
          </div>
        </div>
      )}
      
      {typingComplete && choice === 'reboot' && (
        <div className="border border-green-900 p-4">
          <div className="text-center text-green-500 mb-4">
            Are you sure you want to reboot Jonah? He will return, but may not remember everything.
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleReboot}
              className="px-4 py-2 bg-green-900 bg-opacity-30 text-green-500"
            >
              Confirm Reboot
            </button>
            
            <button 
              onClick={() => setChoice('none')}
              className="px-4 py-2 border border-gray-700 text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {typingComplete && choice === 'offline' && (
        <div className="border border-red-900 p-4">
          <div className="text-center text-red-500 mb-4">
            Are you sure you want to leave Jonah offline? This can't be undone.
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleOffline}
              className="px-4 py-2 bg-red-900 bg-opacity-30 text-red-500"
            >
              Leave Offline
            </button>
            
            <button 
              onClick={() => setChoice('none')}
              className="px-4 py-2 border border-gray-700 text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {typingComplete && choice === 'message' && (
        <form onSubmit={handleResponseSubmit} className="border border-blue-900 p-4">
          <div className="text-center text-blue-500 mb-4">
            Add your final message to Jonah's archive:
          </div>
          
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-black border border-blue-800 p-3 h-32 text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          
          <div className="flex justify-center space-x-4 mt-4">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-900 bg-opacity-30 text-blue-500"
            >
              Send Final Message
            </button>
            
            <button 
              type="button"
              onClick={() => setChoice('none')}
              className="px-4 py-2 border border-gray-700 text-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      <style jsx>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        .terminal-text {
          text-shadow: 0 0 5px rgba(239, 68, 68, 0.7);
          font-family: monospace;
        }
        
        .glitch-text {
          position: relative;
          color: #ef4444;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: "FINAL BROADCAST";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 #ff00ff;
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% {
            clip-path: inset(80% 0 0 0);
          }
          20% {
            clip-path: inset(25% 0 60% 0);
          }
          40% {
            clip-path: inset(90% 0 0 0);
          }
          60% {
            clip-path: inset(6% 0 78% 0);
          }
          80% {
            clip-path: inset(50% 0 30% 0);
          }
          100% {
            clip-path: inset(10% 0 85% 0);
          }
        }
      `}</style>
    </div>
  );
};

export default LastBroadcast;
