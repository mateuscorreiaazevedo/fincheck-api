import { relations } from 'drizzle-orm';
import { bankAccounts } from './bankAccounts';
import { users } from './users';
import { transactions } from './transactions';
import { categories } from './categories';

const bankAccountsRelations = relations(bankAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [bankAccounts.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

const transactionsRelations = relations(transactions, ({ one }) => ({
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

export const relationships = {
  bankAccountsRelations,
  transactionsRelations,
};
