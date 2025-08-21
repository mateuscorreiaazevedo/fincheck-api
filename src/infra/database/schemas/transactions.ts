import { pgTable, uuid, varchar, integer, date, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { bankAccounts } from "./bankAccounts";
import { categories } from "./categories";

export const transactionType = pgEnum('transaction_type', ['INCOME', 'EXPENSE'])

export const transactions = pgTable('transactions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  bankAccountId: uuid('bank_account_id').notNull().references(() => bankAccounts.id, {onDelete: 'cascade'}),
  categoryId: uuid('category_id').notNull().references(() => categories.id, {onDelete: 'cascade'}),
  name: varchar({length: 255}).notNull(),
  valueInCents: integer('value_in_cents').notNull(),
  date: date('date').notNull(),
  type: transactionType('transaction_type').notNull(),
})