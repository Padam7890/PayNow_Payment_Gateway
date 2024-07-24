import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = new Server(server);



io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(`Socket ID: ${socket.id}`);

  // Log socket object details
  // console.log('Socket details:', socket);

  socket.on('send_money', async (data) => {
    console.log("Received data on 'send_money':", data);

    const { fromUserId, toUserId, amount, notes, timestamp } = data;

    // Log the data being processed
    console.log(`Sending money from ${fromUserId} to ${toUserId}. Amount: ${amount}, Notes: ${notes}`);

    // Notify the recipient in real-time
    io.to(toUserId.toString()).emit('receive_money', {
      fromUserId,
      amount,
      notes,
      timestamp,
    });

    console.log(`Notification sent to ${toUserId}`);
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
