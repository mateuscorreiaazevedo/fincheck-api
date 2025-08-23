import {
  pgTable,
  uuid,
  varchar,
  integer,
  pgEnum,
  timestamp,
} from 'drizzle-orm/pg-core';

export const transactionType = pgEnum('transaction_type', [
  'INCOME',
  'EXPENSE',
]);

export const transactions = pgTable('transactions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  bankAccountId: uuid('bank_account_id').notNull(),
  categoryId: uuid('category_id'),
  name: varchar({ length: 255 }).notNull(),
  valueInCents: integer('value_in_cents').notNull(),
  date: timestamp('date').notNull(),
  type: transactionType('transaction_type').notNull(),
});
