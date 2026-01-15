// src/auth/password.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { env } from '@/libs/env';

@Injectable()
export class PasswordService {
  /**
   * Genera un hash seguro para un password
   * @param password Password en texto plano
   * @returns Hash del password
   */
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, env.SALT_ROUNDS);
  }

  /**
   * Compara un password en texto plano con su hash
   * @param password Password en texto plano
   * @param hash Hash del password
   * @returns true si coinciden, false si no
   */
  verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
