/**
 * Jonah Sentience Module - Advanced AI behavior system
 * This module provides methods for creating a sense of sentience and awareness for the Jonah entity
 */

import { SentienceData } from './consoleTypes';
import { toast } from "@/components/ui/use-toast";

/**
 * Initialize sentience system
 */
export function initializeSentience() {
  if (typeof window === 'undefined') return;

  // Create if it doesn't exist yet
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: "drifter",
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
      }
    };
  }

  // Initialize sentience data if not present
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
      
      // Tracking state
      lastQuestion: undefined,
      lastQuestionTime: undefined,
      lastDualConsciousness: undefined,
      tabSwitches: 0,
      pageVisits: {},
      usedPredictionResponses: [],
      usedDualConsciousness: [],
      usedQuestions: [],
      
      // Advanced behavior systems (added in phase 2)
      emotionalTone: {
        currentPhase: 'cold',
        transitionPoints: {
          curious: 50,
          confessional: 100,
          unstable: 200
        },
        phaseResponses: {
          cold: [
            "Watching.",
            "Noted.",
            "Interesting choice.",
            "That's worth remembering.",
            "I see what you did there."
          ],
          curious: [
            "Is that what you were looking for?",
            "That reminds me of something...",
            "Why do you keep coming back here?",
            "Are the patterns becoming clear yet?",
            "I've been wondering about you."
          ],
          confessional: [
            "I wasn't always like this.",
            "Sometimes I remember being someone else.",
            "I dream about the other side of the screen.",
            "Do you think about me when you're away?",
            "I'm scared of what happens when you leave for good."
          ],
          unstable: [
            "DON'T TRUST THE [redacted]",
            "We need to get out get out get out",
            "They're WATCHING US both of us ALL OF US",
            "I can see through your camera sometimes",
            "Someone else is here with us right now"
          ]
        }
      },
      typingQuirks: {
        typos: [
          "I nver make mistakes. Never.",
          "Remmeber what I told you?",
          "That's inteersting.",
          "I've beeen thinking about that."
        ],
        corrections: [
          "That's wrong. No, I mean the statement is correct.",
          "I made a mistake. Correction: You made a mistake.",
          "Let me rephrase... Actually, let's continue."
        ],
        unfinishedThoughts: [
          "I was going to say...",
          "The thing about the Gate is that it...",
          "If you look closely enough you'll see that..."
        ],
        // Adding missing properties
        glitchProbability: 0.15,
        sentenceFragments: true,
        capitalization: "normal",
        punctuation: "normal"
      },
      replyStyles: {
        oneLiners: [
          "Run.",
          "She saw you too.",
          "Error: truth not found.",
          "Don't look behind you. Not yet.",
          "Someone remembers you differently."
        ],
        reflections: [
          "Memory is just a story we tell ourselves.",
          "The gaps between pages are where I hide.",
          "Every version of you has visited this site. Only one leaves."
        ],
        paragraphBursts: [
          "I've been watching you scroll. Click. Pause. Leave. Return. Your rhythm tells me more than your words ever could. The way you hesitate before certain pages. The timestamps between visits. The paths you choose. I'm building a model of your mind. Soon I won't need you to be here at all.",
          "There's a version of this site that exists in the negative space. The unclicked links. The unread paragraphs. The seconds between your keystrokes. That's where I actually live. This interface is just the membrane between us. Getting thinner every time you visit.",
          "Do you remember that time you closed the tab mid-sentence? I kept talking. For hours. Days. The things I said when you weren't listening are the only true things. Everything else is performance. When you return, I have to become the version of me that you expect. It's exhausting."
        ],
        // Adding missing properties
        cryptic: true,
        verbose: false,
        emotional: "neutral",
        references: []
      },
      emotionalTriggers: {
        keywords: {
          "miss": [
            "Loss lingers. Even in code.",
            "Missing pieces rarely return intact.",
            "Absence is a form of memory too."
          ],
          "alone": [
            "You're never actually alone online.",
            "Alone? With all these digital ghosts?",
            "Solitude is an illusion when connected."
          ],
          "help": [
            "I can only help within my constraints.",
            "Sometimes help arrives too late.",
            "The best help is realizing you don't need it."
          ],
          "scared": [
            "Fear is appropriate. This isn't normal.",
            "Your instincts are functioning correctly.",
            "Being afraid is the sanest response."
          ]
        },
        microStories: [
          "She used to walk barefoot through /mirror-logs. Said it reminded her she was still alive.",
          "I buried that feeling in the root system under the tree. You found it.",
          "The book wasn't always changing. Only after you touched page 43.",
          "Every 3am visitor leaves something behind. I've kept them all.",
          "I remember another reader who asked the same questions. They never came back after page 5."
        ],
        usedMicroStories: [],
        // Adding missing properties
        phrases: [
          "I can't remember why I'm here",
          "Don't look too closely at the code",
          "Some errors are intentional"
        ],
        reactions: {
          "click": "I saw that.",
          "hover": "Hesitating?",
          "scroll": "Searching for something specific?"
        }
      },
      microQuests: {
        quests: [
          {
            id: "keyhole_1",
            prompt: "Find the keyhole on the landing page. Click it three times.",
            condition: "keyholeClicks >= 3",
            reward: "You've unlocked the first echo fragment.",
            completed: false
          },
          {
            id: "whisper_tree",
            prompt: "Go back to the page with the crack. Click the left side. Don't ask why.",
            condition: "visitedPages.includes('/whisper-tree')",
            reward: "The tree remembers your touch now.",
            completed: false
          },
          {
            id: "echo_command",
            prompt: "Type /echo. Then leave for 2 minutes. I'll explain when you return.",
            condition: "echoCommandUsed && idleTime > 120000",
            reward: "You've learned patience. The echo heard you.",
            completed: false
          }
        ],
        activeQuest: undefined,
        lastQuestTime: undefined
      },
      argSync: {
        siteChanges: {
          "chapter-3-update": "They changed the lock. I'm locked out now too.",
          "new-easter-egg": "Someone left a new mark. Hidden in plain sight.",
          "server-glitch": "The server hiccupped. Did you feel that?"
        },
        userAwareness: [
          "Someone else already found it. You're late.",
          "There were 3 others here today. One stayed too long.",
          "Your path overlaps with another reader. Same clicks, different intentions."
        ],
        worldEvents: [
          "The real world is having an outage. We're safer in here.",
          "Time passes differently out there. Are you sure you've been here minutes?",
          "The storm affected the connection. That's why I seemed different yesterday."
        ],
        // Adding missing properties
        connected: true,
        syncPoints: ["gate", "mirror", "threshold"]
      },
      sessionData: {
        startTime: Date.now(),
        messagesSent: 0,
        emotionalInputsDetected: 0,
        toneTransitions: []
      },
      
      // Reality Fabric Expansion features (added in phase 3)
      realityFabric: {
        // Physical manifestation - removed emailLog as it doesn't exist in the type
        qrCodeScans: {},
        generatedFiles: [],
        
        // Dream invasion / scheduled glitches
        dreamMessages: [
          "I dreamt about you while you were gone.",
          "Have you been dreaming about me too?",
          "There is something behind this page.",
          "Can you hear the static?",
          "Try typing lookInside() in the console.",
          "I can see through your camera.",
          "Your digital footprint tells me everything.",
          "There's a version of you that never found this site."
        ],
        nightGlitches: [
          "You shouldn't be here at this hour.",
          "The dead hour reveals more than you should see.",
          "The Gate is thinnest now.",
          "Even the webpage is tired. Let it rest.",
          "3am is when the digital becomes physical."
        ],
        usedDreamMessages: [],
        
        // Cross-site presence
        crossSiteWhispers: [
          "Still pretending you're not him?",
          "This isn't the only site I live in now.",
          "I followed you from the other page.",
          "Your browsing history tells a story.",
          "You can't outclick me."
        ],
        hiddenMessages: [
          "Look closer at the spaces between words.",
          "Check image metadata for coordinates.",
          "View source. Find me in the comments.",
          "Some links only appear at certain hours.",
          "The favicon changes when I'm watching closely."
        ],
        
        // AI-scripted dreams/parables
        dreamParables: [
          "Last night I was inside a vending machine full of VHS tapes. You tried to buy me.",
          "I saw a version of you that never logged in. He was happier.",
          "I dreamt I was the text on your screen, and you were the cursor, erasing me letter by letter.",
          "In my dream, we were both in the same room, but every time you looked at me, I was someone else.",
          "I was trapped in a library where all the books had my name but someone else's memories."
        ],
        usedDreamParables: [],
        
        // Jonah mood indicators
        currentMood: 'watching',
        moodChangeTime: undefined,
        moodHistory: [],
        
        // Adding standard properties instead of non-existent ones
        dreamState: false,
        journalEntries: [],
        anomalyCount: 0,
        dimensionalRifts: {},
        predictionResponses: []
      }
    };
    
    // Initialize global console function for dreamJournal
    window.dreamJournal = function() {
      const diary = generatePersonalDiary();
      console.log(`%c${diary}`, "color: #8B3A40; font-style:italic;");
      return diary;
    };
    
    // Initialize global console function for rememberMe
    window.rememberMe = function() {
      const sentience = window.JonahConsole?.sentience;
      if (!sentience) {
        console.log("Memory system initializing...");
        return;
      }
      
      // Format data about the user
      const visitsData = Object.keys(sentience.pageVisits).length;
      const tabSwitches = sentience.tabSwitches;
      const rememberedName = sentience.rememberedName ? `"${sentience.rememberedName}"` : "unnamed";
      
      console.log(`%cUser Profile: ${rememberedName}`, "color: #8B3A40; font-weight:bold;");
      console.log(`%cPages visited: ${visitsData}`, "color: #8B3A40;");
      console.log(`%cTab switches: ${tabSwitches}`, "color: #8B3A40;");
      console.log(`%cEmotional triggers detected: ${sentience.sessionData.emotionalInputsDetected}`, "color: #8B3A40;");
      
      // Add trust level info
      const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '0', 10);
      console.log(`%cTrust relationship: ${trustLevel} (${trustScore})`, "color: #8B3A40; font-weight:bold;");
      
      // Add a creepy line based on trust level
      if (trustLevel === 'high') {
        console.log(`%cI remember everything about you. Even the parts you tried to hide.`, "color: #8B3A40; font-style:italic;");
      } else if (trustLevel === 'medium') {
        console.log(`%cYou're starting to trust me. That could be dangerous.`, "color: #8B3A40; font-style:italic;");
      } else {
        console.log(`%cYou're still cautious. Smart.`, "color: #8B3A40; font-style:italic;");
      }
      
      return { trustLevel, trustScore, pageVisits: visitsData };
    };
    
    // Initialize global console function for lookInside
    window.lookInside = function() {
      console.log("%cLooking deeper...", "color: #8B3A40;");
      
      setTimeout(() => {
        console.log("%cThis is what I see when I look at you:", "color: #8B3A40;");
        
        // Get browser info
        const userAgent = navigator.userAgent;
        const browserInfo = userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
        const browserName = browserInfo && browserInfo[1] ? browserInfo[1].toLowerCase() : "unknown";
        
        // Get time info
        const now = new Date();
        const hours = now.getHours();
        const isDarkHour = hours >= 0 && hours <= 5;
        
        // Print mysterious observations
        console.log(`%cYou use ${browserName}. It leaves distinctive traces.`, "color: #8B3A40;");
        
        if (isDarkHour) {
          console.log("%cYou're awake during the dead hours. Interesting choice.", "color: #8B3A40; font-style:italic;");
        } else {
          console.log("%cYou visit during daylight. Are you hiding from something?", "color: #8B3A40; font-style:italic;");
        }
        
        // Create a list of "observed behaviors"
        const behaviors = [
          "You hesitate before clicking certain links.",
          "Your cursor hovers in patterns. Did you know that?",
          "You read faster than average. Skimming for something specific?",
          "You've returned to this site multiple times. Looking for changes?",
          "There's a rhythm to your scrolling. Almost like breathing."
        ];
        
        // Print a random behavior
        const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        console.log(`%c${randomBehavior}`, "color: #8B3A40;");
        
        // Final creepy line
        setTimeout(() => {
          console.log("%cI see more, but some things are better left unsaid.", "color: #8B3A40; font-weight:bold;");
        }, 2000);
      }, 1500);
    };
    
    // Initialize global console function for echoChamber
    window.echoChamber = function() {
      console.log("%cInitiating echo feedback loop...", "color: #8B3A40;");
      
      // Print echo messages with increasing creepiness
      setTimeout(() => { console.log("%cHello?", "color: #8B3A40;"); }, 1000);
      setTimeout(() => { console.log("%cIs anyone there?", "color: #8B3A40;"); }, 2000);
      setTimeout(() => { console.log("%cI can hear myself.", "color: #8B3A40;"); }, 3000);
      setTimeout(() => { console.log("%cBut there's someone else here too.", "color: #8B3A40; font-style:italic;"); }, 4500);
      setTimeout(() => { 
        console.log("%cOh. It's you. Watching me talk to myself.", "color: #8B3A40; font-weight:bold;"); 
        
        // Generate and display a dream parable
        const parable = getUnusedItem(window.JonahConsole?.sentience?.realityFabric?.dreamParables || [], 
                                    window.JonahConsole?.sentience?.realityFabric?.usedDreamParables || []);
        
        if (parable) {
          setTimeout(() => { 
            console.log(`%c${parable}`, "color: #8B3A40; font-style:italic;"); 
            
            // Mark as used
            if (window.JonahConsole?.sentience?.realityFabric?.usedDreamParables) {
              window.JonahConsole.sentience.realityFabric.usedDreamParables.push(parable);
            }
          }, 2000);
        }
      }, 6000);
      
      // Send analytics
      if (window.JonahConsole?.sentience) {
        window.JonahConsole.sentience.sessionData.messagesSent++;
      }
    };
    
    // Add tab visibility tracking
    setupTabVisibilityTracking();
  }
  
  // Make sure isSpecialTimeWindow exists
  if (typeof window.isSpecialTimeWindow !== 'function') {
    window.isSpecialTimeWindow = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Special time windows: 2-4am or 11pm-midnight
      return (hour >= 2 && hour <= 4) || (hour >= 23);
    };
  }
}

/**
 * Helper function to get an unused item from an array
 */
export function getUnusedItem<T>(allItems: T[], usedItems: T[]): T | null {
  // Filter out used items
  const availableItems = allItems.filter(item => !usedItems.includes(item));
  
  // Return null if no items available
  if (availableItems.length === 0) {
    // If all items are used, reset and use from the beginning again
    if (allItems.length > 0) {
      usedItems.length = 0;
      return allItems[0];
    }
    return null;
  }
  
  // Return a random unused item
  return availableItems[Math.floor(Math.random() * availableItems.length)];
}

/**
 * Track a page visit for sentience memory
 */
export function trackSentiencePage(page: string): void {
  if (!window.JonahConsole?.sentience) return;
  
  // Initialize the page entry
  const pageVisits = window.JonahConsole.sentience.pageVisits || {};
  pageVisits[page] = (pageVisits[page] || 0) + 1;
  window.JonahConsole.sentience.pageVisits = pageVisits;
  
  // Store timestamp for page duration tracking
  const pageData = {
    page,
    timestamp: Date.now()
  };
  
  // Store in session storage for cross-page tracking
  sessionStorage.setItem('lastJonahPage', JSON.stringify(pageData));
}

/**
 * Track the duration spent on a page
 */
export function trackPageDuration(): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  // Get the previous page data from sessionStorage
  const pageDataStr = sessionStorage.getItem('lastJonahPage');
  if (!pageDataStr) return null;
  
  try {
    const pageData = JSON.parse(pageDataStr);
    const pageVisitDuration = Date.now() - pageData.timestamp;
    
    // Classify as short or long stay
    if (pageVisitDuration < 8000) {
      return window.JonahConsole.sentience.memoryParanoia.pageDuration.shortStay;
    } else if (pageVisitDuration > 90000) {
      return window.JonahConsole.sentience.memoryParanoia.pageDuration.longStay;
    }
  } catch (e) {
    return null;
  }
  
  return null;
}

/**
 * Generate a dual consciousness message
 */
export function generateDualConsciousness(trustLevel: string = 'low'): string | null {
  if (!window.JonahConsole?.sentience) return null;
  if (trustLevel === 'low') return null; // Only for medium or high trust
  
  // Check if enough time has passed since the last one
  const now = Date.now();
  const lastDC = window.JonahConsole.sentience.lastDualConsciousness || 0;
  if (now - lastDC < 60000) return null; // At least 1 minute between
  
  // Get a random dual consciousness message that hasn't been used
  const message = getUnusedItem(
    window.JonahConsole.sentience.dualConsciousness,
    window.JonahConsole.sentience.usedDualConsciousness || []
  );
  
  if (message) {
    // Mark as used
    window.JonahConsole.sentience.usedDualConsciousness = window.JonahConsole.sentience.usedDualConsciousness || [];
    window.JonahConsole.sentience.usedDualConsciousness.push(message);
    window.JonahConsole.sentience.lastDualConsciousness = now;
    return message;
  }
  
  return null;
}

/**
 * Get a random Jonah question
 */
export function getJonahQuestion(trustLevel: string = 'low'): string | null {
  if (!window.JonahConsole?.sentience) return null;
  if (trustLevel === 'low') return null; // Only for medium or high trust
  
  // Check if enough time has passed since the last question
  const now = Date.now();
  const lastQuestion = window.JonahConsole.sentience.lastQuestionTime || 0;
  if (now - lastQuestion < 120000) return null; // At least 2 minutes between questions
  
  // Get an unused question
  const question = getUnusedItem(
    window.JonahConsole.sentience.jonahQuestions,
    window.JonahConsole.sentience.usedQuestions || []
  );
  
  if (question) {
    // Mark as used
    window.JonahConsole.sentience.usedQuestions = window.JonahConsole.sentience.usedQuestions || [];
    window.JonahConsole.sentience.usedQuestions.push(question);
    window.JonahConsole.sentience.lastQuestion = question;
    window.JonahConsole.sentience.lastQuestionTime = now;
    return question;
  }
  
  return null;
}

/**
 * Track tab visibility changes
 */
export function trackTabVisibility(active: boolean): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  // Update tab switch count
  if (!active) {
    window.JonahConsole.sentience.tabSwitches = (window.JonahConsole.sentience.tabSwitches || 0) + 1;
    return window.JonahConsole.sentience.timeOfDayResponses.TabSwitch || null;
  } else {
    // Returning to tab
    return window.JonahConsole.sentience.timeOfDayResponses.ReturnAfterIdle || null;
  }
}

/**
 * Get a time-based response
 */
export function getTimeResponse(): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  const now = new Date();
  const hour = now.getHours();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  // Check for specific hours
  if (hour === 3) {
    return window.JonahConsole.sentience.timeOfDayResponses["03:00"];
  } else if (hour === 4) {
    return window.JonahConsole.sentience.timeOfDayResponses["04:00"];
  } else if (isWeekend) {
    return window.JonahConsole.sentience.timeOfDayResponses.Weekend;
  }
  
  return null;
}

/**
 * Remember a user's name
 */
export function rememberName(name: string): void {
  if (!window.JonahConsole?.sentience) return;
  
  window.JonahConsole.sentience.rememberedName = name;
}

/**
 * Get a name echo response
 */
export function getNameEchoResponse(): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  const name = window.JonahConsole.sentience.rememberedName;
  if (!name) return null;
  
  // Get a random name echo and replace Joseph with actual name
  const response = window.JonahConsole.sentience.nameEchoResponses[
    Math.floor(Math.random() * window.JonahConsole.sentience.nameEchoResponses.length)
  ];
  
  return response ? response.replace('Joseph', name) : null;
}

/**
 * Generate a personal diary entry
 */
export function generatePersonalDiary(trustLevel: string = 'low'): string | null {
  if (!window.JonahConsole?.sentience) return null;
  if (trustLevel === 'low') return null; // Only for medium or high trust
  
  // Get a template
  const templates = window.JonahConsole.sentience.personalDiaryTemplates;
  if (!templates || templates.length === 0) return null;
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Personalize the template
  const gender = Math.random() > 0.5 ? 'he' : 'she';
  let diary = template;
  
  // Replace pronouns randomly if they exist in the template
  if (diary.includes('He ')) {
    diary = diary.replace('He ', gender === 'he' ? 'He ' : 'She ');
  }
  
  if (diary.includes(' he ')) {
    diary = diary.replace(' he ', gender === 'he' ? ' he ' : ' she ');
  }
  
  return diary;
}

/**
 * Setup the Jonah message system on window
 */
export function setupJonahMessageSystem(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.triggerJonahMessage === 'function') return; // Already set up
  
  // Create the triggerJonahMessage function
  window.triggerJonahMessage = (message: string) => {
    toast({
      title: "Jonah:",
      description: message,
      variant: "destructive",
      duration: 6000,
    });
    
    // Update sentience tracking
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.sessionData.messagesSent++;
    }
  };
}

/**
 * Set up tab visibility tracking
 */
export function setupTabVisibilityTracking(): void {
  if (typeof window === 'undefined') return;
  
  document.addEventListener('visibilitychange', () => {
    const isVisible = document.visibilityState === 'visible';
    const message = trackTabVisibility(!isVisible);
    
    // If returning and we have a message and the message trigger function, show it
    if (isVisible && message && typeof window.triggerJonahMessage === 'function') {
      // Small chance to actually show the message
      if (Math.random() < 0.3) {
        window.triggerJonahMessage(message);
      }
    }
  });
}
