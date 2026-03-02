import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Only run middleware on admin and auth routes
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
  ],
}
