import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class CryptService {
  async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
