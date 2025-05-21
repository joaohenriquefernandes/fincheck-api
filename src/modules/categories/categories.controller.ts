import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './services/categories.service';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Get a specific category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  findOne(
    @ActiveUserId() userId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return this.categoriesService.findOneByUserId(userId, categoryId);
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Edit a category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  update(
    @ActiveUserId() userId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(userId, categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return this.categoriesService.remove(userId, categoryId);
  }
}
