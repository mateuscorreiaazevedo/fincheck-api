import { Injectable } from '@nestjs/common';
import { database } from '../database';
import { schema } from '../database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoriesRepository {
  findAllByUserId(userId: string) {
    return database
      .select({
        id: schema.categories.id,
        name: schema.categories.name,
        icon: schema.categories.icon,
        isDefault: schema.categories.isDefault,
        type: schema.categories.type,
      })
      .from(schema.categories)
      .where(eq(schema.categories.userId, userId));
  }

  findById(id: string) {
    return database.query.categories.findFirst({
      where: eq(schema.categories.id, id),
    });
  }

  async create(
    name: string,
    icon: string,
    transactionType: 'INCOME' | 'EXPENSE',
    userId: string,
  ) {
    const [result] = await database
      .insert(schema.categories)
      .values({
        name,
        icon,
        type: transactionType,
        userId,
      })
      .returning();

    return result;
  }

  async delete(id: string) {
    await database
      .delete(schema.categories)
      .where(eq(schema.categories.id, id));
  }
}
