import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getQuery } from '@/helpers/server/utils/getQuery';

export async function GET(req: NextRequest) {
  const title = getQuery(req, 'title');
  const hall = getQuery(req, 'hall');
  const userId = getQuery(req, 'userId');
  const cursor = getQuery(req, 'cursor');

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    const bills = await db.bill.findMany({
      where: {
        title: {
          contains: title,
        },
        hall: {
          contains: hall,
        },
        userId: {
          contains: userId,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bills);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
