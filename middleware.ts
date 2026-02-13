import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Paths that are for guests only (login, register)
  const guestPaths = ["/login", "/register"];
  const isGuest = guestPaths.some((path) => pathname.startsWith(path));

  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Verify token if present
  let isValidToken = false;
  if (refreshToken) {
    try {
      await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET);
      isValidToken = true;
    } catch (error) {
      isValidToken = false;
    }
  }

  // Redirect logic
  if (isProtected && !isValidToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuest && isValidToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
