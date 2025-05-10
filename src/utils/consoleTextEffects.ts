
/**
 * Console text effects for immersive text presentation
 */

/**
 * Log text with a typewriter effect
 */
export function typewriterLog(text: string, speed = 40, callback: (() => void) | null = null): void {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      const chunk = text.slice(0, i + 1);
      console.clear();
      console.log(chunk);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

/**
 * Log text with a flickering effect
 */
export function flickerLog(text: string, delay = 50): void {
  let output = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      output += text[i];
      console.clear();
      console.log(output + ((i % 2 === 0) ? "|" : " "));
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => console.log(text), 100);
    }
  }, delay);
}

/**
 * Log multiple messages with delays between them
 */
export function delayedLog(messages: string[], initialDelay = 500, step = 1000): void {
  messages.forEach((msg, index) => {
    setTimeout(() => console.log(msg), initialDelay + index * step);
  });
}

/**
 * Create glitched text by replacing random characters with noise symbols
 */
export function glitchText(text: string, intensity = 0.1): string {
  const noise = ['#', '@', '*', '%', '&', '$', '!', '?', '/', '\\', '|'];
  return text.split("").map(c => 
    (Math.random() < intensity ? noise[Math.floor(Math.random() * noise.length)] : c)
  ).join("");
}

/**
 * Log text with a glitching effect
 */
export function glitchEffectLog(text: string, iterations = 5, intervalTime = 100): void {
  let i = 0;
  const interval = setInterval(() => {
    if (i < iterations) {
      console.clear();
      console.log(glitchText(text));
      i++;
    } else {
      clearInterval(interval);
      console.clear();
      console.log(text);
    }
  }, intervalTime);
}
