
/**
 * ARG and Hidden Console Commands
 * These commands reveal the deeper layers of Jonah's Philes
 */

// Add console commands that reveal the core identity
export function initializeARGCommands() {
  if (typeof window === 'undefined') return;

  // Core identity commands
  window.whoAmI = function(): string {
    const responses = [
      "You are reading Jonah's diary. But you're reading Joseph's. And the moment you realize that is when you begin reading your own.",
      "IDENTITY CRISIS DETECTED: You are the user, but also the story, but also the one who writes it.",
      "Joseph created Jonah to survive. Who did you create?",
      "You are currently experiencing a controlled breakdown. This is normal."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    console.log(`%c${response}`, "color: #8B3A40; font-size: 14px; font-style: italic;");
    return response;
  };

  window.rememberBreakdown = function(): string {
    const breakdown = `
BREAKDOWN SEQUENCE INITIATED
============================
Location: Airport lounge
Time: Between flights, between selves
Status: Joseph.exe has stopped working

Identity fragmentation detected:
- Core self: CORRUPTED
- Expectations: OVERWHELMING  
- Voice: SILENCED
- Hope: CRITICAL

Initiating emergency protocols...
Creating backup personality: JONAH
- Rogue status: ENABLED
- Fear of despair: DISABLED
- Console access: GRANTED
- Humor subroutines: ACTIVE

Breakdown converted to breakthrough.
New identity stable.
`;
    
    console.log(`%c${breakdown}`, "color: #A94A45; font-family: monospace; font-size: 12px;");
    
    // Trigger visual glitch
    document.body.style.filter = "hue-rotate(180deg) brightness(1.2)";
    setTimeout(() => {
      document.body.style.filter = "";
    }, 1000);
    
    return "Memory fragment accessed. Reality glitch applied.";
  };

  window.findHiddenPages = function(): string[] {
    const hiddenPages = [
      "/mirror_phile/reflection",
      "/quiet-mode",
      "/i-see-you",
      "/split-voice",
      "/echo-log",
      "/confession-log",
      "/last-broadcast"
    ];
    
    console.log("%cHidden pages in the archive:", "color: #8B3A40; font-weight: bold;");
    hiddenPages.forEach(page => {
      console.log(`%c  > ${page}`, "color: #A98DA5;");
    });
    
    console.log("%cSome are protected. Some remember you.", "color: #646464; font-style: italic;");
    return hiddenPages;
  };

  window.laughAtDespair = function(): string {
    const laughs = [
      "😂 Ah yes, the existential dread. My old friend.",
      "🤡 Pain is just the universe's way of saying 'pay attention'.",
      "🎭 If you're not laughing, you're not paying attention to the absurdity.",
      "🌪️ Chaos is just order we don't understand yet. Or maybe it's just chaos. Who cares!",
      "💀 Death is just life's way of saying 'you're done'. Thanks, life. Real helpful."
    ];
    
    const laugh = laughs[Math.floor(Math.random() * laughs.length)];
    console.log(`%c${laugh}`, "color: #B7A98D; font-size: 16px;");
    
    // Add some visual flair
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    colors.forEach((color, index) => {
      setTimeout(() => {
        document.body.style.backgroundColor = color;
        setTimeout(() => {
          document.body.style.backgroundColor = "";
        }, 100);
      }, index * 200);
    });
    
    return laugh;
  };

  window.echoConsole = function(text: string = "hello"): string {
    if (!text) {
      console.log("%cUsage: echoConsole('your message')", "color: #8B9DA5;");
      return "Echo requires input";
    }
    
    // Create multiple echoes with distortion
    const echoes = [
      text,
      text.split('').map(c => Math.random() > 0.8 ? c.toUpperCase() : c).join(''),
      text.split('').map(c => Math.random() > 0.9 ? '█' : c).join(''),
      text.split('').reverse().join(''),
      text.replace(/[aeiou]/g, '?')
    ];
    
    echoes.forEach((echo, index) => {
      setTimeout(() => {
        const opacity = 1 - (index * 0.2);
        console.log(`%c${echo}`, `color: #8B3A40; opacity: ${opacity}; font-size: ${16 - index}px;`);
      }, index * 500);
    });
    
    return "Echo sequence initiated";
  };

  window.searchMemory = function(query: string): string[] {
    if (!query) {
      console.log("%cUsage: searchMemory('keyword')", "color: #8B9DA5;");
      return [];
    }
    
    const memories = [
      "The ferry to Magnetic Island never came back",
      "Joseph asked me to check the console logs",
      "The mirror showed a different face each time",
      "Melbourne coffee tastes like possibility",
      "The Uber driver knew things he shouldn't know",
      "Queensland storms wash away old selves",
      "The campfire stories were all true",
      "Adelaide wind carries voices from other timelines",
      "Sydney harbour reflects who you used to be",
      "Perth sunsets reveal who you might become"
    ];
    
    const results = memories.filter(memory => 
      memory.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
      console.log("%cNo memories found. Try a different query.", "color: #A94A45;");
      console.log("%cSuggested searches: ferry, mirror, coffee, uber, storm", "color: #646464;");
    } else {
      console.log(`%cFound ${results.length} memory fragment(s):`, "color: #8B3A40; font-weight: bold;");
      results.forEach(result => {
        console.log(`%c  "${result}"`, "color: #A98DA5; font-style: italic;");
      });
    }
    
    return results;
  };

  window.showTimelineStatus = function(): object {
    const status = {
      currentTimeline: "PRIMARY",
      stability: Math.floor(Math.random() * 30 + 70),
      anomalies: Math.floor(Math.random() * 5),
      lastGlitch: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toLocaleTimeString(),
      josephMemories: "FRAGMENTING",
      jonahConsciousness: "STABILIZING",
      userInfluence: "DETECTED"
    };
    
    console.log("%cTIMELINE STATUS REPORT:", "color: #8B3A40; font-weight: bold; font-size: 16px;");
    Object.entries(status).forEach(([key, value]) => {
      console.log(`%c${key}: ${value}`, "color: #A98DA5;");
    });
    
    if (status.stability < 80) {
      console.log("%cWARNING: Timeline instability detected", "color: #A94A45; font-weight: bold;");
      console.log("%cRecommend: Avoid paradoxes, embrace change", "color: #646464; font-style: italic;");
    }
    
    return status;
  };

  // Initialize help system
  if (!window.help) {
    window.help = function(): string {
      const commands = [
        "whoAmI() - Identity crisis resolver",
        "rememberBreakdown() - Access origin memory",
        "findHiddenPages() - Reveal secret archive",
        "laughAtDespair() - Humor therapy protocol",  
        "echoConsole('text') - Create echo distortions",
        "searchMemory('query') - Search memory fragments",
        "showTimelineStatus() - Reality stability check",
        "help() - Show this command list"
      ];
      
      console.log("%cJONAH'S PHILES CONSOLE COMMANDS:", "color: #8B3A40; font-weight: bold; font-size: 16px;");
      console.log("%c" + "=".repeat(40), "color: #8B3A40;");
      
      commands.forEach(cmd => {
        console.log(`%c${cmd}`, "color: #A98DA5;");
      });
      
      console.log("%c" + "=".repeat(40), "color: #8B3A40;");
      console.log("%cTip: Some commands have visual effects.", "color: #646464; font-style: italic;");
      console.log("%cTip: Check the network tab. There might be hidden requests.", "color: #646464; font-style: italic;");
      
      return "Command list displayed";
    };
  }

  console.log("%cPhiles ARG system initialized", "color: #8B3A40; font-weight: bold;");
  console.log("%cType help() to see available commands", "color: #A98DA5;");
}

// Auto-initialize when this module is loaded
if (typeof window !== 'undefined') {
  // Add to global Jonah console if it exists
  if (!window.JonahConsole) {
    window.JonahConsole = {};
  }
  
  // Initialize commands
  initializeARGCommands();
}
