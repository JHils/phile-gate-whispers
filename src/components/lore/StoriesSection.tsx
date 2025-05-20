
import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import HiddenLink from '@/components/HiddenLink';
import EasterEgg from '@/components/EasterEgg';

interface StoryProps {
  title: string;
  description: string;
  audioSrc: string;
  image: string;
  index: number;
}

const Story: React.FC<StoryProps> = ({ title, description, audioSrc, image, index }) => {
  return (
    <motion.div 
      key={index}
      className="relative bg-gray-800/50 rounded-lg overflow-hidden hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif text-amber-400 mb-3">{title}</h3>
        <p className="text-gray-300 whitespace-pre-line">{description}</p>
        <div className="mt-4">
          <audio controls className="w-full">
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      {index === 1 && (
        <EasterEgg>
          <div className="absolute top-2 right-2 animate-pulse">
            <div className="hidden group-hover:block">
              <HiddenLink to="/lost-sisters" className="text-xs text-white/20">
                seek the sisters
              </HiddenLink>
            </div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </EasterEgg>
      )}
    </motion.div>
  );
};

interface StoriesSectionProps {
  showIdleMessage: boolean;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ showIdleMessage }) => {
  const dreamtimeStories = [
    {
      title: "The Rainbow Serpent",
      description: "She carved the rivers with her belly. She painted the sky with lightning. And when she opened her mouth, the rain remembered where to fall.\n— A story of creation, water, and consequence.",
      audioSrc: "/audio/stories/rainbow-serpent.mp3",
      image: "/lovable-uploads/3782590e-764f-4030-909d-2d1982a726d9.png"
    },
    {
      title: "The Seven Sisters",
      description: "They fled across the sky, their footprints becoming stars. The hunter follows still, in that endless dance we see each night.\n— A story of escape, persistence, and the birth of the Pleiades.",
      audioSrc: "/audio/stories/seven-sisters.mp3",
      image: "/lovable-uploads/5120efce-7049-4a83-94af-be9174fb797f.png"
    },
    {
      title: "The First Fire",
      description: "The hawk guarded it jealously. But the clever bats stole embers and dropped them into the waiting desert, teaching us to warm our hands in winter.\n— A story of generosity, survival, and shared wisdom.",
      audioSrc: "/audio/stories/first-fire.mp3",
      image: "/lovable-uploads/75a53784-f00a-48d5-8f44-79f4d651eea0.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-16">
          <Book className="text-amber-500 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-serif">Dreamtime Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {dreamtimeStories.map((story, index) => (
            <Story 
              key={index}
              index={index} 
              title={story.title}
              description={story.description}
              audioSrc={story.audioSrc}
              image={story.image}
            />
          ))}
        </div>
        
        {showIdleMessage && (
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
        )}
      </div>
    </section>
  );
};

export default StoriesSection;
