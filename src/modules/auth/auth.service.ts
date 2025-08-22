import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from '@/infra/repositories';
import { CryptService } from '@/shared/services';
import { AccessTokenService } from '@/shared/jwt';
import { RefreshTokenRepository } from '@/infra/repositories';

const REFRESH_TOKEN_EXPIRES_IN_DAYS = 15;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly accessTokenService: AccessTokenService,
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

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const { id } = await this.refreshTokenRepository.create(expiresAt, user.id);

    return { accessToken, refreshToken: id };
  }

  async refresh(refreshTokenId: string) {
    const refreshToken =
      await this.refreshTokenRepository.findById(refreshTokenId);

    if (!refreshToken) {
      throw new UnauthorizedException(['Invalid refresh token.']);
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      await this.refreshTokenRepository.delete(refreshTokenId);
      throw new UnauthorizedException(['Expired refresh token.']);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const [accessToken, newRefreshToken] = await Promise.all([
      this.accessTokenService.generate({
        sub: refreshToken.accountId,
      }),
      this.refreshTokenRepository.create(expiresAt, refreshToken.accountId),
      this.refreshTokenRepository.delete(refreshTokenId),
    ]);

    return { accessToken, refreshToken: newRefreshToken.id };
  }
}
