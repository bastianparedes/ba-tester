import jwt from 'jsonwebtoken';
import { TypeUser } from '../../../../domain/types/user';
import { env } from '../../libs/env';

type TokenPurpose = 'session' | 'password_recovery';
type TokenData = { valid: true; id: TypeUser['id'] } | { valid: false; id: null };
type Payload = { id: TypeUser['id']; purpose: TokenPurpose };

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
