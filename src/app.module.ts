import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { CategoriesModule } from './modules/categories';
import { RepositoriesModule } from './infra/repositories';
import { AuthModule } from './modules/auth';

@Module({
  imports: [RepositoriesModule, UsersModule, CategoriesModule, AuthModule],
  controllers: [],
})
export class AppModule {}
