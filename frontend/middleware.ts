import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const jwt = request.cookies.get("jwt")?.value;
    if (jwt === null || jwt === undefined) {
      if (request.url !== `${process.env.SITE_URL}/login`) {
        return NextResponse.redirect(new URL(`${process.env.SITE_URL}/login`));
      }
    } else {
      const res = await fetch(`${process.env.STRAPI}/api/users/me`, {
        method: "get",
        headers: {
          authorization: jwt ? `Bearer ${jwt}` : "",
        },
      });
      if (res.status === 200 && request.url.includes("/login")) {
        return NextResponse.redirect(new URL(process.env.SITE_URL || ""));
      } else if (
        res.status !== 200 &&
        request.url !== `${process.env.SITE_URL}/login`
      ) {
        return NextResponse.redirect(new URL(`${process.env.SITE_URL}/login`));
      }
    }
  } catch (err) {}
}
export const config = {
  matcher: ["/login", "/", "/profile/:slug*"],
};
