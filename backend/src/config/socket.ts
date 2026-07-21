import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Allows all origins for development (mobile apps & web admin)
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join_restaurant_room', (restaurantId: string) => {
      socket.join(`restaurant_${restaurantId}`);
      console.log(`Socket ${socket.id} joined room restaurant_${restaurantId}`);
    });

    socket.on('join_order_room', (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`Socket ${socket.id} joined room order_${orderId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
