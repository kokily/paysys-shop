import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();

    const bill = await db.bill.update({
      where: { id },
      data: {
        reserve: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
