import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  accountId: uuid('account_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  issuedAt: timestamp('issued_at').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});
