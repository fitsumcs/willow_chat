import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';
import { Chat, ChatMessage } from '../interfaces/Chat';

interface ChatWindowProps {
  currentChat: Chat | null;
  showChatBox: boolean;
  handleSaveIdea: (botResponse: ChatMessage) => void;
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentChat, showChatBox, handleSaveIdea, message, setMessage, handleSendMessage }) => {
  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      {currentChat ? (
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
  );
};

export default ChatWindow;
