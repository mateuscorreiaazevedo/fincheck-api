import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/CreateUser.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  execute(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
