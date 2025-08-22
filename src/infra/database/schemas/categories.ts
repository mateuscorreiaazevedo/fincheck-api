import { varchar } from 'drizzle-orm/pg-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { transactionType } from './transactions';
import { boolean } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 255 }).notNull(),
  type: transactionType('transaction_type').notNull(),
  isDefault: boolean('is_default').notNull().default(false),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
