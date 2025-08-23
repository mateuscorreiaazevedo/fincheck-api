import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
})
export class TransactionsModule {}
