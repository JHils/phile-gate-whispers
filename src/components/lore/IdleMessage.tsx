
import React from 'react';
import { motion } from 'framer-motion';
import HiddenLink from '@/components/HiddenLink';

interface IdleMessageProps {
  showIdleMessage: boolean;
}

const IdleMessage: React.FC<IdleMessageProps> = ({ showIdleMessage }) => {
  if (!showIdleMessage) return null;
  
  return (
    <motion.div 
      className="mt-16 text-center text-amber-300/70 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <p>// You listened. So here's the path.</p>
      <HiddenLink to="/remember-me" className="text-amber-300/30 hover:text-amber-300/60">
        remember me
      </HiddenLink>
    </motion.div>
  );
};

export default IdleMessage;
