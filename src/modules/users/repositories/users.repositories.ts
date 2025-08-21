import { Injectable } from '@nestjs/common';
import { schema } from '@/infra/database/schemas';
import { database } from '@/infra/database';
import { eq } from 'drizzle-orm';
import type { CryptService } from '@/shared/services';

@Injectable()
export class UsersRepository {
  constructor(private readonly cryptService: CryptService) {}

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const passwordHash = await this.cryptService.hash(password);

    const result = await database
      .insert(schema.users)
      .values({
        firstName,
        lastName,
        email,
        password: passwordHash,
      })
      .returning();

    return result;
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
}
