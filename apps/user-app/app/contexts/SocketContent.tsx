"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket  } from 'socket.io-client';

const SocketContext = createContext<typeof Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const socketIo: typeof Socket = io('http://localhost:3000');
    setSocket(socketIo);
    console.log('Socket connected:', socketIo);

    return () => {
      socketIo.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
