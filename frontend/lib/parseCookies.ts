import cookie from 'cookie'

export const parseCookie = (req:any) =>{
    return cookie.parse(req? req.headers.cookie || "" : document.cookie)
}