import type { User } from '@prisma/client';

export function serializeUser(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
