
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

// Define the location interface
interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  isShifting?: boolean;
  flickerInterval?: number;
  shiftRadius?: number;
}

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const { toast } = useToast();

  // Define Jonah's journey locations
  const locations: Location[] = [
    {
      id: 'horseshoe-bay',
      name: 'Horseshoe Bay',
      description: 'Where Griff and Trigger saved the day by preventing tourists from damaging the reef.',
      coordinates: [146.2868, -19.1187],
      isShifting: false
    },
    {
      id: 'magnetic-island',
      name: 'Magnetic Island',
      description: 'Home to the mysterious Magnetic Tent incident. "Some things in Australia don\'t need explaining. Especially not on Maggie Island."',
      coordinates: [146.8368, -19.1487],
      isShifting: true,
      flickerInterval: 6000,
      shiftRadius: 0.02
    },
    {
      id: 'boat-haven-bay',
      name: 'Boat Haven Bay',
      description: 'Coordinates shift. Next designation always changes. The map never shows the same location twice.',
      coordinates: [146.3068, -19.1287],
      isShifting: true,
      flickerInterval: 4000,
      shiftRadius: 0.05
    },
    {
      id: 'bus-loop-alpha',
      name: 'Bus Loop Alpha',
      description: 'The circuit never breaks. Every destination leads back to where you started.',
      coordinates: [146.8168, -19.2587],
      isShifting: true,
      flickerInterval: 8000,
      shiftRadius: 0.03
    },
    {
      id: 'kuranda',
      name: 'Kuranda',
      description: 'Where whispers blend with rainforest sounds. A place of forgotten memories.',
      coordinates: [145.6380, -16.8202],
      isShifting: false
    },
    {
      id: 'townsville',
      name: 'Townsville',
      description: 'Beginning and end. The gateway to Jonah\'s journey and the point of eventual return.',
      coordinates: [146.8169, -19.2590],
      isShifting: false
    }
  ];

  // Input handler for Mapbox token
  const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  // Initialize map
  const initializeMap = () => {
    if (!mapboxToken || mapboxToken.trim() === '') {
      setMapError('Please enter a valid Mapbox token');
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;
      
      if (map.current || !mapContainer.current) return;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [146.5, -19.3], // Central position for Queensland area
        zoom: 9,
        projection: { name: 'globe' as 'globe' }, // Fixed: Using correct type for projection
        pitch: 45,
      });

      map.current.on('load', () => {
        // Add fog effect
        map.current?.setFog({
          color: 'rgb(186, 210, 235)', // light blue
          'high-color': 'rgb(36, 92, 223)', // light blue
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });
        
        setIsLoading(false);
        addMarkers();
        
        // Notify user
        toast({
          title: "Map Initialized",
          description: "The interactive map has been loaded. Some locations will shift over time.",
        });

        // Start gentle globe rotation (subtle effect)
        startGentleRotation();
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      // Handle errors
      map.current.on('error', () => {
        setMapError('Error loading map. Please check your Mapbox token.');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map. Please check console for details.');
      setIsLoading(false);
    }
  };

  // Add markers for all locations
  const addMarkers = () => {
    if (!map.current) return;

    locations.forEach(location => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = `marker-element ${location.isShifting ? 'shifting' : ''}`;
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.background = location.isShifting ? 
        'radial-gradient(circle, rgba(255,190,11,0.8) 0%, rgba(251,86,7,0.8) 100%)' : 
        'radial-gradient(circle, rgba(58,180,152,0.8) 0%, rgba(29,110,253,0.8) 100%)';
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      markerEl.style.cursor = 'pointer';
      
      // Add pulse animation for shifting locations
      if (location.isShifting) {
        markerEl.style.animation = 'pulse 2s infinite';
      }

      // Create and save marker reference
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .addTo(map.current);
      
      // Add click event
      markerEl.addEventListener('click', () => {
        setSelectedLocation(location);
        
        // Fly to location with a slight offset for better viewing
        map.current?.flyTo({
          center: [
            location.coordinates[0] + 0.05,
            location.coordinates[1]
          ],
          essential: true,
          zoom: 12,
          duration: 2000
        });
      });
      
      markersRef.current[location.id] = marker;
    });
  };

  // Start shifting locations that should move
  useEffect(() => {
    if (!map.current || isLoading) return;
    
    const shiftIntervals: Record<string, NodeJS.Timeout> = {};
    
    locations.filter(loc => loc.isShifting).forEach(location => {
      const interval = setInterval(() => {
        if (!markersRef.current[location.id]) return;
        
        // Get random position within radius
        const radius = location.shiftRadius || 0.02;
        const angle = Math.random() * Math.PI * 2;
        const shiftX = radius * Math.cos(angle);
        const shiftY = radius * Math.sin(angle);
        
        // New coordinates with random shift
        const newCoords: [number, number] = [
          location.coordinates[0] + shiftX,
          location.coordinates[1] + shiftY
        ];
        
        // Animate marker to new position
        markersRef.current[location.id].setLngLat(newCoords);
        
        // Briefly add glitch effect to marker
        const markerEl = markersRef.current[location.id].getElement();
        markerEl.classList.add('glitching');
        setTimeout(() => {
          markerEl.classList.remove('glitching');
        }, 500);
        
      }, location.flickerInterval || 5000);
      
      shiftIntervals[location.id] = interval;
    });
    
    return () => {
      // Clean up intervals
      Object.values(shiftIntervals).forEach(interval => clearInterval(interval));
    };
  }, [isLoading, locations]);

  // Start gentle map rotation
  const startGentleRotation = () => {
    if (!map.current) return;
    
    const rotationSpeed = 0.05; // degrees per frame
    let userInteracting = false;
    
    // Stop rotation when user interacts
    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('touchstart', () => { userInteracting = true; });
    
    // Resume rotation after interaction ends (with delay)
    map.current.on('mouseup', () => {
      setTimeout(() => { userInteracting = false; }, 3000);
    });
    map.current.on('touchend', () => {
      setTimeout(() => { userInteracting = false; }, 3000);
    });
    
    // Rotation animation
    const rotate = () => {
      if (!map.current) return;
      
      if (!userInteracting) {
        const currentCenter = map.current.getCenter();
        currentCenter.lng += rotationSpeed;
        map.current.setCenter(currentCenter);
      }
      
      requestAnimationFrame(rotate);
    };
    
    rotate();
  };

  // Add CSS for marker animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      
      .glitching {
        position: relative;
        animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both !important;
      }
      
      @keyframes glitch {
        0% { transform: translate(0); filter: hue-rotate(0deg); }
        10% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        20% { transform: translate(2px, -2px); filter: hue-rotate(180deg); }
        30% { transform: translate(-2px, -2px); filter: hue-rotate(270deg); }
        40% { transform: translate(2px, 2px); filter: hue-rotate(360deg); }
        50% { transform: translate(0); filter: hue-rotate(0deg); }
        100% { transform: translate(0); filter: hue-rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-serif text-dust-orange mb-2">Jonah's Journey Map</h1>
        <p className="text-dust-blue opacity-80 italic">
          "The map never shows the same location twice. Some points shift, some flicker, some remain."
        </p>
        
        {!map.current && (
          <div className="mb-8 p-4 bg-black/20 backdrop-blur-sm rounded-lg max-w-md">
            <h3 className="text-lg font-medium mb-2">Enter Mapbox Token</h3>
            <p className="text-sm text-gray-300 mb-4">
              To view the interactive map, please enter your Mapbox public token.
              You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="underline text-dust-blue">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={mapboxToken}
                onChange={handleTokenInput}
                placeholder="pk.eyJ1..."
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dust-blue"
              />
              <Button onClick={initializeMap} className="bg-dust-blue hover:bg-opacity-80">
                Load Map
              </Button>
            </div>
            {mapError && <p className="mt-2 text-red-400 text-sm">{mapError}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 w-full h-[60vh] rounded-lg overflow-hidden relative">
            {/* Map container */}
            <div 
              ref={mapContainer} 
              className="w-full h-full rounded-lg"
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            />
            
            {/* Loading state */}
            {isLoading && map.current && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-lg">
                <Skeleton className="h-8 w-48 mb-4 bg-gray-700" />
                <Skeleton className="h-4 w-64 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
            )}
            
            {/* Map overlay effects */}
            <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs text-white/70 backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
              Coordinates shift with time. Reality is fluid.
            </div>
          </div>
          
          {/* Location info panel */}
          <Card className="bg-black/40 backdrop-blur-md border-gray-700 text-gray-200 h-[60vh] flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-serif">Locations</h2>
              <p className="text-sm text-gray-400">Click on map markers to view details</p>
            </div>
            
            {selectedLocation ? (
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium text-dust-orange">{selectedLocation.name}</h3>
                <div className="text-sm opacity-70 mb-1">
                  {selectedLocation.isShifting ? 'Shifting Location' : 'Static Location'}
                </div>
                <p className="mt-2 text-sm flex-1">{selectedLocation.description}</p>
                <div className="mt-2 text-xs text-dust-blue">
                  Approx. coordinates: {selectedLocation.coordinates[1].toFixed(4)}, {selectedLocation.coordinates[0].toFixed(4)}
                  {selectedLocation.isShifting && ' (shifting)'}
                </div>
              </div>
            ) : (
              <div className="p-4 flex-1 flex items-center justify-center text-center text-gray-500">
                <div>
                  <p>Select a location marker on the map</p>
                  <p className="mt-2 text-sm">Shifting locations will move periodically</p>
                </div>
              </div>
            )}
            
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 py-4">
                {locations.map(loc => (
                  <div 
                    key={loc.id}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedLocation?.id === loc.id 
                        ? 'bg-dust-blue/20 border-l-2 border-dust-blue' 
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => {
                      setSelectedLocation(loc);
                      // Fly to location if map exists
                      if (map.current && markersRef.current[loc.id]) {
                        const marker = markersRef.current[loc.id];
                        const position = marker.getLngLat();
                        map.current.flyTo({
                          center: [position.lng + 0.05, position.lat],
                          zoom: 12,
                          duration: 2000
                        });
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-3 h-3 rounded-full mr-2 ${
                          loc.isShifting 
                            ? 'bg-yellow-500 animate-pulse' 
                            : 'bg-teal-500'
                        }`}
                      />
                      <span>{loc.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
        
        <div className="text-sm text-gray-400 mt-6">
          <p>The map glitches and coordinates shift. What was once stable is now in flux.</p>
          <p className="mt-1 italic text-dust-blue">"You were never alone in that hostel hallway. The coin spun for three days before stopping." - WhisperLog</p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
