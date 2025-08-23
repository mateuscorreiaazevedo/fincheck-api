import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '@/infra/repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import type { TransactionModel } from '../models/Transaction';
import { TransactionsMapper } from '../utils/TransactionsMapper';

interface IValidateEntitiesOwnership {
  bankAccountId: string;
  categoryId: string;
  userId: string;
  transactionId?: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, type, valueInCents, date } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepository.create({
      bankAccountId,
      categoryId,
      name,
      type,
      valueInCents,
      date,
      userId,
    });
  }

  async findAllByUserId(userId: string) {
    const data: TransactionModel[] = [];

    const transactions =
      await this.transactionsRepository.getTransactionsByUserId(userId);

    transactions.forEach((transaction) => {
      data.push(TransactionsMapper.toTransactionModel(transaction));
    });

    return {
      data,
    };
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, name, type, valueInCents, date } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update(transactionId, {
      bankAccountId,
      categoryId,
      name,
      type,
      valueInCents,
      date,
      userId,
    });
  }

  remove(userId: string, id: string) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: IValidateEntitiesOwnership) {
    await Promise.all([
      transactionId
        ? this.validateTransactionOwnershipService.handle(userId, transactionId)
        : undefined,
      this.validateBankAccountOwnershipService.handle(userId, bankAccountId),
      this.validateCategoryOwnershipService.handle(userId, categoryId),
    ]);
  }
}
