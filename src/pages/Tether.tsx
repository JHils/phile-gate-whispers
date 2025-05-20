
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Heart, DollarSign, LineChart, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';

const Tether = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Mock donation data
  const donationData = {
    total: 12750,
    charities: [
      { name: 'Mind', amount: 4500 },
      { name: 'Beyond Blue', amount: 5250 },
      { name: 'Samaritans', amount: 3000 }
    ]
  };
  
  // Mock hope messages
  const hopeMessages = [
    { id: 1, message: "I found my way back from the darkest place. You can too.", author: "Anonymous" },
    { id: 2, message: "Every day is a battle, but I'm winning the war.", author: "Sarah M." },
    { id: 3, message: "The darkness taught me how to truly appreciate the light.", author: "James" },
    { id: 4, message: "You're stronger than your thoughts tell you.", author: "Eliza T." }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your story has been submitted. Thank you for sharing your journey.");
    setMessage('');
    setName('');
  };
  
  // Easter egg - glitch effect on certain words
  const glitchWords = (text: string) => {
    const triggerWords = ['seagull', 'souvenirs', 'scars'];
    return text.split(' ').map((word, i) => {
      const lowerWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (triggerWords.includes(lowerWord)) {
        return (
          <span 
            key={i} 
            className="relative inline-block hover:text-dust-red cursor-pointer group"
            onClick={() => console.log(`Trigger word clicked: ${lowerWord}`)}
          >
            {word}
            <span className="absolute opacity-0 group-hover:opacity-100 text-xs text-dust-red top-full left-0 transition-opacity">
              {btoa(lowerWord).substring(0, 8)}
            </span>
          </span>
        );
      }
      return <span key={i}>{word} </span>;
    });
  };
  
  return (
    <div className="min-h-screen bg-[#f5f1e4] dark:bg-[#1a1814] text-black dark:text-[#f5f1e4] transition-colors duration-300">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Header */}
      <header className="pt-12 pb-6 text-center">
        <div className="w-full max-w-md mx-auto">
          <img 
            src="/lovable-uploads/3b8dd570-60e5-41a5-b943-23b15322d53c.png" 
            alt="Tether - You're Not Alone" 
            className="w-full h-auto"
          />
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 max-w-4xl pb-20">
        <div className="prose dark:prose-invert mx-auto mb-12">
          <p className="text-center text-xl font-serif">
            This page is a quiet place in the chaos. A reminder that you, reader, are real. 
            And you're not broken – you're breaking through.
          </p>
          
          <p className="text-center text-lg font-serif">
            {glitchWords("Jonah didn't just travel – he unravelled. But he made it back with souvenirs; words, scars, laughter, and tools. Some of those tools are here.")}
          </p>
        </div>
        
        <Tabs defaultValue="story" className="w-full mb-16">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="story" className="flex flex-col items-center gap-2">
              <Book className="h-5 w-5" />
              <span>Jonah's Story</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex flex-col items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Mental Health Support</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex flex-col items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <span>Donation</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex flex-col items-center gap-2">
              <LineChart className="h-5 w-5" />
              <span>Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Submit Your Story</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="story" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>A Confession from Jonah</CardTitle>
                <CardDescription>Sometimes the way back isn't linear</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <p>
                  I don't know when exactly I started losing myself. It wasn't dramatic – no sudden break, no moment 
                  of clarity. Just a slow unraveling, like a sweater caught on a nail. Each day, I was a little less 
                  there, a little more... elsewhere.
                </p>
                <p>
                  People talk about "rock bottom" like it's a place you visit once. For me, it was more like renting an 
                  apartment there, signing a lease, hanging pictures on the walls. I became comfortable with the worst 
                  version of myself.
                </p>
                <p>
                  The strangest part? Even at my lowest, I kept leaving breadcrumbs for my future self. Notes. Stories. 
                  Codes. As if some part of me knew I'd need to find my way back someday.
                </p>
                <p>
                  I'm not "cured." I'm not even sure that's the right goal. But I've learned to recognize when my mind 
                  is lying to me. And I've built tools – strange, personal, sometimes ridiculous tools – that help me 
                  remember who I am when the fog gets too thick.
                </p>
                <p>
                  If you're reading this, you're already doing better than you think. You're reaching out. You're looking 
                  for tethers. Keep going. The way back is weird and non-linear and sometimes even funny. But it exists.
                </p>
                <p className="font-bold">- Joseph (Jonah)</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Global Resources</CardTitle>
                <CardDescription>Help is available, wherever you are</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium">United Kingdom</h3>
                  <p><a href="https://www.mind.org.uk/" className="text-blue-600 dark:text-blue-400" target="_blank">Mind</a> - 0300 123 3393</p>
                  <p><a href="https://www.samaritans.org/" className="text-blue-600 dark:text-blue-400" target="_blank">Samaritans</a> - 116 123</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Australia</h3>
                  <p><a href="https://www.beyondblue.org.au/" className="text-blue-600 dark:text-blue-400" target="_blank">Beyond Blue</a> - 1300 22 4636</p>
                  <p><a href="https://www.lifeline.org.au/" className="text-blue-600 dark:text-blue-400" target="_blank">Lifeline</a> - 13 11 14</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">United States</h3>
                  <p><a href="https://988lifeline.org/" className="text-blue-600 dark:text-blue-400" target="_blank">National Suicide Prevention Lifeline</a> - 988</p>
                  <p><a href="https://www.crisistextline.org/" className="text-blue-600 dark:text-blue-400" target="_blank">Crisis Text Line</a> - Text HOME to 741741</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jonah's Grounding Toolkit</CardTitle>
                <CardDescription>Simple techniques that helped me stay present</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">The 4-7-8 Breath</h3>
                  <p className="mb-2">Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds.</p>
                  <Button variant="outline">Try It Now</Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Seagull Visualization</h3>
                  <p>You're on a beach. But your thoughts are seagulls... and you're allowed to ignore them.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Digital Scribble Pad</h3>
                  <p className="mb-2">Type out your thoughts below. They won't be saved anywhere.</p>
                  <Textarea 
                    placeholder="Type here and watch your thoughts appear..." 
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="donations" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Philanthropy of the Philes</CardTitle>
                <CardDescription>Jonah lost his mind and found something worth sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">A portion of every Jonah's Philes book sale goes to mental health charities.</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  <p className="text-xl font-bold">Total Donated: ${(donationData.total/100).toLocaleString()}</p>
                  <ul className="list-disc list-inside mt-2">
                    {donationData.charities.map((charity, index) => (
                      <li key={index}>${(charity.amount/100).toLocaleString()} to {charity.name}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Donate More or Nominate a Cause</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracker" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Wall of Hope</CardTitle>
                <CardDescription>Messages from those who've been where you are</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {hopeMessages.map((msg) => (
                    <div key={msg.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                      <p className="italic">"{msg.message}"</p>
                      <p className="text-right text-sm mt-2">— {msg.author}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="submit" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Journey</CardTitle>
                <CardDescription>Your story could be someone else's lifeline</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message of Hope</label>
                    <Textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Share what helped you find your way back..."
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name (Optional)</label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="How you'd like to be identified"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="anonymous">Post anonymously</label>
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Your Story</Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                By submitting, you agree that your message may be displayed on the Wall of Hope.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>The mind is a maze with two exits.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tether;
