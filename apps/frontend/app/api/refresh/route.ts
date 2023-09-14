import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  // Extract the path from the request body
  const { path } = await req.json()

  // // Trigger revalidation for the specified path
  revalidatePath(path)

  // Respond with a success message
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
