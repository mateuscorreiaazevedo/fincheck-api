import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from '@/infra/repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

interface IValidateEntitiesOwnership {
  bankAccountId: string;
  categoryId: string;
  userId: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
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
    const transactions =
      await this.transactionsRepository.getTransactionsByUserId(userId);

    return {
      data: transactions,
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
      bankAccountId: bankAccountId,
      categoryId: categoryId,
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
  }: IValidateEntitiesOwnership) {
    await Promise.all([
      this.validateBankAccountOwnershipService.handle(userId, bankAccountId),
      this.validateCategoryOwnershipService.handle(userId, categoryId),
    ]);
  }
}
