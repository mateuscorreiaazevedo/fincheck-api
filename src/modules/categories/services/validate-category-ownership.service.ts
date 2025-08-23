import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '@/infra/repositories';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly repository: CategoriesRepository) {}

  async handle(userId: string, categoryId: string) {
    const isOwner = await this.repository.findById(categoryId, userId);

    if (!isOwner) {
      throw new NotFoundException(['Category not found']);
    }
  }
}
