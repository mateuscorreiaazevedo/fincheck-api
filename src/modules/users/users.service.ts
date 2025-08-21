import { ConflictException, Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { CategoriesRepository, UsersRepository } from '@/infra/repositories';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const { email, firstName, lastName, password } = dto;

    const emailInUse = await this.usersRepository.findUserByEmail(email);

    if (!!emailInUse) {
      throw new ConflictException(['This email is already in use.']);
    }

    const user = await this.usersRepository.createUser(
      firstName,
      lastName,
      email,
      password,
    );

    const categories =
      await this.categoriesRepository.createInitialCategoriesByUserId(user.id);

    return {
      ...user,
      categories: {
        result: categories,
        count: categories.length,
      },
    };
  }
}
