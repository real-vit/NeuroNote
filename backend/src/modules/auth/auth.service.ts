import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Find user by username
  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  // Validate the user credentials
  async validateUser(username: string, password: string) {
    const user = await this.findUserByUsername(username); // Now using the method here
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: '1h',
    });
  
    return { 
      access_token: token,
      userId: user.id // Include userId in the response
    };
  }
  
  async signup(username: string, password: string, email?: string) {
    const existingUser = await this.findUserByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email: email!, // Use null if email is undefined
      },
    });
  }
  
}
