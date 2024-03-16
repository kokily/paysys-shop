import jwt, { type JwtPayload } from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET!;
    const decoded = jwt.verify(token, secretKey);

    return decoded as JwtPayload;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
