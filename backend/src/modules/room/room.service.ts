// src/room/room.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  // Returns the room ID given a room code.
  async getRoomIdByCode(roomCode: string): Promise<string> {
    if (!roomCode) {
      throw new BadRequestException('Room code must be provided');
    }
    const room = await this.prisma.room.findUnique({
      where: { code: roomCode },
      select: { id: true },
    });
    if (!room) {
      throw new NotFoundException(`Room with code ${roomCode} not found`);
    }
    return room.id;
  }

  // Returns full room details given a room code.
  async getRoomByCode(roomCode: string) {
    if (!roomCode) {
      throw new BadRequestException('Room code must be provided');
    }
    const room = await this.prisma.room.findUnique({
      where: { code: roomCode },
    });
    if (!room) {
      throw new NotFoundException(`Room with code ${roomCode} not found`);
    }
    return room;
  }

  // Update room details (for example, its name or code) using the room code.
  async updateRoomByCode(roomCode: string, updateData: { name?: string; code?: string }) {
    // Optional: You might want to check if updateData is not empty.
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    // Verify that the room exists before updating.
    const room = await this.prisma.room.findUnique({
      where: { code: roomCode },
    });
    if (!room) {
      throw new NotFoundException(`Room with code ${roomCode} not found`);
    }

    return this.prisma.room.update({
      where: { code: roomCode },
      data: updateData,
    });
  }
}
