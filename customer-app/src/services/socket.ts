import { io, Socket } from 'socket.io-client';

// Use local machine IP or deployed backend URL
const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

class SocketService {
  public socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }
  }

  joinOrderRoom(orderId: string) {
    if (this.socket) {
      this.socket.emit('join_order_room', orderId);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
