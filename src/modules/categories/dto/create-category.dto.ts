import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['INCOME', 'EXPENSE'], {
    message: 'Transaction type must be INCOME or EXPENSE',
  })
  transactionType: 'INCOME' | 'EXPENSE';

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
