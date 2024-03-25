import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies()
  cookieStore.delete('auth-token');
  return NextResponse.json('ok', { status: 200 })
}
