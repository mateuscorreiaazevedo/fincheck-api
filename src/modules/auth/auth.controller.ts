import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import type { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.authenticate(authenticateDto);
  }

  @Post('refresh')
  async refreshAuthenticate(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
