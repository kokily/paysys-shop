import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const { sex } = (await req.json()) as RemoveSignPayload;

  try {
    await checkAdmin();

    const wedding = await db.wedding.findUnique({ where: { id } });

    if (!wedding) {
      return NextResponse.json({ error: '해당 빌지가 없습니다.' }, { status: 404 });
    }

    const updateWedding = await db.wedding.update({
      where: { id },
      data: {
        husbandImage: sex === 'husband' ? '' : wedding.husbandImage,
        brideImage: sex === 'bride' ? '' : wedding.brideImage,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updateWedding);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
