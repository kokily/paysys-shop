import bcrypt from "bcryptjs";

/**
 * 비밀번호 DB 저장용 해시 변환
 * @param password 평문 비밀번호
 * @returns bcrypt 해시 문자열
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/**
 * 입력 비밀번호 DB 해시 비교
 * @param password 평문 비밀번호
 * @param hash DB에 저장된 해시
 * @returns 일치 여부
 */
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
