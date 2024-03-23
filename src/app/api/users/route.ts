import { NextRequest, NextResponse } from 'next/server';
import { serializeUser } from '@/helpers/client/utils/serializeUser';
import db from '@/helpers/server/database';
import { getQuery } from '@/helpers/server/utils/getQuery';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function GET(req: NextRequest) {
  const username = getQuery(req, 'username');
  const cursor = getQuery(req, 'cursor');

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    await checkAdmin();
    
    const users = await db.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      users.map((user) => {
        return serializeUser(user);
      }),
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
