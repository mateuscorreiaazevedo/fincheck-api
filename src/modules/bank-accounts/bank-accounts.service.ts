import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from '@/infra/repositories';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
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

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findAllByUserId(userId);
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isOwner = await this.bankAccountsRepository.findById(
      bankAccountId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException(['Bank account not found']);
    }

    const { name, initialBalanceInCents, accountType, color } =
      updateBankAccountDto;

    await this.bankAccountsRepository.update({
      name,
      initialBalanceInCents,
      accountType,
      color,
      userId,
    });

    return {
      updatedAt: new Date(),
    };
  }

  remove(userId: string, bankAccountId: string) {
    return `This action removes a #${bankAccountId} bankAccount`;
  }
}
