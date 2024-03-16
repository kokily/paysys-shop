import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import db from '../database';

export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('사용자 로그인 후 사용하세요');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error('등록된 사용자가 아닙니다.');
  }

  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
  };
}
