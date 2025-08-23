import { Module, Global } from '@nestjs/common';
import { UsersRepository } from './users.repositories';
import { CategoriesRepository } from './categories.repositories';
import { RefreshTokenRepository } from './refresh-token.repositories';
import { BankAccountsRepository } from './bank-accounts.repositories';

@Global()
@Module({
  providers: [
    UsersRepository,
    CategoriesRepository,
    RefreshTokenRepository,
    BankAccountsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    RefreshTokenRepository,
    BankAccountsRepository,
  ],
})
export class RepositoriesModule {}
