import { varchar } from 'drizzle-orm/pg-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { transactionType } from './transactions';

export const categories = pgTable('categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 255 }).notNull(),
  type: transactionType('transaction_type').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
