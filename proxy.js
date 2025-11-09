import { NextResponse } from "next/server"

export function proxy(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    const adminSession = request.cookies.get("admin_session")

    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
