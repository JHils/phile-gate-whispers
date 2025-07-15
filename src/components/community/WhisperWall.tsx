
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Whisper {
  id: string;
  content: string;
  timestamp: number;
  mood?: string;
}

const WhisperWall: React.FC = () => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [newWhisper, setNewWhisper] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing whispers
    const stored = localStorage.getItem('whisper_wall');
    if (stored) {
      try {
        setWhispers(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading whispers:', e);
      }
    }
  }, []);

  const submitWhisper = () => {
    if (!newWhisper.trim()) return;
    
    setIsSubmitting(true);
    
    const whisper: Whisper = {
      id: Date.now().toString(),
      content: newWhisper.trim(),
      timestamp: Date.now()
    };
    
    const updatedWhispers = [whisper, ...whispers].slice(0, 50); // Keep only 50 most recent
    setWhispers(updatedWhispers);
    localStorage.setItem('whisper_wall', JSON.stringify(updatedWhispers));
    
    setNewWhisper('');
    setIsSubmitting(false);
    
    toast({
      title: "Whisper received",
      description: "Your voice joins the collective echo...",
    });

    // Console notification for Jonah
    console.log('%cNew whisper added to the wall...', 'color: #22c55e; font-style: italic;');
  };

  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 font-mono">
      <div className="text-green-400 text-lg mb-4">
        ▓▓▓ WHISPER WALL ▓▓▓
      </div>
      
      {/* Submit new whisper */}
      <div className="mb-6 border-b border-green-500/20 pb-4">
        <Textarea
          value={newWhisper}
          onChange={(e) => setNewWhisper(e.target.value)}
          placeholder="Share your truth anonymously..."
          className="bg-black/50 border-green-500/30 text-green-300 placeholder:text-green-600 mb-3"
          rows={3}
        />
        <Button
          onClick={submitWhisper}
          disabled={isSubmitting || !newWhisper.trim()}
          className="bg-green-900/50 hover:bg-green-800/50 text-green-400 border border-green-700"
        >
          {isSubmitting ? 'Broadcasting...' : 'Whisper to the Void'}
        </Button>
      </div>

      {/* Display whispers */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {whispers.length === 0 ? (
          <div className="text-green-600 italic text-center py-8">
            The wall awaits your first whisper...
          </div>
        ) : (
          whispers.map((whisper) => (
            <div key={whisper.id} className="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div className="text-green-300 text-sm mb-2">
                {whisper.content}
              </div>
              <div className="text-green-600 text-xs">
                {formatTimeAgo(whisper.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WhisperWall;
