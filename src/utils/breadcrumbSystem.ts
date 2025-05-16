
/**
 * Breadcrumb Command System for Jonah's Philes (Chapter 1: Cairns)
 * This file manages the hidden triggers, commands, and interactive elements
 * scattered throughout the site as breadcrumbs for users to discover.
 */

import { typewriterLog, flickerLog, glitchEffectLog, speak } from './consoleEffects';

// Define the breadcrumb command interface
export interface BreadcrumbCommand {
  id: string;
  file: string;
  trigger: string;
  command: string;
  breadcrumb: string;
  discovered: boolean;
  usageCount: number;
  lastUsed?: number;
}

// Store for breadcrumb commands
const breadcrumbStore = {
  commands: [] as BreadcrumbCommand[],
  activeBreadcrumbs: new Set<string>(),
  pendingEffects: new Map<string, () => void>(),
};

// Initialize the breadcrumb system
export const initializeBreadcrumbSystem = () => {
  // Load previously discovered breadcrumbs
  const savedBreadcrumbs = localStorage.getItem('discoveredBreadcrumbs');
  if (savedBreadcrumbs) {
    try {
      const parsed = JSON.parse(savedBreadcrumbs);
      breadcrumbStore.activeBreadcrumbs = new Set(parsed);
    } catch (e) {
      console.error('Failed to parse saved breadcrumbs:', e);
    }
  }

  // Register console log listeners for triggers
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  console.log = function(...args) {
    originalLog.apply(console, args);
    checkForTriggers('log', args.join(' '));
  };

  console.warn = function(...args) {
    originalWarn.apply(console, args);
    checkForTriggers('warn', args.join(' '));
  };

  console.error = function(...args) {
    originalError.apply(console, args);
    checkForTriggers('error', args.join(' '));
  };

  console.info = function(...args) {
    originalInfo.apply(console, args);
    checkForTriggers('info', args.join(' '));
  };

  // Register global listener for special text inputs
  document.addEventListener('input', handleSpecialTextInputs);
  
  // Register global command listener
  registerGlobalCommandListener();
};

// Check for breadcrumb triggers in console output
const checkForTriggers = (logType: string, message: string) => {
  // Chapter 1: Cairns - File #023
  if (message.includes('Tough crowd.')) {
    activateBreadcrumb('web-catch', 'FILE #023: The Web Can\'t Catch You');
  }
  
  // Chapter 1: Cairns - File #024
  if (message.includes('DidgeriPOO registered.')) {
    activateBreadcrumb('cleansing', 'FILE #024: Summer House of Doom');
  }
  
  // Chapter 1: Cairns - File #025
  if (logType === 'warn' && message.includes('Margarita has left the main stage.')) {
    activateBreadcrumb('ocean-eject', 'FILE #025: Margarita the Stripper');
  }
  
  // Chapter 1: Cairns - File #026
  if (message.includes('Charm stat: MAXED.')) {
    activateBreadcrumb('sauce-protocol', 'FILE #026: Sauce Theory');
  }
  
  // Chapter 1: Cairns - File #027
  if (logType === 'error' && message.includes('Direction recursion imminent.')) {
    activateBreadcrumb('woolworths-reset', 'FILE #027: Right Then Left Then Madness');
  }
  
  // Chapter 1: Cairns - File #028
  if (logType === 'info' && message.includes('Extiiinct belief detected.')) {
    activateBreadcrumb('marsupial-mandate', 'FILE #028: The Dingo Denialist');
  }
  
  // Chapter 1: Cairns - File #029
  if (message.includes('Oi, he\'s off the didgeridoo.')) {
    activateBreadcrumb('ozzy-lexicon', 'FILE #029: Rhyming Slang Index');
  }
  
  // Chapter 1: Cairns - File #030
  if (logType === 'error' && message.includes('Technicolour identity error.')) {
    activateBreadcrumb('identity-leak', 'FILE #030: Dreamcoat Loop (Uber Paul)');
  }
  
  // Chapter 1: Cairns - File #031
  if (logType === 'info' && message.includes('Batton alignment shift.')) {
    activateBreadcrumb('batton-map', 'FILE #031: The Louis Batton Revelation');
  }
  
  // Chapter 1: Cairns - File #032
  if (logType === 'warn' && message.includes('Nugget impact detected.')) {
    activateBreadcrumb('payperwerk', 'FILE #032: Greyhound Gauntlet');
  }
  
  // Global trigger for Phase End
  if (message.includes('Initiating Whittos protocol...')) {
    window.location.href = '/whittos-initiate';
  }
};

// Handle special text inputs across the site
const handleSpecialTextInputs = (e: Event) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
    const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value.toLowerCase();
    
    // FILE #027: Right Then Left Then Madness
    if (value.includes('right then left then')) {
      scramblePageTime();
      playClosingStoreChime();
    }
    
    // FILE #028: The Dingo Denialist - handle in speech recognition separately
    
    // FILE #032: Greyhound Gauntlet
    if (value === 'i am sowbah') {
      setJobBoardCorruptedMode();
    }
    
    // Global trigger - Phase End
    if (value.includes('what if woolworths wasn\'t real')) {
      console.log("Initiating Whittos protocol...");
    }
    
    // FILE #024: Summer House of Doom - Console trigger
    if (value === 'teen panic') {
      activateSubtleScentChange();
    }
  }
};

// Register a global command listener for hidden commands
const registerGlobalCommandListener = () => {
  // Create a MutationObserver to watch for URL changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const currentPath = window.location.pathname;
        
        // Check if the current path contains any of our hidden commands
        if (currentPath.includes('/web-catch')) {
          handleWebCatchCommand();
        } else if (currentPath.includes('/cleansing')) {
          handleCleansingCommand();
        } else if (currentPath.includes('/ocean-eject')) {
          handleOceanEjectCommand();
        } else if (currentPath.includes('/sauce-protocol')) {
          handleSauceProtocolCommand();
        } else if (currentPath.includes('/woolworths-reset')) {
          handleWoolworthsResetCommand();
        } else if (currentPath.includes('/marsupial-mandate')) {
          handleMarsupialMandateCommand();
        } else if (currentPath.includes('/ozzy-lexicon')) {
          handleOzzyLexiconCommand();
        } else if (currentPath.includes('/identity-leak')) {
          handleIdentityLeakCommand();
        } else if (currentPath.includes('/batton-map')) {
          handleBattonMapCommand();
        } else if (currentPath.includes('/payperwerk')) {
          handlePayperwerkCommand();
        } else if (currentPath.includes('/whittos-initiate') || currentPath.includes('/skyfall-incident')) {
          handleWhittosProtocolCommand();
        } else if (currentPath.includes('/quiet-mode')) {
          handleQuietModeCommand();
        }
      }
    }
  });
  
  observer.observe(document, { childList: true, subtree: true });
  
  // Also check on initial page load
  setTimeout(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/web-catch') || 
        currentPath.includes('/cleansing') ||
        currentPath.includes('/ocean-eject') ||
        currentPath.includes('/sauce-protocol') ||
        currentPath.includes('/woolworths-reset') ||
        currentPath.includes('/marsupial-mandate') ||
        currentPath.includes('/ozzy-lexicon') ||
        currentPath.includes('/identity-leak') ||
        currentPath.includes('/batton-map') ||
        currentPath.includes('/payperwerk') ||
        currentPath.includes('/whittos-initiate') ||
        currentPath.includes('/skyfall-incident') ||
        currentPath.includes('/quiet-mode')) {
      console.log('Breadcrumb path detected: ' + currentPath);
      typewriterLog('Breadcrumb command detected. Accessing shadow content...');
    }
  }, 1000);
};

// Activate a breadcrumb when triggered
const activateBreadcrumb = (id: string, fileDesc: string) => {
  if (!breadcrumbStore.activeBreadcrumbs.has(id)) {
    breadcrumbStore.activeBreadcrumbs.add(id);
    localStorage.setItem('discoveredBreadcrumbs', 
      JSON.stringify(Array.from(breadcrumbStore.activeBreadcrumbs)));
    
    // Create a command result in console
    setTimeout(() => {
      glitchEffectLog(`Breadcrumb activated: ${fileDesc}`);
      typewriterLog(`Hidden command unlocked: /${id}`);
      flickerLog('Access this through URL or wait for routing trigger.');
      
      // If window.JonahConsole exists, add points
      if (window.JonahConsole) {
        window.JonahConsole.score += 25;
        console.log('%cBreadcrumb points awarded: +25', 'color: #8B3A40; font-size:14px;');
      }
    }, 500);
  }
};

// Various breadcrumb effect implementations

// FILE #023: Web Can't Catch You
const handleWebCatchCommand = () => {
  typewriterLog('The web cannot catch what it cannot see.');
  speak('The web cannot catch what it cannot see.');
};

// FILE #024: Summer House of Doom
const activateSubtleScentChange = () => {
  localStorage.setItem('siteScentActive', 'true');
  flickerLog('Site scent protocol initiated. The walls will remember your smell.');
  speak('Site scent protocol initiated');
};

const handleCleansingCommand = () => {
  typewriterLog('Cleansing protocol initiated. The DidgeriPOO has been neutralized.');
  speak('Cleansing protocol initiated');
};

// FILE #025: Margarita the Stripper
const handleOceanEjectCommand = () => {
  typewriterLog('Ocean ejection sequence activated. Margarita is in the current.');
  speak('Ocean ejection sequence activated');
  
  // Set flag to trigger yacht manifest download on next visit
  localStorage.setItem('pendingYachtManifest', 'true');
};

// FILE #026: Sauce Theory
const handleSauceProtocolCommand = () => {
  typewriterLog('Sauce protocol engaged. Charisma metrics now tracking.');
  speak('Sauce protocol engaged');
  
  // Show charisma bar
  showCharismaBar();
};

// Show charisma bar UI element
const showCharismaBar = () => {
  // Create charisma bar if it doesn't exist
  if (!document.getElementById('charisma-bar')) {
    const charismaBar = document.createElement('div');
    charismaBar.id = 'charisma-bar';
    charismaBar.style.position = 'fixed';
    charismaBar.style.bottom = '10px';
    charismaBar.style.right = '10px';
    charismaBar.style.width = '200px';
    charismaBar.style.height = '20px';
    charismaBar.style.backgroundColor = '#333';
    charismaBar.style.border = '1px solid #666';
    charismaBar.style.zIndex = '9999';
    
    const charismaFill = document.createElement('div');
    charismaFill.style.width = '100%';
    charismaFill.style.height = '100%';
    charismaFill.style.backgroundColor = '#8B3A40';
    charismaFill.style.transition = 'width 0.5s ease';
    
    const charismaLabel = document.createElement('div');
    charismaLabel.textContent = 'CHARISMA: MAXED';
    charismaLabel.style.position = 'absolute';
    charismaLabel.style.top = '0';
    charismaLabel.style.left = '0';
    charismaLabel.style.width = '100%';
    charismaLabel.style.textAlign = 'center';
    charismaLabel.style.color = 'white';
    charismaLabel.style.fontSize = '12px';
    charismaLabel.style.lineHeight = '20px';
    
    charismaBar.appendChild(charismaFill);
    charismaBar.appendChild(charismaLabel);
    document.body.appendChild(charismaBar);
    
    // Animate the charisma bar
    setTimeout(() => {
      charismaBar.style.opacity = '0.1';
      
      // Pulse effect
      setInterval(() => {
        charismaBar.style.opacity = '0.8';
        setTimeout(() => {
          charismaBar.style.opacity = '0.1';
        }, 1000);
      }, 10000);
    }, 5000);
  }
};

// FILE #027: Right Then Left Then Madness
const scramblePageTime = () => {
  // Find and modify any time displays on the page
  const timeElements = document.querySelectorAll('time, .time, [data-time]');
  timeElements.forEach(el => {
    const originalText = el.textContent || '';
    const scrambledTime = originalText.split('').sort(() => Math.random() - 0.5).join('');
    el.textContent = scrambledTime;
  });
  
  // Also modify any text containing time formats
  const allElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  allElements.forEach(el => {
    const text = el.textContent || '';
    // Look for time patterns like 12:34, 1:23 PM, etc.
    if (/\d{1,2}:\d{2}(:\d{2})?\s*(AM|PM|am|pm)?/.test(text)) {
      el.innerHTML = el.innerHTML.replace(
        /(\d{1,2}):(\d{2})(:\d{2})?\s*(AM|PM|am|pm)?/g, 
        (match) => match.split('').sort(() => Math.random() - 0.5).join('')
      );
    }
  });
};

const playClosingStoreChime = () => {
  const audio = new Audio('/assets/sounds/closing-chime.mp3');
  audio.volume = 0.3;
  audio.play().catch(err => console.error('Audio play failed:', err));
};

const handleWoolworthsResetCommand = () => {
  typewriterLog('Woolworths reset initiated. Timeline now recursing.');
  speak('Woolworths reset initiated');
  scramblePageTime();
  playClosingStoreChime();
};

// FILE #028: The Dingo Denialist
const checkForKoalaKiss = () => {
  // This would typically use the Web Speech API
  // For now, we'll just set up the infrastructure
  if ('webkitSpeechRecognition' in window) {
    // Speech recognition is available
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.lang = 'en-AU';
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes('koala kiss')) {
        console.log('Hydration prompt: Koalas need water too.');
        typewriterLog('Hydration prompt: Koalas need water too.');
      }
    };
    
    recognition.start();
  }
};

const handleMarsupialMandateCommand = () => {
  typewriterLog('Marsupial mandate activated. Koala observation in progress.');
  speak('Marsupial mandate activated');
  
  // Try to activate microphone for koala kiss detection
  if (document.body.dataset.listenActive !== 'true') {
    document.body.dataset.listenActive = 'true';
    checkForKoalaKiss();
  }
};

// FILE #029: Rhyming Slang Index
let slangGlossaryActive = false;
let slangGlossaryTimeout: NodeJS.Timeout | null = null;

const handleOzzyLexiconCommand = () => {
  typewriterLog('Ozzy Lexicon unlocked. Slang glossary available for 3 minutes.');
  speak('Ozzy Lexicon unlocked');
  
  activateSlangGlossary();
};

const activateSlangGlossary = () => {
  if (slangGlossaryTimeout) {
    clearTimeout(slangGlossaryTimeout);
  }
  
  slangGlossaryActive = true;
  
  // Create glossary popup if it doesn't exist
  if (!document.getElementById('slang-glossary')) {
    const glossary = document.createElement('div');
    glossary.id = 'slang-glossary';
    glossary.style.position = 'fixed';
    glossary.style.bottom = '50px';
    glossary.style.right = '20px';
    glossary.style.width = '300px';
    glossary.style.maxHeight = '400px';
    glossary.style.overflowY = 'auto';
    glossary.style.backgroundColor = '#222';
    glossary.style.border = '1px solid #444';
    glossary.style.borderRadius = '5px';
    glossary.style.padding = '15px';
    glossary.style.zIndex = '9999';
    glossary.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    glossary.style.color = '#ddd';
    glossary.style.fontFamily = 'monospace';
    
    const header = document.createElement('h3');
    header.textContent = 'Australian Slang Glossary';
    header.style.marginBottom = '15px';
    header.style.borderBottom = '1px solid #444';
    header.style.paddingBottom = '5px';
    
    const timer = document.createElement('div');
    timer.textContent = 'Available for: 3:00';
    timer.style.position = 'absolute';
    timer.style.top = '15px';
    timer.style.right = '15px';
    timer.style.fontSize = '12px';
    timer.style.color = '#999';
    
    glossary.appendChild(header);
    glossary.appendChild(timer);
    
    // Add slang terms
    const slangTerms = [
      { term: 'Arvo', def: 'Afternoon' },
      { term: 'Bludger', def: 'Lazy person' },
      { term: 'Drongo', def: 'Fool or idiot' },
      { term: 'Fair dinkum', def: 'Genuine, real' },
      { term: 'Grog', def: 'Alcohol' },
      { term: 'Mozzies', def: 'Mosquitoes' },
      { term: 'Roo', def: 'Kangaroo' },
      { term: 'Sheila', def: 'Woman' },
      { term: 'Stubby', def: 'Beer bottle' },
      { term: 'Thongs', def: 'Flip-flops' },
      { term: 'Tucker', def: 'Food' },
      { term: 'Ute', def: 'Utility vehicle, pickup truck' },
      { term: 'Whinge', def: 'Complain' },
      { term: 'Yakka', def: 'Work (hard yakka = hard work)' },
      { term: 'Off the didgeridoo', def: 'Extremely intoxicated' }
    ];
    
    slangTerms.forEach(item => {
      const entry = document.createElement('div');
      entry.style.marginBottom = '8px';
      
      const term = document.createElement('strong');
      term.textContent = item.term;
      entry.appendChild(term);
      
      const def = document.createTextNode(`: ${item.def}`);
      entry.appendChild(def);
      
      glossary.appendChild(entry);
    });
    
    document.body.appendChild(glossary);
    
    // Update timer every second
    let secondsLeft = 180;
    const timerInterval = setInterval(() => {
      secondsLeft--;
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      timer.textContent = `Available for: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        glossary.style.opacity = '0';
        setTimeout(() => {
          if (glossary.parentNode) {
            glossary.parentNode.removeChild(glossary);
          }
        }, 1000);
      }
    }, 1000);
  }
  
  // Set timeout to remove glossary after 3 minutes
  slangGlossaryTimeout = setTimeout(() => {
    slangGlossaryActive = false;
    const glossary = document.getElementById('slang-glossary');
    if (glossary && glossary.parentNode) {
      glossary.style.opacity = '0';
      setTimeout(() => {
        if (glossary.parentNode) {
          glossary.parentNode.removeChild(glossary);
        }
      }, 1000);
    }
  }, 180000); // 3 minutes
};

// FILE #030: Dreamcoat Loop (Uber Paul)
const handleIdentityLeakCommand = () => {
  typewriterLog('Identity leak triggered. Dreamcoat protocol exposed.');
  speak('Identity leak triggered');
  
  // Look for any elements with 'real face' text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    const text = el.textContent || '';
    if (text.toLowerCase().includes('real face')) {
      el.setAttribute('data-identity-trigger', 'true');
      
      // Add click handler to reveal mask
      el.addEventListener('click', revealJonahIdentity);
    }
  });
};

const revealJonahIdentity = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  
  // Create mask reveal effect
  const mask = document.createElement('div');
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.width = '100%';
  mask.style.height = '100%';
  mask.style.backgroundColor = 'rgba(0,0,0,0.8)';
  mask.style.zIndex = '99999';
  mask.style.display = 'flex';
  mask.style.alignItems = 'center';
  mask.style.justifyContent = 'center';
  
  const idImage = document.createElement('div');
  idImage.style.width = '300px';
  idImage.style.height = '400px';
  idImage.style.backgroundColor = '#111';
  idImage.style.border = '1px solid #333';
  idImage.style.position = 'relative';
  idImage.style.overflow = 'hidden';
  
  const idContent = document.createElement('div');
  idContent.innerHTML = `
    <div style="padding: 20px; font-family: monospace; color: #ddd;">
      <h3 style="margin-bottom: 15px;">IDENTIFICATION CARD</h3>
      <div style="margin-bottom: 10px;">Name: <span style="text-decoration: line-through;">HILSON, J.J.</span> PHILE, JONAH S.</div>
      <div style="margin-bottom: 10px;">ID: <span style="text-decoration: line-through;">A772-4419-BBZ</span> OUT-OF-BOUNDS</div>
      <div style="margin-bottom: 10px;">Status: ACTIVE DREAMCOAT</div>
      <div style="margin-bottom: 10px;">Clearance: <span style="color: #8B3A40;">REDACTED</span></div>
      <div style="text-align: center; margin: 20px 0; font-size: 12px; color: #8B3A40;">
        [PHOTO REDACTED BY GATEWATCH]
      </div>
      <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; text-align: center; font-size: 10px;">
        THIS IDENTITY IS A FABRICATION
      </div>
    </div>
  `;
  
  idImage.appendChild(idContent);
  mask.appendChild(idImage);
  document.body.appendChild(mask);
  
  // Add glitch effect
  setTimeout(() => {
    idImage.style.transform = 'translateX(5px)';
    setTimeout(() => {
      idImage.style.transform = 'translateX(-3px)';
      setTimeout(() => {
        idImage.style.transform = 'translateX(0)';
      }, 100);
    }, 100);
  }, 500);
  
  // Remove after short display
  setTimeout(() => {
    mask.style.opacity = '0';
    setTimeout(() => {
      if (mask.parentNode) {
        mask.parentNode.removeChild(mask);
      }
    }, 1000);
  }, 3000);
};

// FILE #031: The Louis Batton Revelation
const handleBattonMapCommand = () => {
  typewriterLog('Batton map activated. Compass alignment in progress.');
  speak('Batton map activated');
  
  // Check for Louis Batton appearances and update counter
  const battonAppearances = parseInt(localStorage.getItem('louisBattonAppearances') || '0');
  localStorage.setItem('louisBattonAppearances', (battonAppearances + 1).toString());
  
  // If seen on 3+ pages, activate compass overlay
  if (battonAppearances >= 2) { // This will be the 3rd appearance
    activateCompassOverlay();
  }
};

const activateCompassOverlay = () => {
  // Create compass overlay
  const compass = document.createElement('div');
  compass.id = 'batton-compass';
  compass.style.position = 'fixed';
  compass.style.top = '50%';
  compass.style.left = '50%';
  compass.style.width = '300px';
  compass.style.height = '300px';
  compass.style.transform = 'translate(-50%, -50%)';
  compass.style.backgroundColor = 'rgba(0,0,0,0.7)';
  compass.style.borderRadius = '50%';
  compass.style.zIndex = '9999';
  compass.style.boxShadow = '0 0 20px rgba(139, 58, 64, 0.5)';
  
  // Compass needle
  const needle = document.createElement('div');
  needle.style.position = 'absolute';
  needle.style.top = '50%';
  needle.style.left = '50%';
  needle.style.width = '4px';
  needle.style.height = '120px';
  needle.style.backgroundColor = '#8B3A40';
  needle.style.transformOrigin = 'bottom center';
  needle.style.transform = 'translate(-50%, -100%) rotate(0deg)';
  compass.appendChild(needle);
  
  // Add "You are here" marker
  const marker = document.createElement('div');
  marker.textContent = 'YOU ARE HERE';
  marker.style.position = 'absolute';
  marker.style.bottom = '30px';
  marker.style.left = '50%';
  marker.style.transform = 'translateX(-50%)';
  marker.style.color = '#fff';
  marker.style.fontSize = '12px';
  marker.style.fontFamily = 'monospace';
  compass.appendChild(marker);
  
  // Add compass directions
  const directions = ['N', 'E', 'S', 'W'];
  directions.forEach((dir, i) => {
    const dirElement = document.createElement('div');
    dirElement.textContent = dir;
    dirElement.style.position = 'absolute';
    dirElement.style.color = '#fff';
    dirElement.style.fontSize = '16px';
    dirElement.style.fontFamily = 'monospace';
    
    if (i === 0) { // North
      dirElement.style.top = '20px';
      dirElement.style.left = '50%';
      dirElement.style.transform = 'translateX(-50%)';
    } else if (i === 1) { // East
      dirElement.style.top = '50%';
      dirElement.style.right = '20px';
      dirElement.style.transform = 'translateY(-50%)';
    } else if (i === 2) { // South
      dirElement.style.bottom = '20px';
      dirElement.style.left = '50%';
      dirElement.style.transform = 'translateX(-50%)';
    } else { // West
      dirElement.style.top = '50%';
      dirElement.style.left = '20px';
      dirElement.style.transform = 'translateY(-50%)';
    }
    
    compass.appendChild(dirElement);
  });
  
  document.body.appendChild(compass);
  
  // Animate the compass needle
  let angle = 0;
  const spinInterval = setInterval(() => {
    angle += 10;
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    
    if (angle >= 360) {
      clearInterval(spinInterval);
      
      // Make the needle point "north" but actually in random direction
      const finalDirection = Math.floor(Math.random() * 360);
      needle.style.transform = `translate(-50%, -100%) rotate(${finalDirection}deg)`;
      
      // Add "flipping" effect to nav
      setTimeout(() => {
        marker.textContent = 'NAVIGATION INVERTED';
        marker.style.color = '#8B3A40';
        
        // Store the inverted state
        localStorage.setItem('navigationInverted', 'true');
        
        // Remove compass after display
        setTimeout(() => {
          compass.style.opacity = '0';
          setTimeout(() => {
            if (compass.parentNode) {
              compass.parentNode.removeChild(compass);
            }
          }, 1000);
        }, 3000);
      }, 1500);
    }
  }, 50);
};

// FILE #032: Greyhound Gauntlet
const handlePayperwerkCommand = () => {
  typewriterLog('Payperwerk protocol initiated. Nugget defense activated.');
  speak('Payperwerk protocol initiated');
  setJobBoardCorruptedMode();
};

const setJobBoardCorruptedMode = () => {
  localStorage.setItem('jobBoardCorrupted', 'true');
  typewriterLog('Job board corrupted. Refreshing will show SOWBAH mode.');
};

// Global trigger - Whittos Protocol
const handleWhittosProtocolCommand = () => {
  typewriterLog('Whittos protocol confirmed. Skyfall incident documented.');
  speak('Whittos protocol confirmed');
  
  // Special effects for the Whittos protocol
  document.body.classList.add('whittos-active');
  
  // Create falling Woolworths logos
  createFallingWoolworths();
};

// Quiet Mode command
const handleQuietModeCommand = () => {
  typewriterLog('Quiet mode activated. Web can\'t catch you now.');
  speak('Quiet mode activated');
  
  // Implement quiet mode effect
  document.body.classList.add('quiet-mode');
};

// FILE #023: The Web Can't Catch You - No signal icon click handler
export const setupNoSignalIcon = () => {
  // Find or create no signal icon
  let clickCount = 0;
  
  // Look for elements with "no signal" text
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  textElements.forEach(el => {
    const text = el.textContent || '';
    if (text.toLowerCase().includes('no signal')) {
      el.classList.add('no-signal-trigger');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      
      // Add click handler
      el.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 3) {
          playSocialStaticAudio();
          clickCount = 0;
        } else {
          // Small visual feedback
          el.classList.add('signal-clicked');
          setTimeout(() => {
            el.classList.remove('signal-clicked');
          }, 200);
        }
      });
    }
  });
};

// Play Social Static audio
const playSocialStaticAudio = () => {
  const audio = new Audio('/assets/sounds/social-static.mp3');
  audio.volume = 0.3;
  audio.play().catch(err => console.error('Audio play failed:', err));
  
  console.log('%cSocial static detected. Signal corrupted.', 'color: #8B3A40; font-size:14px;');
  typewriterLog('Social static detected. Signal corrupted.');
};

// Create falling Woolworths logos effect
const createFallingWoolworths = () => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9998';
  document.body.appendChild(container);
  
  // Create 20 falling logos
  for (let i = 0; i < 20; i++) {
    const logo = document.createElement('div');
    logo.textContent = 'W';
    logo.style.position = 'absolute';
    logo.style.color = '#008640'; // Woolworths green
    logo.style.fontSize = `${Math.random() * 30 + 20}px`;
    logo.style.fontWeight = 'bold';
    logo.style.left = `${Math.random() * 100}%`;
    logo.style.top = `${Math.random() * -100}%`;
    logo.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    logo.style.transform = `rotate(${Math.random() * 360}deg)`;
    logo.style.textShadow = '0 0 5px rgba(0,134,64,0.5)';
    container.appendChild(logo);
    
    // Animate falling
    const duration = Math.random() * 10000 + 5000;
    const delay = Math.random() * 2000;
    
    setTimeout(() => {
      logo.style.transition = `top ${duration}ms linear, transform ${duration}ms ease-in-out`;
      logo.style.top = '120%';
      logo.style.transform = `rotate(${Math.random() * 720}deg)`;
    }, delay);
    
    // Remove after animation
    setTimeout(() => {
      if (logo.parentNode) {
        logo.parentNode.removeChild(logo);
      }
    }, duration + delay + 1000);
  }
  
  // Remove container after all animations
  setTimeout(() => {
    container.style.opacity = '0';
    setTimeout(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 1000);
  }, 15000);
};

// Export functions for use in components
export {
  initializeBreadcrumbSystem,
  activateSlangGlossary,
  activateCompassOverlay,
  checkForKoalaKiss,
  playSocialStaticAudio
};

// Add CSS for breadcrumb effects
const addBreadcrumbStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .no-signal-trigger {
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .no-signal-trigger:hover {
      text-shadow: 0 0 2px rgba(255,255,255,0.5);
    }
    .signal-clicked {
      transform: scale(1.05);
    }
    
    .whittos-active {
      position: relative;
      overflow: hidden;
    }
    
    .quiet-mode {
      filter: grayscale(0.5) brightness(0.9);
    }
    
    [data-identity-trigger="true"] {
      cursor: pointer;
      position: relative;
    }
    [data-identity-trigger="true"]:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(139, 58, 64, 0.3);
    }
  `;
  document.head.appendChild(style);
};

// Call this when DOM is loaded
if (typeof document !== 'undefined') {
  addBreadcrumbStyles();
  document.addEventListener('DOMContentLoaded', () => {
    initializeBreadcrumbSystem();
    setupNoSignalIcon();
  });
}

