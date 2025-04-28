import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export {default} from 'next-auth/middleware'

const publicPaths = [
    '/about',
    '/about/:path*',
    '/login',
    '/register',
    '/api/auth/:path*'
]
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    console.log('token', token)
    if(!token){
        if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }else{
        if (token.accessToken){
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/contests/:path*',
    '/roadmap/:path*',
    '/upcoming/:path*',
    '/profile/:path*',
],
}