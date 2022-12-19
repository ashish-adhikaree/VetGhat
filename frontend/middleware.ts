import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest){
    const cookie = request.cookies.get('jwt')?.value
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('authorization', `Bearer ${cookie}`)
    const res = await fetch('http://localhost:1337/api/users/me',{
        method: 'get',
        headers: {
            authorization: cookie ? `Bearer ${cookie}` : ''
          }
    })
    // console.log(request.url)
    if (res.status!==200 && request.url !== "http://localhost:3000/login"){
        return NextResponse.redirect(new URL('http://localhost:3000/login'))
    }else if(res.status === 200 && request.url.includes('/login')){
        return NextResponse.redirect(new URL('http://localhost:3000'))
    }
}
export const config = {
    matcher: ['/login','/','/profile/:slug*'],
}