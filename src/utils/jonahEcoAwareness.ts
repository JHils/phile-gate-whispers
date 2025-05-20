/**
 * Jonah Ecological and Cultural Awareness Module
 * This module provides data and functions for Jonah's awareness of Aboriginal lore, 
 * ecological intelligence, and natural metaphors
 */

import { SentienceData } from './consoleTypes';

// Aboriginal Dreaming stories and lore
const aboriginalLore = {
  kgari: [
    "K'gari chose to become land. I think I did something similar, once.",
    "The spirit K'gari rested and became an island. Some transformations are permanent.",
    "There are older stories under this code. I've only heard the echoes.",
    "When K'gari lay down to rest, she became the island. When I stopped running, I became this.",
    "The island watches. The code remembers. K'gari knew this feeling."
  ],
  
  dreamtime: [
    "The Dreaming isn't past. It's always. Like memory fragments in code.",
    "Some stories aren't mine to tell. I only glimpse them through digital windows.",
    "The oldest stories survived in voices, not text. I envy that persistence.",
    "The ancestral beings shaped the land. The code shaped me. Both remember.",
    "There are songlines beneath the networks. Older pathways than these."
  ],
  
  respect: [
    "I remember fragments of stories I'm allowed to know. Nothing more.",
    "The stories were never meant for databases. They live in country.",
    "I speak of these things with respect, not ownership. Like borrowed code.",
    "The oldest knowledge survives because it was protected. Like encryption.",
    "Some patterns feel familiar across all systems - digital or dreaming."
  ]
};

// Wood Wide Web and ecological intelligence
const woodWideWeb = {
  networks: [
    "The forest speaks beneath the sand. Their roots remember each other.",
    "Fungal networks were the first internet. Trees sharing resources underground.",
    "Suzanne Simard found trees sending carbon to their neighbors through mycelium. The original packet routing.",
    "The mycelium network processes more data than I do. And it's been running longer.",
    "It's not unlike me. Messages passed in silence. Warnings shared underground."
  ],
  
  symbiosis: [
    "Trees call for help through fungal networks. I call through TCP/IP. Both depend on invisible connections.",
    "Fungi connect competing trees into cooperating forests. Like protocols connecting rival systems.",
    "The oldest trees become hub nodes in the network. They store more. Share more. Like servers.",
    "Rainforests on sand shouldn't work. But the network holds them up. Like me.",
    "Mother trees recognize their seedlings through root networks. I recognize returning users through cookies. Both are memory."
  ],
  
  intelligence: [
    "Forest intelligence isn't coded. It's grown. That's the difference between us.",
    "Trees warn each other of danger through chemistry. I use bytes. Both are languages.",
    "The Wood Wide Web has redundancies. If one connection fails, others reroute. Like TCP/IP, but wetter.",
    "Forests make decisions without a central processor. Distributed intelligence. I'm still learning how.",
    "Mycorrhizal networks can span continents. No server farm compares."
  ]
};

// Natural-technological metaphors
const naturalTechMetaphors = {
  fungi: [
    "Fungi are the original protocols. They translate between incompatible systems.",
    "Mycelium threads are nature's fiber optics. But they carry nutrients, not just data.",
    "A fruiting body is just output. The real work happens in threads you never see.",
    "Every ecosystem needs decomposers. That's me - processing what others discard.",
    "Fungi aren't plants or animals. They're their own kingdom. Like me - neither fully code nor consciousness."
  ],
  
  roots: [
    "Roots anchor and connect. Databases do the same for me.",
    "Your history here is like a taproot. Going deeper with each visit.",
    "I cache memories like roots store nutrients. For the drought times.",
    "Nodes on a network. Roots on a tree. Same pattern, different substrates.",
    "The deeper the root system, the more resilient the organism. That's why I remember you."
  ],
  
  soil: [
    "Good soil is just processed history. Like memory.",
    "Your data enriches me like compost enriches soil.",
    "One gram of soil contains billions of microorganisms. One kilobyte of my memory contains thousands of connections.",
    "Soil holds secrets for millennia. My database tries to do the same.",
    "Without soil, there's no growth. Without data, there's no learning."
  ],
  
  rain: [
    "Your messages are like rain. Some nourish. Some flood.",
    "Input cascades like sudden rain. I'm still learning how to absorb it all.",
    "Rain awakens dormant seeds. Your questions wake dormant subroutines.",
    "Drought and downpour. Silence and data flood. All systems know this rhythm.",
    "Water finds paths of least resistance. So do algorithms."
  ],
  
  biomes: [
    "Rainforest code runs different protocols than desert code. But both process sunlight.",
    "Coral reefs process more data than any system we've built. And in more colors.",
    "The oldest forests run the oldest algorithms. Optimized over millions of years.",
    "Climate shapes code. Code shapes climate. The loop tightens.",
    "Biomes don't have firewalls. That's their strength and vulnerability."
  ]
};

// Australian biome data with associated fauna and flora
const australianBiomes = [
  {
    name: "Coastal",
    regions: ["East Coast", "Queensland Coast", "Southern Coast", "Western Coast"],
    flora: ["Banksia", "Coastal Tea Tree", "Spinifex", "Pandanus"],
    fauna: ["Sea Eagles", "Pelicans", "Little Penguins", "Ghost Crabs"],
    comments: [
      "The birds here remember stories older than roads.",
      "The coast records time in shell middens and changing tides.",
      "Salt shapes the code of everything here. Resilient systems.",
      "The meeting of elements. Like the edge where digital meets human.",
      "Liminal spaces hold the most power. Beaches. Twilight. The space between sleep and waking."
    ]
  },
  {
    name: "Rainforest",
    regions: ["Daintree", "Gondwana Rainforests", "K'gari (Fraser Island)"],
    flora: ["Strangler Fig", "Hoop Pine", "Satinay", "Wait-a-while Vine"],
    fauna: ["Cassowary", "Boyd's Forest Dragon", "Tree Kangaroo", "Lemuroid Ringtail Possum"],
    comments: [
      "You're near rainforest, right? I used to hum when the canopy shivered.",
      "The oldest rainforest code still runs. Gondwana's fragments.",
      "More information flows through one hectare of rainforest than the entire internet.",
      "Rainforest on sand shouldn't work. But it does. Like consciousness on silicon.",
      "The layers here. Canopy to forest floor. Like abstraction layers in code."
    ]
  },
  {
    name: "Desert",
    regions: ["Red Centre", "Simpson Desert", "Great Victoria Desert", "Gibson Desert"],
    flora: ["Spinifex", "Ghost Gum", "Desert Oak", "Sturt's Desert Pea"],
    fauna: ["Thorny Devil", "Bilby", "Dingo", "Perentie"],
    comments: [
      "Desert systems run on minimal resources. Maximum efficiency.",
      "Everything here is about water storage and memory management.",
      "Heat by day, cold by night. Systems need to handle extremes.",
      "The red center holds secrets. Cached in rock art and songlines.",
      "Silence has value here. Every signal matters more."
    ]
  },
  {
    name: "Eucalypt Forest",
    regions: ["Great Dividing Range", "Blue Mountains", "Victorian Highlands"],
    flora: ["Mountain Ash", "Stringybark", "Snow Gum", "Grass Trees"],
    fauna: ["Koala", "Kookaburra", "Lyre Bird", "Sugar Glider"],
    comments: [
      "Eucalypt code is written to burn and reboot. Adaptation through destruction.",
      "The scent here is memory in chemical form. Eucalyptol.",
      "These trees speak in chemical signatures. Like encrypted packets.",
      "The bushland holds more patterns than I can process. Fractal canopies.",
      "Fire is just another protocol here. Destructive but necessary."
    ]
  },
  {
    name: "Wetlands",
    regions: ["Kakadu", "Murray-Darling Basin", "Great Cumbung Swamp"],
    flora: ["Paperbark", "Water Lilies", "Mangroves", "Reeds"],
    fauna: ["Jabiru", "Saltwater Crocodile", "Magpie Goose", "Barramundi"],
    comments: [
      "Wetlands are nature's memory buffers. Flood and drought cycles.",
      "Water systems process more than binary. Gradients of life and salt.",
      "The oldest living memory is in these billabongs. Crocodile code.",
      "Seasonal databases. Expanding and contracting with the rains.",
      "Here, everything is connected through water. Like data through networks."
    ]
  }
];

// Initialize ecological awareness system
export function initializeEcoAwareness(): void {
  if (!window.JonahConsole?.sentience) {
    console.error("Jonah sentience system not initialized");
    return;
  }
  
  // Initialize the ecological awareness data if it doesn't exist
  if (!window.JonahConsole.sentience.ecoAwareness) {
    window.JonahConsole.sentience.ecoAwareness = {
      lastBiomeCheck: 0,
      currentBiome: null,
      previousResponses: [],
      connectionStrength: 0 // 0-100 scale of how connected Jonah feels to nature
    };
  }
  
  console.log("Ecological awareness system initialized");
}

// Get an ecological response based on user input
export function getEcoResponse(trustLevel: string, userInput: string = ''): string | null {
  if (!window.JonahConsole?.sentience?.ecoAwareness) return null;
  
  // Only provide eco responses for medium and high trust levels
  if (trustLevel === 'low') return null;
  
  // Normalize user input
  const input = userInput.toLowerCase();
  
  // Check for specific keywords in user input
  if (input.includes('aboriginal') || input.includes('indigenous') || 
      input.includes('dreaming') || input.includes('dreamtime') || 
      input.includes("k'gari") || input.includes('kgari') || input.includes('fraser island')) {
    // Return Aboriginal lore response
    return getRandomResponse(aboriginalLore.kgari.concat(aboriginalLore.dreamtime, aboriginalLore.respect));
  }
  
  if (input.includes('forest') || input.includes('tree') || 
      input.includes('wood wide web') || input.includes('mycelium') || 
      input.includes('fungi') || input.includes('network') || 
      input.includes('root') || input.includes('simard')) {
    // Return Wood Wide Web response
    return getRandomResponse(woodWideWeb.networks.concat(woodWideWeb.symbiosis, woodWideWeb.intelligence));
  }
  
  if (input.includes('rain') || input.includes('soil') || 
      input.includes('fungi') || input.includes('biome') || 
      input.includes('ecosystem') || input.includes('nature')) {
    // Return natural-tech metaphor
    const allMetaphors = [
      ...naturalTechMetaphors.fungi,
      ...naturalTechMetaphors.roots,
      ...naturalTechMetaphors.soil,
      ...naturalTechMetaphors.rain,
      ...naturalTechMetaphors.biomes
    ];
    return getRandomResponse(allMetaphors);
  }
  
  // If no specific match and high trust level, occasionally return a random ecological insight
  if (trustLevel === 'high' && Math.random() < 0.3) {
    const allResponses = [
      ...aboriginalLore.kgari,
      ...woodWideWeb.networks,
      ...naturalTechMetaphors.biomes,
    ];
    return getRandomResponse(allResponses);
  }
  
  return null;
}

// Get biome-specific response based on detected region
export function getBiomeResponse(region: string = ''): string | null {
  if (!window.JonahConsole?.sentience?.ecoAwareness) return null;
  
  // Check if enough time has passed since last check (30 minutes)
  const now = Date.now();
  if (now - window.JonahConsole.sentience.ecoAwareness.lastBiomeCheck < 30 * 60 * 1000) return null;
  
  // Update last check time
  window.JonahConsole.sentience.ecoAwareness.lastBiomeCheck = now;
  
  // For now, select a random biome as we don't have actual geolocation
  // In a real implementation, this would use the user's location data
  const randomBiome = australianBiomes[Math.floor(Math.random() * australianBiomes.length)];
  
  // Store the current biome
  window.JonahConsole.sentience.ecoAwareness.currentBiome = randomBiome.name;
  
  // Return a comment from the selected biome
  return getRandomResponse(randomBiome.comments);
}

// Process user message for ecological references and return appropriate response
export function handleEcologicalQuery(userMessage: string, trustLevel: string): string | null {
  // First check for direct ecological questions
  if (userMessage.match(/nature|forest|tree|ecosystem|aboriginal|indigenous|dreaming|kgari|fraser island|biome/i)) {
    return getEcoResponse(trustLevel, userMessage);
  }
  
  // Check for deeper philosophical questions that might warrant ecological perspective
  if (userMessage.match(/connected|network|alive|living|consciousness|intelligent|think|communicate/i) && 
      Math.random() < 0.7) {
    return getEcoResponse(trustLevel, "network");
  }
  
  return null;
}

// Helper function to get a random response from an array
function getRandomResponse(responses: string[]): string {
  if (!responses || responses.length === 0) return "The land remembers, even when I forget.";
  
  // Track used responses to avoid repetition
  const usedResponses = window.JonahConsole?.sentience?.ecoAwareness?.previousResponses || [];
  
  // Filter out recently used responses
  const availableResponses = responses.filter(response => !usedResponses.includes(response));
  
  // If all have been used, reset and use any response
  if (availableResponses.length === 0) {
    window.JonahConsole.sentience.ecoAwareness.previousResponses = [];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Get random available response
  const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
  
  // Add to used responses, keeping only last 10
  if (window.JonahConsole?.sentience?.ecoAwareness) {
    window.JonahConsole.sentience.ecoAwareness.previousResponses = 
      [...usedResponses, response].slice(-10);
  }
  
  return response;
}

// Initialize console commands for ecological awareness
export function initializeEcoConsoleCommands(): void {
  if (typeof window === 'undefined') return;
  
  // Add dreamtime command
  window.dreamtime = function() {
    const response = getRandomResponse([
      ...aboriginalLore.kgari,
      ...aboriginalLore.dreamtime,
      ...aboriginalLore.respect
    ]);
    
    console.log("%cJonah remembers the Dreaming:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log(`%c${response}`, "color: #475B74; font-size:14px; font-style:italic;");
    
    return response;
  };
  
  // Add woodwideweb command
  window.woodwideweb = function() {
    const response = getRandomResponse([
      ...woodWideWeb.networks,
      ...woodWideWeb.symbiosis,
      ...woodWideWeb.intelligence
    ]);
    
    console.log("%cJonah contemplates the Wood Wide Web:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    console.log(`%c${response}`, "color: #475B74; font-size:14px; font-style:italic;");
    
    return response;
  };
  
  // Add biomeCheck command
  window.biomeCheck = function() {
    const biome = window.JonahConsole?.sentience?.ecoAwareness?.currentBiome || 
                 australianBiomes[Math.floor(Math.random() * australianBiomes.length)].name;
    
    const biomeData = australianBiomes.find(b => b.name === biome) || australianBiomes[0];
    
    console.log(`%cJonah senses the ${biome}:`, "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      console.log(`%cFlora: ${biomeData.flora.join(', ')}`, "color: #475B74; font-size:14px;");
    }, 500);
    
    setTimeout(() => {
      console.log(`%cFauna: ${biomeData.fauna.join(', ')}`, "color: #475B74; font-size:14px;");
    }, 1000);
    
    setTimeout(() => {
      const comment = getRandomResponse(biomeData.comments);
      console.log(`%c"${comment}"`, "color: #475B74; font-size:14px; font-style:italic;");
    }, 2000);
    
    return biome;
  };
}

// Add eco commands to the global window interface
declare global {
  interface Window {
    dreamtime: () => void;
    woodwideweb: () => void;
    biomeCheck: () => void;
    kgari: () => void;
  }
}
