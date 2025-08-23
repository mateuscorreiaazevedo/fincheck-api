import { Module, Global } from '@nestjs/common';
import { UsersRepository } from './users.repositories';
import { CategoriesRepository } from './categories.repositories';
import { RefreshTokenRepository } from './refresh-token.repositories';
import { BankAccountsRepository } from './bank-accounts.repositories';
import { TransactionsRepository } from './transactions.repositories';

@Global()
@Module({
  providers: [
    UsersRepository,
    CategoriesRepository,
    RefreshTokenRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    RefreshTokenRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class RepositoriesModule {}
