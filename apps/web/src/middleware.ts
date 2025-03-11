import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Use getToken instead of auth() for Edge compatibility
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // If no token exists, redirect to the standard Auth.js signin page
  if (!token) {
    const signInUrl = new URL("/api/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude Auth.js routes, public assets, and API routes (refine as needed)
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth|auth|api|.*\\.svg).*)",
  ],
};
