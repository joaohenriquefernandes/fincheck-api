import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
