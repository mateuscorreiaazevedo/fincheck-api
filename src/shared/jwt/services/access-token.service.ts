import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async validate<T = unknown>(token: string): Promise<T | void> {
    try {
      const validatedToken = await this.jwtService.verifyAsync(token);

      return validatedToken;
    } catch {
      return;
    }
  }
}
