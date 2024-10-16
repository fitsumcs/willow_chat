export interface ChatMessage {
    message: string;
    isBot: boolean;
  }
  
  export interface Chat {
    id: number;
    title: string;
    content: ChatMessage[];
  }
  