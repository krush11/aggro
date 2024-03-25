import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
  revalidateTag('user-details')
  return NextResponse.json('ok', { status: 200 })
}
