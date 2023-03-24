import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest){
//     const cookie = request.cookies.get('jwt')?.value
//     const requestHeaders = new Headers(request.headers)
//     requestHeaders.set('authorization', `Bearer ${cookie}`)
//     const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`,{
//         method: 'get',
//         headers: {
//             authorization: cookie ? `Bearer ${cookie}` : ''
//           }
//     })
//   console.log(process.env.SITE_URL)
//     if (res.status!==200 && request.url !== `${process.env.SITE_URL}/login`){
//         return NextResponse.redirect(new URL(`${process.env.SITE_URL}/login`))
//     }else if(res.status === 200 && request.url.includes('/login')){
//         return NextResponse.redirect(new URL(process.env.SITE_URL || ""))
//     }
return
}
export const config = {
    matcher: ['/login','/','/profile/:slug*'],
}