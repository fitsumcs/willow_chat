// components/ChatHistory.tsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { ChatHistoryProps } from '../interfaces/props';



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
