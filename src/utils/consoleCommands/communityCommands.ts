
/**
 * Community Console Commands
 * Commands related to the community and campfire features
 */

export function initializeCommunityCommands() {
  // Campfire whisper command
  window.campfire = {
    whisper: (message: string) => {
      if (!message) {
        console.log('%cUsage: campfire.whisper("your anonymous message")', 'color: #f97316;');
        return;
      }
      
      // Store whisper
      const whispers = JSON.parse(localStorage.getItem('whisper_wall') || '[]');
      const newWhisper = {
        id: Date.now().toString(),
        content: message,
        timestamp: Date.now()
      };
      
      whispers.unshift(newWhisper);
      localStorage.setItem('whisper_wall', JSON.stringify(whispers.slice(0, 50)));
      
      console.log('%cWhisper sent to the collective...', 'color: #f97316; font-style: italic;');
      console.log(`%c"${message}"`, 'color: #fed7aa; font-style: italic;');
    },

    mood: (mood?: string) => {
      const moods = ['contemplative', 'seeking', 'melancholic', 'hopeful', 'angry', 'peaceful', 'confused', 'healing'];
      
      if (!mood) {
        console.log('%cAvailable moods:', 'color: #f97316;');
        moods.forEach(m => console.log(`%c  • ${m}`, 'color: #fed7aa;'));
        console.log('%cUsage: campfire.mood("contemplative")', 'color: #f97316;');
        return;
      }
      
      if (!moods.includes(mood.toLowerCase())) {
        console.log('%cMood not recognized. Use campfire.mood() to see available options.', 'color: #ef4444;');
        return;
      }
      
      // Store mood
      const moodData = JSON.parse(localStorage.getItem('user_moods') || '[]');
      moodData.unshift({
        mood: mood.toLowerCase(),
        timestamp: Date.now()
      });
      localStorage.setItem('user_moods', JSON.stringify(moodData.slice(0, 100)));
      
      console.log(`%cMood logged: ${mood}`, 'color: #f97316;');
      console.log('%cThe collective mood shifts...', 'color: #fed7aa; font-style: italic;');
    },

    support: () => {
      console.log('%c◉ CRISIS SUPPORT RESOURCES ◉', 'color: #ef4444; font-weight: bold;');
      console.log('%cIf you are in immediate danger, please contact local emergency services.', 'color: #ef4444;');
      console.log('');
      console.log('%cCrisis Text Line: Text HOME to 741741', 'color: #22c55e;');
      console.log('%cNational Suicide Prevention Lifeline: 988', 'color: #22c55e;');
      console.log('%cTrans Lifeline: 877-565-8860', 'color: #22c55e;');
      console.log('%cTrevor Project (LGBTQ youth): 1-866-488-7386', 'color: #22c55e;');
      console.log('');
      console.log('%cRemember: You are not alone. Your story matters.', 'color: #a855f7; font-style: italic;');
    },

    stats: () => {
      const whispers = JSON.parse(localStorage.getItem('whisper_wall') || '[]');
      const moods = JSON.parse(localStorage.getItem('user_moods') || '[]');
      const role = localStorage.getItem('user_role') || 'seeker';
      
      console.log('%c◉ CAMPFIRE STATISTICS ◉', 'color: #f97316; font-weight: bold;');
      console.log(`%cYour role: ${role}`, 'color: #fed7aa;');
      console.log(`%cWhispers on wall: ${whispers.length}`, 'color: #fed7aa;');
      console.log(`%cYour moods logged: ${moods.length}`, 'color: #fed7aa;');
      console.log(`%cLast mood: ${moods[0]?.mood || 'none'}`, 'color: #fed7aa;');
    }
  };

  // Community analytics command
  window.communityPulse = () => {
    const whispers = JSON.parse(localStorage.getItem('whisper_wall') || '[]');
    const moods = JSON.parse(localStorage.getItem('user_moods') || '[]');
    
    console.log('%c◉ COMMUNITY PULSE ◉', 'color: #a855f7; font-weight: bold;');
    console.log(`%cActive whispers: ${whispers.length}`, 'color: #c084fc;');
    console.log(`%cMoods tracked: ${moods.length}`, 'color: #c084fc;');
    console.log('%cCollective status: Healing in progress...', 'color: #c084fc; font-style: italic;');
    
    // Show recent activity
    if (whispers.length > 0) {
      console.log('%cRecent whispers:', 'color: #a855f7;');
      whispers.slice(0, 3).forEach((w, i) => {
        const timeAgo = Math.floor((Date.now() - w.timestamp) / 60000);
        console.log(`%c  "${w.content.substring(0, 50)}..." (${timeAgo}m ago)`, 'color: #e9d5ff;');
      });
    }
  };

  console.log('%cCampfire commands loaded: campfire.whisper(), campfire.mood(), campfire.support(), campfire.stats()', 'color: #f97316;');
}
