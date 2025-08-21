import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
    };
  }

}
