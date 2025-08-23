import { CategoriesRepository } from '@/infra/repositories';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';

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

  async deleteCategory(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundException(['Category not found']);
    }

    if (category.isDefault) {
      throw new ForbiddenException(['You cannot delete a default category']);
    }

    await this.categoriesRepository.delete(id);
  }
}
