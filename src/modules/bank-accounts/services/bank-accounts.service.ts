import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from '@/infra/repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalanceInCents, accountType, color } =
      createBankAccountDto;

    return this.bankAccountsRepository.create({
      name,
      initialBalanceInCents,
      accountType,
      color,
      userId,
    });
  }

  async findAllByUserId(userId: string) {
    const response =
      await this.bankAccountsRepository.findAllByUserIdWithCategories(userId);

    return response.map(({ transactions, ...item }) => {
      const currentBalanceInCents = transactions.reduce((acc, transaction) => {
        const signedValue =
          transaction.type === 'INCOME'
            ? transaction.valueInCents
            : -transaction.valueInCents;

        return acc + signedValue;
      }, item.initialBalanceInCents);

      return {
        ...item,
        currentBalanceInCents,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.handle(
      userId,
      bankAccountId,
    );

    const { name, initialBalanceInCents, accountType, color } =
      updateBankAccountDto;

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalanceInCents,
      accountType,
      color,
      userId,
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.handle(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepository.delete(bankAccountId);
  }
}
