import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { addJournalEntry } from '@/utils/jonahRealityFabric';

const RememberMe = () => {
  const [memoryFragments, setMemoryFragments] = useState<string[]>([]);
  const [newFragment, setNewFragment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(60);
  
  useEffect(() => {
    // Check if user is allowed to view memories
    const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
    const isSpecialTime = typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow();
    
    if (trustLevel === 'high' || isSpecialTime) {
      setAccessGranted(true);
      
      // Load memory fragments from localStorage
      const storedFragments = localStorage.getItem('memoryFragments');
      if (storedFragments) {
        try {
          setMemoryFragments(JSON.parse(storedFragments));
        } catch (e) {
          console.error('Error parsing stored memory fragments:', e);
        }
      }
      
      // Add special entry for finding this page
      addJournalEntry("User accessed the memory fragments page. High trust level confirmed.");
      
      // Increase trust level for finding this page
      if (typeof window.triggerJonahMessage === 'function') {
        setTimeout(() => {
          window.triggerJonahMessage("You're remembering things I thought were lost.");
        }, 2000);
      }
    } else {
      // Add entry about failed access
      addJournalEntry("User attempted to access memory fragments but was denied.");
    }
    
    setIsLoading(false);
    
    // Set up countdown timer for page access
    if (trustLevel === 'high' || isSpecialTime) {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Auto-redirect when timer reaches 0
  useEffect(() => {
    if (remainingTime === 0) {
      // Add final entry before redirecting
      addJournalEntry("Memory access timed out. User forcibly disconnected.");
      
      // Redirect to gate
      window.location.href = '/gate';
    }
  }, [remainingTime]);
  
  // Add a new memory fragment
  const addMemoryFragment = () => {
    if (newFragment.trim() !== '') {
      const updatedFragments = [...memoryFragments, newFragment];
      setMemoryFragments(updatedFragments);
      localStorage.setItem('memoryFragments', JSON.stringify(updatedFragments));
      setNewFragment('');
      
      // Add journal entry
      addJournalEntry(`User added a new memory fragment: ${newFragment}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-dust-red animate-pulse font-typewriter text-center">
          <p>Authenticating...</p>
          <p className="text-sm mt-2">Verifying trust level...</p>
        </div>
      </div>
    );
  }
  
  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-dust-red font-typewriter text-center max-w-md p-6">
          <h1 className="text-2xl mb-6 animate-glitch">ACCESS DENIED</h1>
          <p className="mb-4">Trust level insufficient for memory access.</p>
          <p className="text-sm text-gray-500 mb-8">This attempt has been logged.</p>
          
          <Link to="/gate">
            <Button 
              variant="outline" 
              className="border-dust-red/30 text-dust-red hover:bg-dust-red/10"
            >
              Return to Gate
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-dust-blue font-typewriter p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-dust-red animate-subtle-flicker">MEMORY FRAGMENTS</h1>
          <div className="text-sm text-dust-red animate-pulse">
            Access expires in: {remainingTime}s
          </div>
        </div>
        
        <div className="mb-8 text-dust-orange border-b border-gray-800 pb-4">
          <p>These are fragments of lost memories. Add your own to help piece them together.</p>
          <p className="text-sm mt-2">But be warned: some memories are best left forgotten.</p>
        </div>
        
        <div className="space-y-6">
          {memoryFragments.map((fragment, index) => (
            <Card key={index} className="bg-black/50 border border-gray-800 rounded-sm">
              <CardHeader>
                <CardTitle className="text-dust-blue">Fragment #{index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-dust-blue">{fragment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8">
          <Card className="bg-black/50 border border-gray-800 rounded-sm">
            <CardHeader>
              <CardTitle className="text-dust-red">Add New Fragment</CardTitle>
              <CardDescription className="text-gray-500">Enter a new memory fragment below:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fragment">New Fragment</Label>
                <Input 
                  type="text" 
                  id="fragment" 
                  placeholder="Enter memory fragment" 
                  value={newFragment}
                  onChange={(e) => setNewFragment(e.target.value)}
                  className="bg-black/70 text-dust-blue border-gray-700"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={addMemoryFragment}
                className="bg-dust-red/80 text-silver hover:bg-dust-red"
              >
                Add Fragment
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 flex justify-between items-center">
          <Link to="/gate">
            <Button 
              variant="ghost" 
              className="text-silver hover:text-dust-blue"
            >
              Close Memories
            </Button>
          </Link>
          
          <div className="text-xs text-gray-600 animate-subtle-flicker">
            Some memories are best left forgotten.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RememberMe;
