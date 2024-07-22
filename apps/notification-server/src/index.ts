// notification-server/index.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_money', async (data) => {
    const { fromUserId, toUserId, amount, notes, timestamp } = data;

    // Notify the recipient in real-time
    io.to(toUserId.toString()).emit('receive_money', {
      fromUserId,
      amount,
      notes,
      timestamp,
    });
  });

  socket.on('join', (userId) => {
    socket.join(userId.toString());
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
});
