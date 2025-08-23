import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { CategoriesModule } from './modules/categories';
import { RepositoriesModule } from './infra/repositories';
import { AuthGuard, AuthModule } from './modules/auth';
import { APP_GUARD } from '@nestjs/core';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';

@Module({
  imports: [RepositoriesModule, UsersModule, CategoriesModule, AuthModule, BankAccountsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
