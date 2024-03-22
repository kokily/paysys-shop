import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddItemPayload;

  try {
    await checkAdmin();

    const count = await db.item.count();
    const item = await db.item.create({
      data: {
        ...body,
        num: count + 1,
      },
    });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
