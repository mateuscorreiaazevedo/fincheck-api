import bcrypt from 'bcryptjs';

export class CryptService {
  static async hash(password: string): Promise<string> {
    const SALT_NUMBER = 12;
    const hash = bcrypt.hashSync(password, SALT_NUMBER);

    return hash;
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
