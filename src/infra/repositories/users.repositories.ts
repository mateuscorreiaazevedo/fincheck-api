import { Injectable } from '@nestjs/common';
import { schema } from '@/infra/database/schemas';
import { database } from '@/infra/database';
import { eq } from 'drizzle-orm';
import { CryptService } from '@/shared/services';

@Injectable()
export class UsersRepository {
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const passwordHash = await CryptService.hash(password);

    const [result] = await database
      .insert(schema.users)
      .values({
        firstName,
        lastName,
        email,
        password: passwordHash,
      })
      .returning();

    const initialCategories = await database
      .insert(schema.categories)
      .values([
        { name: 'salaries', userId: result.id, icon: 'travel', type: 'INCOME' },
        {
          name: 'freelances',
          userId: result.id,
          icon: 'freelance',
          type: 'INCOME',
        },
        { name: 'others', userId: result.id, icon: 'other', type: 'INCOME' },
        { name: 'house', userId: result.id, icon: 'home', type: 'EXPENSE' },
        { name: 'foods', userId: result.id, icon: 'food', type: 'EXPENSE' },
        {
          name: 'educations',
          userId: result.id,
          icon: 'education',
          type: 'EXPENSE',
        },
        {
          name: 'hobbies',
          userId: result.id,
          icon: 'fun',
          type: 'EXPENSE',
        },
        {
          name: 'market',
          userId: result.id,
          icon: 'grocery',
          type: 'EXPENSE',
        },
        {
          name: 'clothes',
          userId: result.id,
          icon: 'clothes',
          type: 'EXPENSE',
        },
        {
          name: 'transports',
          userId: result.id,
          icon: 'transport',
          type: 'EXPENSE',
        },
        {
          name: 'trips',
          userId: result.id,
          icon: 'travel',
          type: 'EXPENSE',
        },
        {
          name: 'others',
          userId: result.id,
          icon: 'other',
          type: 'EXPENSE',
        },
      ])
      .returning({
        id: schema.categories.id,
      });

    return {
      user: result,
      categories: initialCategories,
    };
  }

  async findUserByEmail(email: string) {
    const result = await database.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async findUserById(id: string) {
    const result = await database.query.users.findFirst({
      where: eq(schema.users.id, id),
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }
}
