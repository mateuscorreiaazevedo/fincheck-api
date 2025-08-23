import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { BankAccountType } from '../models/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalanceInCents: number;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  transactionType: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
