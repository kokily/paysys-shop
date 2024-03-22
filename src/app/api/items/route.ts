import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getQuery } from '@/helpers/server/utils/getQuery';

export async function GET(req: NextRequest) {
  const name = getQuery(req, 'name');
  const cursor = getQuery(req, 'cursor');

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    const items = await db.item.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
