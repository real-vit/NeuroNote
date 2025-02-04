import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for the HTTP server
  app.enableCors({
    origin: 'http://localhost:5173', // 👈 Allow frontend origin (update as needed)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // 👈 Ensures cookies and auth headers work properly
  });

  // Create HTTP server
  const server = http.createServer(app.getHttpServer());

  // ✅ Configure WebSocket CORS properly
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // 👈 Allow frontend
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    },
  });

  // ✅ Start both HTTP & WebSocket servers
  await app.listen(4000, () => {
    console.log('HTTP server running on port 4000');
  });

}

bootstrap();