import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '1h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS,
) {
  const secretKey = process.env.NEXTAUTH_SECRET!;
  const token = jwt.sign(payload, secretKey, options);

  return token;
}
