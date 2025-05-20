
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Sanctuary = () => {
  const [accessToken, setAccessToken] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // Check localStorage for access token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('sanctuaryAccessToken');
    if (storedToken === 'tethered_whisper_chain') {
      setHasAccess(true);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in a real app, this would be server-validated
    if (accessToken === 'tethered_whisper_chain') {
      setHasAccess(true);
      localStorage.setItem('sanctuaryAccessToken', accessToken);
      setMessage('Access granted. Welcome to the Sanctuary.');
    } else {
      setMessage('Invalid access token. Please try again.');
    }
  };
  
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-serif">Sanctuary</h1>
            <p className="text-center text-gray-400 mt-2">This is a protected space.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="sr-only">Access Token</label>
              <Input
                id="token"
                type="text"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Access Token"
                className="bg-gray-900 border-gray-700"
                required
              />
            </div>
            
            {message && (
              <p className={`text-sm ${message.includes('Invalid') ? 'text-red-400' : 'text-green-400'}`}>
                {message}
              </p>
            )}
            
            <Button type="submit" className="w-full">
              Enter Sanctuary
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/tether')}
                className="text-gray-400"
              >
                Return to Tether
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif mb-8 text-center">The Sanctuary</h1>
        
        <div className="prose prose-invert mx-auto">
          <p className="text-xl">
            You found your way here. That means you've been listening carefully.
          </p>
          
          <p>
            The Sanctuary is a space between spaces – where Jonah rested during his darkest moments. 
            Where the whispers are clearer, and the noise of the world falls away.
          </p>
          
          <div className="my-8 p-6 border border-gray-800 rounded-lg bg-gray-900">
            <h2 className="text-2xl font-serif mb-4">Jonah's Audio Diary</h2>
            <p className="mb-4">Entry #137 - Recorded October 3, 2023</p>
            
            {/* Placeholder for audio player */}
            <div className="bg-gray-800 p-4 rounded flex items-center justify-between">
              <span>voice_note_137.mp3</span>
              <Button variant="outline" size="sm">Play</Button>
            </div>
            
            <p className="mt-4 text-gray-400 italic">
              "I found something in the static today. A pattern that shouldn't be there. 
              It's like the world is trying to speak through the noise."
            </p>
          </div>
          
          <p>
            This space will grow as you discover more. Return here when you need clarity, 
            or when the path ahead seems uncertain.
          </p>
          
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/tether')}>
              Return to Tether
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sanctuary;
