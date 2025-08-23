import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
