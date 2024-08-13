import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const originUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;
  const userSession = await getSession();

  if (path === "/login") {
    if (userSession.isLoggedIn) return NextResponse.redirect(`${originUrl}/`);
    else return NextResponse.next();
  }

  if (!userSession.isLoggedIn || userSession.payload?.role !== "ADMIN")
    return NextResponse.redirect(`${originUrl}/login`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/main/:path*"],
};
