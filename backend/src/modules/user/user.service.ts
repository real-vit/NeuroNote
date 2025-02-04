import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get all rooms a user is part of
  async getRoomsForUser(userId: string) {
    return this.prisma.room.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
    });
  }

  // Allow a user to join a room using a room code
  async joinRoom(userId: string, roomCode: string) {
    const room = await this.prisma.room.findUnique({
      where: { code: roomCode },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Check if the user is already in the room
    const existingMembership = await this.prisma.roomUsers.findFirst({
      where: {
        userId,
        roomId: room.id,
      },
    });

    if (existingMembership) {
      throw new BadRequestException('User is already in the room');
    }

    // Add the user to the room
    await this.prisma.roomUsers.create({
      data: {
        userId,
        roomId: room.id,
      },
    });

    return { message: 'Successfully joined the room' };
  }
}
