import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export default async function handler(request: NextRequest) {
  // Ensure this handler only responds to POST requests
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  // Extract the path from the request body
  const { path } = await request.json();

  // Check if the path is provided
  if (!path || typeof path !== 'string') {
    return NextResponse.json({ message: 'Missing or invalid path param' }, { status: 400 });
  }

  // Trigger revalidation for the specified path
  revalidatePath(path);

  // Respond with a success message
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
