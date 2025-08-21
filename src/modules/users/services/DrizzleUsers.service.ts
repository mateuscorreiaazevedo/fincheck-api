import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { database } from '@/infra/database';
import { schema } from '@/infra/database/schemas';
import { eq } from 'drizzle-orm';
import { DrizzleCreateInitialCategoryService } from '@/modules/categories';

@Injectable()
export class DrizzleUsersService {
  constructor(
    private readonly createInitialCategoryService: DrizzleCreateInitialCategoryService,
  ) {}

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

    const categories = await this.createInitialCategoryService.execute(
      newUser.id,
    );

    return { ...newUser, categories };
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

    return {
      ...user,
    };
  }
}
