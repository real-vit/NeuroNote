import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common'; // Import UnauthorizedException

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login route
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Use UnauthorizedException for failed login
    }
    return this.authService.login(user);
  }

  // Signup route
@Post('signup')
async signup(@Body() body: { username: string; password: string; email?: string }) {
  const existingUser = await this.authService.findUserByUsername(body.username);
  if (existingUser) {
    throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST); // Handle username conflict
  }
  const user = await this.authService.signup(body.username, body.password, body.email);
  return this.authService.login(user); // Return token after signup
}
}
