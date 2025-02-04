import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './modules/note/note.module';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { RoomController } from './modules/room/room.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
import { RoomService } from './modules/room/room.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { GatewayModule } from './modules/gateway/gateway.module';

@Module({
  imports: [NoteModule, UserModule, RoomModule, AuthModule,ConfigModule.forRoot(),PrismaModule, GatewayModule,NoteModule],
  controllers: [AppController, UserController, RoomController],
  providers: [AppService, UserService, RoomService,PrismaService,JwtService],
})
export class AppModule {}
