// components/ChatHistory.tsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Chat } from '../interfaces/Chat';

interface ChatHistoryProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chats, onSelectChat }) => (
  <List>
    {chats.map((chat) => (
      <ListItem component="button" key={chat.id} onClick={() => onSelectChat(chat)} sx={{ cursor: 'pointer' }}>
        <ListItemText primary={chat.title} />
      </ListItem>
    ))}
  </List>
);

export default ChatHistory;
