import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const userId = req['userId'];

    return this.usersService.getById(userId);
  }
}
