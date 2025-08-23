import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from '@/infra/repositories';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async handle(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepository.getTransactionById(
      transactionId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException(['Transaction not found']);
    }
  }
}
