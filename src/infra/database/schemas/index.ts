import { users } from './users';
import { bankAccounts } from './bankAccounts';
import { bankAccountsRelations } from './bankAccounts.relations';
import { categories } from './categories';
import { transactions } from './transactions';
import { transactionsRelations } from './transactions.relations';
import { refreshTokens } from './refreshTokens';

export const schema = {
  users,
  bankAccounts,
  bankAccountsRelations,
  categories,
  transactions,
  transactionsRelations,
  refreshTokens,
};
