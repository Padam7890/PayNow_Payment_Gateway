// contexts/SocketContext.tsx
"use client"; // Add this line at the very top

import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {addSocketNotification, loadSocketNotifications} from "../../redux/slices/socketNotificationSlice"
interface SocketProviderProps {
  children: React.ReactNode;
  userId: string;
}

const SocketContext = createContext(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  userId,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(loadSocketNotifications());
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.emit("join", userId);

    socket.on("receive_money", (data: any) => {
      toast.info(
        `You received ${data.amount} from ${data.phone}. Note: ${data.notes}`
      );
      dispatch(addSocketNotification({
        id: Date.now(),
        message: `You received ${data.amount} from ${data.phone}. Note: ${data.notes}`,
        createdAt: new Date().toISOString(),
      }));
      //
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, dispatch]);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
