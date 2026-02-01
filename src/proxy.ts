import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if user is authenticated
  if (!token) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if token is expired
  const expiresAt = (token as any).backendExp;
  if (expiresAt && Date.now() >= expiresAt * 1000) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    loginUrl.searchParams.set("expired", "true");
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  const userRole = (token as any).user?.role;
  const path = request.nextUrl.pathname;

  // If user is an EMPLOYEE
  if (userRole === "EMPLOYEE") {
    // Allow access only to invoice-tracking page
    if (
      path.startsWith("/dashboard") &&
      !path.startsWith("/dashboard/invoice-tracking")
    ) {
      // Redirect to invoice-tracking page
      return NextResponse.redirect(
        new URL("/dashboard/invoice-tracking", request.url),
      );
    }
  }

  // ADMIN has access to all pages
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
