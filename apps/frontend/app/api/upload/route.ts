import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {

  console.log("the request: ", req)

  // console.log("request: ", request)
  // console.log("its a vibe")
  // console.log("incoming request: ", request)
  // // Ensure this handler only responds to POST requests
  // if (request.method !== 'POST') {
  //   return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  // }

  // Extract the path from the request body
  const { path } = await req.json();

  // console.log("what is the path getting pased in : ", path)

  // // Check if the path is provided
  // if (!path || typeof path !== 'string') {
  //   return NextResponse.json({ message: 'Missing or invalid path param' }, { status: 400 });
  // }

  // // Trigger revalidation for the specified path
  revalidatePath(path);

  // console.log("path revalidated")

  // Respond with a success message
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
