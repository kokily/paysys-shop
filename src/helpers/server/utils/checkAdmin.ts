import { getSessionUser } from './getSessionUser';

export async function checkAdmin() {
  const user = await getSessionUser();

  if (user && !user.admin) {
    throw new Error('사용 권한이 없습니다.');
  }

  return user;
}
