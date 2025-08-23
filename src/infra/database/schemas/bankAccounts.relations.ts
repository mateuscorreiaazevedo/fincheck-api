import { relations } from 'drizzle-orm';
import { bankAccounts } from './bankAccounts';
import { users } from './users';
import { transactions } from './transactions';

export const bankAccountsRelations = relations(
  bankAccounts,
  ({ one, many }) => ({
    user: one(users, {
      fields: [bankAccounts.userId],
      references: [users.id],
    }),
    transactions: many(transactions),
  }),
);
