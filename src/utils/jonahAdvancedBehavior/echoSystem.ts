
/**
 * Echo System
 * Handles storing and retrieving echo phrases for conversation patterns
 */

// Store an echo phrase
export function storeEcho(phrase: string): void {
  const echoes = getAllEchoes();
  echoes.push({
    phrase,
    timestamp: Date.now()
  });
  localStorage.setItem('jonah_echoes', JSON.stringify(echoes.slice(-50))); // Keep last 50
}

// Get an echo phrase, optionally filtered by string match
export function getEchoPhrase(filter?: string): string | null {
  const echoes = getAllEchoes();
  
  if (echoes.length === 0) return null;
  
  if (filter) {
    const filtered = echoes.filter(echo => echo.phrase.includes(filter));
    return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)].phrase : null;
  }
  
  return echoes[Math.floor(Math.random() * echoes.length)].phrase;
}

// Check if input matches any stored echo
export function checkForEchoMatch(input: string): boolean {
  const echoes = getAllEchoes();
  return echoes.some(echo => echo.phrase.toLowerCase().includes(input.toLowerCase()));
}

// Get all stored echoes
export function getAllEchoes(): Array<{phrase: string, timestamp: number}> {
  try {
    const stored = localStorage.getItem('jonah_echoes');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error retrieving echoes:", e);
    return [];
  }
}
