import { Module, Global } from '@nestjs/common';
import { UsersRepository } from './users.repositories';
import { CategoriesRepository } from './categories.repositories';

@Global()
@Module({
  providers: [UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class RepositoriesModule {}
