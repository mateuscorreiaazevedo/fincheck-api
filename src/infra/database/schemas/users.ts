import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar('first_name', {length: 255}).notNull(),
  lastName: varchar('last_name', {length: 255}).notNull(),
  email: varchar('email', {length: 255}).unique().notNull(),
  password: varchar('password', {length: 255}).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
})