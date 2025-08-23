import { relations } from 'drizzle-orm';
import { transactions } from './transactions';
import { users } from './users';
import { bankAccounts } from './bankAccounts';
import { categories } from './categories';

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  bankAccount: one(bankAccounts, {
    fields: [transactions.bankAccountId],
    references: [bankAccounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
