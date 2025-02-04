import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import * as http from 'http';

async function bootstrap() {
  // Create a regular NestJS app
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the HTTP server
  app.enableCors({
    origin: '*',  // Allows all origins, you can restrict it by passing a specific URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  // Set up HTTP server for WebSocket on a different port (e.g., 3001)
  const server = http.createServer(app.getHttpServer());
  const io = new Server(server, {
    cors: {
      origin: '*',  // Allows all origins for WebSocket connections (can be restricted as well)
      methods: ['GET', 'POST'],
    },
  });

  // Start the NestJS HTTP server on the default port (4000)
  await app.listen(4000);

  // Start the WebSocket server on a different port (e.g., 3001)
  server.listen(3003, () => {
    console.log('WebSocket server is running on port 3003');
  });
}

bootstrap();
