import { Module } from '@nestjs/common';
import { AccessTokenService } from './services/access-token.service';
import { JwtModule as JwtModuleNest } from '@nestjs/jwt';
import { env } from '@/infra/config';

@Module({
  imports: [
    JwtModuleNest.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class JwtModule {}
