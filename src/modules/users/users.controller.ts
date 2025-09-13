import { Controller, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from '@/shared/decorators';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@ActiveUserId() userId: string, @Res() res: Response) {
    const authenticatedUser = await this.usersService.getById(userId);

    return res.json(authenticatedUser);
  }
}
