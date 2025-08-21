import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const bankAccountType = pgEnum('account_type', ['CHECKING', 'INVESTMENT', 'CASH'])

export const bankAccounts = pgTable('bank_accounts', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  name: varchar({length: 255}).notNull(),
  initialBalanceInCents: integer('initial_balance_in_cents').notNull(),
  accountType: bankAccountType('account_type').notNull(),
  color: varchar({length: 7}).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})