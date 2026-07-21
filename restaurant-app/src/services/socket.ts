import { io, Socket } from 'socket.io-client';
import { Audio } from 'expo-av';

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

class SocketService {
  public socket: Socket | null = null;
  private sound: Audio.Sound | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('Restaurant App connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Restaurant App disconnected from WebSocket server');
      });
    }
  }

  joinRestaurantRoom(restaurantId: string) {
    if (this.socket) {
      this.socket.emit('join_restaurant_room', restaurantId);
    }
  }

  async playChime() {
    try {
      if (!this.sound) {
        const { sound } = await Audio.Sound.createAsync(
          // Use a public notification sound URL for testing, or local require
          { uri: 'https://cdn.freesound.org/previews/415/415082_5121236-lq.mp3' }
        );
        this.sound = sound;
      }
      await this.sound.replayAsync();
    } catch (error) {
      console.log('Error playing chime:', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.sound) {
      this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

export default new SocketService();
