import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from '@/infra/repositories';
import { CryptService } from '@/shared/services';
import { AccessTokenService } from '@/shared/jwt';
import { RefreshTokenRepository } from '@/infra/repositories';
import { SignUpDto } from './dto/sign-up';

const REFRESH_TOKEN_EXPIRES_IN_DAYS = 15;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async signin(singin: AuthenticateDto) {
    const { email, password } = singin;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(['INVALID_CREDENTIALS']);
    }

    const isValidPassword = await CryptService.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(['INVALID_CREDENTIALS']);
    }

    const response = await this.generateAccessAndRefreshTokens(user.id);

    return response;
  }

  async refresh(refreshTokenId: string) {
    const refreshToken =
      await this.refreshTokenRepository.findById(refreshTokenId);

    if (!refreshToken) {
      throw new UnauthorizedException(['INVALID_REFRESH_TOKEN']);
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      await this.refreshTokenRepository.delete(refreshTokenId);
      throw new UnauthorizedException(['EXPIRED_REFRESH_TOKEN']);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const [response] = await Promise.all([
      this.generateAccessAndRefreshTokens(refreshToken.accountId),
      this.refreshTokenRepository.delete(refreshTokenId),
    ]);

    return response;
  }

  async create(dto: SignUpDto) {
    const { email, firstName, lastName, password } = dto;

    const emailInUse = await this.usersRepository.findUserByEmail(email);

    if (emailInUse) {
      throw new ConflictException(['EMAIL_ALREADY_IN_USE.']);
    }

    const response = await this.usersRepository.createUser(
      firstName,
      lastName,
      email,
      password,
    );

    const result = await this.generateAccessAndRefreshTokens(response.id);

    return result;
  }

  private async generateAccessAndRefreshTokens(userId: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const [accessToken, refreshToken] = await Promise.all([
      this.accessTokenService.generate({
        sub: userId,
      }),
      this.refreshTokenRepository.create(expiresAt, userId),
    ]);

    return { accessToken, refreshToken: refreshToken.id };
  }
}
