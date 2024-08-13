import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const originUrl = req.nextUrl.origin;
  const userSession = await getSession();

  if (!userSession.isLoggedIn || userSession.payload?.role !== "ADMIN") return NextResponse.redirect(`${originUrl}/`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*"],
};
