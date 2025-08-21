import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from '@/infra/repositories';
import { CryptService } from '@/shared/services';
import { AccessTokenService, RefreshTokenService } from '@/shared/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
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

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const validatedRefreshToken = await this.refreshTokenService.validate<{
      sub: string;
    }>(refreshToken);

    if (!validatedRefreshToken) {
      throw new UnauthorizedException(['Invalid refresh token.']);
    }

    const accountId = validatedRefreshToken.sub;

    const accessToken = await this.accessTokenService.generate({
      sub: accountId,
    });
    const newRefreshToken = await this.refreshTokenService.generate({
      sub: accountId,
    });

    return { accessToken, refreshToken: newRefreshToken };
  }
}
