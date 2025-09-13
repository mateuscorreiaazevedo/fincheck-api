import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignUpDto } from './dto/sign-up';
import { PublicRoute } from '@/shared/decorators';
import type { Request, Response } from 'express';
import { tokensKeys } from '@/shared/constants';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: AuthenticateDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.signin(signInDto);

    this.setAccessAndRefreshTokensOnCookies(res, accessToken, refreshToken);

    return res.json({ message: 'Login realizado com sucesso' });
  }

  @Post('refresh')
  async refreshAuthenticate(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[tokensKeys.refreshToken];

    if (!refreshToken) {
      throw new UnauthorizedException(['INVALID_REFRESH_TOKEN']);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken as string);

    this.setAccessAndRefreshTokensOnCookies(res, accessToken, newRefreshToken);

    return res.json({ refresh: true });
  }

  @Post('signup')
  async create(@Body() dto: SignUpDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.create(dto);

    this.setAccessAndRefreshTokensOnCookies(res, accessToken, refreshToken);

    return res.json({ message: 'Cadastro realizado com sucesso' });
  }

  @Post('signout')
  logout(@Res() res: Response) {
    res.clearCookie(tokensKeys.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.clearCookie(tokensKeys.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }

  private setAccessAndRefreshTokensOnCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    res.cookie(tokensKeys.accessToken, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie(tokensKeys.refreshToken, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
  }
}
