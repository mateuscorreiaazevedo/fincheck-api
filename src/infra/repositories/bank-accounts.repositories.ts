import { Injectable } from '@nestjs/common';
import { InferInsertModel } from 'drizzle-orm';
import { schema } from '../database/schemas';
import { database } from '../database';

type CreateBankAccountData = InferInsertModel<typeof schema.bankAccounts>;

@Injectable()
export class BankAccountsRepository {
  async create(data: Omit<CreateBankAccountData, 'id' | 'createdAt'>) {
    const [result] = await database
      .insert(schema.bankAccounts)
      .values(data)
      .returning();

    return result;
  }
}
