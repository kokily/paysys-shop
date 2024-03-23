import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';
import { serializeUser } from '@/helpers/client/utils/serializeUser';

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as PasswordPayload;

  try {
    const session = await getSessionUser();

    const user = await db.user.update({
      where: { id: session.id },
      data: {
        password: await bcrypt.hash(password, 10),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(serializeUser(user));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
