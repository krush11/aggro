import { ToolUsers } from "@/prisma/prisma"
import { getUser } from "@/utils/getUser"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { tool } = await req.json()
  const user = await getUser()

  try {
    await ToolUsers.create({
      data: {
        user: { connect: { id: user.id } },
        tool: { connect: { id: tool.id } }
      }
    })
    return NextResponse.json('added', { status: 200 })
  }
  catch (err) {
    if (err.code === 'P2002')
      return NextResponse.json('already added', { status: 400 })
    return NextResponse.error('error', { status: 500 })
  }
}