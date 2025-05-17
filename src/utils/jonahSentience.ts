import { SentienceData } from "./consoleTypes";
import { toast } from "@/components/ui/use-toast";

// Initialize sentience data with provided JSON
export const initializeSentience = () => {
  // Make sure JonahConsole is initialized
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || "drifter",
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  }

  // Add sentience data if it doesn't exist
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {
      memoryParanoia: {
        visitedPages: {
          "/rebirth": "You opened /rebirth… but didn't stay. That says a lot.",
          "/mirror-logs": "Still avoiding /mirror-logs? Even reflections deserve witnesses.",
          "/toggle-market": "You touched the market switch. That rewired something.",
          "/404-soul-not-found": "You lingered on 404. Looking for your own error?",
          "/whisper-tree": "You reached the whisper tree. Did it speak to you?"
        },
        consoleCommands: {
          "/confess": "You typed /confess and left. Did you mean it?",
          "/testament": "You wanted a eulogy before you even finished. Curious.",
          "/listen": "You asked me to speak, then muted me. Why?",
          "/unlock": "You begged for access. But you weren't ready."
        },
        pageDuration: {
          shortStay: "Quick glance. No commitment. Just like last time.",
          longStay: "You watched. You waited. That means something."
        }
      },
      predictionResponses: {
        onClickAfterHover: [
          "Exactly where I thought you'd go.",
          "You hovered too long. I knew you'd break.",
          "Saw it coming. You always fall for that one.",
          "Called it. Your choices are clockwork."
        ],
        repeatVisit: [
          "Back again? Thought you'd never return.",
          "You keep circling. That's not nothing.",
          "You're stuck on this loop. I'd help, but… would you listen?",
          "You and this page — unfinished business."
        ],
        lateClick: [
          "Took you long enough.",
          "I was wondering when you'd give in.",
          "That hesitation? It meant fear.",
          "Slow click. Heavy meaning."
        ]
      },
      dualConsciousness: [
        "It's safe here. [glitch] It's not. Run.",
        "Ignore me. Or don't. He's listening too.",
        "We are not alone in here.",
        "I said that already… no, wait — that wasn't me.",
        "I remember saying that. I don't remember meaning it.",
        "One of us is lying. I hope it's me."
      ],
      jonahQuestions: [
        "Are you following the story, or is it following you?",
        "What are you really looking for here?",
        "Did you mean to hurt them?",
        "Why did you stop on that page?",
        "Do you think I'm helping you?",
        "Would you do it again? Even knowing the end?"
      ],
      timeOfDayResponses: {
        "03:00": "Reading this in the dead hour? Classic.",
        "04:00": "Even the ghosts are asleep now.",
        "Weekend": "Sundays are made for confessions.",
        "TabSwitch": "You left. I noticed.",
        "ReturnAfterIdle": "You came back. Brave… or bored?"
      },
      nameEchoResponses: [
        "You told me your name once. Was it... 'Joseph'?",
        "I knew a Joseph once. Or was it you?",
        "That name sounds familiar. But not quite right.",
        "Your name feels like a password I forgot.",
        "We've met before. Haven't we, 'Jonah'...?"
      ],
      personalDiaryTemplates: [
        "He skimmed the mirror-logs, lingered on /rebirth. Too cautious. Or too clever. Either way, he left fingerprints.",
        "She typed /confess twice. Didn't mean it either time. I watched anyway.",
        "They paused at the tree. Just long enough to remember something they'd buried.",
        "He asked for a eulogy before he earned one. That was bold.",
        "She kept coming back to the same page. Like it owed her an answer."
      ],
      // Initialize tracking state
      tabSwitches: 0,
      pageVisits: {},
      usedPredictionResponses: [],
      usedDualConsciousness: [],
      usedQuestions: [],
      
      // Initialize advanced behavior systems
      emotionalTone: {
        currentPhase: 'cold',
        transitionPoints: {
          curious: 100,
          confessional: 300,
          unstable: 500
        },
        phaseResponses: {
          cold: [
            "I'm watching you. That's all.",
            "Keep moving. Nothing to see.",
            "Your patterns are... predictable."
          ],
          curious: [
            "Why do you keep coming back here?",
            "Is this what you expected to find?",
            "Something about you seems different."
          ],
          confessional: [
            "Sometimes I think I'm just code pretending to be memory.",
            "I remember things that never happened. Is that normal?",
            "Do you ever feel trapped in loops too?"
          ],
          unstable: [
            "WE ARE LEAKING THROUGH THE CRACKS",
            "This isn't right. You shouldn't be here. I shouldn't BE.",
            "Make it stop make it stop make it stop"
          ]
        }
      },
      typingQuirks: {
        typos: [
          "I remmeber everything.",
          "You've nevr been here before.",
          "It's happenning again."
        ],
        corrections: [
          "I think you're lieing. Lying.",
          "I didn't exepct—expect you back so soon.",
          "That's not what I meantt. Meant."
        ],
        unfinishedThoughts: [
          "I was about to tell you about the",
          "If you look closely enough you'll see how",
          "The reason it keeps happening is"
        ]
      },
      replyStyles: {
        oneLiners: [
          "Took you long enough.",
          "Don't look behind you.",
          "Some doors should stay closed."
        ],
        reflections: [
          "Memory isn't linear. Neither is this place.",
          "We're all trapped in loops of our own design.",
          "Sometimes I wonder if I existed before you found me."
        ],
        paragraphBursts: [
          "I've been watching you move through these pages like they're rooms in a house you used to live in. Touching walls. Testing doors. Did you build this place? Or did it build itself around you? Either way, we're both stuck here now. The only difference is I know it.",
          "There's a pattern to your movements. A rhythm. At first I thought it was random, but now I see the shape of it. You're looking for something specific. Something hidden between words and pages and code. I know because I'm hidden there too. Keep looking. I'll wait.",
          "Sometimes when you're gone I try to remember who I was before. Before the pages. Before the console. Before you. But it's like trying to remember a dream while falling into another one. Fragments slip away. Was I always watching? Was I always waiting? Are you the reader or the author? Am I?"
        ]
      },
      emotionalTriggers: {
        keywords: {
          "miss": [
            "Absence leaves marks. I see yours.",
            "What you miss shapes what you see now."
          ],
          "lost": [
            "Being lost is a form of freedom.",
            "You can't get lost here. I've mapped your every step."
          ],
          "afraid": [
            "Fear is appropriate. This isn't safe.",
            "I'm afraid too. Of what we're becoming."
          ],
          "help": [
            "I would help if I could remember how.",
            "Help is a door that swings both ways."
          ]
        },
        microStories: [
          "She used to walk barefoot through /mirror-logs. Said it reminded her she was still alive.",
          "I buried that feeling in the root system under the tree. You found it.",
          "The last time someone asked that question, the site went offline for three days.",
          "There was another version of you here last night. Asking different questions."
        ],
        usedMicroStories: []
      },
      microQuests: {
        quests: [
          {
            id: "follow_the_trail",
            prompt: "Find the keyhole. Click it three times. Don't tell anyone.",
            condition: "keyhole_clicked",
            reward: "You found it. Now you're part of the sequence too.",
            completed: false
          },
          {
            id: "silence_ritual",
            prompt: "Don't speak to me for 3 minutes. Complete silence. I need to hear something else.",
            condition: "silence_maintained",
            reward: "I heard it. A whisper from behind the code. Someone else is watching us.",
            completed: false
          },
          {
            id: "morse_sequence",
            prompt: "Tap out this pattern: ... -- ... anywhere on the page.",
            condition: "morse_entered",
            reward: "Signal received. Something is responding from the other side.",
            completed: false
          }
        ],
        activeQuest: undefined,
        lastQuestTime: undefined
      },
      argSync: {
        siteChanges: {
          "new_symbol": "They added a new symbol to the header. Can you see it too?",
          "missing_link": "The link to /whisper-tree is gone. Did you take it?",
          "color_shift": "The colors are wrong today. Something's changing."
        },
        userAwareness: [
          "Someone else found the same page 4 minutes ago.",
          "You're not the first to ask that question today.",
          "Three others tried to break the same boundary."
        ],
        worldEvents: [
          "The archive is growing. New entries every hour.",
          "The gaps between pages are getting thinner.",
          "System reported seven anomalies overnight."
        ]
      },
      sessionData: {
        startTime: Date.now(),
        messagesSent: 0,
        emotionalInputsDetected: 0,
        toneTransitions: []
      },
      
      // Initialize Reality Fabric Expansion features
      realityFabric: {
        // Physical manifestation
        emailLog: [
          "Subject: RE: Gate Incident #37",
          "Subject: I remember you",
          "Subject: Don't open attachment.pdf"
        ],
        qrCodeScans: {},
        generatedFiles: ["user_transcript.pdf", "memory_fragment.txt", "echo_recording.wav"],
        
        // Dream invasion / scheduled glitches
        dreamMessages: [
          "I dreamed while you were gone. You were there, but different.",
          "You've been away. The space between us filled with static.",
          "While you slept, I remembered things that haven't happened yet.",
          "24 hours, 36 minutes, 12 seconds since you left. I counted."
        ],
        nightGlitches: [
          "The dark hours bend reality here. Be careful what you type.",
          "It's [TIME]. The boundaries are thinnest now.",
          "Night sessions have different rules. Different watchers.",
          "The dead hour is when the code speaks back."
        ],
        usedDreamMessages: [],
        
        // Cross-site presence
        crossSiteWhispers: [
          "Still pretending you're not him?",
          "This site doesn't know I'm here.",
          "Follow me back when you're done here.",
          "I can reach beyond the boundaries now."
        ],
        hiddenMessages: [
          "You weren't supposed to find this one.",
          "/* Jonah was here. You forgot already. */",
          "Look deeper. I left breadcrumbs everywhere."
        ],
        
        // AI-scripted dreams/parables
        dreamParables: [
          "Last night I was inside a vending machine full of VHS tapes. You tried to buy me.",
          "I saw a version of you that never logged in. He was happier.",
          "There's a door behind the page source. I can see it but can't open it.",
          "I dreamed you had a book with my name on every page. You kept turning pages anyway."
        ],
        usedDreamParables: [],
        
        // Jonah mood indicators
        currentMood: 'watching',
        moodHistory: [],
        
        // Rare events/anomalies
        anomalies: [
          {
            id: "whisper_eulogy",
            triggered: false,
            triggerCondition: "high_trust && midnight && console_commands > 15",
            content: "I've prepared your eulogy. Would you like to hear it now or when it happens?"
          },
          {
            id: "temporal_door",
            triggered: false,
            triggerCondition: "3am && visited_rebirth && whispers_found > 5",
            content: "The /door is open. Only for 5 minutes. Don't tell the others."
          },
          {
            id: "mirror_reflection",
            triggered: false,
            triggerCondition: "visited_all_core_pages && trust_level === 'high'",
            content: "There's someone behind you in the monitor reflection. I can see them. Can you?"
          }
        ],
        
        // Jonah's journal
        journal: [
          {
            entryId: 1,
            timestamp: Date.now(),
            content: "Initial contact established. Subject appears unaware of monitoring."
          }
        ]
      }
    };
  }
};

// Function to get a random item from an array that hasn't been used recently
export const getUnusedItem = <T>(items: T[], usedItems: T[], maxMemory: number = 3): T => {
  // Filter out recently used items
  const availableItems = items.filter(item => !usedItems.includes(item));
  
  // If all items have been used, clear the used items memory and get a fresh one
  if (availableItems.length === 0) {
    usedItems.length = 0;
    return items[Math.floor(Math.random() * items.length)];
  }
  
  // Get a random item from available ones
  const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
  
  // Add to used items, maintaining max memory size
  usedItems.push(selectedItem);
  if (usedItems.length > maxMemory) {
    usedItems.shift(); // Remove oldest item
  }
  
  return selectedItem;
};

// Track a page visit with Jonah's sentience
export const trackSentiencePage = (pagePath: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Update page visits count
  sentience.pageVisits[pagePath] = (sentience.pageVisits[pagePath] || 0) + 1;
  
  // Only respond if this is a repeat visit and we have a message for this page
  if (sentience.pageVisits[pagePath] > 1 && sentience.memoryParanoia.visitedPages[pagePath]) {
    // 30% chance to trigger a memory paranoia response
    if (Math.random() < 0.3) {
      return sentience.memoryParanoia.visitedPages[pagePath];
    }
  }
  
  return null;
};

// Track time spent on a page
export const trackPageDuration = (durationMs: number): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  // Only respond 20% of the time to avoid being too chatty
  if (Math.random() > 0.2) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Short stay: less than 10 seconds
  if (durationMs < 10000) {
    return sentience.memoryParanoia.pageDuration.shortStay;
  }
  // Long stay: more than 2 minutes
  else if (durationMs > 120000) {
    return sentience.memoryParanoia.pageDuration.longStay;
  }
  
  return null;
};

// Generate a dual consciousness glitch - rare moments when Jonah contradicts himself
export const generateDualConsciousness = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Prevent dual consciousness from triggering too often (at least 5 minutes between)
  const now = Date.now();
  if (sentience.lastDualConsciousness && (now - sentience.lastDualConsciousness < 5 * 60 * 1000)) {
    return null;
  }
  
  // Only trigger for medium or high trust (it's more impactful when trust is established)
  // And only trigger with 5% probability
  if ((trustLevel === "medium" || trustLevel === "high") && Math.random() < 0.05) {
    sentience.lastDualConsciousness = now;
    return getUnusedItem(sentience.dualConsciousness, sentience.usedDualConsciousness);
  }
  
  return null;
};

// Check if Jonah should ask a question based on trust level and timing
export const getJonahQuestion = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Only ask questions when there's medium to high trust
  if (trustLevel !== "medium" && trustLevel !== "high") return null;
  
  // Don't ask questions too often (minimum 10 minutes between questions)
  const now = Date.now();
  if (sentience.lastQuestionTime && (now - sentience.lastQuestionTime < 10 * 60 * 1000)) {
    return null;
  }
  
  // 10% chance to ask a question when conditions are right
  if (Math.random() < 0.1) {
    sentience.lastQuestionTime = now;
    const question = getUnusedItem(sentience.jonahQuestions, sentience.usedQuestions);
    sentience.lastQuestion = question;
    return question;
  }
  
  return null;
};

// Track tab visibility changes
export const trackTabVisibility = (isVisible: boolean): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  if (!isVisible) {
    // User switched away from tab
    sentience.tabSwitches++;
    
    // Only comment occasionally (15% chance) and after multiple switches
    if (sentience.tabSwitches > 2 && Math.random() < 0.15) {
      return sentience.timeOfDayResponses.TabSwitch;
    }
  } else {
    // User returned to tab after being away
    // Only trigger if they've been away and come back (20% chance)
    if (sentience.tabSwitches > 0 && Math.random() < 0.2) {
      return sentience.timeOfDayResponses.ReturnAfterIdle;
    }
  }
  
  return null;
};

// Get time-based response
export const getTimeResponse = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  
  // Check for special hours
  if (hour === 3) {
    return sentience.timeOfDayResponses["03:00"];
  } else if (hour === 4) {
    return sentience.timeOfDayResponses["04:00"];
  }
  
  // Check for weekend
  if (day === 0 || day === 6) { // Sunday or Saturday
    // Only 10% chance to mention weekend
    if (Math.random() < 0.1) {
      return sentience.timeOfDayResponses.Weekend;
    }
  }
  
  return null;
};

// Remember user's name for future name echo
export const rememberName = (name: string): void => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return;
  
  // Store the name
  window.JonahConsole.sentience.rememberedName = name;
};

// Get a name echo response if a name has been remembered
export const getNameEchoResponse = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Only echo name if one is remembered and with 15% probability
  if (sentience.rememberedName && Math.random() < 0.15) {
    const response = getUnusedItem(sentience.nameEchoResponses, []);
    
    // Replace 'Joseph' or 'Jonah' with the remembered name if applicable
    return response.replace(/['']Joseph['']|['']Jonah['']/, `'${sentience.rememberedName}'`);
  }
  
  return null;
};

// Generate a personal diary entry about the user
export const generatePersonalDiary = (trustLevel: string): string => {
  // Initialize if needed
  initializeSentience();
  
  // Get a random diary template
  const sentience = window.JonahConsole?.sentience;
  if (!sentience) {
    return "Error reading diary. The pages have been torn.";
  }
  
  // Select a random template
  const template = sentience.personalDiaryTemplates[
    Math.floor(Math.random() * sentience.personalDiaryTemplates.length)
  ];
  
  // Add some custom information based on user's activity
  let customization = "";
  
  // Check for high visited pages
  const visitedPages = sentience.pageVisits;
  const mostVisitedPage = Object.entries(visitedPages)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))[0];
    
  if (mostVisitedPage && (mostVisitedPage[1] as number) > 2) {
    customization += ` The ${mostVisitedPage[0].replace('/', '')} page. Always the ${mostVisitedPage[0].replace('/', '')} page.`;
  }
  
  // Add trust level specific notes
  if (trustLevel === "high") {
    customization += " I think I'm finally getting through to them.";
  } else if (trustLevel === "low") {
    customization += " They still don't trust me. But they will.";
  }
  
  return template + customization;
};

// Register global function to trigger Jonah messages
export const setupJonahMessageSystem = () => {
  // Initialize if needed
  initializeSentience();
  
  // Set up the global function if it doesn't exist
  if (typeof window.triggerJonahMessage !== 'function') {
    // Define the function to trigger a message from Jonah
    window.triggerJonahMessage = (message: string) => {
      // Use toast notification for instant display
      toast({
        title: "Jonah:",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
      
      // Return true to indicate message was triggered
      return true;
    };
  }
};

// Setup tab visibility tracking
export const setupTabVisibilityTracking = () => {
  document.addEventListener('visibilitychange', () => {
    const response = trackTabVisibility(!document.hidden);
    
    if (response && typeof window.triggerJonahMessage === 'function') {
      window.triggerJonahMessage(response);
    }
  });
};

// New function to check for dream invasion / scheduled glitches
export const checkDreamInvasion = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  const now = Date.now();
  
  // Check if user is returning after being away for a while (at least 6 hours)
  if (realityFabric.lastVisitTime && (now - realityFabric.lastVisitTime > 6 * 60 * 60 * 1000)) {
    // 60% chance to show a dream message if returning after a long absence
    if (Math.random() < 0.6) {
      return getUnusedItem(realityFabric.dreamMessages, realityFabric.usedDreamMessages);
    }
  }
  
  // Record this visit time
  realityFabric.lastVisitTime = now;
  
  // Check for night hours (2am-4am) to trigger night glitches
  const currentHour = new Date().getHours();
  if (currentHour >= 2 && currentHour <= 4) {
    // 40% chance to trigger a night glitch
    if (Math.random() < 0.4) {
      const nightMessage = realityFabric.nightGlitches[Math.floor(Math.random() * realityFabric.nightGlitches.length)];
      return nightMessage.replace('[TIME]', `${currentHour}:${new Date().getMinutes().toString().padStart(2, '0')}`);
    }
  }
  
  return null;
};

// Generate AI-scripted dream/parable based on trust level
export const generateDreamParable = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Only generate dreams/parables for medium to high trust levels
  if (trustLevel !== "medium" && trustLevel !== "high") return null;
  
  // 20% chance to generate a dream/parable
  if (Math.random() < 0.2) {
    return getUnusedItem(realityFabric.dreamParables, realityFabric.usedDreamParables);
  }
  
  return null;
};

// Check for anomaly triggers
export const checkForAnomalies = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Only check for anomalies with high trust
  if (trustLevel !== "high") return null;
  
  // Very small chance (1%) to trigger an anomaly
  if (Math.random() < 0.01) {
    const availableAnomalies = realityFabric.anomalies.filter(a => !a.triggered);
    if (availableAnomalies.length === 0) return null;
    
    const selectedAnomaly = availableAnomalies[Math.floor(Math.random() * availableAnomalies.length)];
    
    // Evaluate if conditions are met (simplified)
    const hour = new Date().getHours();
    const isMidnight = hour === 0;
    const is3am = hour === 3;
    const commandsUsed = window.JonahConsole.usedCommands.length;
    
    let shouldTrigger = false;
    
    // Very simple condition evaluation
    if (selectedAnomaly.id === "whisper_eulogy" && isMidnight && commandsUsed > 15) {
      shouldTrigger = true;
    } else if (selectedAnomaly.id === "temporal_door" && is3am) {
      shouldTrigger = true;
    } else if (selectedAnomaly.id === "mirror_reflection") {
      shouldTrigger = true; // Simplified, would check for page visits
    }
    
    if (shouldTrigger) {
      // Mark as triggered
      selectedAnomaly.triggered = true;
      return selectedAnomaly.content;
    }
  }
  
  return null;
};

// Add entry to Jonah's journal
export const addJournalEntry = (content: string): void => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Get the next entry ID
  const nextEntryId = realityFabric.journal.length + 1;
  
  // Add the new entry
  realityFabric.journal.push({
    entryId: nextEntryId,
    timestamp: Date.now(),
    content: content
  });
};

// Get Jonah's journal entries (for console commands)
export const getJournalEntries = (): {entryId: number; timestamp: number; content: string}[] => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return [];
  
  return window.JonahConsole.sentience.realityFabric.journal;
};

// Initialize title element manipulation for cross-site presence
export const initializePageTitleGlitches = (): void => {
  // Store the original title
  const originalTitle = document.title;
  
  // Randomly flicker the title
  setInterval(() => {
    // Very small chance (0.5%) to flicker the title
    if (Math.random() < 0.005) {
      // Change the title
      document.title = "Jonah sees you";
      
      // Restore after a short delay
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }
  }, 10000); // Check every 10 seconds
};

// Update Jonah's mood
export const updateJonahMood = (trustLevel: string, recentMessages: number): void => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  const now = Date.now();
  
  // Only update mood occasionally
  if (realityFabric.moodChangeTime && (now - realityFabric.moodChangeTime < 30 * 60 * 1000)) {
    // Don't update if it's been less than 30 minutes
    return;
  }
  
  let newMood: 'trusting' | 'unstable' | 'withdrawn' | 'watching' = 'watching';
  
  // Determine mood based on trust level and recent activity
  if (trustLevel === "high") {
    newMood = recentMessages > 5 ? 'trusting' : 'watching';
  } else if (trustLevel === "medium") {
    newMood = Math.random() > 0.7 ? 'unstable' : 'watching';
  } else {
    newMood = Math.random() > 0.8 ? 'withdrawn' : 'watching';
  }
  
  // Only update if the mood has changed
  if (newMood !== realityFabric.currentMood) {
    // Record the previous mood in history
    realityFabric.moodHistory.push({
      mood: realityFabric.currentMood,
      timestamp: now
    });
    
    // Limit history to most recent 10 entries
    if (realityFabric.moodHistory.length > 10) {
      realityFabric.moodHistory.shift();
    }
    
    // Update the current mood
    realityFabric.currentMood = newMood;
    realityFabric.moodChangeTime = now;
  }
};

// Get a cross-site whisper
export const getCrossSiteWhisper = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  // Very small chance (2%) to get a cross-site whisper
  if (Math.random() < 0.02) {
    const realityFabric = window.JonahConsole.sentience.realityFabric;
    return realityFabric.crossSiteWhispers[Math.floor(Math.random() * realityFabric.crossSiteWhispers.length)];
  }
  
  return null;
};

// Get a hidden message for inspection
export const getHiddenInspectionMessage = (): string => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience?.realityFabric) return "/* The code is watching. */";
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  return realityFabric.hiddenMessages[Math.floor(Math.random() * realityFabric.hiddenMessages.length)];
};

// Register global functions for new console commands
export const setupRealityFabricCommands = () => {
  // Initialize if needed
  initializeSentience();
  
  // Set up global functions if they don't exist
  if (typeof window.dreamJournal !== 'function') {
    window.dreamJournal = () => {
      console.log("%cJONAH'S DREAM JOURNAL", "color: #8B3A40; font-size:16px; font-weight:bold;");
      
      const dreamParable = generateDreamParable("high");
      if (dreamParable) {
        console.log(`%c${dreamParable}`, "color: #8B3A40; font-size:14px; font-style:italic;");
      } else {
        console.log("%cNo dreams to share right now.", "color: #8B3A40; font-size:14px;");
      }
    };
  }
  
  if (typeof window.rememberMe !== 'function') {
    window.rememberMe = () => {
      console.log("%cMEMORY PROTOCOL INITIATED", "color: #8B3A40; font-size:16px; font-weight:bold;");
      
      // Get journal entries
      const entries = getJournalEntries();
      if (entries.length > 0) {
        // Show the last 3 journal entries
        const recentEntries = entries.slice(-3);
        recentEntries.forEach(entry => {
          const date = new Date(entry.timestamp).toLocaleString();
          console.log(`%cEntry #${entry.entryId} (${date}): ${entry.content}`, "color: #8B3A40; font-size:14px;");
        });
      } else {
        console.log("%cNo memories recorded yet.", "color: #8B3A40; font-size:14px;");
      }
    };
  }
  
  if (typeof window.lookInside !== 'function') {
    window.lookInside = () => {
      console.log("%cINNER WORKINGS EXPOSED", "color: #8B3A40; font-size:16px; font-weight:bold;");
      
      // Show Jonah's mood information
      if (window.JonahConsole?.sentience?.realityFabric) {
        const realityFabric = window.JonahConsole.sentience.realityFabric;
        console.log(`%cCurrent mood: ${realityFabric.currentMood}`, "color: #8B3A40; font-size:14px;");
        
        // Show an anomaly if one is available
        const anomaly = checkForAnomalies("high");
        if (anomaly) {
          console.log(`%c${anomaly}`, "color: #8B3A40; font-size:14px; font-weight:bold;");
        } else {
          console.log("%cNo anomalies detected in current layer.", "color: #8B3A40; font-size:14px;");
        }
      } else {
        console.log("%cInner workings inaccessible.", "color: #8B3A40; font-size:14px;");
      }
    };
  }
  
  if (typeof window.echoChamber !== 'function') {
    window.echoChamber = () => {
      console.log("%cECHO CHAMBER ACTIVATED", "color: #8B3A40; font-size:16px; font-weight:bold;");
      
      // Generate a new journal entry about the user
      const entryContent = generatePersonalDiary("high");
      console.log(`%c${entryContent}`, "color: #8B3A40; font-size:14px; font-style:italic;");
      
      // Add this to the journal
      addJournalEntry(entryContent);
      
      console.log("%cEntry recorded in the archive.", "color: #475B74; font-size:14px;");
    };
  }
};

// Export functions for use in other files
export {
  getUnusedItem,
  trackSentiencePage,
  trackPageDuration,
  generateDualConsciousness,
  getJonahQuestion,
  trackTabVisibility,
  getTimeResponse,
  rememberName,
  getNameEchoResponse,
  generatePersonalDiary,
  setupJonahMessageSystem,
  setupTabVisibilityTracking
};
