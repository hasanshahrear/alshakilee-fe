import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token && token.backendExp && Date.now() >= token.backendExp * 1000) {
      const signInUrl = new URL("/login", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url);

      // Optionally clear session cookies
      const response = NextResponse.redirect(signInUrl);
      response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      return response;
    }

    // If token is valid or no token (public route), proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
