import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
// If using JWT authentication, uncomment the line below:
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
// @UseGuards(JwtAuthGuard) // Uncomment if protecting routes with JWT.
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('add')
  async addNote(
    @Body() body: { roomCode: string; userId: string; message: string }
  ) {
    // Verify that roomCode is present in the body.
    if (!body.roomCode) {
      throw new Error('roomCode is required');
    }
    return this.noteService.addNote(body.roomCode, body.userId, body.message);
  }

  @Get(':roomCode')
  async getNotes(@Param('roomCode') roomCode: string) {
    return this.noteService.getNotesByRoom(roomCode);
  }

  @Post('combine')
  async combineNotes(@Body() body: { roomCode: string; research: boolean }) {
    const combinedText = await this.noteService.combineNotesByRoomCode(body.roomCode, body.research);
    return { combinedNotes: combinedText };
  }
}
