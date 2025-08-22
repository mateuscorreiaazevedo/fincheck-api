import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from '@/infra/repositories';
import { CryptService } from '@/shared/services';
import { AccessTokenService, RefreshTokenService } from '@/shared/jwt';
import { RefreshTokenRepository } from '@/infra/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(['Invalid credentials.']);
    }

    const isValidPassword = await CryptService.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(['Email or password is incorrect.']);
    }

    const accessToken = await this.accessTokenService.generate({
      sub: user.id,
    });
    const refreshToken = await this.refreshTokenService.generate({
      sub: user.id,
    });

    await this.refreshTokenRepository.create(refreshToken, user.id);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const validatedRefreshToken = await this.refreshTokenService.validate<{
      sub: string;
    }>(refreshToken);

    if (!validatedRefreshToken) {
      await this.refreshTokenRepository.delete(refreshToken);
      throw new UnauthorizedException(['Invalid refresh token.']);
    }

    const accountId = validatedRefreshToken.sub;

    const refreshTokenAlreadyUsed =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!refreshTokenAlreadyUsed) {
      await this.refreshTokenRepository.deleteAllByAccountId(accountId);

      throw new UnauthorizedException(['Invalid refresh token.']);
    }

    const accessToken = await this.accessTokenService.generate({
      sub: accountId,
    });
    const newRefreshToken = await this.refreshTokenService.generate({
      sub: accountId,
    });

    await Promise.all([
      this.refreshTokenRepository.delete(refreshToken),
      this.refreshTokenRepository.create(newRefreshToken, accountId),
    ]);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
