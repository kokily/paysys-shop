import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const body = (await req.json()) as AddExpensePayload;

  try {
    await checkAdmin();

    const wedding = await db.wedding.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(wedding);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
