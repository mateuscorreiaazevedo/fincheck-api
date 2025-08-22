import { database } from '@/infra/database';
import { schema } from '@/infra/database/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async getUserById(id: string) {
    const user = await database.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    return user;
  }
}
