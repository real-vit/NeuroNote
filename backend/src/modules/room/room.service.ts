import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async createRoom(name: string, userId: string) {
    const roomCode = `ROOM-${Math.floor(Math.random() * 100000)}`;

    console.log('Received userId:', userId);

    try {
      let user;
      console.log('Attempting to find user with id:', userId);
      user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        console.log('User not found');
        throw new BadRequestException('User not found');
      }

      console.log('User found:', user);

      console.log('Creating room with code:', roomCode);
      const room = await this.prisma.room.create({
        data: {
          name,
          code: roomCode,
          users: {
            create: {
              userId: userId, 
            },
          },
        },
      });

      console.log('Room created successfully:', room);
      return room;
    } catch (error) {
      console.error('Error in createRoom function:', error);
      throw error; 
    }
  }

  async getRoomsForUser(userId: string) {
    console.log('Getting rooms for userId:', userId);
    return this.prisma.room.findMany({
      where: {
        users: {
          some: { userId: userId }, 
        },
      },
    });
  }

  async getRoomByCode(code: string) {
    console.log('Getting room with code:', code);
    const room = await this.prisma.room.findUnique({
      where: {
        code,
      },
    });

    if (!room) {
      throw new BadRequestException('Room not found');
    }

    console.log('Room found:', room);
    return room;
  }
}
