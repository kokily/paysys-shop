import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddExpensePayload;

  try {
    await checkAdmin();

    const wedding = await db.wedding.create({
      data: {
        ...body,
        weddingAt: body.weddingAt.toString(),
      },
    });

    return NextResponse.json(wedding);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
