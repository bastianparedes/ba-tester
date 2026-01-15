// src/auth/jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { env } from '@/libs/env';

export type TokenPurpose = 'session' | 'password_recovery';
export type TokenData = { valid: true; id: string } | { valid: false; id: null };
export type Payload = { id: string; purpose: TokenPurpose };

@Injectable()
export class JwtService {
  private readonly tokenExpirySeconds = 60 * 60; // 1 hora

  /**
   * Genera un token JWT con un payload y expiración predefinida
   * @param payload Payload con id y propósito
   * @returns Token JWT
   */
  generateToken(payload: Payload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: this.tokenExpirySeconds,
    });
  }

  /**
   * Verifica un token y valida su propósito
   * @param token Token JWT
   * @param purpose Propósito esperado del token
   * @returns TokenData con validez y id
   */
  getTokenData(token: string, purpose: TokenPurpose): TokenData {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as Payload;
      if (payload.purpose !== purpose) {
        throw new Error('Invalid token purpose');
      }
      return { valid: true, id: payload.id };
    } catch {
      return { valid: false, id: null };
    }
  }

  /**
   * Retorna la duración del token en segundos
   */
  getTokenExpirySeconds(): number {
    return this.tokenExpirySeconds;
  }
}
