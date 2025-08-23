import { TransactionType, type TransactionModel } from '../models/Transaction';

interface DatabaseTransaction {
  date: string;
  name: string;
  id: string;
  userId: string;
  type: 'INCOME' | 'EXPENSE';
  bankAccountId: string;
  categoryId: string | null;
  valueInCents: number;
}

export class TransactionsMapper {
  static toTransactionModel(
    transaction: DatabaseTransaction,
  ): TransactionModel {
    const type =
      transaction.type === 'INCOME'
        ? TransactionType.INCOME
        : TransactionType.EXPENSE;

    return {
      id: transaction.id,
      name: transaction.name,
      type,
      valueInCents: transaction.valueInCents,
      date: new Date(transaction.date),
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      userId: transaction.userId,
    };
  }
}
