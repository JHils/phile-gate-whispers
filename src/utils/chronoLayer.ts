
// ChronoLayer - Memory Recall System
// Tracks when users trigger the Nightmare Sequence and displays personalized messages

// Store the collapse time when nightmare sequence is triggered
export const recordCollapseTime = (): void => {
  localStorage.setItem("gateCollapseTime", Date.now().toString());
  localStorage.setItem("permanentlyCollapsed", "true");
};

// Get the time difference message based on when the collapse occurred
export const getTimeElapsedMessage = (): string | null => {
  const collapseTime = localStorage.getItem("gateCollapseTime");
  
  if (!collapseTime) return null;
  
  const now = Date.now();
  const diff = now - parseInt(collapseTime);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  
  // Message variations based on time elapsed
  if (days === 0 && hours === 0) {
    return "You broke the Gate moments ago.";
  } else if (days === 0) {
    return `It's been ${hours} hour${hours === 1 ? "" : "s"} since you broke the Gate.`;
  } else if (days < 7) {
    return `It's been ${days} day${days === 1 ? "" : "s"} and ${hours} hour${hours === 1 ? "" : "s"} since you broke the Gate.`;
  } else if (days < 30) {
    return `${days} days have passed. The Monster grows stronger with each.`;
  } else {
    return `${days} days. The Gate remembers your failure.`;
  }
};

// Get a thematic message based on time elapsed
export const getThematicMessage = (): string | null => {
  const collapseTime = localStorage.getItem("gateCollapseTime");
  
  if (!collapseTime) return null;
  
  const now = Date.now();
  const diff = now - parseInt(collapseTime);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Different thematic messages based on how much time has passed
  const messages = [
    "The Gate remembers.",
    "You thought time would erase what you did.",
    "Every hour since, the Monster grew stronger.",
    "You haven't healed. You've just been delaying.",
    "It's watching. Still. Always."
  ];
  
  if (days < 1) return messages[0];
  if (days < 7) return messages[1];
  if (days < 30) return messages[2];
  if (days < 90) return messages[3];
  return messages[4];
};

// Insert time elapsed message into the DOM
export const injectTimeElapsedMessage = (containerId?: string): void => {
  const message = getTimeElapsedMessage();
  const thematicMessage = getThematicMessage();
  
  if (!message || !thematicMessage) return;
  
  let container: HTMLElement;
  
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }
  
  const tracker = document.createElement("div");
  tracker.className = "chrono-tracker";
  tracker.innerHTML = `
    <p style="color: #8B3A40; font-size: 0.8rem; text-align: center; opacity: 0.7; margin-top: 1rem; font-family: 'Courier New', monospace;">
      ${message}<br>
      <span style="font-size: 0.7rem; opacity: 0.5;">${thematicMessage}</span>
    </p>
  `;
  
  container.appendChild(tracker);
};

// Check if redemption time has been reached
export const checkRedemptionTime = (): boolean => {
  const collapseTime = localStorage.getItem("gateCollapseTime");
  
  if (!collapseTime) return false;
  
  const now = Date.now();
  const diff = now - parseInt(collapseTime);
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Use a weighted random approach to determine waiting period
  // This creates variation in the redemption time
  const randomRoll = Math.random() * 100;
  let requiredDays = 7; // Default 7 days (90% of users)
  
  if (randomRoll > 90 && randomRoll <= 98) {
    requiredDays = 14; // 8% of users
  } else if (randomRoll > 98) {
    requiredDays = 30; // 2% of users
  }
  
  return daysPassed >= requiredDays;
};

// Handle redemption message display
export const showRedemptionMessage = (): void => {
  // Clear everything first
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = "#111";
  
  // Create redemption message
  const redemption = document.createElement("div");
  redemption.style.backgroundColor = "#111";
  redemption.style.color = "#90ee90";
  redemption.style.fontFamily = "'Courier New', monospace";
  redemption.style.display = "flex";
  redemption.style.flexDirection = "column";
  redemption.style.justifyContent = "center";
  redemption.style.alignItems = "center";
  redemption.style.height = "100vh";
  redemption.style.width = "100vw";
  redemption.style.textAlign = "center";
  redemption.style.padding = "20px";
  redemption.style.position = "fixed";
  redemption.style.top = "0";
  redemption.style.left = "0";
  redemption.style.zIndex = "9999";
  
  redemption.innerHTML = `
    <h1 style="font-size: 2rem; text-shadow: 0 0 10px #90ee90; margin-bottom: 2rem;">THE GATE REMEMBERS.</h1>
    <p style="font-size: 1.2rem; margin: 0.5rem;">You endured the silence.</p>
    <p style="font-size: 1.2rem; margin: 0.5rem;">You carried the burden.</p>
    <p style="font-size: 1.2rem; margin: 0.5rem;">The Monster releases its hold.</p>
    <br>
    <p style="font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0;"><strong>You may try again.</strong></p>
    <br>
    <button 
      style="padding: 12px 24px; font-size: 1.2rem; background-color: #111; color: #90ee90; border: 1px solid #90ee90; cursor: pointer; transition: all 0.3s ease;" 
      onmouseover="this.style.backgroundColor='#90ee90'; this.style.color='#111';" 
      onmouseout="this.style.backgroundColor='#111'; this.style.color='#90ee90';"
      onclick="localStorage.removeItem('permanentlyCollapsed'); localStorage.removeItem('gateCollapseTime'); localStorage.removeItem('gatekeeperLocked'); localStorage.removeItem('gatekeeperLockedAt'); window.location.reload();"
    >Return</button>
  `;
  
  document.body.appendChild(redemption);
  
  // Create ambient green glow effect
  const glowEffect = document.createElement("style");
  glowEffect.textContent = `
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    
    h1, p, button {
      animation: pulse 3s infinite;
    }
    
    body {
      background: radial-gradient(circle, #111 0%, #0a0a0a 100%);
    }
  `;
  document.head.appendChild(glowEffect);
};

// Reset collapse state for redemption
export const resetCollapseState = (): void => {
  localStorage.removeItem("permanentlyCollapsed");
  localStorage.removeItem("gateCollapseTime");
  localStorage.removeItem("gatekeeperLocked");
  localStorage.removeItem("gatekeeperLockedAt");
};
