import { Injectable } from '@nestjs/common';
import { database } from '../database';
import { schema } from '../database/schemas';
import { and, desc, eq, gte, lt, type InferInsertModel } from 'drizzle-orm';
import type { ListTransactionFilter } from '@/modules/transactions/types/ListTransactionFilter';

type CreateTransactionData = Omit<
  InferInsertModel<typeof schema.transactions>,
  'id' | 'createdAt'
>;

@Injectable()
export class TransactionsRepository {
  getTransactionsByUserId(userId: string, filters: ListTransactionFilter) {
    const { month, year } = filters;

    return database.query.transactions.findMany({
      where: and(
        eq(schema.transactions.userId, userId),
        gte(schema.transactions.date, new Date(Date.UTC(year, month))),
        lt(schema.transactions.date, new Date(Date.UTC(year, month + 1))),
      ),
      orderBy: desc(schema.transactions.date),
    });
  }

  getTransactionById(id: string, userId?: string) {
    return database.query.transactions.findFirst({
      where: and(
        eq(schema.transactions.id, id),
        userId ? eq(schema.transactions.userId, userId) : undefined,
      ),
    });
  }

  async create(data: CreateTransactionData) {
    const [result] = await database
      .insert(schema.transactions)
      .values(data)
      .returning();

    return result;
  }

  async update(id: string, data: Omit<CreateTransactionData, 'userId'>) {
    const [result] = await database
      .update(schema.transactions)
      .set(data)
      .where(eq(schema.transactions.id, id))
      .returning();

    return result;
  }

  async delete(id: string) {
    await database
      .delete(schema.transactions)
      .where(eq(schema.transactions.id, id));
  }
}
