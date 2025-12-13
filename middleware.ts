import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simple middleware that allows all requests
  // Authentication is handled by SessionProvider in the layout
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
