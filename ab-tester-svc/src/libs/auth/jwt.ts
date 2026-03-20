import { TypeUser } from '@digital-retail/ab-tester-types/user';
import jwt from 'jsonwebtoken';
import { env } from '../env';

type TokenPurpose = 'session' | 'password_recovery';
type TokenData = { valid: true; id: TypeUser['id']; secondsLeft: number } | { valid: false; id: null };
type Payload = { id: TypeUser['id']; purpose: TokenPurpose };
type FullPayload = Payload & { iat: number; exp: number };

const secondsTokenIsValid = 60 * 60 * 1; // 1 hour

const getTokenData = ({ token, purpose }: { token: string; purpose: TokenPurpose }): TokenData => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as FullPayload;
    if (purpose !== payload.purpose) throw new Error('Invalid token purpose');

    const now = Math.floor(Date.now() / 1000);
    const secondsLeft = payload.exp - now;

    return { id: payload.id, secondsLeft, valid: true };
  } catch {
    return { id: null, valid: false };
  }
};

const generateToken = (payload: Payload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: secondsTokenIsValid,
  });

  return token;
};

export { generateToken, getTokenData, secondsTokenIsValid };
