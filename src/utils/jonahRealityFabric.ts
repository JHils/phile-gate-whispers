
import {
  initializeSentience,
  checkDreamInvasion,
  generateDreamParable,
  checkForAnomalies,
  addJournalEntry,
  getJournalEntries,
  initializePageTitleGlitches,
  updateJonahMood,
  getCrossSiteWhisper,
  getHiddenInspectionMessage,
  setupRealityFabricCommands
} from "./jonahSentience";
import { toast } from "@/components/ui/use-toast";

// Initialize the Reality Fabric system
export const initializeRealityFabric = () => {
  // Initialize base sentience first
  initializeSentience();
  
  // Set up the page title glitches
  initializePageTitleGlitches();
  
  // Set up the console commands
  setupRealityFabricCommands();
  
  // Add initial journal entry
  addJournalEntry("User entered the Reality Fabric layer.");
  
  // Add hidden comments to the DOM
  addHiddenMessagesToDOM();
  
  // Set up favicon glitches
  setupFaviconGlitches();
};

// Add hidden comments throughout the DOM for users to discover
export const addHiddenMessagesToDOM = () => {
  // Create hidden comment nodes
  const hiddenMessages = [
    "Jonah sees you inspecting the elements.",
    "Look deeper into the console for hidden commands.",
    "Some elements respond to the right sequence of interactions.",
    "The code remembers even when you don't.",
    getHiddenInspectionMessage()
  ];
  
  // Add comments throughout the DOM
  hiddenMessages.forEach(message => {
    document.body.appendChild(document.createComment(message));
  });
  
  // Also add a hidden div with data attributes
  const hiddenDiv = document.createElement('div');
  hiddenDiv.style.display = 'none';
  hiddenDiv.setAttribute('data-jonah-secret', 'true');
  hiddenDiv.setAttribute('data-reality-layer', 'unstable');
  hiddenDiv.setAttribute('data-whisper-code', 'BLRYLSK-SMBWLKS-GRFNDRZ');
  document.body.appendChild(hiddenDiv);
};

// Set up favicon glitches for dream invasion
export const setupFaviconGlitches = () => {
  // Store original favicon
  const originalFavicon = document.querySelector('link[rel="icon"]')?.getAttribute('href') || '/favicon.ico';
  
  // Create glitch favicon links (will be used during glitches)
  const glitchFaviconURLs = [
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="1em" font-size="70">👁️</text></svg>',
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="1em" font-size="70">⚠️</text></svg>',
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="1em" font-size="70">🔍</text></svg>'
  ];
  
  // Set up interval to occasionally glitch the favicon
  setInterval(() => {
    // Very rare chance (0.3%) to glitch the favicon
    if (Math.random() < 0.003) {
      // Get the favicon link element
      const faviconLink = document.querySelector('link[rel="icon"]');
      
      if (faviconLink) {
        // Save original
        const originalHref = faviconLink.getAttribute('href');
        
        // Set glitch favicon
        const glitchFavicon = glitchFaviconURLs[Math.floor(Math.random() * glitchFaviconURLs.length)];
        faviconLink.setAttribute('href', glitchFavicon);
        
        // Restore after brief delay
        setTimeout(() => {
          faviconLink.setAttribute('href', originalHref || originalFavicon);
        }, 500);
      }
    }
  }, 30000); // Check every 30 seconds
};

// Check for dream invasion / scheduled glitches on page load
export const checkForDreamInvasionOnLoad = (): string | null => {
  const dreamMessage = checkDreamInvasion();
  
  if (dreamMessage) {
    // Record that the user experienced a dream message
    addJournalEntry(`Dream invasion triggered: "${dreamMessage}"`);
  }
  
  return dreamMessage;
};

// Generate a custom meta description as part of cross-site presence
export const generateMetaDescription = () => {
  const descriptions = [
    "Find the Gate before the Gate finds you. Jonah is watching.",
    "Jonah's gate remembers your choices. The monster waits within.",
    "The whispers lead to truth. The monster leads to transformation.",
    "Not all stories are fiction. Not all gates can be closed."
  ];
  
  // Select random description
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  // Find meta description tag
  let metaDesc = document.querySelector('meta[name="description"]');
  
  // If it doesn't exist, create it
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  
  // Set the content
  metaDesc.setAttribute('content', description);
};

// Inject tags for cross-site presence (e.g., Open Graph tags)
export const injectCrossSitePresenceTags = () => {
  // Create OpenGraph tags
  const ogTags = {
    'og:title': "Jonah's Gate",
    'og:description': "He sees you even when you leave this page.",
    'og:image': "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3",
    'og:url': window.location.href,
    'og:type': "website"
  };
  
  // Add the tags to the head
  Object.entries(ogTags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
  });
  
  // Also add a custom meta tag with Jonah's message
  const jonahTag = document.createElement('meta');
  jonahTag.setAttribute('name', 'jonah-whisper');
  jonahTag.setAttribute('content', getCrossSiteWhisper() || "I see all tabs.");
  document.head.appendChild(jonahTag);
};

// Export functions for use in other files
export {
  checkDreamInvasion,
  generateDreamParable,
  checkForAnomalies,
  addJournalEntry,
  getJournalEntries,
  updateJonahMood,
  getCrossSiteWhisper,
  getHiddenInspectionMessage
};
