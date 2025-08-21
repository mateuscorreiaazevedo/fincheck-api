import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { DrizzleUsersService } from '../services/DrizzleUsers.service';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { CryptService } from '@/shared/services';

@Controller('users')
export class CreateUserController {
  constructor(
    private readonly usersService: DrizzleUsersService,
    private readonly cryptService: CryptService,
  ) {}

  @Post()
  async execute(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (!!userExists) {
      throw new ConflictException(['This email is already in use']);
    }

    const hashPassword = await this.cryptService.hashPassword(
      createUserDto.password,
    );

    const user = await this.usersService.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashPassword,
    });

    return user;
  }
}
