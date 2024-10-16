import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { Save, SaveAlt } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Chat {
  id: number;
  title: string;
  content: { message: string; isBot: boolean }[]; // Each chat contains messages and whether it's from the bot
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null); // Store the current chat conversation
  const [message, setMessage] = useState<string>(''); // Message input value
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // Flag to determine if chat window should open
  const [showChatBox, setShowChatBox] = useState<boolean>(true); // Toggle for showing chat box or static view

  // Automatically start a chat when no chat history exists
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
    setShowChatBox(true); // Show chat box when new chat starts
  };

  // Handle sending message and continuing chat conversation
  const handleSendMessage = () => {
    if (message.trim()) {
      const botResponse = `Bot: Here's an idea for "${message}"`;
      let updatedChatContent: { message: string; isBot: boolean }[];
  
      let newChat: Chat;
      if (!currentChat) {
        const newChatId = chatHistory.length + 1;
        const chatTitle = message.length > 20 ? message.substring(0, 20) + '...' : message;
        updatedChatContent = [{ message: `You: ${message}`, isBot: false }, { message: botResponse, isBot: true }];
  
        newChat = {
          id: newChatId,
          title: chatTitle,
          content: updatedChatContent,
        };
  
        // Set new chat to history and update currentChat
        setChatHistory([...chatHistory, newChat]);
      } else {
        // Update current chat with the new conversation
        updatedChatContent = [...currentChat.content, { message: `You: ${message}`, isBot: false }, { message: botResponse, isBot: true }];
        newChat = { ...currentChat, content: updatedChatContent }; // Ensure newChat is initialized
  
        // Check if the current chat is already in history, if not, add it
        const chatExistsInHistory = chatHistory.some(chat => chat.id === newChat.id);
        if (!chatExistsInHistory) {
          setChatHistory([...chatHistory, newChat]); // Add to chat history
        } else {
          setChatHistory(chatHistory.map(chat => chat.id === newChat.id ? newChat : chat)); // Update the history
        }
      }
  
      setCurrentChat(newChat); // Set current chat to the updated/new chat
      setMessage(''); // Clear input field after sending message
      setIsChatOpen(true); // Open chat window
    }
  };
  

// Handle saving ideas, using only the bot's response as the title, no checks
const handleSaveIdea = (botResponse: { message: string; isBot: boolean }) => {
  // Use the bot's response directly as the title
  const truncatedTitle = botResponse.message.substring(0, 20) + '...'; // Truncate if too long

  // Generate a unique id for the new idea
  const newIdea = { id: Date.now(), title: truncatedTitle, content: [botResponse] }; // Add a unique id

  // Save the bot's response directly without any checks
  setSavedIdeas([...savedIdeas, newIdea]);

  // Show success message
  toast.success('Idea saved successfully!');
};



  // Handle resetting the chat history or saved ideas
  const handleReset = () => {
    if (activeTab === 0) {
      setChatHistory([]);
      setIsChatOpen(false); // Close the chat window when history is cleared
    } else if (activeTab === 1) {
      setSavedIdeas([]);
    }
  };

  // Open chat from history
  const handleOpenChat = (chat: Chat) => {
    setCurrentChat(chat); // Set current chat from history
    setIsChatOpen(true); // Ensure the chat window opens when history is clicked
    setShowChatBox(true); // Ensure we display the chat box for history
  };

  // Open saved idea in static view (no chat box)
  const handleOpenSavedIdea = (idea: Chat) => {
    setCurrentChat(idea);
    setShowChatBox(false); // Switch to static view mode (no chat box)
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar with Tabs */}
      <Box sx={{ width: '25%', padding: 2, backgroundColor: '#f0f0f0' }}>
        {/* New Chat Button */}
        <Button variant="contained" color="primary" onClick={startNewChat} sx={{ marginBottom: 2 }}>
          New Chat
        </Button>

        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Chat History" />
          <Tab label="Saved Ideas" />
        </Tabs>

        {/* Display List of Chats or Saved Ideas */}
        <List>
          {activeTab === 0 &&
            chatHistory.map((chat) => (
              <ListItem component="button" key={chat.id} onClick={() => handleOpenChat(chat)} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={chat.title} />
              </ListItem>
            ))}
          {activeTab === 1 &&
            savedIdeas.map((idea) => (
              <ListItem component="button" key={idea.id} onClick={() => handleOpenSavedIdea(idea)} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={idea.title} />
              </ListItem>
            ))}
        </List>

        <Box sx={{ marginTop: 'auto' }}>
          <IconButton color="error" onClick={handleReset}>
            Clear {activeTab === 0 ? 'Chat History' : 'Saved Ideas'}
          </IconButton>
        </Box>
      </Box>

      {/* Main Content for Chat Window */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {isChatOpen && currentChat ? (
          showChatBox ? (
            <Box>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  padding: 2,
                  height: '400px',
                  overflowY: 'auto',
                  marginBottom: '10px',
                }}
              >
                {/* Display all messages in the chat */}
                {currentChat.content.map((msg, idx) => (
                  <Box key={idx}>
                    <Typography>{msg.message}</Typography>
                    {/* Only show Save Idea button under bot responses */}
                    {msg.isBot && (
                      <IconButton onClick={() => handleSaveIdea(msg)} color="primary">
                        <Save />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ display: 'flex', marginTop: '10px' }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  style={{ flex: 1, padding: '10px' }}
                />
                <IconButton onClick={handleSendMessage} color="primary">
                  Send
                </IconButton>
              </Box>
            </Box>
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
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default App;
