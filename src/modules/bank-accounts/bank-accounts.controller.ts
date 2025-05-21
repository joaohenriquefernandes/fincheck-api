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
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsService } from './services/bank-accounts.service';

@ApiBearerAuth()
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiBody({ type: CreateBankAccountDto })
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bank accounts' })
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Get(':bankAccountId')
  @ApiOperation({ summary: 'Get a specific bank account' })
  @ApiParam({ name: 'bankAccountId', description: 'Bank Account ID' })
  findOne(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.findOneByUserId(userId, bankAccountId);
  }

  @Put(':bankAccountId')
  @ApiOperation({ summary: 'Edit a bank account' })
  @ApiParam({ name: 'bankAccountId', description: 'Bank Account ID' })
  @ApiBody({ type: UpdateBankAccountDto })
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDto,
    );
  }

  @Delete(':bankAccountId')
  @ApiOperation({ summary: 'Delete a bank account' })
  @ApiParam({ name: 'bankAccountId', description: 'Bank Account ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
