import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from '../room/room.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService,PrismaService,RoomService]
})
export class NoteModule {}
