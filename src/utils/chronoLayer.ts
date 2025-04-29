
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
