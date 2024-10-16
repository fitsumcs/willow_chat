// services/ChatService.ts
import { Chat } from '../interfaces/Chat';

export class ChatService {
  static saveChatHistory(chatHistory: Chat[]): void {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }

  static getChatHistory(): Chat[] {
    const storedHistory = localStorage.getItem('chatHistory');
    return storedHistory ? JSON.parse(storedHistory) as Chat[] : [];
  }

  static saveSavedIdeas(savedIdeas: Chat[]): void {
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
  }

  static getSavedIdeas(): Chat[] {
    const storedIdeas = localStorage.getItem('savedIdeas');
    return storedIdeas ? JSON.parse(storedIdeas) as Chat[] : [];
  }
}
