import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ActiveUserId } from '@/shared/decorators';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllCategoriesByUserId(userId);
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto, userId);
  }
}
