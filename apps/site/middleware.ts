import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  console.log("incoming url: ", url)

  // Redirect users visiting river.ph to river.site
  if (url.hostname === 'river.ph') {
    url.hostname = 'river.site';
    console.log("outgoing url: ", url)
    return NextResponse.redirect(url);
    
  }

  // Allow the request to proceed for other domains
  return NextResponse.next();
}

// Apply the middleware to all routes
export const config = {
  matcher: '/:path*', // Matches all paths
};
