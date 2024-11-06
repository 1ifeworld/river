import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Redirect users visiting river.ph to river.site
  if (
    url.hostname === 'river.ph' 
    || url.hostname === 'www.river.ph'
    || request.nextUrl.hostname === 'river.ph'
    || request.nextUrl.hostname === 'www.river.ph'
  ) {
    url.hostname = 'river.site';
    return NextResponse.redirect(url);
    
  }

  // Allow the request to proceed for other domains
  return NextResponse.next();
}

// Apply the middleware to all routes
export const config = {
  matcher: '/:path*', // Matches all paths
};
