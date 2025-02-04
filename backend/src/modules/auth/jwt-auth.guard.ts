import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';  // Add this import

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract the token from the header

    if (!token) {
      throw new Error('Token is missing');
    }

    try {
      // Ensure the same secret is used for both signing and verifying the token
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key', // Use the same secret as used during signing
      });
      request.user = decoded; // Attach the decoded user data to the request
      return true;
    } catch (error) {
      throw new Error('JWT Verification Failed: ' + error.message);
    }
  }
}
