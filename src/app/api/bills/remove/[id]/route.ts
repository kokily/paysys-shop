import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await getSessionUser();
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json({ error: '해당 빌지가 없습니다.' }, { status: 404 });
    }

    if (user.admin) {
      // 세션이 관리자일 때 즉시 삭제
      await db.bill.delete({ where: { id } });

      return NextResponse.json({ message: '관리자 삭제' });
    } else {
      // 세션이 일반 사용자일 때 본인 확인
      if (bill.userId === user.id) {
        await db.bill.delete({ where: { id } });

        return NextResponse.json({ message: '빌지 삭제 완료' });
      } else {
        return NextResponse.json(
          { error: '사용 권한이 없습니다.' },
          { status: 403 },
        );
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
