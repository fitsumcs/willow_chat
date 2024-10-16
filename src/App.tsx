import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import TabPanel from './components/TabPanel';
import ChatWindow from './components/ChatWindow';
import { ToastContainer, toast } from 'react-toastify';
import { useChatHandler } from './hooks/useChatHandler';
import { Chat } from './interfaces/type';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const {
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
  } = useChatHandler();

  const [activeTab, setActiveTab] = useState<number>(0);

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

          <TabPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            chatHistory={chatHistory}
            savedIdeas={savedIdeas}
            handleOpenChat={handleOpenChat}
            handleOpenSavedIdea={handleOpenSavedIdea}
            handleReset={() => handleReset(activeTab)}
          />
        </Box>

        <ChatWindow
          currentChat={currentChat}
          showChatBox={showChatBox}
          handleSaveIdea={handleSaveIdea}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </Box>

      <ToastContainer />
    </div>
  );
};

export default App;
