
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
      <div className="bg-phile-dark border border-dust-blue/30 p-6 max-w-md w-full rounded animate-fade-in">
        <h2 className="text-dust-red font-typewriter mb-4">Password Required</h2>
        <p className="text-phile-light mb-4 text-sm">This gate remains closed to those who don't know the way.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-black/30 border-dust-blue/20 text-phile-light ${error ? 'border-dust-red' : ''}`}
            placeholder="Enter password..."
            autoFocus
          />
          
          <div className="flex justify-between">
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
          <p className="text-dust-red text-sm mt-4 animate-pulse">Incorrect password. Try again.</p>
        )}
      </div>
    </div>
  );
};

export default PasswordPrompt;
