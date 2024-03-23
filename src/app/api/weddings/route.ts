import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getQuery } from '@/helpers/server/utils/getQuery';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function GET(req: NextRequest) {
  const husbandName = getQuery(req, 'husbandName');
  const brideName = getQuery(req, 'brideName');
  const cursor = getQuery(req, 'cursor');

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    await checkAdmin();
    
    const weddings = await db.wedding.findMany({
      where: {
        husbandName: {
          contains: husbandName,
        },
        brideName: {
          contains: brideName,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(weddings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
