import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { CategoriesModule } from './modules/categories';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [],
})
export class AppModule {}
