
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { toast } from "@/hooks/use-toast";

// List of forbidden words that will be filtered
const FORBIDDEN_WORDS = [
  'collapse', 
  'reveal()', 
  'i am', 
  'rebirth', 
  '/gate', 
  'joseph',
  'help()',
  'whois()',
  'gate()',
  'philes()',
  'monster()',
  'legacy()',
  'password'
];

interface CampfireMessage {
  id: string;
  created_at: string;
  username: string;
  message: string;
  user_hash: string;
  role: string;
}

const Campfire = () => {
  const [messages, setMessages] = useState<CampfireMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userHash, setUserHash] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userState, trackEvent } = useTrackingSystem();
  
  // Check if user can post messages
  const canPost = userState.gatekeeperStatus || 
                 userState.console.monsterCalled || 
                 userState.console.legacyCalled ||
                 userState.legacyWritten;
  
  // Generate a consistent user hash based on browser fingerprint
  useEffect(() => {
    const generateUserHash = () => {
      const navigator_info = window.navigator.userAgent;
      const screen_info = `${window.screen.height}x${window.screen.width}`;
      const fingerprint = `${navigator_info}-${screen_info}-${new Date().getTimezoneOffset()}`;
      
      // Create a simple hash from the fingerprint
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
        hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      
      // Make it positive and limit to 5 digits
      const positiveHash = Math.abs(hash % 100000);
      return positiveHash.toString().padStart(5, '0');
    };
    
    const hash = generateUserHash();
    setUserHash(hash);
    
    // Generate username based on role
    let role = "Drifter";
    if (userState.legacyWritten || userState.console.legacyCalled) {
      role = "Gatekeeper";
    } else if (userState.console.monsterCalled) {
      role = "AshWalker";
    }
    
    setUsername(`${role} #${hash}`);
    
    // Show welcome back message if returning
    const lastVisit = localStorage.getItem('last_campfire_visit');
    if (lastVisit) {
      toast({
        title: "The fire remembers you",
        description: `Welcome back, ${role} #${hash}.`,
        duration: 5000,
      });
    }
    
    // Store this visit
    localStorage.setItem('last_campfire_visit', new Date().toISOString());
    trackEvent('visited_campfire');
  }, [userState, trackEvent]);
  
  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('campfire_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Reverse to show oldest first
          setMessages(data.reverse());
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    // Subscribe to new messages
    const channel = supabase
      .channel('public:campfire_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'campfire_messages' 
        }, 
        (payload) => {
          const newMessage = payload.new as CampfireMessage;
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Check if message contains forbidden words
  const isSafeMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return !FORBIDDEN_WORDS.some(word => lowerMessage.includes(word.toLowerCase()));
  };
  
  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    if (!canPost) {
      toast({
        title: "Cannot send message",
        description: "You must become a Gatekeeper to speak at the campfire.",
        variant: "destructive",
      });
      return;
    }
    
    // Check for forbidden words
    if (!isSafeMessage(newMessage)) {
      toast({
        title: "Message blocked",
        description: "The Monster twisted your words before they reached the fire.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Determine role based on user state
      let role = 'drifter';
      if (userState.legacyWritten || userState.console.legacyCalled) {
        role = 'gatekeeper';
      } else if (userState.console.monsterCalled) {
        role = 'ashwalker';
      }
      
      // Send message to Supabase
      const { error } = await supabase.from('campfire_messages').insert([
        {
          username,
          message: newMessage,
          user_hash: userHash,
          role
        }
      ]);
      
      if (error) throw error;
      
      // Clear input
      setNewMessage("");
      trackEvent('campfire_message_sent');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Your whisper was lost to the wind.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-dust-orange">
      {/* Campfire header */}
      <header className="p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-serif mb-2 text-dust-red">THE CAMPFIRE</h1>
        <p className="text-lg md:text-xl text-dust-orange font-typewriter">
          Whispers echo between worlds
        </p>
        {!canPost && (
          <p className="mt-4 text-dust-blue italic text-sm">
            You may listen, but only those who have faced the Monster may speak.
          </p>
        )}
      </header>
      
      {/* Messages area */}
      <div className="flex-grow p-4 md:p-6 max-w-3xl mx-auto w-full">
        <div className="bg-black/50 border border-dust-blue/30 rounded-md p-4 h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-gray-800/30" />
              <Skeleton className="h-12 w-full bg-gray-800/30" />
              <Skeleton className="h-12 w-full bg-gray-800/30" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-center text-dust-blue italic">
              The fire crackles. No one has spoken yet.
            </p>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-4 p-3 rounded ${
                  msg.user_hash === userHash 
                    ? 'border-l-4 border-dust-orange/40 bg-black/30' 
                    : 'bg-black/10'
                }`}
              >
                <p className={`text-sm font-medium ${
                  msg.role === 'gatekeeper' 
                    ? 'text-dust-red' 
                    : msg.role === 'ashwalker' 
                      ? 'text-dust-orange' 
                      : 'text-dust-blue'
                }`}>
                  {msg.username}
                </p>
                <p className="mt-1 text-dust-orange/80 font-typewriter">{msg.message}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input form */}
        <form onSubmit={handleSendMessage} className="mt-4 flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={canPost ? "Whisper to the fire..." : "You must survive before you may speak..."}
            className="flex-grow bg-black/50 border-dust-blue/30 text-dust-orange placeholder:text-dust-blue/50"
            disabled={!canPost}
          />
          <Button 
            type="submit" 
            className="ml-2 bg-black/70 hover:bg-black text-dust-orange border border-dust-orange/30 hover:border-dust-orange/60"
            disabled={!canPost}
          >
            Whisper
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Campfire;
