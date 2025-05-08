import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async create(
    userId: string,
    { color, initialBalance, name, type }: CreateBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountsRepository.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    });
    return { bankAccount };
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });
    bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );
      const currentBalance = bankAccount.initialBalance + totalTransactions;
      return {
        ...bankAccount,
        currentBalance,
      };
    });
    return { bankAccounts };
  }

  async findOneByUserId(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findUnique({
      where: {
        id: bankAccountId,
        userId: userId,
      },
    });
    if (!bankAccount) throw new NotFoundException('Bank account not found.');
    return { bankAccount };
  }

  async update(
    userId: string,
    bankAccountId: string,
    { color, initialBalance, name, type }: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
    return await this.bankAccountsRepository.update({
      data: {
        color,
        initialBalance,
        name,
        type,
      },
      where: {
        id: bankAccountId,
        userId,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
    await this.bankAccountsRepository.delete({
      where: { id: bankAccountId, userId },
    });
    return;
  }
}
