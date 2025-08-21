import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schemas";
import postgres from "postgres";


export const client = postgres(process.env.DATABASE_URL!);

export const database = drizzle(client, {
  schema,
  casing: 'snake_case'
})