
/**
 * Story about Griff & Trigger saving the day
 */

import { typewriterLog, speak } from './consoleEffects';

export function playGriffTriggerStory(): void {
  const story = [
    "The sun beat down on Horseshoe Bay as Jonah watched from beneath a palm tree.",
    "\"Something's not right with those jet skis,\" he muttered.",
    "Griff appeared beside him, wetsuit halfway down, sun-bleached hair wild.",
    "\"Mate, those tourists are heading straight for the reef closure. They're going to tear it up.\"",
    "Before Jonah could respond, Griff whistled sharply. A black labrador emerged from the shade.",
    "\"Trigger! Water patrol!\"",
    "The dog barked once, then bolted into the surf with surprising speed.",
    "\"You're not serious,\" Jonah said. \"Your dog can't stop jet skis.\"",
    "Griff just grinned. \"Watch.\"",
    "Trigger swam with purpose, intercepting the jet skis' path. When close enough, he began swimming in tight circles, creating an unnatural whirlpool.",
    "The jet ski drivers slowed, confused by the strange water pattern and the dog at its center.",
    "Griff waded in, looking official in his half-wetsuit. \"Protected reef zone, fellas! Turn it around!\"",
    "They complied, clearly bewildered.",
    "Later, as the sun set, Jonah asked, \"How did Trigger create that whirlpool?\"",
    "Griff just scratched the lab behind the ears. \"Some things in Australia don't need explaining. Especially not on Maggie Island.\"",
    "Trigger's eyes caught the last light of day, reflecting gold, then an impossible emerald green."
  ];

  console.log("%c𝙂𝙧𝙞𝙛𝙛 & 𝙏𝙧𝙞𝙜𝙜𝙚𝙧 𝙎𝙖𝙫𝙚 𝙩𝙝𝙚 𝘿𝙖𝙮", "color: #47AB7B; font-size:18px; font-weight:bold;");
  
  // Speak a condensed version of the story
  speak("Griff and his dog Trigger stopped jet skis from damaging the reef using mysterious powers. Some things in Australia don't need explaining, especially not on Magnetic Island.");
  
  // Display the full story with typewriter effect
  let delay = 0;
  story.forEach((line, index) => {
    delay += (line.length * 30) + 1000;
    setTimeout(() => {
      console.log(`%c${line}`, "color: #47AB7B; font-size:14px;");
      
      // Add a visual separator between story sections
      if (index === 4 || index === 9 || index === 14) {
        setTimeout(() => {
          console.log("%c. . .", "color: #47AB7B; font-size:14px; text-align: center;");
        }, 500);
      }
      
    }, delay);
  });
  
  // End with a flourish
  setTimeout(() => {
    console.log("%cEnd of story.", "color: #8B3A40; font-size:14px; font-style:italic;");
  }, delay + 2000);
}
