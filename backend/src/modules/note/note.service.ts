import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomService } from '../room/room.service';
import TurndownService from 'turndown';
import { Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NoteService {
  constructor(
    private prisma: PrismaService,
    private roomService: RoomService,
    private httpService: HttpService, // Properly injected HttpService
  ) {}

  async addNote(roomCode: string, userId: string, message: string) {
    const roomId = await this.roomService.getRoomIdByCode(roomCode);
    const turndownService = new TurndownService();
    const markdownNote = turndownService.turndown(message);

    const existingNote = await this.prisma.note.findUnique({ where: { roomId } });

    if (existingNote) {
      const currentUserNotes = Array.isArray(existingNote.userNote)
        ? (existingNote.userNote.filter((note) => note !== null) as Prisma.InputJsonValue[])
        : [];
      
      const newNote = { userId, note: markdownNote } as unknown as Prisma.InputJsonValue;
      const updatedUserNotes = [...currentUserNotes, newNote];

      return this.prisma.note.update({
        where: { roomId },
        data: { userNote: updatedUserNotes },
      });
    } else {
      return this.prisma.note.create({
        data: {
          roomId,
          title: "Untitled",
          content: markdownNote,
          tags: [],
          userNote: [{ userId, note: markdownNote } as unknown as Prisma.InputJsonValue],
        },
      });
    }
  }

  async combineNotesByRoomCode(roomCode: string, research: boolean): Promise<string> {
    const roomId = await this.roomService.getRoomIdByCode(roomCode);
    const note = await this.prisma.note.findUnique({ where: { roomId } });

    if (!note) {
      throw new NotFoundException(`No note found for room id: ${roomId}`);
    }

    const userNotes = Array.isArray(note.userNote) ? note.userNote : [];
    const combinedUserNotes = userNotes
      .map((entry) => {
        if (entry && typeof entry === 'object' && 'note' in entry) {
          return (entry as any).note;
        }
        return '';
      })
      .filter((text) => text)
      .join('\n');

    let combinedText = combinedUserNotes;
    if (research && note.AINote) {
      combinedText += `\n\nAI Note: ${note.AINote}`;
    }
    

    const response = await firstValueFrom(
        this.httpService.post(
          'http://192.168.125.37:8000/process_notes_async',
          { raw_notes: combinedText, research },
          { timeout: 30000 } // 30 seconds timeout
        )
      );

    return response.data;
  }

  async getNotesByRoom(roomCode: string) {
    const roomId = await this.roomService.getRoomIdByCode(roomCode);
    return this.prisma.note.findUnique({
      where: { roomId },
      select: { userNote: true },
    });
  }
}