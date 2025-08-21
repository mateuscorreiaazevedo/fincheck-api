import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repositories';
import { CryptService } from '@/shared/services';
import { CategoriesRepository } from '../categories';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    CryptService,
    CategoriesRepository,
  ],
})
export class UsersModule {}
