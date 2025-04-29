
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordPromptProps {
  correctPassword: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ correctPassword, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword.toUpperCase()) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        className="bg-phile-dark border border-dust-blue/30 p-6 max-w-md w-full rounded animate-fade-in"
        style={{ 
          boxShadow: "0 0 30px rgba(71, 91, 116, 0.2)",
          backgroundImage: "linear-gradient(to bottom, rgba(25,25,35,0.95), rgba(20,20,30,0.95))" 
        }}
      >
        <h2 className="text-dust-red font-serif mb-4">Password Required</h2>
        <p className="text-phile-light mb-6 text-sm font-typewriter">This gate remains closed to those who don't know the way.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-black/30 border-dust-blue/20 text-phile-light font-typewriter ${error ? 'border-dust-red' : ''}`}
            placeholder="Enter password..."
            autoFocus
          />
          
          <div className="flex justify-between mt-6">
            <Button 
              type="button"
              variant="ghost" 
              onClick={onCancel}
              className="text-silver hover:text-phile-light"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dust-blue/20 hover:bg-dust-blue/40 text-phile-light"
            >
              Enter
            </Button>
          </div>
        </form>
        
        {error && (
          <p className="text-dust-red text-sm mt-4 animate-pulse font-typewriter">Incorrect password. Try again.</p>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-xs text-dust-blue/70 italic font-typewriter">
            "The answer was hidden in plain sight"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
