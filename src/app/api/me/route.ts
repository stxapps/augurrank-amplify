import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { getSession } from '@/api/auth';
import { isFldStr } from '@/utils';

//Must not cache as it ignores header values
//export const dynamic = 'force-static';
//export const revalidate = 60;

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const headersList = await headers();
  const bearer = headersList.get('Authorization');

  const authToken = request.headers.get('Authorization') || 'No token';

  const { stxAddr } = verifyJwt(bearer);
  if (!isFldStr(stxAddr)) {
    return new NextResponse();
  }

  const url = request.nextUrl;

  return NextResponse.json({}, {
    status: 200,
    headers: {
      // set only private is enough?
      //'Cache-Control': 'private, max-age=300', // Cache privately for 5 minutes
      'Cache-Control': 'private, no-store, no-cache, must-revalidate',
    },
  });
}
