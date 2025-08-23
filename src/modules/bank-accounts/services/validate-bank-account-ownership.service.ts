import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from '@/infra/repositories';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async handle(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepository.findById(
      bankAccountId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException(['Bank account not found']);
    }
  }
}
