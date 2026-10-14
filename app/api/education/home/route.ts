import { NextResponse } from 'next/server';
import { apiUrl } from '../../../../lib/api';

export async function GET() {
  const response = await fetch(apiUrl('/education/api/home/'), {
    next: { revalidate: 600 },
    headers: { Accept: 'application/json' },
  });

  return new NextResponse(await response.text(), {
    status: response.status,
    headers: { 'content-type': 'application/json' },
  });
}
