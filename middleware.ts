import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Middleware - Current path:', req.nextUrl.pathname)
  console.log('Middleware - Session exists:', !!session)

  // If there's no session and the user is trying to access a protected route
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/editor')
  )) {
    console.log('Middleware - Redirecting to login')
    const redirectUrl = new URL('/auth/entrar', req.url)
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session and the user is trying to access auth pages
  if (session && (
    req.nextUrl.pathname.startsWith('/auth/entrar') ||
    req.nextUrl.pathname.startsWith('/auth/cadastro')
  )) {
    console.log('Middleware - Redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/auth/entrar',
    '/auth/cadastro',
  ],
} 