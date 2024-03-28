import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function POST(req: NextRequest) {
  const { weddingId, sex, image } = (await req.json()) as AddSignPayload;

  try {
    await checkAdmin();

    if (sex === 'husband') {
      const wedding = await db.wedding.update({
        where: { id: weddingId },
        data: {
          husbandImage: image,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(wedding);
    } else {
      const wedding = await db.wedding.update({
        where: { id: weddingId },
        data: {
          brideImage: image,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(wedding);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
