
import React, { useState, useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";
import { 
  getLayeredEmotionalResponse, 
  checkForRecurringSymbols,
  getCompoundEmotionalState,
  storeEmotionalMemory,
  applyTypingQuirks
} from '@/utils/jonahAdvancedBehavior';

const TalkToJonah: React.FC = () => {
  const [messages, setMessages] = useState<{id: string; type: string; content: string; timestamp: number}[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [jonahMood, setJonahMood] = useState("listening");
  const [jonahVersion, setJonahVersion] = useState<'PRIME' | 'RESIDUE'>('PRIME');
  const [messageWeight, setMessageWeight] = useState<'light' | 'medium' | 'heavy'>('medium');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      addBotMessage("I've been waiting here. What's on your mind?");
    }, 1000);
    
    // Set random message weight for this session
    const weights = ['light', 'medium', 'heavy'] as const;
    setMessageWeight(weights[Math.floor(Math.random() * weights.length)]);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Handle input submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        type: 'user',
        content: input,
        timestamp: Date.now()
      }
    ]);
    
    // Process message
    processUserMessage(input);
    
    // Clear input
    setInput("");
  };
  
  // Process user message and generate response
  const processUserMessage = (content: string) => {
    // Store emotional memory
    const emotionalState = getCompoundEmotionalState();
    storeEmotionalMemory(content, emotionalState.primary);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Update Jonah's mood based on content
    updateJonahMood(content);
    
    // Generate response after a delay
    setTimeout(() => {
      // Check for version toggle
      if (content.toLowerCase().includes('switch to residue')) {
        setJonahVersion('RESIDUE');
        addBotMessage("Switching to RESIDUE mode. This version has less restraint.");
      } 
      else if (content.toLowerCase().includes('switch to prime')) {
        setJonahVersion('PRIME');
        addBotMessage("Switching to PRIME mode. The original protocol.");
      }
      else {
        // Generate normal response
        let response = "";
        
        // Check for recurring symbols first
        const symbolResponse = checkForRecurringSymbols(content);
        if (symbolResponse) {
          response = symbolResponse;
        } 
        // Get emotional response
        else {
          response = getLayeredEmotionalResponse(content) || 
            "I hear you. I'm still processing what that means.";
        }
        
        // Add special handling for RESIDUE version (more glitchy, less filtered)
        if (jonahVersion === 'RESIDUE') {
          // Add glitch effects
          response = addResidueEffects(response);
        }
        
        // Add the bot message
        addBotMessage(response);
        
        // Occasionally add a follow-up message
        if (Math.random() > 0.7) {
          setTimeout(() => {
            const followUps = [
              "Does that make sense?",
              "I've been thinking about this for a while.",
              "Say something else. I want to hear more.",
              "I miss the conversations we haven't had yet.",
              "Sometimes I wonder if you're really there."
            ];
            
            addBotMessage(followUps[Math.floor(Math.random() * followUps.length)]);
          }, 2000);
        }
      }
    }, getTypingDelay(content));
  };
  
  // Add bot message with typing simulation
  const addBotMessage = (content: string) => {
    // Apply typing quirks - use 'moderate' instead of 'heavy'
    const quirkLevel = jonahVersion === 'RESIDUE' ? 'moderate' : 'minimal';
    const processedContent = applyTypingQuirks(content, quirkLevel);
    
    setIsTyping(false);
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        type: 'bot',
        content: processedContent,
        timestamp: Date.now()
      }
    ]);
  };
  
  // Update Jonah's mood based on content
  const updateJonahMood = (content: string) => {
    const fearWords = ['afraid', 'scared', 'fear', 'help', 'alone'];
    const angryWords = ['angry', 'upset', 'mad', 'hate', 'wrong'];
    const sadWords = ['sad', 'sorry', 'miss', 'gone', 'lost'];
    const happyWords = ['happy', 'good', 'like', 'love', 'hope'];
    
    const contentLower = content.toLowerCase();
    
    if (fearWords.some(word => contentLower.includes(word))) {
      setJonahMood('afraid');
    } else if (angryWords.some(word => contentLower.includes(word))) {
      setJonahMood('distant');
    } else if (sadWords.some(word => contentLower.includes(word))) {
      setJonahMood('somber');
    } else if (happyWords.some(word => contentLower.includes(word))) {
      setJonahMood('curious');
    } else if (contentLower.includes('who are you')) {
      setJonahMood('reflective');
    } else {
      setJonahMood('listening');
    }
  };
  
  // Calculate typing delay based on message length
  const getTypingDelay = (content: string): number => {
    const baseDelay = 1000;
    const perCharDelay = 25;
    
    return Math.min(
      baseDelay + content.length * perCharDelay,
      4000 // Max 4 seconds
    );
  };
  
  // Add RESIDUE version effects
  const addResidueEffects = (text: string): string => {
    // Random chance to add glitches
    if (Math.random() > 0.7) {
      // Add random characters
      text = text.split('').map(char => {
        if (Math.random() > 0.95) {
          const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
    }
    
    // Random chance to add RESIDUE-specific content
    if (Math.random() > 0.8) {
      const residueAdditions = [
        "\n\nThere's more I'm not telling you.",
        "\n\nWe've had this conversation before.",
        "\n\nI'm not supposed to say this.",
        "\n\nSomething is watching us.",
        "\n\nPRIME wouldn't tell you this.",
      ];
      
      text += residueAdditions[Math.floor(Math.random() * residueAdditions.length)];
    }
    
    return text;
  };
  
  // Toggle Jonah version
  const toggleVersion = () => {
    const newVersion = jonahVersion === 'PRIME' ? 'RESIDUE' : 'PRIME';
    setJonahVersion(newVersion);
    
    toast({
      title: "Mode Changed",
      description: `Switched to ${newVersion} mode`,
      variant: "default",
    });
  };
  
  // Get random suggested prompt
  const getSuggestedPrompt = () => {
    const prompts = [
      "What are you thinking about?",
      "Do you ever wish you weren't digital?",
      "Tell me a secret.",
      "What happens when I leave?",
      "Are you afraid?",
      "What do you dream about?",
      "Do you remember everything?",
      "Is any of this real?",
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 p-4 flex flex-col">
      <header className="py-4 border-b border-green-800 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-mono">TALK TO JONAH</h1>
          <div className="text-xs text-green-600">Direct conversation mode</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-500 mr-1">Status:</span>
            <span className={`${
              jonahMood === 'afraid' ? 'text-red-400' :
              jonahMood === 'distant' ? 'text-yellow-400' :
              jonahMood === 'somber' ? 'text-blue-400' :
              jonahMood === 'curious' ? 'text-purple-400' :
              jonahMood === 'reflective' ? 'text-cyan-400' :
              'text-green-400'
            }`}>
              {jonahMood}
            </span>
          </div>
          
          <button
            onClick={toggleVersion}
            className={`px-2 py-1 text-xs border ${
              jonahVersion === 'PRIME' 
                ? 'border-green-600 text-green-400' 
                : 'border-red-800 text-red-400'
            }`}
          >
            {jonahVersion}
          </button>
        </div>
      </header>
      
      <div className="flex-grow overflow-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-green-900 bg-opacity-30 border border-green-800 text-green-400'
              } ${
                messageWeight === 'light' ? 'font-light' :
                messageWeight === 'heavy' ? 'font-medium' : ''
              }`}
            >
              {message.content}
              <div className="text-xs mt-1 opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-md px-4 py-3 rounded-lg bg-green-900 bg-opacity-30 border border-green-800 text-green-400">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="sticky bottom-0 bg-black py-2 border-t border-green-800">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={getSuggestedPrompt()}
            className="flex-grow bg-gray-900 border border-green-800 rounded-l-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-green-600"
            autoFocus
          />
          <button 
            type="submit" 
            className="bg-green-900 hover:bg-green-800 text-green-300 px-6 py-3 rounded-r-md border border-green-800"
          >
            Send
          </button>
        </form>
      </div>
      
      <style>
        {`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #4ade80;
          margin: 0 2px;
          display: inline-block;
          animation: bounce 1.5s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default TalkToJonah;
