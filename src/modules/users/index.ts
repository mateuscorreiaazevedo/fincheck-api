import { Module } from '@nestjs/common';
import { DrizzleUsersService } from './services/DrizzleUsers.service';
import { CreateUserController } from './controllers/CreateUser.controller';
import { CryptService } from '@/shared/services';

@Module({
  controllers: [CreateUserController],
  providers: [DrizzleUsersService, CryptService],
})
export class UsersModule {}
