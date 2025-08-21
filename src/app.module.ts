import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
