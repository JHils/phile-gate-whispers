
// Initialize clear_console function if it doesn't exist
if (!window.clear_console) {
  window.clear_console = (): void => {
    console.clear();
  };
}

// Export helper functions
export const helperFunctions = {
  help: (): void => {
    console.log("%cAvailable commands:", "color: #a3be8c; font-weight: bold;");
    console.log("%chelp - Shows available commands.", "color: #d08770;");
    console.log("%cwhois - Explains the nature of Jonah.", "color: #d08770;");
    console.log("%cgate - Reveals the Gate's purpose.", "color: #d08770;");
    console.log("%cphiles - Lists known philes.", "color: #d08770;");
    console.log("%cmonster - Describes the lurking monster.", "color: #d08770;");
    console.log("%clegacy - Explains the project's history.", "color: #d08770;");
    console.log("%creveal - Reveals hidden truths.", "color: #d08770;");
    console.log("%creincarnate - Initiates a new cycle.", "color: #d08770;");
    console.log("%cstart - Begins the experience.", "color: #d08770;");
    console.log("%cinventory - Shows carried items.", "color: #d08770;");
    console.log("%cecho_me [message] - Repeats your message.", "color: #d08770;");
	  console.log("%ctestament - Reads the testament of Jonah.", "color: #d08770;");
    console.log("%cforget - Clears short-term memory.", "color: #d08770;");
    console.log("%caccess_journal - Reads personal journal entries.", "color: #d08770;");
    console.log("%csplit - Divides consciousness.", "color: #d08770;");
    console.log("%cre_entry - Re-enters the system.", "color: #d08770;");
    console.log("%ctalk_to_jonah - Initiates direct conversation.", "color: #d08770;");
    console.log("%cclear_console - Clears the console.", "color: #d08770;");
    console.log("%cType a command to execute it.", "color: #a3be8c;");
  },
  
  echo_me: (input: string): string => {
    if (!input) {
      return "Echo requires a message. Try: echo_me Hello, world!";
    }
    return `Echo: ${input}`;
  }
};

// Initialize help if it doesn't exist
if (!window.help) {
  window.help = helperFunctions.help;
}

// Initialize echo_me if it doesn't exist
if (!window.echo_me) {
  window.echo_me = helperFunctions.echo_me;
}
