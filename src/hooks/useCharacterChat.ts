
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Character, Message } from '../types/chat';

export function useCharacterChat(character: Character) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Initial greeting
  useEffect(() => {
    // Small delay for realistic effect
    const timer = setTimeout(() => {
      const greeting = generateCharacterResponse('greeting');
      setMessages([
        {
          id: Date.now().toString(),
          sender: 'character',
          text: greeting,
          timestamp: new Date()
        }
      ]);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [character.id]); // Reset when character changes

  // Character response generator
  const generateCharacterResponse = (type: 'greeting' | 'reply', userMessage?: string): string => {
    // Character-specific responses
    const responses: Record<string, Record<string, string[]>> = {
      jonah: {
        greeting: [
          "Hey there. Strange to be on this side of the story for once.",
          "You found me. Most people don't make it this far into the Gate.",
          "The whispers led you here, didn't they? They have a way of doing that."
        ],
        common: [
          "That reminds me of something that happened on Maggie Island...",
          "The Gate works in mysterious ways. I've seen it firsthand.",
          "Sometimes I wonder if any of this is real, or just another glitch.",
          "Have you ever felt like you're being watched? Like really, truly watched?",
          "The coin always lands on its edge if you wait long enough."
        ]
      },
      samantha: {
        greeting: [
          "G'day. You must be new around here. I'm Samantha.",
          "You're talking to me? Most people only want to hear Jonah's stories.",
          "I've been waiting for someone to find this page. Let's talk."
        ],
        common: [
          "Look, not everything has a supernatural explanation.",
          "Jonah sees patterns where there might not be any. That's both his gift and his curse.",
          "I've seen some things I can't explain, sure. But that doesn't mean we throw logic out the window.",
          "The incident at the tent... that was different. That was real.",
          "Sometimes I think this whole journey is just Jonah processing something deeper."
        ]
      }
    };

    if (type === 'greeting') {
      const greetings = responses[character.id]?.greeting || ["Hello there."];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // For specific message triggers
    if (userMessage) {
      const lowerMsg = userMessage.toLowerCase();
      
      // Character-specific trigger responses
      if (character.id === 'jonah') {
        if (lowerMsg.includes('gate') || lowerMsg.includes('the gate')) {
          return "The Gate isn't a place. It's a state of mind. Or maybe it's both. I'm still figuring that out.";
        }
        if (lowerMsg.includes('tent') || lowerMsg.includes('magnetic tent')) {
          return "The Magnetic Tent... I still hear those voices sometimes. 'You're sleeping on my toggles...'";
        }
      }
      
      if (character.id === 'samantha') {
        if (lowerMsg.includes('jonah')) {
          return "Jonah sees the world differently. Sometimes I think he's just lost, but other times... I wonder if he's seeing something the rest of us can't.";
        }
        if (lowerMsg.includes('australia') || lowerMsg.includes('townsville')) {
          return "There's something about this place that changes people. The landscapes are vast, but the stories are even bigger.";
        }
      }
    }
    
    // Default responses
    const commons = responses[character.id]?.common || ["Interesting thought."];
    return commons[Math.floor(Math.random() * commons.length)];
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate character typing and responding
    const typingTime = 1000 + Math.random() * 1500;
    
    setTimeout(() => {
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        text: generateCharacterResponse('reply', input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, characterMessage]);
      setIsTyping(false);
      
      // Easter egg - very rare chance of glitch response
      if (Math.random() < 0.08) { // 8% chance
        setTimeout(() => {
          const glitchMessage: Message = {
            id: (Date.now() + 2).toString(),
            sender: 'character',
            text: "Ī̸̙'̵̱m̸̙ ̴̬n̸̢ȯ̴̰t̴̨ ̴͕s̷̡u̴̺p̶̼p̶͈o̷̪s̸̯e̵̙d̵̪ ̴̦t̸̖o̸̥ ̷̠t̴͓e̴̡l̵̰l̴̤ ̶͚y̶̰o̵̳u̸̳ ̶̠t̸̝h̵̥i̴̢s̷̠.̴̮.̷̧.̴̭ ̴̼t̷̹h̸̫i̷͈s̵̙ ̸̙i̶̠s̷̯n̷͕'̵̨t̸̯ ̸͕r̸͉e̷̫a̵̦l̵̖.̸̼",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, glitchMessage]);
          
          toast({
            title: "Glitch Detected",
            description: "Something strange happened in the conversation.",
            variant: "destructive",
          });
        }, 800);
      }
    }, typingTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
    handleKeyDown
  };
}
