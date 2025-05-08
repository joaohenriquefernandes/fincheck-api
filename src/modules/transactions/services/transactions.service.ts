import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(
    userId: string,
    {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    }: CreateTransactionDto,
  ) {
    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });
    const transaction = await this.transactionsRepository.create({
      data: {
        date,
        name,
        type,
        value,
        bankAccountId,
        categoryId,
        userId,
      },
    });
    return { transaction };
  }

  async findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    const transactions = await this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month) + 1),
        },
      },
    });
    return { transactions };
  }

  async findOneByUserId(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findUnique({
      where: {
        id: transactionId,
        userId,
      },
    });
    if (!transaction) throw new NotFoundException('Transaction not found.');
    return { transaction };
  }

  async update(
    userId: string,
    transactionId: string,
    {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    }: UpdateTransactionDto,
  ) {
    await this.validateEntitiesOwnership({
      bankAccountId,
      categoryId,
      userId,
      transactionId,
    });
    const transaction = await this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
    return { transaction };
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });
    await this.transactionsRepository.delete({
      where: { id: transactionId },
    });
    return;
  }

  private async validateEntitiesOwnership({
    bankAccountId,
    categoryId,
    userId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
    ]);
  }
}
