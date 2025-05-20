
import React from 'react';
import { Quote } from 'lucide-react';

export const UberHeroBanner = () => {
  return (
    <div className="relative w-full bg-cover bg-center" style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/uber-bg.jpg')",
      minHeight: "400px",
    }}>
      {/* Fallback for background image not loading */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[400px] px-4 py-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4 text-center">
          According to an Uber Driver
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-8">
          A sacred archive of overheard Uber mythology.
          Some of it's true. Some of it's nonsense. All of it's suspicious.
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <hr className="w-12 md:w-24 border-t-2 border-dust-red" />
          <p className="mx-4 text-dust-red italic">Witness #004</p>
          <hr className="w-12 md:w-24 border-t-2 border-dust-red" />
        </div>
        
        <div className="max-w-3xl bg-black bg-opacity-60 p-6 md:p-8 rounded-lg border border-gray-800">
          <Quote className="text-dust-red h-8 w-8 mb-4" />
          <p className="font-mono text-xl md:text-2xl italic leading-relaxed">
            "There's only one real koala left. The rest are government drones."
          </p>
          <p className="text-right mt-2 text-gray-400">
            (According to an Uber Driver)
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
};
