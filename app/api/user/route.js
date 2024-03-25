import { User } from "@/prisma/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET), { algorithms: ['HS256'] })
  const user = await User.findUnique({
    where: { id: payload.id },
    select: { email: true, firstName: true, lastName: true, ToolUsers: true, username: true }
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 })

  return NextResponse.json(user, { status: 200 })
}