export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface TransactionModel {
  id: string;
  name: string;
  type: TransactionType;
  valueInCents: number;
  date: Date;
  bankAccountId: string;
  categoryId: string | null;
  userId: string;
}
