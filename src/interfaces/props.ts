import { Chat, ChatMessage } from "./type";

export interface ChatHistoryProps {
    chats: Chat[];
    onSelectChat: (chat: Chat) => void;
  }

export interface ChatBoxProps {
    currentChat: { content: ChatMessage[] };
    handleSaveIdea: (botResponse: ChatMessage) => void;
}

export interface ChatWindowProps {
    currentChat: Chat | null;
    showChatBox: boolean;
    handleSaveIdea: (botResponse: ChatMessage) => void;
    message: string;
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
  }
  export interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
  }

  export interface TabPanelProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
    chatHistory: Chat[];
    savedIdeas: Chat[];
    handleOpenChat: (chat: Chat) => void;
    handleOpenSavedIdea: (idea: Chat) => void;
    handleReset: () => void;
  }