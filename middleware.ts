import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key"
);

// Define Public Routes (accessible without login)
const publicRoutes = ["/login", "/register", "/"];

// Define Protected Routes (require login)
const protectedRoutes = ["/dashboard"];

// Define Admin Routes (require login and Admin role)
const adminRoutes = ["/about"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((path) => path === pathname || (path !== "/" && pathname.startsWith(path)));
  const isProtectedRoute = protectedRoutes.some((path) => pathname.startsWith(path));
  const isAdminRoute = adminRoutes.some((path) => pathname.startsWith(path));

  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Verify token if present
  let isValidToken = false;
  let userRole = null;

  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET);
      isValidToken = true;
      userRole = payload.role;
    } catch (error) {
      isValidToken = false;
    }
  }

  // Redirect logic
  
  // 1. If trying to access a protected route OR admin route without a valid token -> Redirect to Login
  if ((isProtectedRoute || isAdminRoute) && !isValidToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access an Admin route without Admin role -> Redirect to Dashboard (or 403)
  if (isAdminRoute && userRole !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. If trying to access a public route (like login/register) WITH a valid token -> Redirect to Dashboard
  if ((isPublicRoute && pathname !== "/") && isValidToken) {
     return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  // Special case for root: if logged in, go to dashboard, else stay on root (or login)
  if (pathname === "/" && isValidToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
