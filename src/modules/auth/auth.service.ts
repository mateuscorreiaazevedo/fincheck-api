import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from '@/infra/repositories';
import { CryptService } from '@/shared/services';
import { JwtService } from '@nestjs/jwt';
import { env } from '@/infra/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
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

    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '15d', secret: env.REFRESH_TOKEN_SECRET },
    );

    return { accessToken, refreshToken };
  }
}
