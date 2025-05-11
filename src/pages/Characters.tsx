
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CharacterChat from '@/components/CharacterChat';
import { useToast } from '@/components/ui/use-toast';

// Character data
interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  backstory: string[];
  quotes: string[];
  memories: string[];
  audioClip?: string;
}

const charactersData: Character[] = [
  {
    id: 'jonah',
    name: 'Jonah S.M. Phile',
    role: 'Traveler / Narrator',
    image: '/placeholder.svg', // Replace with actual image when available
    backstory: [
      "Originally from the UK, Jonah arrived in Australia seeking adventure and escape.",
      "He documented strange occurrences throughout his travels, focusing on what he called 'glitches in reality.'",
      "His journals detail experiences that blur the line between reality and fiction.",
      "Some believe 'S.M.' stands for 'Shadow Monster,' though Jonah never confirmed this."
    ],
    quotes: [
      "The coin never stops spinning if you don't look at it.",
      "Some things in Australia don't need explaining. Especially not on Maggie Island.",
      "The Gate was always there. I just couldn't see it until I stopped trying to."
    ],
    memories: [
      "The Magnetic Tent Incident",
      "Meeting Griff and Trigger at Horseshoe Bay",
      "The coin that landed on its edge in the hostel hallway",
      "The endless Bus Loop Alpha circuit"
    ],
    audioClip: "/audio/jonah-memory.mp3" // Placeholder for future audio
  },
  {
    id: 'samantha',
    name: 'Samantha',
    role: 'Guide / Voice of Reason',
    image: '/placeholder.svg', // Replace with actual image when available
    backstory: [
      "A local Australian who crossed paths with Jonah in Townsville.",
      "Initially skeptical of Jonah's 'glitch reality' theories, she eventually witnesses inexplicable events herself.",
      "Her grounded perspective often serves as counterpoint to Jonah's more abstract interpretations.",
      "Keeps detailed notes on what she calls 'the phenomena,' separating fact from fiction."
    ],
    quotes: [
      "Just because you can't explain it doesn't mean it's supernatural.",
      "That thing in the tent wasn't human, Jonah. We both know that.",
      "Sometimes patterns exist only because we're looking for them."
    ],
    memories: [
      "The disappearing backpacker at Kuranda",
      "Finding the oddly-shaped stone that hummed at night",
      "The three identical strangers at the Bus Loop",
      "The map that showed different locations each time it was unfolded"
    ],
    audioClip: "/audio/samantha-warning.mp3" // Placeholder for future audio
  }
];

const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(charactersData[0]);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  const handleAudioPlay = (character: Character) => {
    // This is a placeholder for future audio implementation
    toast({
      title: `${character.name}'s Memory`,
      description: "Audio feature coming soon. This will play a narrated memory.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-serif text-dust-orange mb-2">Character Profiles</h1>
        <p className="text-dust-blue opacity-80 italic mb-8">
          "Every story has its voices. Some just happen to be from different realities."
        </p>
        
        {/* Character Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {charactersData.map(character => (
            <button
              key={character.id}
              onClick={() => {
                setSelectedCharacter(character);
                setShowChat(false);
              }}
              className={`relative p-1 ${selectedCharacter.id === character.id ? 'ring-2 ring-dust-orange' : 'opacity-70 hover:opacity-100'} rounded-lg transition-all duration-300`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-2 left-0 right-0 text-center text-sm bg-black/60 py-1">
                {character.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
        
        {/* Character Detail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image and Basic Info */}
          <div className="md:col-span-1">
            <Card className="bg-black/40 backdrop-blur-md border-gray-700 overflow-hidden h-full">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedCharacter.image} 
                  alt={selectedCharacter.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl font-serif text-dust-orange">{selectedCharacter.name}</h2>
                  <p className="text-dust-blue">{selectedCharacter.role}</p>
                </div>
              </div>
              <div className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full mb-2 border-dust-orange text-dust-orange hover:bg-dust-orange/20"
                  onClick={() => setShowChat(true)}
                >
                  Chat with {selectedCharacter.name.split(' ')[0]}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-dust-blue text-dust-blue hover:bg-dust-blue/20"
                  onClick={() => handleAudioPlay(selectedCharacter)}
                >
                  Play Memory Audio
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Character Details Tabs */}
          <div className="md:col-span-2">
            {showChat ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-gray-700 h-full">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-serif">Chat with {selectedCharacter.name.split(' ')[0]}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowChat(false)}
                    >
                      Back to Profile
                    </Button>
                  </div>
                  <CardContent className="p-0">
                    <CharacterChat character={selectedCharacter} />
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Tabs defaultValue="backstory" className="h-full">
                <Card className="bg-black/40 backdrop-blur-md border-gray-700 h-full">
                  <div className="p-4 border-b border-gray-700">
                    <TabsList className="bg-gray-800/50">
                      <TabsTrigger value="backstory">Backstory</TabsTrigger>
                      <TabsTrigger value="quotes">Quotes</TabsTrigger>
                      <TabsTrigger value="memories">Memories</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="p-4 h-[calc(100%-70px)]">
                    <TabsContent value="backstory" className="mt-0 h-full">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                          {selectedCharacter.backstory.map((paragraph, index) => (
                            <motion.p 
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              className="text-gray-300"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="quotes" className="mt-0 h-full">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6">
                          {selectedCharacter.quotes.map((quote, index) => (
                            <motion.blockquote 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.15, duration: 0.3 }}
                              className="border-l-2 border-dust-orange pl-4 italic text-gray-200"
                            >
                              "{quote}"
                            </motion.blockquote>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="memories" className="mt-0 h-full">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                          {selectedCharacter.memories.map((memory, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              className="bg-gray-800/50 p-3 rounded-md"
                            >
                              <p className="text-dust-blue">{memory}</p>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </div>
                </Card>
              </Tabs>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-400 mt-6">
          <p className="italic text-dust-blue text-center">"The characters remember things differently each time. Memory is a fluid construct."</p>
        </div>
      </div>
    </div>
  );
};

export default Characters;
