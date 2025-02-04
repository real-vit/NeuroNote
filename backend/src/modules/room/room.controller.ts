import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // JWT guard for route protection

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  // Get all rooms a user is part of
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getRoomsForUser(@Param('userId') userId: string) {
    return this.roomService.getRoomsForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRoom(@Body() body: { name: string }, @Request() req) {
    const userId = req.user?.sub;  // Access userId instead of sub
    console.log('Received userId from JWT:', userId);  // Log userId to verify it's extracted correctly
    
    if (!userId) {
      throw new Error('User ID is missing in JWT token');
    }
  
    return this.roomService.createRoom(body.name, userId);  // Pass the userId to the service
  }
  // Get a room by code
  @UseGuards(JwtAuthGuard)
  @Get('code/:code')
  async getRoomByCode(@Param('code') code: string) {
    return this.roomService.getRoomByCode(code);
  }
}
