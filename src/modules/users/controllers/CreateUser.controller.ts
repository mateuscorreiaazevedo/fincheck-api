import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DrizzleUsersService } from '../services/DrizzleUsers.service';
import { CreateUserDto } from '../dto/CreateUser.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly usersService: DrizzleUsersService) {}

  @Post()
  async execute(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (!!userExists) {
      return userExists;
    }

    const user = await this.usersService.create(createUserDto);

    return user;
  }
}
