import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helpers/server/database';
import { serializeUser } from '@/helpers/client/utils/serializeUser';
import { signJwtAccessToken } from '@/helpers/client/utils/signJwtAccessToken';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AuthPayload;

  try {
    const user = await db.user.findUnique({
      where: { username: body.username },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const serializedUser = serializeUser(user);
      const result = {
        ...serializedUser,
        token: signJwtAccessToken(serializedUser),
      };

      return NextResponse.json(result);
    } else {
      throw new Error('사용자가 없거나 비밀번호가 틀렸습니다.');
    }
  } catch (err: any) {
    throw new Error('사용자가 없거나 비밀번호가 틀렸습니다.');
  }
}
