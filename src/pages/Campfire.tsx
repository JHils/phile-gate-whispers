import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useTrackingSystem } from "../hooks/useTrackingSystem";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface LeaderboardUser {
  id: string;
  user_hash: string;
  score: number;
  title: string;
  first_visit: string;
}

const Campfire = () => {
  const [messages, setMessages] = useState<CampfireMessage[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [userHash, setUserHash] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [userRank, setUserRank] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
  
  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLeaderboardLoading(true);
        const { data, error } = await supabase
          .from('user_tracking')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setLeaderboard(data);
          
          // Find user's rank if they're in the leaderboard
          const userRankIndex = data.findIndex(user => user.user_hash === userHash);
          if (userRankIndex !== -1) {
            setUserRank(userRankIndex + 1);
          } else {
            // If not in top 10, fetch their rank separately
            fetchUserRank();
          }
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLeaderboardLoading(false);
      }
    };
    
    // Fetch user's rank if not in top 10
    const fetchUserRank = async () => {
      try {
        // Fix: Use a proper Supabase query instead of RPC
        // Since we can't use RPC here, we'll just count how many users have a higher score
        if (userHash) {
          const { data: userScore, error: userScoreError } = await supabase
            .from('user_tracking')
            .select('score')
            .eq('user_hash', userHash)
            .single();
            
          if (userScoreError) {
            console.error('Error fetching user score:', userScoreError);
            return;
          }
          
          if (userScore) {
            const { count, error: countError } = await supabase
              .from('user_tracking')
              .select('*', { count: 'exact', head: true })
              .gt('score', userScore.score);
              
            if (countError) {
              console.error('Error counting higher ranked users:', countError);
              return;
            }
            
            if (count !== null) {
              setUserRank(count + 1); // Add 1 because rank starts at 1, not 0
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user rank:', error);
      }
    };
    
    if (userHash) {
      fetchLeaderboard();
    }
  }, [userHash]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Toggle audio on/off
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };
  
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
    <div className="min-h-screen flex flex-col bg-black">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/17/audio_f3c1db9a4d.mp3" type="audio/mp3" />
      </audio>

      {/* Campfire header */}
      <header className="p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-serif mb-2 text-dust-red">🔥 THE CAMPFIRE</h1>
        <p className="text-lg md:text-xl text-dust-orange font-typewriter opacity-60">
          The fire remembers you. Speak only if the flames allow it.
        </p>
        <div className="mt-2">
          <button 
            onClick={toggleAudio} 
            className="text-xs text-dust-blue hover:text-dust-orange transition-colors"
          >
            {audioEnabled ? "Mute Fire Sounds" : "Play Crackling Fire"}
          </button>
        </div>
        {!canPost && (
          <p className="mt-4 text-dust-blue italic text-sm">
            You may listen, but only those who have faced the Monster may speak.
          </p>
        )}
      </header>
      
      {/* Tabs for Messages and Leaderboard */}
      <div className="flex-grow p-4 md:p-6 max-w-3xl mx-auto w-full">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#1a1a1a] border border-[#333]">
            <TabsTrigger value="messages" className="text-dust-orange data-[state=active]:text-dust-red">
              Campfire Messages
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-dust-orange data-[state=active]:text-dust-red">
              Philes Leaderboard
            </TabsTrigger>
          </TabsList>
          
          {/* Messages Tab */}
          <TabsContent value="messages" className="border-none p-0">
            <div className="bg-[#1a1a1a] border border-[#444] rounded-md p-4 h-[60vh] overflow-y-auto shadow-[0_0_10px_rgba(245,222,179,0.25)]">
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
                    className={`mb-4 p-3 rounded animate-[flicker_1.5s_infinite] ${
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
                    <p className="mt-1 text-[#f5deb3]/80 font-typewriter">{msg.message}</p>
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
                placeholder={canPost ? "Whisper something..." : "You must survive before you may speak..."}
                className="flex-grow bg-[#111] text-[#fff2c7] border-[#333] placeholder:text-gray-500"
                disabled={!canPost}
              />
              <Button 
                type="submit" 
                className="ml-2 bg-[#f5deb3] hover:bg-[#ffeaa7] text-[#0c0c0c] border-none font-bold"
                disabled={!canPost}
              >
                Send
              </Button>
            </form>
          </TabsContent>
          
          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="border-none p-0">
            <div className="bg-[#1a1a1a] border border-[#444] rounded-md p-4 overflow-hidden shadow-[0_0_10px_rgba(245,222,179,0.25)]">
              <h3 className="text-xl text-dust-red font-serif mb-4">Philes Leaderboard</h3>
              
              {leaderboardLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-gray-800/30" />
                  <Skeleton className="h-12 w-full bg-gray-800/30" />
                  <Skeleton className="h-12 w-full bg-gray-800/30" />
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#333]">
                        <TableHead className="text-dust-orange">Rank</TableHead>
                        <TableHead className="text-dust-orange">User</TableHead>
                        <TableHead className="text-dust-orange">Score</TableHead>
                        <TableHead className="text-dust-orange">Title</TableHead>
                        <TableHead className="text-dust-orange hidden md:table-cell">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.map((user, index) => (
                        <TableRow 
                          key={user.id} 
                          className={`border-b border-[#333] ${user.user_hash === userHash ? 'bg-black/30' : ''}`}
                        >
                          <TableCell className="text-dust-blue">{index + 1}</TableCell>
                          <TableCell className="text-[#f5deb3]">
                            {user.user_hash === userHash ? `You (#${user.user_hash})` : `#${user.user_hash}`}
                          </TableCell>
                          <TableCell className="text-[#f5deb3]">{user.score}</TableCell>
                          <TableCell className={`font-medium ${
                            user.title === 'Monster' ? 'text-dust-red' : 
                            user.title === 'Gatekeeper' ? 'text-dust-orange' : 
                            'text-dust-blue'
                          }`}>
                            {user.title}
                          </TableCell>
                          <TableCell className="text-gray-500 hidden md:table-cell">
                            {new Date(user.first_visit).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {userRank && userRank > 10 && (
                    <div className="mt-4 p-3 border-t border-[#333] text-center">
                      <p className="text-dust-blue">
                        You are currently ranked <span className="text-dust-orange">#{userRank}</span> on the leaderboard
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Overlay effect */}
      <div className="fixed inset-0 pointer-events-none bg-black/10 z-10 static-overlay opacity-30"></div>
    </div>
  );
};

export default Campfire;
