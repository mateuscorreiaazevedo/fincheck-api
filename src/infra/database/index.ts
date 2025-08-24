import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './schemas';
import postgres from 'postgres';
import { env } from '../config';
import { relationships } from './schemas/relations';

export const client = postgres(env.DATABASE_URL);

export const database = drizzle(client, {
  schema: { ...schema, ...relationships },
  casing: 'snake_case',
});
