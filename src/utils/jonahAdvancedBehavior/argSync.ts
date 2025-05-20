
/**
 * Jonah's ARG sync system
 */

// Generate information about ARG sync/progress
export function getArgSyncInfo(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.1) return null;
  
  const argMessages = [
    "Someone else found the keyhole yesterday.",
    "Three others reached this page, but only you saw this message.",
    "The QR code has been scanned 17 times. But not everyone found what it hides.",
    "Your timeline is more stable than most. For now.",
    "Seven others are active in the archive right now. None in your timeline."
  ];
  
  return argMessages[Math.floor(Math.random() * argMessages.length)];
}
