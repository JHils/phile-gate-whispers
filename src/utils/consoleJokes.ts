
/**
 * Console joke and humor functionality
 */

/**
 * Display random joke from the joke pool
 */
export function displayRandomJoke(): void {
  const jokes = [
    "Fun fact: There is no fun. Only facts.",
    "Still looking for meaning? Have you tried carbs?",
    "Your console commands are being monitored… by your past self.",
    "ToggleWrath() is not recommended. But you will anyway.",
    "Everything you type is remembered. Especially the weird stuff.",
    "Didn't know consoles could laugh, did you? Neither did we.",
    "The coin never lands. But you keep flipping it anyway.",
    "Memory leak detected. Good luck figuring out which one.",
    "Jonah says hi. He's wearing your smile today."
  ];
  
  // Initialize jokesDisplayed array if it doesn't exist
  if (!window.JonahConsole.jokesDisplayed) {
    window.JonahConsole.jokesDisplayed = [];
  }
  
  // Filter for jokes not yet displayed
  let availableJokes = jokes.filter(joke => 
    !window.JonahConsole.jokesDisplayed?.includes(joke)
  );
  
  // If all jokes have been shown, reset the tracking
  if (availableJokes.length === 0) {
    window.JonahConsole.jokesDisplayed = [];
    availableJokes = jokes;
  }
  
  // Select random joke and display
  const joke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
  window.JonahConsole.jokesDisplayed?.push(joke);
  
  console.log(`%c${joke}`, "color: #475B74; font-style: italic;");
}
