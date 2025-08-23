import { TransactionType } from '@/modules/transactions/models/Transaction';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;

  @IsString()
  @IsNotEmpty()
  @IsEnum(
    [
      'fun',
      'transport',
      'other',
      'travel',
      'food',
      'home',
      'education',
      'freelance',
      'grocery',
      'clothes',
    ],
    {
      message:
        'Icon must be one of the following: fun, transport, other, travel, food, home, education, freelance, grocery, clothes',
    },
  )
  icon: string;
}
