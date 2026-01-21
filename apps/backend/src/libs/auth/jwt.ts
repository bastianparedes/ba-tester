import jwt from 'jsonwebtoken';
import { env } from '../../libs/env';

type TokenPurpose = 'session' | 'password_recovery';
type TokenData = { valid: true; id: string } | { valid: false; id: null };
type Payload = { id: string; purpose: TokenPurpose };

const secondsTokenIsValid = 60 * 60 * 12; // 12 hours

const getTokenData = ({ token, purpose }: { token: string; purpose: TokenPurpose }): TokenData => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as Payload;
    if (purpose !== payload.purpose) throw new Error('Invalid token purpose');
    return { valid: true, id: payload.id };
  } catch {
    return { valid: false, id: null };
  }
};

const generateToken = (payload: Payload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: secondsTokenIsValid, // jwt espera segundos
  });

  return token;
};

export { getTokenData, generateToken, secondsTokenIsValid };
