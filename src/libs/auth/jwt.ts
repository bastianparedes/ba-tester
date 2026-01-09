import jwt from 'jsonwebtoken';
import env from '@/libs/env';

type TokenPurpose = 'session' | 'password_recovery';
type TokenData = { valid: true; id: string; purpose: TokenPurpose } | { valid: false; id: null; purpose: null };
type Payload = { id: string; purpose: TokenPurpose };

const tokenName = 'access_token';
const secondsTokenIsValid = 60 * 60; // 1 hour

const getTokenData = (token: string, purpose: TokenPurpose): TokenData => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as Payload;
    if (purpose !== payload.purpose) throw new Error('Invalid token purpose');
    return { valid: true, id: payload.id, purpose: payload.purpose };
  } catch {
    return { valid: false, id: null, purpose: null };
  }
};

const generateToken = (payload: Payload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: secondsTokenIsValid,
  });

  return token;
};

export { tokenName, getTokenData, generateToken, secondsTokenIsValid };
