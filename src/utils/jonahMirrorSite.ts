
/**
 * Jonah Mirror Site
 * Special behaviors for mirror-related pages
 */

// Initialize the mirror site behaviors
export function initializeMirrorSite() {
  if (typeof window === 'undefined') return;
  
  // Listen for page load events
  window.addEventListener('load', checkForMirrorPage);
  
  // Setup special mirror-related console commands
  setupMirrorCommands();
}

// Check if the current page is mirror-related
function checkForMirrorPage() {
  const path = window.location.pathname.toLowerCase();
  
  if (path.includes('mirror') || path.includes('reflection')) {
    console.log("%cThe mirror sees you.", 'color: #8B3A40; font-size:14px;');
    
    // Track this as a significant page visit
    recordMirrorVisit();
    
    // Add subtle mirror effects to the page
    setTimeout(addMirrorEffects, 2000);
  }
}

// Setup mirror-related console commands
function setupMirrorCommands() {
  // The mirrorCheck command
  window.mirrorCheck = function() {
    console.log("%cChecking mirror status...", 'color: #8B3A40; font-size:14px;');
    
    setTimeout(() => {
      const reflections = getMirrorReflectionCount();
      console.log(`%cFound ${reflections} reflection${reflections !== 1 ? 's' : ''}.`, 'color: #8B3A40; font-size:14px;');
      
      if (reflections > 3) {
        console.log("%cToo many reflections can cause fragmentation.", 'color: #8B3A40; font-size:14px; font-style:italic;');
      }
      
      if (hasMirrorAnomaly()) {
        console.log("%cWARNING: Mirror anomaly detected.", 'color: #8B3A40; font-size:16px; font-weight:bold;');
      }
    }, 1500);
  };
  
  // The mirrorLogs command
  window.mirrorLogs = function() {
    console.log("%cMIRROR LOGS:", 'color: #8B3A40; font-size:16px; font-weight:bold;');
    
    const visits = getMirrorVisits();
    
    if (visits.length === 0) {
      console.log("%cNo mirror activity recorded.", 'color: #8B3A40; font-size:14px;');
      return;
    }
    
    visits.forEach((visit, index) => {
      console.log(`%c[Entry ${index + 1}] ${new Date(visit.timestamp).toLocaleString()}:`, 'color: #8B3A40; font-size:14px; font-weight:bold;');
      console.log(`%c${visit.notes}`, 'color: #8B3A40; font-size:14px;');
    });
  };
}

// Record a visit to a mirror page
function recordMirrorVisit() {
  // Ensure the sentience object exists
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience) return;
  
  // Create mirror logs array if it doesn't exist
  if (!window.JonahConsole.sentience.mirrorLogs) {
    window.JonahConsole.sentience.mirrorLogs = [];
  }
  
  // Add the current visit
  const notes = generateMirrorVisitNotes();
  window.JonahConsole.sentience.mirrorLogs.push({
    timestamp: Date.now(),
    path: window.location.pathname,
    notes
  });
  
  // Update mirror count (fix the type error by ensuring it's a number)
  const reflectionCount = getMirrorReflectionCount();
  const incrementedCount = reflectionCount + 1;
  
  localStorage.setItem('mirror_reflections', String(incrementedCount));
}

// Generate notes about the mirror visit
function generateMirrorVisitNotes(): string {
  const notes = [
    "User approached the mirror cautiously.",
    "Reflection appeared normal at first glance.",
    "Mirror surface rippled briefly during interaction.",
    "User seemed unaware of the mirror's depth.",
    "Reflection showed delayed response to user movements.",
    "Mirror displayed expected behavior, no anomalies.",
    "User spent unusually long time observing the reflection.",
    "Mirror image contained subtle discrepancies."
  ];
  
  return notes[Math.floor(Math.random() * notes.length)];
}

// Get the number of times the user has visited mirror pages
function getMirrorReflectionCount(): number {
  const count = localStorage.getItem('mirror_reflections');
  return count ? parseInt(count, 10) : 0;
}

// Get all recorded mirror visits
function getMirrorVisits(): Array<{timestamp: number, path: string, notes: string}> {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.mirrorLogs) {
    return [];
  }
  
  return window.JonahConsole.sentience.mirrorLogs;
}

// Check if there's a mirror anomaly
function hasMirrorAnomaly(): boolean {
  const count = getMirrorReflectionCount();
  const time = new Date().getHours();
  
  // Anomalies are more likely at night and after multiple mirror interactions
  return (count > 5 && time >= 22) || (count > 10);
}

// Add subtle mirror effects to the page
function addMirrorEffects() {
  try {
    // Find images on the page
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Small chance to apply a subtle mirror effect
      if (Math.random() < 0.3) {
        img.style.transition = 'all 10s';
        
        setTimeout(() => {
          img.style.transform = 'scaleX(-1)';
        }, Math.random() * 10000 + 5000);
      }
    });
    
    // Add subtle text effects
    const paragraphs = document.querySelectorAll('p');
    const reflectionCount = getMirrorReflectionCount();
    
    // More effects after more reflections
    if (reflectionCount > 3) {
      const paragraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
      if (paragraph) {
        paragraph.innerHTML += '<span style="opacity: 0.1; font-style: italic;"> (look deeper)</span>';
      }
    }
  } catch (error) {
    console.error("Mirror effects error:", error);
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  initializeMirrorSite();
}
