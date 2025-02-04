import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Get all rooms a user is part of
  @UseGuards(JwtAuthGuard)
  @Get('rooms')
  async getRoomsForUser(@Request() req) {
    console.log('🔍 Checking JWT in getRoomsForUser...');
    console.log('Request Headers:', req.headers);
    console.log('Decoded User:', req.user);

    const userId = req.user?.sub;
    if (!userId) {
      console.error('❌ User ID is missing in JWT token');
      throw new Error('Unauthorized: Missing User ID');
    }

    return this.userService.getRoomsForUser(userId);
  }

  // Allow a user to join a room using a room code
  @UseGuards(JwtAuthGuard)
  @Post('join-room')
  async joinRoom(@Body() body: { roomCode: string }, @Request() req) {
    console.log('🔍 Checking JWT in joinRoom...');
    console.log('Request Headers:', req.headers);
    console.log('Decoded User:', req.user);

    const userId = req.user?.sub;
    if (!userId) {
      console.error('❌ User ID is missing in JWT token');
      throw new Error('Unauthorized: Missing User ID');
    }

    console.log(`✅ User ${userId} is attempting to join room ${body.roomCode}`);

    return this.userService.joinRoom(userId, body.roomCode);
  }
}
