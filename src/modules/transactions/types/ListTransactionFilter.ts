import type { TransactionType } from '../models/Transaction';

export interface ListTransactionFilter {
  month: number;
  year: number;
  bankAccountId?: string;
  transactionType?: TransactionType;
}
