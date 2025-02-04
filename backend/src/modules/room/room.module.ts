import { Module } from '@nestjs/common';
import { RoomService } from './room.service'; // Adjust path if necessary
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';


@Module({
  providers: [RoomService,PrismaService,ConfigModule,ConfigService,UserService],  // Make sure RoomService is provided here
})
export class RoomModule {}
