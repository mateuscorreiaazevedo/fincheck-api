import { Module } from '@nestjs/common';
import { DrizzleUsersService } from './services/DrizzleUsers.service';
import { CreateUserController } from './controllers/CreateUser.controller';

@Module({
  controllers: [CreateUserController],
  providers: [DrizzleUsersService],
})
export class UsersModule {}
