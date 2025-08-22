import { Module, Global } from '@nestjs/common';
import { UsersRepository } from './users.repositories';
import { CategoriesRepository } from './categories.repositories';
import { RefreshTokenRepository } from './refresh-token.repositories';

@Global()
@Module({
  providers: [UsersRepository, CategoriesRepository, RefreshTokenRepository],
  exports: [UsersRepository, CategoriesRepository, RefreshTokenRepository],
})
export class RepositoriesModule {}
