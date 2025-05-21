import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Nubank',
    description: 'The name of a bank account',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1000,
    description: 'The initial balance of a bank account',
  })
  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'INVESTMENT',
    enum: BankAccountType,
    description: 'The type of a bank account',
  })
  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @ApiProperty({
    type: String,
    required: true,
    example: '#ff5733',
    description: 'The color of a bank account',
  })
  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
