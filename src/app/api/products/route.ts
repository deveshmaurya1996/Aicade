import { NextResponse } from 'next/server';

const PRODUCTS_API_URL = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';

export async function GET() {
  try {
    const response = await fetch(PRODUCTS_API_URL);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
    const products = await response.json();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong', details: error }, { status: 500 });
  }
}
