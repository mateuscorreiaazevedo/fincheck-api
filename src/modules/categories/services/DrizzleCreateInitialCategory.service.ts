import { database } from '@/infra/database';
import { schema } from '@/infra/database/schemas';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleCreateInitialCategoryService {
  async execute(userId: string) {
    console.log(userId);

    try {
      const result = await database
        .insert(schema.categories)
        .values([
          { name: 'salaries', userId, icon: 'travel', type: 'INCOME' },
          {
            name: 'freelances',
            userId,
            icon: 'freelance',
            type: 'INCOME',
          },
          { name: 'others', userId, icon: 'other', type: 'INCOME' },
          { name: 'house', userId, icon: 'home', type: 'EXPENSE' },
          { name: 'foods', userId, icon: 'food', type: 'EXPENSE' },
          {
            name: 'educations',
            userId,
            icon: 'education',
            type: 'EXPENSE',
          },
          {
            name: 'hobbies',
            userId,
            icon: 'fun',
            type: 'EXPENSE',
          },
          {
            name: 'market',
            userId,
            icon: 'grocery',
            type: 'EXPENSE',
          },
          {
            name: 'clothes',
            userId,
            icon: 'clothes',
            type: 'EXPENSE',
          },
          {
            name: 'transports',
            userId,
            icon: 'transport',
            type: 'EXPENSE',
          },
          {
            name: 'trips',
            userId,
            icon: 'travel',
            type: 'EXPENSE',
          },
          {
            name: 'others',
            userId,
            icon: 'other',
            type: 'EXPENSE',
          },
        ])
        .returning();

      return result;
    } catch (error) {
      throw new BadRequestException([(error as Error).message]);
    }
  }
}
