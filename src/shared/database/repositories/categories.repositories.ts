import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryCreateArgs) {
    return this.prismaService.category.create(createDto);
  }

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.CategoryFindUniqueArgs) {
    return this.prismaService.category.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.CategoryUpdateArgs) {
    return this.prismaService.category.update(updateDto);
  }

  delete(deleteDto: Prisma.CategoryDeleteArgs) {
    return this.prismaService.category.delete(deleteDto);
  }
}
