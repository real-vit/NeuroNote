import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';  // Import the controller
import { PrismaService } from '../../prisma/prisma.service';
import { RoomService } from '../room/room.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
  ],
  controllers: [NoteController],  // Ensure the controller is listed here
  providers: [NoteService, PrismaService, RoomService],
  exports: [NoteService],
})
export class NoteModule {}

