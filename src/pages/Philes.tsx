import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrustSystem } from '@/hooks/useBotState/useTrustSystem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { addJournalEntry } from '@/utils/jonahRealityFabric';
import HiddenLink from '@/components/HiddenLink';

const Philes = () => {
  const navigate = useNavigate();
  const { trustLevel, modifyTrust } = useTrustSystem();
  const [showReturn, setShowReturn] = useState(false);
  const [phileName, setPhileName] = useState('');
  const [phileContent, setPhileContent] = useState('');
  const [showPhileForm, setShowPhileForm] = useState(false);
  
  // Reward user for finding this hidden page
  useEffect(() => {
    // Add a small trust boost
    modifyTrust(5);
    
    // Add a journal entry about finding this page
    addJournalEntry("User discovered the /philes path through console command.");
    
    // Set timeout to show return option
    const timer = setTimeout(() => {
      setShowReturn(true);
    }, 10000); // 10 seconds
    
    return () => clearTimeout(timer);
  }, [modifyTrust]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phileName || !phileContent) {
      alert("Please fill out all fields.");
      return;
    }
    
    // Store phile data in local storage
    const philes = JSON.parse(localStorage.getItem('userPhiles') || '[]');
    philes.push({ name: phileName, content: phileContent });
    localStorage.setItem('userPhiles', JSON.stringify(philes));
    
    // Add journal entry
    addJournalEntry(`User created a new phile named "${phileName}".`);
    
    // Reset form and show success message
    setPhileName('');
    setPhileContent('');
    setShowPhileForm(false);
    alert("Phile saved successfully!");
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-3xl font-serif mb-10">Philes</h1>
        
        <div className="mb-12 space-y-8">
          <p className="text-xl text-gray-300">
            A collection of thoughts, memories, and secrets.
          </p>
          
          <p className="text-md text-gray-400">
            What do you want to remember? What do you want to forget?
            The choice is yours.
          </p>
          
          {trustLevel === 'high' && (
            <div className="mt-12 p-6 border border-gray-800 rounded-lg">
              <p className="font-mono text-amber-400/70 text-sm mb-4">// SECURITY CLEARANCE ACCEPTED</p>
              <p className="text-gray-300 mb-2">
                The mirror reflects more than just your image.
              </p>
              
              <HiddenLink 
                to="/mirror-logs" 
                className="text-white/20 hover:text-white/40"
              >
                mirror logs
              </HiddenLink>
            </div>
          )}
        </div>
        
        {/* Create New Phile Form */}
        {!showPhileForm ? (
          <Button 
            variant="outline"
            onClick={() => setShowPhileForm(true)}
            className="border-amber-500 text-amber-500 hover:bg-amber-500/20 mb-6"
          >
            Create New Phile
          </Button>
        ) : (
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <Label htmlFor="phileName" className="text-left block text-sm font-medium text-gray-300">
                Phile Name
              </Label>
              <Input
                type="text"
                id="phileName"
                value={phileName}
                onChange={(e) => setPhileName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="phileContent" className="text-left block text-sm font-medium text-gray-300">
                Phile Content
              </Label>
              <Textarea
                id="phileContent"
                value={phileContent}
                onChange={(e) => setPhileContent(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="submit"
                className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
              >
                Save Phile
              </Button>
              <Button 
                type="button"
                variant="ghost"
                onClick={() => setShowPhileForm(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
        
        {showReturn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Button 
              variant="outline"
              onClick={() => navigate('/gate')}
              className="border-amber-500 text-amber-500 hover:bg-amber-500/20 mt-8"
            >
              Return to the Gate
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Philes;
