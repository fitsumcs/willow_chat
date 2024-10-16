// components/ChatBox.tsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Save } from '@mui/icons-material';
import { ChatBoxProps } from '../interfaces/props';



const ChatBox: React.FC<ChatBoxProps> = ({ currentChat, handleSaveIdea }) => (
  <Box>
    <Box sx={{ border: '1px solid #ccc', padding: 2, height: '400px', overflowY: 'auto', marginBottom: '10px' }}>
      {currentChat.content.map((msg, idx) => (
        <Box key={idx}>
          <Typography>{msg.message}</Typography>
          {msg.isBot && (
            <IconButton onClick={() => handleSaveIdea(msg)} color="primary">
              <Save />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default ChatBox;
