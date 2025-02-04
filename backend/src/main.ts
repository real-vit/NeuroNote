import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import * as http from 'http';

async function bootstrap() {
  // Create a regular NestJS app
  const app = await NestFactory.create(AppModule);
  
  // Set up HTTP server for WebSocket on a different port (e.g., 3001)
  const server = http.createServer();
  const io = new Server(server);

  // Start the NestJS HTTP server on the default port (3000)
  await app.listen(4000);
}
bootstrap();