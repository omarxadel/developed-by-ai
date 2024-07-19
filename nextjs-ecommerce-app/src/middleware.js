import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { verifyUser } from "@/lib/data/user";

const PROTECTED_ROUTES = ["/checkout"];

export async function middleware(request) {
  if (
    PROTECTED_ROUTES.includes(request.nextUrl.pathname) &&
    !request.cookies.has(AUTH_COOKIE_NAME)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.cookies.has(AUTH_COOKIE_NAME)) {
    const res = await verifyUser(request.cookies.get(AUTH_COOKIE_NAME).value);
    if (res?.ok) {
      request.user = res.user;
      return NextResponse.next();
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
