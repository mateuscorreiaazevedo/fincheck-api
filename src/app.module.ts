import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RepositoriesModule } from './infra/repositories';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { BankAccountsModule } from './modules/bank-accounts';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    RepositoriesModule,
    UsersModule,
    CategoriesModule,
    AuthModule,
    BankAccountsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
