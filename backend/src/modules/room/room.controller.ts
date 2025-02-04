// src/room/room.controller.ts
import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  // GET /rooms/:roomCode
  // Returns full room details given a room code.
  @Get(':roomCode')
  async getRoomDetails(@Param('roomCode') roomCode: string) {
    return this.roomService.getRoomByCode(roomCode);
  }

  // GET /rooms/:roomCode/id
  // Returns only the room ID given a room code.
  @Get(':roomCode/id')
  async getRoomId(@Param('roomCode') roomCode: string) {
    const roomId = await this.roomService.getRoomIdByCode(roomCode);
    return { roomId };
  }

  // PATCH /rooms/:roomCode
  // Update room details (e.g. name or code) given the room code.
  @Patch(':roomCode')
  async updateRoom(
    @Param('roomCode') roomCode: string,
    @Body() updateData: { name?: string; code?: string },
  ) {
    return this.roomService.updateRoomByCode(roomCode, updateData);
  }
}
