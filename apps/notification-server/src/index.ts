import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import db from "@repo/db/client";


const app = express();

const server = http.createServer(app);
const io = new Server(server);

const saveNotificationInDatabase = async (userId: number, title: string, message: string) => {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });
    return notification;
  } catch (error) {
    console.error('Error saving notification:', error);
    throw error;
  }
};

io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(`Socket ID: ${socket.id}`);

  socket.on('send_money', async (data) => {
    console.log("Received data on 'send_money':", data);
    const { fromUserId, toUserId, amount, notes, timestamp, phone } = data;

    console.log(`Sending money from ${fromUserId} to ${toUserId}. Amount: ${amount}, Notes: ${notes}`);

    // Save the notification in the database
    try {
      const notification = await saveNotificationInDatabase(toUserId, 'Money Received', `You have received $${amount} from user ${phone}`);
      console.log('Notification saved:', notification);

      // Notify the recipient in real-time
      io.to(toUserId.toString()).emit('receive_money', {
        phone,
        fromUserId,
        amount,
        notes,
        timestamp,
      });
      console.log(`Notification sent to ${toUserId}`);
    } catch (error) {
      console.error('Error processing send_money event:', error);
    }
  });

  socket.on('join', (userId) => {
    socket.join(userId.toString());
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
});
