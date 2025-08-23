export enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

export interface BankAccountModel {
  id: string;
  userId: string;
  name: string;
  initialBalanceInCents: number;
  accountType: BankAccountType;
  color: string;
  createdAt: Date;
}
