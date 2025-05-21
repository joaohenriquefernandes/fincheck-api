import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Freelance',
    description: 'The name of a category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'freelanca',
    description: 'The icon of a category',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'INCOME',
    enum: TransactionType,
    description: 'The type of a category',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
