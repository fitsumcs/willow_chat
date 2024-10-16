import React from 'react';
import { Box, IconButton } from '@mui/material';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, handleSendMessage }) => (
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
);

export default MessageInput;
