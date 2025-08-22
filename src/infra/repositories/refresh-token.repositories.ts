import { Injectable } from '@nestjs/common';
import { database } from '../database';
import { schema } from '../database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class RefreshTokenRepository {
  async findByToken(refreshToken: string) {
    const result = await database.query.refreshTokens.findFirst({
      where: eq(schema.refreshTokens.token, refreshToken),
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async create(token: string, accountId: string) {
    const [result] = await database
      .insert(schema.refreshTokens)
      .values({
        token,
        accountId,
      })
      .returning();

    return result;
  }

  async delete(refreshToken: string) {
    await database
      .delete(schema.refreshTokens)
      .where(eq(schema.refreshTokens.token, refreshToken));
  }

  async deleteAllByAccountId(accountId: string) {
    await database
      .delete(schema.refreshTokens)
      .where(eq(schema.refreshTokens.accountId, accountId));
  }
}
