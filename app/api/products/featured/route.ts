import { NextResponse } from 'next/server';
import { apiUrl } from '../../../../lib/api';

export async function GET() {
  const response = await fetch(apiUrl('/products/api/featured/'), {
    next: { revalidate: 600 },
    headers: { Accept: 'application/json' },
  });

  const data = await response.json();
  const products = Array.isArray(data) ? data : data?.results ?? [];

  return NextResponse.json(products, { status: response.status });
}
