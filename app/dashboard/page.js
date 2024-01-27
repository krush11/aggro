import { getUser } from "@/utils/getUser";
import { Tools } from "@/prisma/prisma";
import Client from "./client";

export const revalidate = 60 * 60;

async function fetchTools() {
  const toolsList = await Tools.findMany({ include: { ToolUsers: true } })
  return toolsList
}

export default async function Page() {
  const [user, tools] = await Promise.all([await getUser(), await fetchTools()])

  return <Client user={user} tools={tools} />
}