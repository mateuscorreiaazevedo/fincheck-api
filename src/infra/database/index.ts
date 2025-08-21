import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './schemas';
import postgres from 'postgres';
import { env } from '../config';

export const client = postgres(env.DATABASE_URL);

export const database = drizzle(client, {
  schema,
  casing: 'snake_case',
});
