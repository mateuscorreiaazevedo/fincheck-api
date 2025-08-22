import { Injectable } from '@nestjs/common';
import { database } from '../database';
import { schema } from '../database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class RefreshTokenRepository {
  async create(expiresAt: Date, accountId: string) {
    const [result] = await database
      .insert(schema.refreshTokens)
      .values({
        expiresAt,
        issuedAt: new Date(),
        accountId,
      })
      .returning();

    return result;
  }

  async findById(id: string) {
    const result = await database.query.refreshTokens.findFirst({
      where: eq(schema.refreshTokens.id, id),
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async delete(id: string) {
    await database
      .delete(schema.refreshTokens)
      .where(eq(schema.refreshTokens.id, id));
  }
}
