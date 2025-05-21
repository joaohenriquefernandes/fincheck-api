import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '25e2627f-685e-421e-9bce-0b8c837fc696',
    description: 'The bankAccountId of a transaction',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '84dc3f1a-7b20-4bb7-ae8c-1272d917a94e',
    description: 'The categoryId of a transaction',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Pix',
    description: 'The name of a transaction',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 100,
    description: 'The value of a transaction',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '2025-05-09T18:00:55.937Z',
    description: 'The date of a transaction',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'INCOME',
    enum: TransactionType,
    description: 'The type of a transaction',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
