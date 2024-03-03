import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req) {
  const headersList = new Headers(req.headers);
  headersList.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({ request: { headers: headersList } });
}