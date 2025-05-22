
/**
 * Console Text Effects
 * Special text effects for console output
 */

// Glitch text
export function glitchText(text: string, intensity: number = 0.3): string {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() < intensity) {
      result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else {
      result += text[i];
    }
  }
  
  return result;
}

// Flicker text in console
export function flickerLog(text: string): void {
  // Original message
  console.log('%c' + text, 'color: #3a7bd5;');
  
  // Flicker effect with timeouts
  setTimeout(() => {
    console.clear();
    console.log('%c' + glitchText(text, 0.1), 'color: #3a7bd5; opacity: 0.8;');
    
    setTimeout(() => {
      console.clear();
      console.log('%c' + text, 'color: #3a7bd5;');
      
      setTimeout(() => {
        console.clear();
        console.log('%c' + glitchText(text, 0.2), 'color: #3a7bd5; opacity: 0.9;');
        
        setTimeout(() => {
          console.clear();
          console.log('%c' + text, 'color: #3a7bd5;');
        }, 100);
      }, 50);
    }, 100);
  }, 200);
}

// Typewriter effect in console
export function typewriterLog(text: string, delay: number = 100): void {
  let i = 0;
  const interval = setInterval(() => {
    console.clear();
    console.log('%c' + text.substring(0, i), 'color: #3a7bd5;');
    i++;
    
    if (i > text.length) {
      clearInterval(interval);
    }
  }, delay);
}

// Fade in text
export function fadeInLog(text: string): void {
  const opacities = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  
  opacities.forEach((opacity, index) => {
    setTimeout(() => {
      console.clear();
      console.log(`%c${text}`, `color: #3a7bd5; opacity: ${opacity};`);
    }, index * 100);
  });
}

// Multi-color text
export function rainbowLog(text: string): void {
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const color = colors[i % colors.length];
    result += `%c${text[i]}`;
  }
  
  const styles = [];
  for (let i = 0; i < text.length; i++) {
    const color = colors[i % colors.length];
    styles.push(`color: ${color}`);
  }
  
  console.log(result, ...styles);
}

// Glitch fade out
export function glitchFadeOut(text: string): void {
  let intensity = 0.1;
  const interval = setInterval(() => {
    console.clear();
    console.log('%c' + glitchText(text, intensity), 'color: #3a7bd5; opacity: ' + (1 - intensity));
    intensity += 0.1;
    
    if (intensity >= 1) {
      clearInterval(interval);
      console.clear();
    }
  }, 200);
}
