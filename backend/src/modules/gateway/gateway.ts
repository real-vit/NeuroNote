import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  OnGatewayInit, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import axios from 'axios';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Allow frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }
})
export class MyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket Gateway initialized');
    // setInterval(() => {
    //   this.server.emit('receiveMessage',{
    //     sender: 'server',
    //     message: 'Testing from Server',
    //   });
    //   console.log("Sending Test Broadcast")
    // }, 10000);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomCode: string, userId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { roomCode, userId } = data;

    if (!roomCode) {
      client.emit('error', 'Room code is required');
      return;
    }

    client.join(roomCode);
    console.log(`Client ${userId} joined room: ${roomCode}`); // Log user joining the room

    // Log the join event and broadcast to the room
    this.server.to(roomCode).emit('userJoined', `${userId} has joined the room: ${roomCode}`);
    console.log(`Broadcasted to room ${roomCode}: ${userId} has joined`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { message: string, roomCode: string, userId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { message, roomCode, userId } = data;

    if (!roomCode) {
      client.emit('error', 'Room code is required');
      return;
    }

    // Log the message received from client
    console.log(`Received message from ${userId} in room ${roomCode}: ${message}`);

    // Broadcast the message to everyone in the room
    this.server.to(roomCode).emit('receiveMessage', { sender: userId, message });

    console.log(`Broadcasted message to room ${roomCode}: ${message}`);
  }
  
}
