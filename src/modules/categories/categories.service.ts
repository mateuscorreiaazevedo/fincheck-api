import { CategoriesRepository } from '@/infra/repositories';
import { Injectable } from '@nestjs/common';
import type { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategoriesByUserId(userId: string) {
    const categories = await this.categoriesRepository.findAllByUserId(userId);

    return { data: categories };
  }

  async createCategory(dto: CreateCategoryDto, userId: string) {
    const category = await this.categoriesRepository.create(
      dto.name,
      dto.icon,
      dto.transactionType,
      userId,
    );

    return category;
  }
}
