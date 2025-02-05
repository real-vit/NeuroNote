import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomService } from '../room/room.service';
import TurndownService from 'turndown';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteService {
  constructor(
    private prisma: PrismaService,
    private roomService: RoomService,
  ) {}

  async addNote(roomCode: string, userId: string, message: string) {
    // Get the room ID from the provided room code.
    const roomId = await this.roomService.getRoomIdByCode(roomCode);

    const turndownService = new TurndownService();
    const markdownNote = turndownService.turndown(message); // Convert HTML to Markdown

    // Find existing note entry by roomId.
    const existingNote = await this.prisma.note.findUnique({ where: { roomId } });

    if (existingNote) {
      // Make sure that existing userNote is treated as an array of JSON values.
      const currentUserNotes = Array.isArray(existingNote.userNote)
        ? (existingNote.userNote.filter((note) => note !== null) as Prisma.InputJsonValue[])
        : [];
      
      // Prepare the new note.
      const newNote = { userId, note: markdownNote } as unknown as Prisma.InputJsonValue;
      const updatedUserNotes = [...currentUserNotes, newNote];

      return this.prisma.note.update({
        where: { roomId },
        data: { userNote: updatedUserNotes },
      });
    } else {
      // Create a new note entry using the roomId.
      return this.prisma.note.create({
        data: {
          roomId,
          title: "Untitled",            // Default title (adjust as needed)
          content: markdownNote,         // Use the converted markdown message
          tags: [],                      // Empty tags by default
          userNote: [{ userId, note: markdownNote } as unknown as Prisma.InputJsonValue],
        },
      });
    }
  }

  async combineNotesByRoomCode(roomCode: string, research: boolean): Promise<string> {
    // Find the room ID from the room code.
    const roomId = await this.roomService.getRoomIdByCode(roomCode);

    // Find the note associated with that room ID.
    const note = await this.prisma.note.findUnique({
      where: { roomId },
    });

    if (!note) {
      throw new NotFoundException(`No note found for room id: ${roomId}`);
    }

    // Combine all user notes. Each element in note.userNote is expected to be an object with a "note" property.
    const userNotes = Array.isArray(note.userNote) ? note.userNote : [];
    const combinedUserNotes = userNotes
      .map((entry) => {
        // Ensure the entry is an object and has a "note" property.
        if (entry && typeof entry === 'object' && 'note' in entry) {
          return (entry as any).note;
        }
        return '';
      })
      .filter((text) => text && text.length > 0) // remove empty strings
      .join('\n');

    // If research is true and an AI note exists, append it.
    let combinedText = combinedUserNotes;
    if (research && note.AINote) {
      combinedText += `\n\nAI Note: ${note.AINote}`;
    }
    

    return combinedText;
  }

  async getNotesByRoom(roomCode: string) {
    // Retrieve roomId based on the provided room code.
    const roomId = await this.roomService.getRoomIdByCode(roomCode);
    return this.prisma.note.findUnique({
      where: { roomId },
      select: { userNote: true },
    });
  }
}
