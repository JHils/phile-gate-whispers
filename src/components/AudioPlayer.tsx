
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AudioPlayerProps {
  src?: string;
  title: string;
  description?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, description }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  
  // Placeholder for when we don't have actual audio file
  const isPlaceholder = !src;
  
  const togglePlaying = () => {
    if (isPlaceholder) {
      toast({
        title: "Audio Coming Soon",
        description: "This audio clip will be available in a future update.",
      });
      return;
    }
    
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
          toast({
            title: "Playback Error",
            description: "Unable to play audio. Please try again.",
            variant: "destructive",
          });
        });
      }
      setPlaying(!playing);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-md border border-gray-700 rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-md font-medium text-dust-orange">{title}</h3>
          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            disabled={isPlaceholder}
          >
            {muted ? (
              <VolumeX className="h-5 w-5 text-gray-400" />
            ) : (
              <Volume2 className="h-5 w-5 text-gray-400" />
            )}
          </Button>
          
          <div className="w-20 hidden sm:block">
            <Slider
              defaultValue={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              disabled={isPlaceholder}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${playing ? 'bg-dust-blue text-white' : 'border-dust-blue text-dust-blue'}`}
          onClick={togglePlaying}
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
        
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            disabled={isPlaceholder}
            className="cursor-pointer"
          />
        </div>
      </div>
      
      {!isPlaceholder && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
          className="hidden"
        />
      )}
      
      {isPlaceholder && (
        <div className="text-center text-xs text-gray-400 italic mt-3">
          Audio clip will be available soon
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
