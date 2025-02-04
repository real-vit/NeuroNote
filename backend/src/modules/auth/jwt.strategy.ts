// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract token from Authorization header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,  // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);  // Log the decoded JWT payload
    return { userId: payload.sub };  // This is where userId is being extracted from 'sub'
  }
}
