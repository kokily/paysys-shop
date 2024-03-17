import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getQuery } from '@/helpers/server/utils/getQuery';

export async function GET(req: NextRequest) {
  const divide = getQuery(req, 'divide');
  const native = getQuery(req, 'native');

  try {
    const menu = await db.item.findMany({
      where: {
        divide: {
          contains: divide,
        },
        native: {
          contains: native,
        },
      },
    });

    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
