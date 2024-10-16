import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Typography } from '@mui/material';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';
import MessageInput from './components/MessageInput';
import { generateBotResponse, truncateTitle } from './helpers/ChatHelper';
import { ChatService } from './services/ChatService';
import { ToastContainer, toast } from 'react-toastify';
import { Chat, ChatMessage } from './interfaces/Chat';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
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
    const newChat: Chat = {
      id: chatHistory.length + 1,
      title: 'New Chat',
      content: [],
    };
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

        newChat = {
          id: newChatId,
          title: chatTitle,
          content: updatedChatContent,
        };

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

  const handleReset = () => {
    if (activeTab === 0) {
      setChatHistory([]);
      ChatService.saveChatHistory([]);
      setIsChatOpen(false);
    } else {
      setSavedIdeas([]);
      ChatService.saveSavedIdeas([]);
    }
  };

  const handleOpenChat = (chat: Chat) => {
    setCurrentChat(chat);
    setIsChatOpen(true);
    setShowChatBox(true);
  };

  const handleOpenSavedIdea = (idea: Chat) => {
    setCurrentChat(idea);
    setShowChatBox(false);
  };

  return (
    <div>
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '25%', padding: 2, backgroundColor: '#f0f0f0' }}>
        <Button variant="contained" color="primary" onClick={startNewChat} sx={{ marginBottom: 2 }}>
          New Chat
        </Button>

        <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Chat History" />
          <Tab label="Saved Ideas" />
        </Tabs>

        {activeTab === 0 && <ChatHistory chats={chatHistory} onSelectChat={handleOpenChat} />}
        {activeTab === 1 && <ChatHistory chats={savedIdeas} onSelectChat={handleOpenSavedIdea} />}

        <Button onClick={handleReset}>Clear {activeTab === 0 ? 'Chat History' : 'Saved Ideas'}</Button>
      </Box>

      <Box sx={{ flex: 1, padding: 2 }}>
        {isChatOpen && currentChat ? (
          showChatBox ? (
            <ChatBox currentChat={currentChat} handleSaveIdea={handleSaveIdea} />
          ) : (
            <Box>
              <Typography variant="h6">Saved Idea</Typography>
              {currentChat.content.map((msg, idx) => (
                <Typography key={idx}>{msg.message}</Typography>
              ))}
            </Box>
          )
        ) : (
          <Typography variant="h6">No chat open. Start a new chat or select one from history.</Typography>
        )}

        {showChatBox && <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />}
      </Box>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />


    </Box>
   
  </div>
  );
};

export default App;
