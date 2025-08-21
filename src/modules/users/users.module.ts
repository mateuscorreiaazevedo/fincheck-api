import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repositories';
import { CryptService } from '@/shared/services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CryptService],
})
export class UsersModule {}
