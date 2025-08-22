import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/sign-up';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: AuthenticateDto) {
    return this.authService.signin(signInDto);
  }

  @Post('refresh')
  async refreshAuthenticate(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @Post('signup')
  async create(@Body() dto: SignUpDto) {
    return this.authService.create(dto);
  }
}
