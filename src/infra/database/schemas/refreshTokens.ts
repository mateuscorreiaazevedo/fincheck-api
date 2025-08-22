import { pgTable, timestamp, uuid, varchar, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  accountId: uuid('account_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  tokenIndex: index('refresh_tokens_token_idx').on(table.token),
}));
