import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddReservePayload;

  try {
    await checkAdmin();

    const bill = await db.bill.update({
      where: { id: body.billId },
      data: {
        reserve: body.reserve,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
