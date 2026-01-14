import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple middleware - can be enhanced with proper auth later
  // For now, allow all routes except protected ones
  const path = request.nextUrl.pathname;
  
  // Protect dashboard routes (you can add auth logic here later)
  if (path.startsWith('/dashboard') && !path.startsWith('/dashboard/api')) {
    // TODO: Add authentication check
    // For now, allow access
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
