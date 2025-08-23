import { Injectable } from '@nestjs/common';
import { and, eq, InferInsertModel } from 'drizzle-orm';
import { schema } from '../database/schemas';
import { database } from '../database';

type CreateBankAccountData = Omit<
  InferInsertModel<typeof schema.bankAccounts>,
  'id' | 'createdAt'
>;

@Injectable()
export class BankAccountsRepository {
  async findAllByUserId(userId: string) {
    const result = await database.query.bankAccounts.findMany({
      where: eq(schema.bankAccounts.userId, userId),
    });

    return result;
  }

  async findById(id: string, userId?: string) {
    return database.query.bankAccounts.findFirst({
      where: and(
        eq(schema.bankAccounts.id, id),
        userId ? eq(schema.bankAccounts.userId, userId) : undefined,
      ),
    });
  }

  async create(data: CreateBankAccountData) {
    const [result] = await database
      .insert(schema.bankAccounts)
      .values(data)
      .returning();

    return result;
  }

  async update(id: string, data: CreateBankAccountData) {
    const [result] = await database
      .update(schema.bankAccounts)
      .set(data)
      .where(eq(schema.bankAccounts.id, id))
      .returning();

    return result;
  }

  async delete(id: string) {
    await database
      .delete(schema.bankAccounts)
      .where(eq(schema.bankAccounts.id, id));
  }
}
