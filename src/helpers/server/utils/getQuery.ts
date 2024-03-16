import { NextRequest } from 'next/server';

export function getQuery(req: NextRequest, queryName: string) {
  return new URL(req.nextUrl).searchParams.get(queryName) ?? '';
}
