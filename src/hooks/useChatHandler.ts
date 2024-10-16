import { useState, useEffect } from 'react';
import { Chat, ChatMessage } from '../interfaces/Chat';
import { generateBotResponse, truncateTitle } from '../helpers/ChatHelper';
import { ChatService } from '../services/ChatService';
import { toast } from 'react-toastify';

export const useChatHandler = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>(ChatService.getChatHistory());
  const [savedIdeas, setSavedIdeas] = useState<Chat[]>(ChatService.getSavedIdeas());
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showChatBox, setShowChatBox] = useState<boolean>(true);

  useEffect(() => {
    if (chatHistory.length === 0 && !isChatOpen) {
      startNewChat();
    }
  }, [chatHistory, isChatOpen]);

  const startNewChat = () => {
    const newChat: Chat = { id: chatHistory.length + 1, title: 'New Chat', content: [] };
    setCurrentChat(newChat);
    setIsChatOpen(true);
    setShowChatBox(true);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const botResponse = generateBotResponse(message);
      let updatedChatContent: ChatMessage[];

      let newChat: Chat;
      if (!currentChat) {
        const newChatId = chatHistory.length + 1;
        const chatTitle = truncateTitle(message);
        updatedChatContent = [{ message: `You: ${message}`, isBot: false }, { message: botResponse, isBot: true }];

        newChat = { id: newChatId, title: chatTitle, content: updatedChatContent };

        setChatHistory([...chatHistory, newChat]);
        ChatService.saveChatHistory([...chatHistory, newChat]);
      } else {
        updatedChatContent = [...currentChat.content, { message: `You: ${message}`, isBot: false }, { message: botResponse, isBot: true }];
        newChat = { ...currentChat, content: updatedChatContent };

        const chatExistsInHistory = chatHistory.some((chat) => chat.id === newChat.id);
        if (!chatExistsInHistory) {
          setChatHistory([...chatHistory, newChat]);
        } else {
          setChatHistory(chatHistory.map((chat) => (chat.id === newChat.id ? newChat : chat)));
        }
        ChatService.saveChatHistory(chatHistory);
      }

      setCurrentChat(newChat);
      setMessage('');
      setIsChatOpen(true);
    }
  };

  const handleSaveIdea = (botResponse: ChatMessage) => {
    const truncatedTitle = truncateTitle(botResponse.message);
    const newIdea: Chat = { id: Date.now(), title: truncatedTitle, content: [botResponse] };

    setSavedIdeas([...savedIdeas, newIdea]);
    ChatService.saveSavedIdeas([...savedIdeas, newIdea]);

    toast.success('Idea saved successfully!');
  };

  const handleReset = (activeTab: number) => {
    if (activeTab === 0) {
      setChatHistory([]);
      ChatService.saveChatHistory([]);
      setIsChatOpen(false);
    } else {
      setSavedIdeas([]);
      ChatService.saveSavedIdeas([]);
    }
  };

  return {
    chatHistory,
    savedIdeas,
    currentChat,
    message,
    isChatOpen,
    showChatBox,
    setMessage,
    startNewChat,
    handleSendMessage,
    handleSaveIdea,
    handleReset,
    setCurrentChat,
    setIsChatOpen,
    setShowChatBox,
  };
};
