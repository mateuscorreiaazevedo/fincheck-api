import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { database } from '@/infra/database';
import { schema } from '@/infra/database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUsersService {
  async create({ email, firstName, lastName, password }: CreateUserDto) {
    const [newUser] = await database
      .insert(schema.users)
      .values({
        firstName,
        lastName,
        password,
        email,
      })
      .returning();

    return newUser;
  }

  async findByEmail(email: string) {
    const [user] = await database
      .select({
        id: schema.users.id,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(eq(schema.users.email, email));

    if (!user) {
      return null;
    }

    return user;
  }
}
