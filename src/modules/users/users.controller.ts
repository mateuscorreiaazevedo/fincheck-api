import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from '../auth/dto/sign-up';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
