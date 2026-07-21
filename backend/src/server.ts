import app from './app';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import { initSocket } from './config/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Initialize Socket.io
    initSocket(server);
  } catch (error) {
    console.error(`Error starting server: ${(error as Error).message}`);
    process.exit(1);
  }
};

startServer();
