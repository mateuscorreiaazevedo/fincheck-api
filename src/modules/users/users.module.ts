import { Module } from '@nestjs/common';
import { DrizzleUsersService } from './services/DrizzleUsers.service';
import { CreateUserController } from './controllers/CreateUser.controller';
import { CryptService } from '@/shared/services';
import { DrizzleCreateInitialCategoryService } from '../categories';

@Module({
  controllers: [CreateUserController],
  providers: [
    DrizzleUsersService,
    CryptService,
    DrizzleCreateInitialCategoryService,
  ],
})
export class UsersModule {}
