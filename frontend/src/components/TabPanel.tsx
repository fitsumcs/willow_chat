import React from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import ChatHistory from './ChatHistory';
import { TabPanelProps } from '../interfaces/props';



const TabPanel: React.FC<TabPanelProps> = ({ activeTab, setActiveTab, chatHistory, savedIdeas, handleOpenChat, handleOpenSavedIdea, handleReset }) => {
  return (
    <div>
      <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab label="Chat History" />
        <Tab label="Saved Ideas" />
      </Tabs>

      {activeTab === 0 && <ChatHistory chats={chatHistory} onSelectChat={handleOpenChat} />}
      {activeTab === 1 && <ChatHistory chats={savedIdeas} onSelectChat={handleOpenSavedIdea} />}

      <Button onClick={handleReset}>Clear {activeTab === 0 ? 'Chat History' : 'Saved Ideas'}</Button>
    </div>
  );
};

export default TabPanel;
