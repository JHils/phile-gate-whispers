
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <video 
          className="object-cover w-full h-full opacity-60"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/lovable-uploads/78cdb48c-25bd-4f4f-b274-a3d293e99cf2.png"
        >
          <source src="#" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          They say the land remembers. This is where time spirals, not marches.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mt-4 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Listen not just with your ears. The stories live in everything.
        </motion.p>
        
        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <ChevronDown className="animate-bounce w-12 h-12 cursor-pointer text-white/80" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
