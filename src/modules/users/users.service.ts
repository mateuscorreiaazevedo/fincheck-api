import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/CreateUser.dto';
import { UsersRepository } from './repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const { email, firstName, lastName, password } = dto;

    const emailInUse = await this.usersRepository.findUserByEmail(email);

    if (emailInUse) {
      throw new Error('This email is already in use.');
    }

    const user = await this.usersRepository.createUser(
      firstName,
      lastName,
      email,
      password,
    );

    return { ...user };
  }
}
