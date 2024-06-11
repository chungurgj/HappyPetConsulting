import React, { useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useName } from '../../components/contexts/NameContext';
import { useChat } from '../contexts/ChatContext';

const ChatConnectionService = ({ children }) => {
  const { id, email } = useName();
  const { addConnection } = useChat();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7138/chat')
      .configureLogging(LogLevel.Information)
      .build();

    async function startConnection() {
      try {
        await newConnection.start();
        addConnection(newConnection);
      } catch (error) {
        console.error('Error starting connection:', error);
      }
    }

    startConnection();

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [id, email]);

  return <>{children}</>;
};

export default ChatConnectionService;
