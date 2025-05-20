import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Book, Map, Quote, Info, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Hidden ARG components
import HiddenLink from '@/components/HiddenLink';
import EasterEgg from '@/components/EasterEgg';

// PDF Generator
import DreamtimeStoryPDF from '@/components/lore/DreamtimeStoryPDF';

const Lore = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [showMidnightMessage, setShowMidnightMessage] = useState(false);
  const [showIdleMessage, setShowIdleMessage] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Check if it's midnight
  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() < 30) {
      setShowMidnightMessage(true);
    }
    
    // Reset idle timer on user interaction
    const resetIdleTimer = () => setIdleTime(0);
    
    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    
    // Increment idle time every second
    const idleInterval = setInterval(() => {
      setIdleTime(prevTime => {
        // If on story section and idle for 3+ minutes, show ARG message
        if (prevTime >= 180 && window.scrollY > window.innerHeight) {
          setShowIdleMessage(true);
        }
        return prevTime + 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(idleInterval);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, []);
  
  // Story data
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
  
  // Culture and law data
  const cultureCategories = [
    {
      title: "Kinship & Skin Names",
      content: "The Aboriginal kinship system establishes how people relate to each other and their roles, responsibilities, and obligations in relation to one another, ceremonial business, and land. Skin names are a component of this system that identifies a person's bloodline and dictates marriage laws and ceremonial relationships."
    },
    {
      title: "Connection to Country",
      content: "Connection to Country is an integral part of Aboriginal culture. It encompasses the relationship between people and their traditional lands and waters. It includes caring for the land, plants, and animals that inhabit it. This connection is spiritual, physical, social, and cultural."
    },
    {
      title: "Ceremony & Songlines",
      content: "Ceremonies are performed to mark significant events, to pass on knowledge, and to strengthen connections between people and their Dreaming. Songlines are ancient paths across the land that describe the route followed by creator-beings during the Dreaming. They connect sacred sites and are used for navigation."
    },
    {
      title: "The Dreaming (Tjukurpa)",
      content: "The Dreaming, also known as the Dreamtime or Tjukurpa in some languages, refers to the time when ancestral spirits created the land and all living things. It's not merely a historical time but exists always, forming the spiritual foundation of Aboriginal life and society."
    }
  ];
  
  // Quote data
  const quotes = [
    {
      text: "We are all visitors to this time, this place. We are just passing through. Our purpose here is to observe, to learn, to grow, to love... and then we return home.",
      author: "Aboriginal proverb"
    },
    {
      text: "The land owns us. We belong to her. When the land is ill, we become ill; when the land thrives, we thrive.",
      author: "Elder Uncle Max Dulumunmun Harrison"
    },
    {
      text: "If you stay in your Country, your Country will look after you.",
      author: "Galarrwuy Yunupingu"
    },
    {
      text: "To understand our Law, you must learn to see through our eyes. The land is the Law.",
      author: "Traditional saying"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
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
      
      {/* Dreamtime Story Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <Book className="text-amber-500 w-8 h-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-serif">Dreamtime Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {dreamtimeStories.map((story, index) => (
              <motion.div 
                key={index}
                className="relative bg-gray-800/50 rounded-lg overflow-hidden hover-scale"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="h-48 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-amber-400 mb-3">{story.title}</h3>
                  <p className="text-gray-300 whitespace-pre-line">{story.description}</p>
                  <div className="mt-4">
                    <audio controls className="w-full">
                      <source src={story.audioSrc} type="audio/mpeg" />
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
      
      {/* Culture & Law Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <Star className="text-amber-500 w-8 h-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-serif">Law is Story. Story is Land.</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            {cultureCategories.map((category, index) => (
              <AccordionItem 
                key={index} 
                value={`category-${index}`} 
                className="mb-4 border border-gray-700/50 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/30 transition-colors text-lg font-serif">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/20">
                  <div className="dot-pattern-bg p-4">
                    <p className="text-gray-300">{category.content}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Interactive Map */}
      <section className="py-20 bg-gradient-to-t from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <Map className="text-amber-500 w-8 h-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-serif">First Nations Map</h2>
          </div>
          
          <div className="relative w-full h-[60vh] bg-gray-800/30 rounded-xl overflow-hidden" ref={mapRef}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <p>Interactive map of Aboriginal nations loading...</p>
            </div>
            
            {/* Pleiades Easter Egg */}
            <EasterEgg>
              <div className="absolute top-[25%] right-[30%] cursor-pointer group">
                <div className="relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute -top-2 right-1"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute -top-1 right-3"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute top-1 right-4"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute top-2 right-2"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute top-3 right-0"></div>
                  
                  <HiddenLink 
                    to="/lost-sisters" 
                    className="hidden group-hover:block absolute -top-10 text-xs text-white/20 w-20"
                  >
                    seven sisters
                  </HiddenLink>
                </div>
              </div>
            </EasterEgg>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Hover over regions to discover Nation names. Click for stories and information.</p>
          </div>
        </div>
      </section>
      
      {/* Quote Carousel */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12 justify-center">
            <Quote className="text-amber-500 w-8 h-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-serif">Words of Wisdom</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {quotes.map((quote, index) => (
                  <CarouselItem key={index} className="md:basis-4/5">
                    <div className="p-6 bg-black/50 rounded-lg border border-gray-800">
                      <blockquote className="font-serif text-xl italic">
                        "{quote.text}"
                      </blockquote>
                      <p className="mt-4 text-right text-amber-400">— {quote.author}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8">
            <Info className="text-amber-500 w-8 h-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-serif">Learn. Support. Respect.</h2>
          </div>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            This is not history. This is living law.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mobile-flex-wrap">
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
              asChild
            >
              <a href="https://www.firstnations.org.au/" target="_blank" rel="noopener noreferrer">
                Support Aboriginal Arts
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
              asChild
            >
              <a href="https://aiatsis.gov.au" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
            
            <DreamtimeStoryPDF>
              <Button 
                variant="outline" 
                size="lg"
                className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Starter Pack PDF
              </Button>
            </DreamtimeStoryPDF>
          </div>
        </div>
      </section>
      
      {/* Midnight ARG Trigger */}
      {showMidnightMessage && (
        <div className="fixed bottom-10 left-10 text-amber-300/30 font-mono text-sm animate-pulse">
          <p>// The ancestors don't sleep. Why do you?</p>
        </div>
      )}
    </div>
  );
};

export default Lore;
