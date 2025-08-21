import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { CategoriesModule } from './modules/categories';
import { RepositoriesModule } from './infra/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule, UsersModule, CategoriesModule],
  controllers: [],
})
export class AppModule {}
