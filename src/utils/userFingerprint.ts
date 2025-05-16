
/**
 * Generate a consistent user hash based on browser fingerprint
 */
export const generateUserHash = (): string => {
  const navigator_info = window.navigator.userAgent;
  const screen_info = `${window.screen.height}x${window.screen.width}`;
  const fingerprint = `${navigator_info}-${screen_info}-${new Date().getTimezoneOffset()}`;
  
  // Create a simple hash from the fingerprint
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Make it positive and limit to 5 digits
  const positiveHash = Math.abs(hash % 100000);
  return positiveHash.toString().padStart(5, '0');
};
