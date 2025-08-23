import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '@/infra/repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import type { ListTransactionFilter } from '../types/ListTransactionFilter';

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
      date: new Date(date),
      userId,
    });
  }

  async findAllByUserId(userId: string, filters: ListTransactionFilter) {
    return this.transactionsRepository.getTransactionsByUserId(userId, filters);
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
      date: new Date(date),
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionOwnershipService.handle(
      userId,
      transactionId,
    );

    await this.transactionsRepository.delete(transactionId);
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
