import { Injectable } from '@nestjs/common';
import { database } from '../database';
import { schema } from '../database/schemas';
import { desc, eq, type InferInsertModel } from 'drizzle-orm';

type CreateTransactionData = Omit<
  InferInsertModel<typeof schema.transactions>,
  'id' | 'createdAt'
>;

@Injectable()
export class TransactionsRepository {
  getTransactionsByUserId(userId: string) {
    return database.query.transactions.findMany({
      where: eq(schema.transactions.userId, userId),
      orderBy: desc(schema.transactions.date),
    });
  }

  async create(data: CreateTransactionData) {
    const [result] = await database
      .insert(schema.transactions)
      .values(data)
      .returning();

    return result;
  }

  async update(id: string, data: CreateTransactionData) {
    const [result] = await database
      .update(schema.transactions)
      .set(data)
      .where(eq(schema.transactions.id, id))
      .returning();

    return result;
  }
}
