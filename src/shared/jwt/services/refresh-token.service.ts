import { env } from '@/infra/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '15d',
      secret: env.REFRESH_TOKEN_SECRET,
    });
  }

  async validate<T = unknown>(token: string): Promise<T | void> {
    try {
      const validatedToken = await this.jwtService.verifyAsync(token, {
        secret: env.REFRESH_TOKEN_SECRET,
      });

      return validatedToken;
    } catch {
      return;
    }
  }
}
