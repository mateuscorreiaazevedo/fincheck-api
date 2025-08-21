import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserController } from './controllers/CreateUser.controller';

@Module({
  controllers: [CreateUserController],
  providers: [UsersService],
})
export class UsersModule {}
