import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Secret for JWT signing
      signOptions: {
        expiresIn: '1h', // Token expiration
      },
    }),
  ],
  controllers: [AuthController],  // Ensure it's added here
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
