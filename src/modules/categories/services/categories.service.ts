import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}
  async create(userId: string, { icon, name, type }: CreateCategoryDto) {
    const category = await this.categoriesRepository.create({
      data: {
        icon,
        name,
        type,
        userId,
      },
    });
    return { category };
  }

  async findAllByUserId(userId: string) {
    const categories = await this.categoriesRepository.findMany({
      where: { userId },
      select: {
        name: true,
        icon: true,
        type: true,
      },
    });
    return { categories };
  }

  async findOneByUserId(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });
    if (!category) throw new NotFoundException('Category not found.');
    return { category };
  }

  async update(
    userId: string,
    categoryId: string,
    { icon, name, type }: UpdateCategoryDto,
  ) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);
    const category = await this.categoriesRepository.update({
      where: { id: categoryId },
      data: {
        icon,
        name,
        type,
      },
    });
    return { category };
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);
    await this.categoriesRepository.delete({
      where: { id: categoryId },
    });
    return;
  }
}
