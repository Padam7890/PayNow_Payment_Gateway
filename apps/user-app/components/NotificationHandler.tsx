"use client"

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';


interface NotificationProps {
    userId: string;
  }
const NotificationHandler:React.FC<NotificationProps> = ({userId}) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketIo = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnectionAttempts: 5
    });

    setSocket(socketIo);
    socketIo.emit('join', userId); // Replace 'user_id' with the actual user ID you fetch from session or state
    

    socketIo.on('receive_money', (data:any) => {
      toast.info(`You received ${data.amount} from ${data.fromUserId}. Note: ${data.notes}`);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return null; // No UI component, just real-time handling
};

export default NotificationHandler;
