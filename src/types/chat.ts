export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  // Other fields not used in the chat component
}

export interface Message {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: Date;
}
