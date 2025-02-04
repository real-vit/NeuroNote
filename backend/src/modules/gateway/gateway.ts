import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002)  // Specify the port here
export class MyGateway implements OnGatewayInit {

  private server: Server;  // Declare the server instance

  // After gateway initialization, assign the server instance
  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket Gateway initialized');
  }

  // Handle client joining a room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomCode: string, userId: string },  // Room code and userId from the client
    @ConnectedSocket() client: Socket  // The client that sent the message
  ) {
    const { roomCode, userId } = data;

    // If the room doesn't exist or the roomCode is empty, send an error
    if (!roomCode) {
      client.emit('error', 'Room code is required');
      return;
    }

    // Join the specified room
    client.join(roomCode);
    console.log(`Client ${userId} joined room: ${roomCode}`);

    // Emit a message to all users in the room that a new user has joined
    this.server.to(roomCode).emit('userJoined', `${userId} has joined the room: ${roomCode}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: { message: string, roomCode: string, userId: string },  // Message, room code, and userId from the client
    @ConnectedSocket() client: Socket  // The client that sent the message
  ) {
    const { message, roomCode, userId } = data;

    if (!roomCode) {
      client.emit('error', 'Room code is required');
      return;
    }

    this.server.to(roomCode).emit('receiveMessage', {
      sender: userId,
      message: message,
    });
  }
}
